var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

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
//GET /guests?doc=doc
app.get('/guests', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('email') && query.email.length > 0) {
		where.email = {
			$like: '%' + query.email + '%'
		};
	}

	if (query.hasOwnProperty('doc') && query.doc.length > 0) {
		where.document = {
			$like: '%' + query.doc + '%'
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

//POST /users
app.post('/guests', function(req, res) {
	//Faz com que o objeto só tenha os campos que desejamos
	var body = _.pick(req.body, 'name', 'lastName', 'email', 'guestDocumentNumber');

	db.guest.create(body).then(function(guest) {
		res.json(guest.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

//DELETE /users/:id
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
	var body = _.pick(req.body, 'name', 'lastName', 'email', 'document');
	var attributes = {};

	if (body.hasOwnProperty('name')) {
		attributes.name = body.name;
	}

    if (body.hasOwnProperty('lastName')) {
		attributes.lastName = body.lastName;
	}

	if (body.hasOwnProperty('email')) {
		attributes.email = body.email;
	}

	if (body.hasOwnProperty('document')) {
		attributes.document = body.document;
	}

	db.guest.findById(guestId).then(function(guest) {
		if (guest) {
			guest.update(attributes).then(function(guest) {
				res.json(guest.toJSON());
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
//END-----------------------USER--------------------------------

db.sequelize.sync(
	{force: true}
	).then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT);
	});
});