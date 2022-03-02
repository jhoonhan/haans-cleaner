const User = require("../models/userModel");
const factory = require("./handlers");
const catchAsync = require("./../utils/catchAsync");

exports.getOne = factory.getOne(User);
exports.getAll = factory.getAll(User);

exports.update = factory.update(User);

exports.create = factory.create(User);
