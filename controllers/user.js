const bcrypt = require('bcrypt');
//package cryptage via terminal = npm install --save bcrypt + importer avec une const

const jwt = require('jsonwebtoken');

const User = require('../models/User'); //modèle user




exports.signup = (req, res, next) => {//hasher le mdp avec une fonction async
    bcrypt.hash(req.body.password, 10)  //hasher mdp + passer le mdp dans le corp de la requete avec req body , le 10 c'est pour faire 10 tours dans l'algorythme
      .then(hash => {  //recupérer le hash de mdp 
        const user = new User({ // créer utilisateur avec le modèle mongoose
          email: req.body.email,
          password: hash    //enregistrer le hash créé plus haut
        });
        user.save() //enregistrer l'user créé dans la base de données
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => { //fonciton login qui permet de verifier si un utilisateur existe dans la bdd et si le mdp correspond à l'utilisateur
    User.findOne({ email: req.body.email }) // objet qui sert de filtre avec le champ e mail + la valeur transmire (req body email)
        .then(user => {  //récupéré la valeur trouvée par la requête
            if (!user) { //vérifier si elle est null (if 'user === null ou !user)
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }

            //else 

            bcrypt.compare(req.body.password, user.password) //comparer le mdp avec compare avec ce qu'on a reçu de client + la bdd
                .then(valid => {
                    if (!valid) { //si il y a une valeur = est enregistré = comparer mdp avec la bdd
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    //else 

                    res.status(200).json({ //si le mdp est correct on retourne un code 200
                        userId: user._id, //avec un objet qui va contenir les info necessaire a l'authentification des requêtes
                        token: jwt.sign(  // ainsi qu'un token 
                        { userId: user._id },
                        'RANDON_TOKEN_SECRET',
                        { expiresIn: '24h' }
                        ) 
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 //pour le token on install un package
 // npm install --save jsonwebtoken