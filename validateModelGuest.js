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

	if (body.hasOwnProperty('DateScheduledDeparture') && body.dateScheduledDeparture.trim() !== '') {
		attributes.dateScheduledDeparture = body.DateScheduledDeparture;
	}

	if (body.hasOwnProperty('DepartureDate') && body.departureDate.trim() !== '') {
		attributes.departureDate = body.DepartureDate;
	}

	if (body.hasOwnProperty('mainGuest')) {
		attributes.mainGuest = body.mainGuest;
	}

	if (body.hasOwnProperty('Nationality')) {
		attributes.nationality = body.Nationality;
	}

	if (body.hasOwnProperty('Profession')) {
		attributes.profession = body.Profession;
	}

	if (body.hasOwnProperty('reservationNumber')) {
		attributes.reservationNumber = body.reservationNumber;
	}

	if (body.hasOwnProperty('Sex')) {
		attributes.sex = body.Sex;
	}

	if (body.hasOwnProperty('idReservations')) {
		attributes.idReservations = body.idReservations;
	}

	if (body.hasOwnProperty('codUH')) {
		attributes.codUH = body.codUH;
	}

	if (body.hasOwnProperty('ReservationDate')) {
		attributes.reservationDate = body.ReservationDate;
	}

	if (body.hasOwnProperty('BranchID')) {
		attributes.branchID = body.BranchID;
	}

	if (body.hasOwnProperty('CompanyID')) {
		attributes.companyID = body.CompanyID;
	}

	return attributes;
}