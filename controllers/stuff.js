const Thing = require('../models/Thing');

exports.createThing = (req, res, next) => { //formulaire
    console.log(req.body)
    delete req.body._id; //id va être généré automatiquement par mongo db donc on le retire
    const thing = new Thing ({
      ...req.body //raccourci pour recupérer tout dans thing (title,...)
    }); 
    console.log(thing);
    thing.save() //enregistrer l'objet dans la base 
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

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

  exports.getAllThings = (req, res, next) =>  { //uniquement pour intercepter les requete get  
    Thing.find() //on veut la liste complète donc on utilise find()
    .then(things => res.status(200).json(things)) //récupérer le tableau de tous les things
    .catch(error => res.status(400).json({ error }));
  }