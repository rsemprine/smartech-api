var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development'; //arquivo de configuração do node
var sequelize;

//Validamos se estamos em produção no Heroku com o postgres ou local com sqlite
if (env === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres'
	});
} else {
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/data/smartech-api.sqlite'
	})
};

var db = {};

db.guest = sequelize.import(__dirname + '/models/guest.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.person = sequelize.import(__dirname + '/models/person.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;