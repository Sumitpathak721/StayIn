const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("../db/config");

const HostelModel = require("../db/Hostels");
const { find } = require("../db/User");
const router = express.Router();

router.get("/hostels", async (req, resp) => {
  const hosteldata = await HostelModel.find({});
  if (hosteldata) {
    resp.send(hosteldata);
  } else {
    resp.send({ result: "err" });
  }
});

router.get("/search/:key", async (req, resp) => {
  let result = await HostelModel.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  resp.send(result);
});

module.exports = router;
