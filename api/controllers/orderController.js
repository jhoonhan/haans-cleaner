const Order = require("../models/orderModel");
const factory = require("./handlers");
const catchAsync = require("../utils/catchAsync");

exports.create = factory.create(Order);

exports.getAll = factory.getAll(Order);
exports.getOne = factory.getOne(Order);

exports.update = factory.update(Order);

exports.delete = factory.delete(Order);
