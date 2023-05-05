// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "SQU14TL3",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000,
    },
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI || "mongodb://localhost:27017/snippet-proj",
      // Time to Live for sessions in DB. After that time it will delete it!
      ttl: 24 * 60 * 60, // your session will be cleared after these seconds
    }),
  })
);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const snippetRoutes = require("./routes/snippet.routes");
//console.log("somethingjskdnsjsc");
app.use("/api", snippetRoutes);

require("./error-handling")(app);

module.exports = app;
