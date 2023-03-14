const {Pokemon} = require('../db/sequelize');
const {Op} = require('sequelize');
const auth = require('./../auth/auth');

module.exports = (app)=>{
    app.get('/api/pokemons',auth,(req,res)=>{
        if(req.query.name){ 
            const name = req.query.name;
            return Pokemon.findAndCountAll({where:{name:{[Op.like]:`%${name}%`}},order:['name']})
            .then(({count,rows})=>{
                const message = `${count} pokémon ayant '${name}' sur son nom à été trouvé.`;
                return res.json({message,data:rows});
            });
        }
        Pokemon.findAll({order:[['num','ASC']]})
        .then(response=>{
            const message = `La liste des ${response.length} pokémons`;
            res.json({message,data:response});
        })
        .catch(error=>{
            console.log(`Erreur GET ( /api/pokemons ) : ${error}`);
            const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
            res.status(500).json({message,data:error});
        });
    });
};