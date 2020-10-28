module.exports = function(sequelize, DataTypes) {
    var Kid = sequelize.define('Kid', {
        first: {
            type:DataTypes.STRING,
            isAlpha: true
        },
        last: {
            type:DataTypes.STRING,
            isAlpha: true
        }
    });
    Kid.associate = function(models) {
        Kid.belongsToMany(models.Pod, { through: "Pod_Kid" });
    };
    return Kid;
};