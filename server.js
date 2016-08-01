var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var validateGuest = require('./validateModelGuest.js');
var validatePerson = require('./validateModelPerson.js');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Smartech API root');
});

//--------------------------USER--------------------------------
//GET /users
//GET /users?email=email
app.get('/users', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('email') && query.email.length > 0) {
		where.email = {
			$like: '%' + query.email + '%'
		};
	}

	db.todo.findAll({
		where: where
	}).then(function(users) {
		res.json(users);
	}, function(e) {
		res.status(500).json(e);
	});
});

//GET /users/:id
app.get('/users/:id', function(req, res) {
	var userId = parseInt(req.params.id, 10);
	db.user.findById(userId).then(function(user) {
		if (!!user) {
			res.json(user.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).json(e);
	});
});

//POST /users
app.post('/users', function(req, res) {
	//Faz com que o objeto só tenha os campos que desejamos
	var body = _.pick(req.body, 'email', 'password');

	db.user.create(body).then(function(user) {
		res.json(user.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

//DELETE /users/:id
app.delete('/users/:id', function(req, res) {
	var userId = parseInt(req.params.id, 10);

	db.user.destroy({
		where: {
			id: userId
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted > 0) {
			res.status(204).json('Rows deleted: ' + rowsDeleted);
		} else {
			res.status(404).json({
				error: 'No user with id'
			});
		}
	}, function(e) {
		res.status(500).json(e);
	});
});

// PUT /users/:id
app.put('/users/:id', function(req, res) {
	var userId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'email', 'password');
	var attributes = {};

	if (body.hasOwnProperty('email')) {
		attributes.email = body.email;
	}

	if (body.hasOwnProperty('password')) {
		attributes.password = body.password;
	}

	db.user.findById(userId).then(function(user) {
		if (user) {
			user.update(attributes).then(function(user) {
				res.json(user.toJSON());
			}, function(e) {
				res.send(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).json(e);
	});
});

//END----------------------USER--------------------------------

//--------------------------GUEST--------------------------------
//GET /guests
//GET /guests?email=email
//GET /guests?guestDocumentNumber=guestDocumentNumber
//GET /guests?token=token
app.get('/guests', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('email') && query.email.length > 0) {
		where.email = {
			$like: '%' + query.email + '%'
		};
	}

	if (query.hasOwnProperty('guestDocumentNumber') && query.guestDocumentNumber.length > 0) {
		where.guestDocumentNumber = {
			$like: '%' + query.guestDocumentNumber + '%'
		};
	}

	if (query.hasOwnProperty('token') && query.token.length > 0) {
		where.token = {
			$like: '%' + query.token + '%'
		};
	}

	db.guest.findAll({
		where: where
	}).then(function(guests) {
		res.json(guests);
	}, function(e) {
		res.status(500).json(e);
	});
});

//GET /guests/:id
app.get('/guests/:id', function(req, res) {
	var guestId = parseInt(req.params.id, 10);
	db.guest.findById(guestId).then(function(guest) {
		if (!!guest) {
			res.json(guest.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).json(e);
	});
});

//POST /guests
app.post('/guests', function(req, res) {
	var item;
	//Faz com que o objeto só tenha os campos que desejamos
	for (var key in req.body) {
		item = req.body[key]

		var body = _.pick(item, 'Name', 'LastName', 'Email', 'GuestDocumentNumber',
			'ArrivalDate', 'DateArrivalForecast', 'DateOfBirth', 'DateScheduledDeparture',
			'DepartureDate', 'MainGuest', 'Nationality', 'Profession', 'ReservationNumber',
			'Sex', 'IdReservations', 'CodUH', 'ReservationDate', 'BranchID', 'CompanyID');
		var attributes = {};
		console.log(body);
		attributes = validateGuest(body);
		console.log(attributes);
		db.guest.create(attributes).then(function(guest) {
			res.json(guest.toJSON());
		}, function(e) {
			res.status(400).json(e);
		});
	}
});

//DELETE /guests/:id
app.delete('/guests/:id', function(req, res) {
	var guestId = parseInt(req.params.id, 10);

	db.guest.destroy({
		where: {
			id: guestId
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted > 0) {
			res.status(204).json('Rows deleted: ' + rowsDeleted);
		} else {
			res.status(404).json({
				error: 'No guest with id'
			});
		}
	}, function(e) {
		res.status(500).json(e);
	});
});

// PUT /guests/:id
app.put('/guests/:id', function(req, res) {
	var guestId = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'Name', 'LastName', 'Email', 'GuestDocumentNumber',
		'arrivalDate', 'dateArrivalForecast', 'dateOfBirth', 'dateScheduledDeparture',
		'departureDate', 'mainGuest', 'nationality', 'Profession', 'reservationNumber',
		'sex', 'idReservations', 'codUH', 'reservationDate', 'branchID', 'companyID');
	var attributes = {};

	attributes = validateGuest(body);

	db.guest.findOne({
		where: {
			id: guestId
		}
	}).then(function(guest) {
		if (guest) {
			guest.update(attributes).then(function(guest) {
				res.json(guest.toJSON());
			}, function(e) {
				res.sendStatus(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});
});
//END-----------------------GUEST--------------------------------

//------------------------PERSON---------------------------------
app.post('/people', function(req, res) {
	var item;
	var resultado = true;
	var msgError;
	var counter = 0;

	//Faz com que o objeto só tenha os campos que desejamos
	for (var key in req.body) {
		item = req.body[key];

		var body = _.pick(item, 'name', 'email', 'sex', 'country', 'neighborhood', 'state', 'city');
		var attributes = {};
		
		attributes = validatePerson(body);
		
		counter = counter + 1;

		db.person.create(attributes).then(function(person) {
			this.resultado = true;
			console.log(person);
		}, function(e) {
			this.resultado = false;
			msgError = e;
		});
		
	};

	if (resultado) {
		res.json("Sucess: " + counter + " people included!");
	} else {
		res.status(400).json(msgError);
	}
});

//GET /people
//GET /people?email=email
app.get('/people', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('email') && query.email.length > 0) {
		where.email = {
			$like: '%' + query.email + '%'
		};
	}

	db.person.findAll({
		where: where
	}).then(function(people) {
		res.json(people);
	}, function(e) {
		res.status(500).json(e);
	});
});
//END---------------------PERSON---------------------------------


db.sequelize.sync(
	//{force: true}
).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});