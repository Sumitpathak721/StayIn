const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.type.split("/")[0]==="image"){
            cb(null, "../../images/building-files/images");
        }else if(file.type.split("/")[0]==="video"){
            cb(null, "../../images/building-files/videos");
        }
    },
    filename: function (req, file, cb) {
      console.log(file);
      if(file.type.split("/")[0]==="image"){
            cb(null,req.body);
        }else if(file.type.split("/")[0]==="video"){
            cb(null,);
        }
      cb(null, file.originalname);
    },
  });
let upload = multer({ storage: storage });
upload.fields([{name:"image",maxCount:10},{name:"videos",maxCount:3}])