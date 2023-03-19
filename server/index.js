//import Dependency
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//Configuration
const Root = express();
Root.use(cors());

//Middleware Setup
Root.use(express.json());

//All Routes
Root.use("/signup", require("./Routes/signup.js"));
Root.use("/login", require("./Routes/login.js"));
Root.use("/verify", require("./Routes/verify.js"));
Root.use("/hostels", require("./Routes/Home.js"));
Root.use("/save", require("./Routes/Hostel.js"));
//Listening Root
Root.listen(process.env.PORT);
