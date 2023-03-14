const { ValidationError, UniqueConstraintError } = require('sequelize');
const auth = require('../auth/auth');
const {Pokemon} = require('./../db/sequelize');

module.exports = (app)=>{
    app.put('/api/pokemons/:id',auth,(req,res)=>{
        const id = req.params.id;
        Pokemon.update(req.body,{where : {id:id}})
        .then(_=>{
            return Pokemon.findByPk(id)
            .then(response=>{
                if(response===null){
                    const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`;
                    return res.status(404).json({message});
                }
                const message = `Le pokémon ${response.name} a été modifié`;
                res.json({message,response});
            });
        })
        .catch((error)=>{
            if(error instanceof ValidationError){
                console.debug(error.fields);
                return res.status(400).json({message:error.message,data:error});
            }
            if(error instanceof UniqueConstraintError){
                return res.status(400).json({message:error.message,data:error});
            }
            console.log(`Erreur UPDATE ( /api/pokemons ) : ${error}`);
            const message = `Le pokémon n'a pas pu être modifié. Réessayez dans quelques instants.`;
            res.status(500).json({message,data:error});
        });
    });
};