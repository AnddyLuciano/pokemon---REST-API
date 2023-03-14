const validType = ['Grass','Poison','Fire','Flying','Water','Bug','Normal',
                    'Electric','Ground','Fighting','Psychic','Rock','Ghost','Ice','Dragon'];

module.exports = (sequelize,Datatypes)=>{       
    const Pokemon_Model = sequelize.define('Pokemon',{     //Juste le modèle
        id:{
            type:Datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        num:{
            type:Datatypes.INTEGER,
            allowNull:false,
            validate:{
                notNull:{msg:"Ce champ ne peut être null."}
            }
        },
        name:{
            type:Datatypes.STRING,
            allowNull:false,
            validate:{
                len:{args:[3,25],msg:'La longueur de ce champ doit être comprise entre 3 et 25'},
                notEmpty:{msg:'Ce champ ne peut pas être vide.'},
                notNull:{msg:"Ce champ ne peut être null."},
                isUnique(value,next){
                    Pokemon_Model.findAll({where:{name:value}})
                    .then(resp=>{
                        if(resp.length>0){
                            return next(new Error('Ce nom de pokémon est déjà pris. Essayez avec un autre nom'));
                        }
                        next();
                    })
                    .catch(err=>next(err));
                }
            }
        },
        height:{
            type:Datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{msg:'Ce champ ne peut pas être vide.'},
                notNull:{msg:"Ce champ ne peut être null."}
            }
        },
        weight:{
            type:Datatypes.STRING,
            allowNull:false    ,
            validate:{
                notEmpty:{msg:'Ce champ ne peut pas être vide.'},
                notNull:{msg:"Ce champ ne peut être null."}
            }
        },
        img:{
            type:Datatypes.STRING,
            allowNull:false,
            validate:{
                isUrl:{msg:'Verifiez votre url'},
                notNull:{msg:"Ce champ ne peut être null."}
            }
        },
        spawn_chance:{
            type:Datatypes.FLOAT,
            allowNull:false,
            validate:{
                isFloat:{msg:'Veuillez utiliser un nombre flottante valide.'},
                min:{args:[0],msg:'Ne peut être inférieur à 0'},
                notNull:{msg:'Ce champ ne peut être null.'}
            }
        },
        type:{
            type:Datatypes.STRING,
            allowNull:false,
            get(){
                return this.getDataValue('type').split(',');
            },
            set(type){
                this.setDataValue('type',type.join()); 
            },
            validate:{
                isTypeValide(value){
                    if(!value){
                        throw new Error('Le pokémon doit avoir au moin un type');
                    }
                    if(value.split(',').length>3){
                        throw new Error('Le pokémon ne peut pas avoir plus de 3 types');
                    }
                    value.split(',').forEach(type=>{
                        if(!validType.includes(type)){
                            throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante:${validType}`);
                        }
                    });
                }
            }
        }
    },  
    {
        timestamps:true,
        createdAt:'created',
        updatedAt:false
    });
    return Pokemon_Model;
};