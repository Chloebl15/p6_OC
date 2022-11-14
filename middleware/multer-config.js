//install terminal npm install --save multer

const multer = require('multer');

const MIME_TYPES = {  //générer extension au fichier
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { //fonciton qui va expliquer a multer dans quel fichier enregistrer les fichiers
    callback(null, 'images');  //appeler le callback en passant argument null pour dire qu'il n'y a pas d'erreur, ensuite le nom du dossier
  },
  filename: (req, file, callback) => { //2ème element, filename = qui va expliquer à multer quel nom du fichier utiliser  
    const name = file.originalname.split(' ').join('_'); //on génère le nouveau nom pour le fichier > on utiliser le nom d'origine du fichier (original name) 
    // on elimine les espaces possible avec split ' ' < autour des espaces, en appellant join et en rejoignant le tableau avec des _ à la place des ' ' (espaces)
    const extension = MIME_TYPES[file.mimetype];  //créer l'extension du fichier après avoir généré les mime types plus haut
    callback(null, name + Date.now() + '.' + extension); //créer le file name entier name au quel on va ajouter date.now (timestamp pour le rendre le plus unique possible) +  un point + extension du fichier
  }
});

module.exports = multer({storage: storage}).single('image'); //exporter le middleware multer