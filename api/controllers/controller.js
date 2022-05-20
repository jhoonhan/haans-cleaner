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
      `https://maps.googleapis.com/maps/api/geocode/json?address=${queryStreet},+${queryCity},+${queryZip}&key=${process.env.GOOGLE_KEY}`
    );
    console.log(data.data);
    if (data.data.results[0]) {
      res.status(200).send(data.data.results[0].geometry.location);
    }

    return;
  });

exports.getDistance = async (orderData, [lat, lng]) => {
  try {
    const originQuery = `${lat}%2C${lng}`;
    const destinations = orderData.map((order) => order.coords);
    const destinationQuery = destinations
      .map((des) => `${des.lat}%2C${des.lng}`)
      .join("%7C");

    const data = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originQuery}&destinations=${destinationQuery}&key=${process.env.GOOGLE_KEY}`
    );
    const distances = data.data.rows[0].elements.map(
      (el) => +el.distance.text.split(" ")[0]
    );
    const orderList = orderData.map((order, i) => {
      return {
        ...order._doc,
        distance: distances[i],
      };
    });
    return orderList;
  } catch (error) {
    return [];
  }
};
