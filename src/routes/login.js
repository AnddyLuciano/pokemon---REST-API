const {User} = require('./../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require("./../auth/private_key");

module.exports = (app)=>{
    app.post('/api/login',(req,res)=>{
        User.findOne({where:{username:req.body.username}})
        .then(resp=>{
            if(!resp){
                const message = `Unrecognized username !`;
                return res.status(404).json({message});
            }
            return bcrypt.compare(req.body.password,resp.password).then(isEqual=>{
                if(!isEqual){
                    const message = `WARNING! Invalid password`;
                    return res.status(401).json({message});
                }
                const token = jwt.sign({userId:resp.id},privateKey,{expiresIn:'24h'});
                const message = `Bienvenue ${req.body.username}`;
                res.json({message,data:resp,token});
            });
        })
        .catch(error=>{
            const message = `Erreur lors de l'identification. Veuillez réessayer plus tard.`;
            return res.status(500).json({message,data:error});
        });
    });
};