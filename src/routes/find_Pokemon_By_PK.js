const auth = require('../auth/auth');
const{Pokemon} = require('../db/sequelize');

module.exports = (app)=>{
    app.get('/api/pokemons/:id',auth,(req,res)=>{
        Pokemon.findByPk(parseInt(req.params.id))
        .then(response=>{
            if(response===null){
                const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`;
                return res.status(404).json({message});
            }
            const message = `${response.name} trouvé`;
            res.json({message,response});
        })
        .catch(error=>{
            console.log(`Error GET ( /api/pokemons ) : ${error}`);
            const message = `Le pokémon n'a pas pu être récupérée. Réessayez dans quelques instants.`;
            res.status(500).json({message,data:error});
        });
    });
};