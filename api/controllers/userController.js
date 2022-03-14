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

exports.postCompleted = () =>
  catchAsync(async (req, res, next) => {
    const driverQuery = User.findByIdAndUpdate(
      req.params.driverId,
      { $push: { completedOrders: req.body } },
      {
        new: true,
      }
    );

    const customerQuery = User.findByIdAndUpdate(
      req.params.customerId,
      { orders: req.body },
      { new: true }
    );
    const driverData = await driverQuery;
    const customerData = await customerQuery;

    res.status(200).json({
      status: "success",
      driverData,
      customerData,
    });
    return;
  });

exports.updateOrders = () =>
  catchAsync(async (req, res, next) => {
    const query = Model.findByIdAndUpdate(
      req.params.id,
      { $push: { completedOrders: req.body } },
      //////////////////////////////////////////
      // 3/14 Figure out this //
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
