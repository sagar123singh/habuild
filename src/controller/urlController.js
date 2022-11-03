const UrlModel = require("../model/urlModel");

// *************************************************************** Validation ************************************************************* //
const isValidBody = function (body) {
  return Object.keys(body).length > 0;
};

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

// ********************************************************** POST /url/shorten ********************************************************** //
// short url creation and updation everyTime
const createUrl = async function (req, res) {
  try {
    const body = req.body;
    // Validate body(body must be present)
    if (!isValidBody(body)) {
      return res
        .status(400)
        .send({ status: false, msg: "Body must not be empty" });
    }

    // Validate query(it must not be present)
    const query = req.query;
    if (isValidBody(query)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid parameters. Query must not be present",
        });
    }

    // Validate params(it must not be present)
    const params = req.params;
    if (isValidBody(params)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid parameters. Params must not be present",
        });
    }

    // longUrl must be present in body
    const longUrl = body.longUrl;
    if (!isValid(longUrl)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide longUrl" });
    }

    //Validation of longUrl
    if (
      !/(:?^((https|http|HTTP|HTTPS){1}:\/\/)(([w]{3})[\.]{1}|)?([a-zA-Z0-9]{1,}[\.])[\w]*((\/){1}([\w@?^=%&amp;~+#-_.]+))*)$/.test(
        longUrl
      )
    ) {
      return res
        .status(400)
        .send({ status: false, message: `logoLink is not a valid URL` });
    }

    const baseUrl = "www.habuild.in/";
    if (!baseUrl) {
      return res.status(401).send({ status: false, msg: "Invalid baseUrl" });
    }

    let urlCode = (Math.random() + 1).toString(36).substring(7);

    // To create shortUrl from longUrl. We have to combine baseUrl with the urlCode.
    let shortUrl = baseUrl + urlCode.toLowerCase();


    let input = { longUrl, shortUrl, urlCode };

    const finalurl = await UrlModel.create(input);
    //it will create and automatically update everyTime
    const createdUrl = {
      longUrl: finalurl.longUrl,
      shortUrl: finalurl.shortUrl,
      urlCode: finalurl.urlCode,
    };


    // const now = new Date();
    // const expiration_time = AddMinutesToTime(now, 10);
    // const url_instance = await URL.create({  Url: data,expiration_time: expiration_time,});


    return res.status(201).send({ status: true, data: createdUrl });
  } catch (err) {
    console.log("This is the error :", err.message);
    return res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports.createUrl = createUrl;

// ************************************************************* GET /:urlCode ************************************************************* //

const getUrl = async function (req, res) {
  try {
    const urlCode = req.params.urlCode;
    // Validate params(it must be present)
    if (!isValid(urlCode.trim().toLowerCase())) {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide urlCode" });
    }

    // Validate body(it must not be present)
    if (isValidBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, msg: "Body should not be present" });
    }

    // Validate query(it must not be present)
    const query = req.query;
    if (isValidBody(query)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid parameters. Query must not be present",
        });
    }

    const url = await UrlModel.findOne({ urlCode: urlCode });
    if (url) {
      return res.status(302).redirect(url.longUrl);
    } else {
      return res.status(404).send({ status: false, msg: "No urlCode matches" });
    }
  } catch (err) {
    console.log("This is the error :", err.message);
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.getUrl = getUrl;
