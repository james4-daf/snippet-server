const router = require("express").Router();
const authRoutes = require("./auth.routes");

console.log("inside index route");
/* GET home page */
router.get("/", (req, res, next) => {
  console.log("inside other route");
  res.json("All good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
