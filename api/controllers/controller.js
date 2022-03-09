const catchAsync = require("./../utils/catchAsync");
const axios = require("axios");

exports.getGeocode = () =>
  catchAsync(async (req, res, next) => {
    const { street, city, zip } = req.body;
    const queryStreet = street
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .join("+");
    const queryCity = city
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .join("+");
    const queryZip = zip;

    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=AIzaSyAkI-xZ8-eXhcWNDVr111EyYX84UXaGGZc`
    );

    res.status(200).send(data.data.results[0].geometry.location);

    return;
  });

exports.getDistance = () =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${35.9594345}%2C${-80.0461341}&destinations=${35.969689314975284}%2C${-80.03943902205476}&key=AIzaSyAkI-xZ8-eXhcWNDVr111EyYX84UXaGGZc`
    );

    res.status(200).send(data);
  });
