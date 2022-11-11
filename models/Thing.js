const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true }, //required  = sans titre on pourra  pas enregistrer un thing dans la base 
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);