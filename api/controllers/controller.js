const catchAsync = require("./../utils/catchAsync");
const axios = require("axios");

exports.getGeocode = (Order) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);

    // const { street, city, zip } = address;
    const street = "2835 fallin ct";
    const city = "high point";
    const zip = "nc";
    const queryStreet = street
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .join("+");
    const queryCity = city
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .join("+");
    const queryZip = zip;

    // const res1 = await GoogleGeocode.get(
    //   `/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=${process.env.REACT_APP_GOOGLE_GEOCODING}`
    // );

    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=AIzaSyAkI-xZ8-eXhcWNDVr111EyYX84UXaGGZc`
    );

    res.status(200).send(data.data.results[0].geometry.location);
    // const coords = res.data.results[0].geometry.location;

    // res.status(200).json({
    //   status: "aaang",
    //   coords,
    // });

    // return coords;
    return;
  });
