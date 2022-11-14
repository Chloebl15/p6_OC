const Thing = require('../models/Thing');
const fs = require('fs');

exports.createThing = (req, res, next) => { //formulaire
  console.log(req.body)
  const thingObject = JSON.parse(req.body.thing); //parser l'objet avec json parse
  console.log(thingObject);
  delete thingObject._id; //supprimer dans l'objet deux champs (_id) et 
  delete thingObject._userId; //userid = personne qui a créé l'objet (nous allon utiliser le userid du token )
  const thing = new Thing({ //on créé l'objet 
      ...thingObject, //Avec ce qui a été passé moins les deux champs supprimés
      userId: req.auth.userId, //le user id extrait de l'objet requête grace au middleware
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //générer l'url par nous même avec le protocol, le nom d'hote, le nom du fichier tel qui nous est donné par multer
  });

  thing.save() //enregistrer l'objet dans la base de données
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};


  exports.modifyThing = (req, res, next) => {  //Pouvoir valider modification
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })// id = pour savoir quel objet on modifie (celui dont l'id = l'id qui est envoyé dans les param requete)
    // req body = le nouvel objet (nouvelle version de l'objet) + venir dire que l'id correspond à celui des paramètres    
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteThing = (req, res, next) => { //supprimer un thing
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  }

  exports.getAllStuff = (req, res, next) =>  { //uniquement pour intercepter les requete get  
    Thing.find() //on veut la liste complète donc on utilise find()
    .then(things => res.status(200).json(things)) //récupérer le tableau de tous les things
    .catch(error => res.status(400).json({ error }));
  }