const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");

const { Order } = require("../models/orderModel");
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
    const today = date.toISOString().split("T")[0];
    console.log(new Date(today));
    let query;
    // console.log(startDate);
    if (req.params.type === "search") {
      query = Order.find({
        $or: [
          {
            $and: [
              { status: "accepted" },
              { acceptId: req.params.acceptId },
              // { date: { $eq: new Date(today) } },
            ],
          },
          {
            $and: [
              { status: "submitted" },
              { date: { $lte: new Date(today) } },
            ],
          },
        ],
      });
    }
    if (req.params.type === "accepted") {
      query = Order.find({
        $or: [
          {
            $and: [{ status: "accepted" }, { acceptId: req.params.acceptId }],
          },
          {
            $and: [
              { status: "completed" },
              { acceptId: req.params.acceptId },
              { completedDate: { $eq: new Date(today) } },
            ],
          },
        ],
      });
    }

    // date: {
    //   // $gte: new Date().setDate(date.getDate() - 2),
    //   $lte: new Date("2022-03-04").setDate(date.getDate() + 0),
    // },

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
