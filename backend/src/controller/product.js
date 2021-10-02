const uploadFile = require("../middleware/upload");
const fs = require("fs");
const productModel = require('../models/product')

const create = async (req, res) => {
  try {
   const data =  await uploadFile(req, res);

    req.body['image'] =  req.file.originalname
   const createProduct = new productModel(req.body);
     
   const saveProduct = createProduct.save()
   
    res.status(200).send({
      statusCode : 200,
      data:saveProduct,
      message: "Product Created  successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      statusCode : 500,
      message:err,
    });
  }
};

const list = async (req, res) => {
  try {
    res.status(200).send({
      statusCode : 200,
      data: await productModel.find(),
      message: "Request successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      statusCode : 500,
      message:err,
    });
  }
};

const updateImage = async (req, res) => {
  try {
     await uploadFile(req, res);
  
    const updateImage = await productModel.updateOne({_id:req.body.productId},{image:req.file.originalname})
    console.log({updateImage});
     if(updateImage){
      res.status(200).send({
        statusCode : 200,
        data:{},
        message: "Image Updated  successfully",
      });
     }else{
      res.status(400).send({
        statusCode : 400,
        data:{},
        message: "Failed to update",
      });
     }
   
  } catch (err) {
    console.log(err);
    res.status(500).send({
      statusCode : 500,
      message:err,
    });
  }
};

const getImage = async (req,res)=>{
    try {
      const filepath = __basedir + "/uploads/" + req.query.name
      res.sendFile(filepath);
    } catch (error) {
      res.status(500).send({
        statusCode : 500,
        message:err,
      });
    }
}
module.exports = {
  create,
  list,
  updateImage,
  getImage
};
