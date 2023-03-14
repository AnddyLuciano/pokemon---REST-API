const pokemons = require('./mock-pokemon');

const {Sequelize,DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');

const Pokemon_Model = require('../models/pokemons_model');
const User_Model = require('./../models/users_model');

const sequelize = new Sequelize(
    'pokedex',
    'root',
    '',
    {
        host:'localhost',
        dialect:'mariadb',
        dialectOptions:{
            timezone:'Etc/GMT-2'
        },
        logging:false
    }
);

const Pokemon = Pokemon_Model(sequelize,DataTypes);
const User = User_Model(sequelize,DataTypes);

const initDb=()=>{
    try {
        return sequelize.sync({ force: true }).then(_=>{
            console.log("INIT DB...");
            pokemons.map(pokemon => {
                Pokemon.create({
                    num:parseInt(pokemon.num),
                    name: pokemon.name,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    img: pokemon.img,
                    spawn_chance: pokemon.spawn_chance,
                    type: pokemon.type
                });
            });
            bcrypt.hash('anddy',10).then(hash=>{
                User.create({
                    username:'anddy',
                    password:hash
                });
            });
            
            console.log('BD initialisée et syncrhonisée.');
        });
        
        
    } catch (error) {
        return console.log(`Synchronisation échouée: ${error}`);
    }
};
module.exports={initDb,Pokemon,User};