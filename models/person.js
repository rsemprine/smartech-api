module.exports = function(sequelize, DataTypes){
	return sequelize.define('person', { 
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				isEmail: true
			}*/
		},		
		sex: {
			type: DataTypes.STRING
		},
		country: {
			type: DataTypes.STRING
		},
		neighborhood: {
			type: DataTypes.STRING
		},
		state: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
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