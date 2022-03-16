const User = require("../models/userModel");
const factory = require("./handlers");
const catchAsync = require("../utils/catchAsync");

exports.create = factory.create(User);

exports.getAll = factory.getAll(User);
exports.getOne = factory.getOne(User);
exports.getByGoogleId = factory.getByGoogleId(User);

exports.update = factory.update(User);

exports.delete = factory.delete(User);

exports.test = factory.test(User);

exports.updateUserOrder = () =>
  catchAsync(async (req, res, next) => {
    let driverData = {};
    if (req.params.type === "complete") {
      const driverQuery = User.findByIdAndUpdate(
        req.params.driverId,
        { $addToSet: { completedOrders: req.body } },
        {
          new: true,
        }
      );
      driverData = await driverQuery;
    }

    const customerQuery = User.findOneAndUpdate(
      { _id: req.params.customerId, "orders._id": req.params.orderId },
      {
        $set: {
          "orders.$.status": `${
            req.params.type === "complete" ? "completed" : "accepted"
          }`,
        },
      },
      { new: true }
    );
    const customerData = await customerQuery;

    res.status(200).json({
      status: "success",
      driverData,
      customerData,
    });
    return;
  });

exports.createUserOrder = () =>
  catchAsync(async (req, res, next) => {
    const query = User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { orders: req.body },
      },
      {
        new: true,
        // runValidators: true,
      }
    );
    const data = await query;

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.deleteUserOrder = () =>
  catchAsync(async (req, res, next) => {
    const customerQuery = User.findOneAndUpdate(
      { _id: req.params.customerId },
      {
        $pull: {
          orders: { _id: req.params.orderId },
        },
      },
      { new: true }
    );
    const customerData = await customerQuery;

    res.status(200).json({
      status: "success",
      customerData,
    });
    return;
  });
