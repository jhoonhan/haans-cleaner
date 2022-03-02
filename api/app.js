const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const compression = require("compression");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");

// start express app
const app = express();

app.enable("trust proxy");
app.set("views", path.join(__dirname, "views"));

// Global middelwares
app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
// const limiter = rateLimit({
//   max: 20,
//   windowMs: 5000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["all"],
  })
);

app.use(compression());

// Routes
app.use("/api/v2/users/", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports = app;
