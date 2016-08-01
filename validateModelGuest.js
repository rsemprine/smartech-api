module.exports = function(body) {
	var attributes = {};

	if (body.hasOwnProperty('Name')) {
		attributes.name = body.Name;
	}

	if (body.hasOwnProperty('LastName')) {
		attributes.lastName = body.LastName;
	}

	if (body.hasOwnProperty('Email')) {
		attributes.email = body.Email;
	}

	if (body.hasOwnProperty('GuestDocumentNumber')) {
		attributes.guestDocumentNumber = body.GuestDocumentNumber;
	}

	if (body.hasOwnProperty('ArrivalDate') && body.ArrivalDate.trim() !== '') {
		attributes.arrivalDate = body.ArrivalDate;
	}

	if (body.hasOwnProperty('DateArrivalForecast') && body.DateArrivalForecast.trim() !== '') {
		attributes.dateArrivalForecast = body.DateArrivalForecast;
	}

	if (body.hasOwnProperty('DateOfBirth') && body.DateOfBirth.trim() !== '') {
		attributes.dateOfBirth = body.DateOfBirth;
	}

	if (body.hasOwnProperty('dateScheduledDeparture') && body.dateScheduledDeparture.trim() !== '') {
		attributes.dateScheduledDeparture = body.dateScheduledDeparture;
	}

	if (body.hasOwnProperty('departureDate') && body.departureDate.trim() !== '') {
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