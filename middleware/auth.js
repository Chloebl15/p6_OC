const jwt = require('jsonwebtoken'); //importer jsonwebtoken
 
module.exports = (req, res, next) => { //fonction qui sera notre middleware
   try {
       const token = req.headers.authorization.split(' ')[1]; //recupérer token et diviser avec split en un tableau autour de l'espace qui se trouve entre le mot clé bearer ' ' et du token [1]
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décoder le token avec verify , passer le token récupérer ainsi que la clé secrète
       const userId = decodedToken.userId; //récuperer userID , on décode dans le token
       req.auth = { // on rajoute la valeur à l'objet request
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};