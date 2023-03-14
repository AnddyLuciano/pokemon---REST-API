const { ValidationError,UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const{Pokemon} = require('../db/sequelize');

module.exports = (app)=>{
    app.post('/api/pokemons/',auth,(req,res)=>{
        Pokemon.create(req.body)
        .then((response)=>{
            const message = `${response.name} added successfully`;
            return res.json({message,response});
        })
        .catch(error=>{
            if(error instanceof ValidationError){
                return res.status(400).json({message:error.message,data:error});
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message:error.message,data:error});
            }
            console.log(`Erreur POST ( /api/pokemons ) : ${error}`);
            const message = `Le pokémon n'a pas pu être créé. Réessayez dans quelques instants.`;
            res.status(500).json({message,data:error});
        });
    });
};