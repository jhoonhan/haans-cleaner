const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

const Order = require("../models/orderModel");
const factory = require("./handlers");
const controller = require("./controller");
const catchAsync = require("../utils/catchAsync");

exports.create = factory.create(Order);

exports.getAll = factory.getAll(Order);
exports.getOne = factory.getOne(Order);
exports.getByGoogleId = factory.getByGoogleId(Order);

exports.update = factory.update(Order);

exports.delete = factory.delete(Order);

exports.getGeocode = controller.getGeocode();

exports.getAccepted = () =>
  catchAsync(async (req, res, next) => {
    const date = new Date();

    // console.log(startDate);

    const query = Order.find({
      $or: [{ status: "accepted" }, { status: "completed" }],
      acceptId: req.params.acceptId,
      date: {
        $gte: new Date().setDate(date.getDate() - 2),
        $lte: new Date().setDate(date.getDate() + 2),
      },
    });

    const data = await query;

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });
