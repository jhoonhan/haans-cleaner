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
