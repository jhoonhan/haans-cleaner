const catchAsync = require("./../utils/catchAsync");

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.find();
    const data = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findById(req.params.id);
    const data = await query;

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.searchByQuery = (Model) => {
  catchAsync(async (req, res, next) => {
    const query = Model.find(req.query);
    const data = await query;

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });
};

exports.getByGoogleId = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.find({ googleId: req.params.googleId });
    const data = await query;

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators: true,
    });
    const data = await query;

    res.status(200).json({
      status: "success",
      data,
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = Model.findByIdAndDelete(req.params.id);
    const data = await query;

    res.status(200).json({
      status: "success",
      data,
    });
  });
