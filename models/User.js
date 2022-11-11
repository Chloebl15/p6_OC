const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator') //rajouter le validateur après l'avoir dl dans le terminal

const userSchema = mongoose.Schema({ //créer un schema 
    email: { type: String, required: true, unique: true },  //adresse mail de l'utilisateur // unique true = ne pas pouvoir utiliser 2x la même adresse mail
    password: { type: String, required: true} //mdp de l'utilisateur (#)
});
// installer un package pour bloquer les doubles inscriptions dans le terminal ; npm install --save mongoose-unique-validator

//appliquer le validateur au schema 
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema); //exporter le schema sous forme de model