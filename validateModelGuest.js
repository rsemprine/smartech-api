module.exports = function(body) {
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

	if (body.hasOwnProperty('guestDocumentNumber')) {
		attributes.guestDocumentNumber = body.guestDocumentNumber;
	}

	if (body.hasOwnProperty('arrivalDate') || body.arrivalDate !== '') {
		attributes.arrivalDate = body.arrivalDate;
	}

	if (body.hasOwnProperty('dateArrivalForecast') || body.dateArrivalForecast !== '') {
		attributes.dateArrivalForecast = body.dateArrivalForecast;
	}

	if (body.hasOwnProperty('dateOfBirth') || body.dateOfBirth !== '') {
		attributes.dateOfBirth = body.dateOfBirth;
	}

	if (body.hasOwnProperty('dateScheduledDeparture') || body.dateScheduledDeparture !== '') {
		attributes.dateScheduledDeparture = body.dateScheduledDeparture;
	}

	if (body.hasOwnProperty('departureDate') || body.departureDate !== '') {
		attributes.departureDate = body.departureDate;
	}

	if (body.hasOwnProperty('mainGuest')) {
		attributes.mainGuest = body.mainGuest;
	}

	if (body.hasOwnProperty('nationality')) {
		attributes.nationality = body.nationality;
	}

	if (body.hasOwnProperty('profession')) {
		attributes.profession = body.profession;
	}

	if (body.hasOwnProperty('reservationNumber')) {
		attributes.reservationNumber = body.reservationNumber;
	}

	if (body.hasOwnProperty('sex')) {
		attributes.sex = body.sex;
	}

	if (body.hasOwnProperty('idReservations')) {
		attributes.idReservations = body.idReservations;
	}

	if (body.hasOwnProperty('codUH')) {
		attributes.codUH = body.codUH;
	}

	if (body.hasOwnProperty('reservationDate')) {
		attributes.reservationDate = body.reservationDate;
	}

	if (body.hasOwnProperty('branchID')) {
		attributes.branchID = body.branchID;
	}

	if (body.hasOwnProperty('companyID')) {
		attributes.companyID = body.companyID;
	}

	return attributes;
}