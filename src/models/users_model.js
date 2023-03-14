module.exports=(sequelize,Datatypes)=>{
    const User_model = sequelize.define('User',{
        id:{
            type:Datatypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username:{
            type:Datatypes.STRING,
            allowNull:false,
            unique:{
                msg:`Le nom que vous avez saisi est déjà pris. Essayez avec un autre nom.`
            }
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false
        }
    });
    return User_model;
};