module.exports = function(sequelize, DataTypes) {
    var Kid = sequelize.define('Kid', {
        first: {
            type: DataTypes.STRING,
            isAlpha: true
        },
        last: {
            type: DataTypes.STRING,
            isAlpha: true
        },
        grade:{
            type: DataTypes.STRING,
            isAlpha: true,
            isIn: [['Pre Kindergarten','Kindergarten','Grade 1', 'Grade 2', 'Grade 3']],
        }
    });
    Kid.associate = function(models) {
        Kid.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            }
        });
        Kid.belongsToMany(models.Pod, { through: "Pod_Kid" });
    };
    return Kid;
};