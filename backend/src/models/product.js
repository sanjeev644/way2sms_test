const mongoose = require('mongoose');
const schema = mongoose.Schema;
const productsSchema = new schema({
    name:{type:String},
    image:{type:String}
});
module.exports = mongoose.model('products', productsSchema, 'products');
