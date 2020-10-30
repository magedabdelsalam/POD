module.exports = function(sequelize, DataTypes) {
    var Pod = sequelize.define('Pod', {
        name: {
            type: DataTypes.STRING,
            isAlpha: true,
            unique: true
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        time: {
            type: DataTypes.STRING,
        },
        zip: {
            type: DataTypes.STRING,
            isNumeric: true
        },
        contact: {
            type:DataTypes.STRING,
            isNumeric: true
        },
        note: {
            type: DataTypes.STRING
        },
    });
    Pod.associate = function(models) {
        Pod.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        });
        Pod.belongsToMany(models.Kid,{ through: "Pod_Kid" });
    };
    return Pod;
};