const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("../db/config");

const HostelModel = require("../db/Hostels");
const router = express.Router();

router.get("/", async (req, resp) => {
  const hosteldata = await HostelModel.find({});
  if (hosteldata) {
    resp.send({respond:"done",result:hosteldata});
  } else {
    resp.send({ respond: "err",result:null });
  }
});

router.get("/search/:key", async (req, resp) => {
  let result = await HostelModel.find({
    $or: [{ Name: { $regex: req.params.key } }],
  });
  resp.send(result);
});

module.exports = router;
