const User = require("../models/userModel");
const factory = require("./handlers");

exports.getOne = factory.getOne(User);
exports.getAll = factory.getAll(User);
