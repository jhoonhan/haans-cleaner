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
    const query = User.findByIdAndUpdate(
      req.params.id,
      { $push: { completedOrders: req.body } },
      {
        new: true,
        // runValidators: true,
      }
    );
    const data = await query;
    console.log(data);

    res.status(200).json({
      status: "success",
      data,
    });
    return;
  });
