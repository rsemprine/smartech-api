module.exports = function(sequelize, DataTypes){
	return sequelize.define('guest', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		document: {
			type: DataTypes.STRING,
			allowNull: false	
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		}		
	},
	{
		hooks: {
			beforeValidate: function(user, option) {
				if (typeof user.email === 'string') {
					user.email = user.email.toLowerCase();
				}					
			}
		}
	});
}