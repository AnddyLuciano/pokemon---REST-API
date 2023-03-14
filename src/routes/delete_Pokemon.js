const {Pokemon} = require('./../db/sequelize');
const auth = require('./../auth/auth');
module.exports = (app)=>{
    app.delete('/api/pokemons/:id',auth,(req,res)=>{
        Pokemon.findByPk(parseInt(req.params.id)).then(response=>{
            if(response===null){
                const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message});
            }
            const pokemonDeleted = response;
            return pokemonDeleted.destroy({where:{id:parseInt(req.params.id)}})
            .then(_=>{
                const message = `Le pokémon ${response.name} a été effacé`;
                res.json({message,response});
            });
        })
        .catch(error=>{
            console.log(`Erreur GET ( /api/pokemons ) : ${error}`);
            const message = `Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.`;
            res.status(500).json({message,data:error});
        });
    });
};