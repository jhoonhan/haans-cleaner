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
        // runValidators: true,
      }
    );
    const customerQuery = User.findByIdAndUpdate(
      req.params.customerId,
      {
        $push: { orders: req.body },
      },
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
