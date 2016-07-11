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
		guestDocumentNumber: {
			type: DataTypes.STRING,
			allowNull: false	
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		arrivalDate: {
			type: DataTypes.DATE
		},
		dateArrivalForecast: {
			type: DataTypes.DATE
		},
		dateOfBirth: {
			type: DataTypes.DATE
		},
		dateScheduledDeparture: {
			type: DataTypes.DATE
		},
		departureDate: {
			type: DataTypes.DATE
		},
		mainGuest: {
			type: DataTypes.STRING
		},
		nationality: {
			type: DataTypes.STRING
		},
		profession: {
			type: DataTypes.STRING
		},
		reservationNumber: {
			type: DataTypes.INTEGER
		},
		sex: {
			type: DataTypes.STRING
		},
		idReservations: {
			type: DataTypes.INTEGER
		},
		codUH: {
			type: DataTypes.STRING
		},
		reservationDate: {
			type: DataTypes.DATE
		},
		branchID: {
			type: DataTypes.INTEGER
		},
		companyID: {
			type: DataTypes.INTEGER
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