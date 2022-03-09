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

exports.getDriverOrder = () =>
  catchAsync(async (req, res, next) => {
    let query;
    const date = new Date(req.query.date);
    const today = new Date().toISOString().split("T")[0];

    const results = {};

    // console.log(startDate);
    if (req.params.type === "search") {
      query = Order.find({
        $or: [
          {
            $and: [
              { status: "accepted" },
              { acceptId: req.params.acceptId },
              { date: { $eq: date } },
            ],
          },
          {
            $and: [{ status: "submitted" }, { date: { $eq: date } }],
          },
        ],
      });
    }
    if (req.params.type === "accepted") {
      query = Order.find({
        $or: [
          {
            $and: [
              { status: "accepted" },
              { acceptId: req.params.acceptId },
              { date: { $eq: date } },
            ],
          },
          {
            $and: [
              { status: "completed" },
              { acceptId: req.params.acceptId },
              { date: { $eq: date } },
            ],
          },
        ],
      });
    }

    const data = await query;

    const orderArr = await controller.getDistance(data);
    const sortedArr = orderArr.sort((a, b) => {
      return a.distance - b.distance;
    });
    console.log(sortedArr);

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    results.data = sortedArr.slice(startIndex, endIndex);

    if (endIndex < sortedArr.length)
      results.next = {
        page: page + 1,
        limit,
      };

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      totlaResults: results.data.length,
      nextPage: results.next,
      prevPage: results.prev,
      data: results.data,
    });
  });
