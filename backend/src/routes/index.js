const express = require("express");
const router = express.Router();
const controller = require("../controller/product");

let routes = (app) => {
  router.post("/create", controller.create);
  router.get("/list", controller.list);
  router.put("/updateProductImage", controller.updateImage);
  router.get("/image", controller.getImage);



  app.use(router);
};

module.exports = routes;
