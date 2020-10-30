const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		first:{
			type: DataTypes.STRING,
			isAlpha: true,
			allowNull:false
		},
		last:{
			type: DataTypes.STRING,
            isAlpha: true,
			allowNull:false
		},
		email: {
			type: DataTypes.STRING,
			isEmail: true,
			unique:true
		},
		password: {
			type: DataTypes.STRING,
			is: /^[a-z]+$/i
		},
		role: {
			type: DataTypes.STRING,
			allowNull:false,
			isIn: [['Parent', 'Teacher']],
		},
		school:{
			type: DataTypes.STRING,
		}
	});
	User.associate = function(models) {
		User.hasMany(models.Pod,{
			onDelete:"cascade"
		});
		User.hasMany(models.Kid,{
			onDelete:"cascade"
		});
	};
	User.beforeCreate(function(user){
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10),null);
	})
	return User;
};