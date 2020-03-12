'use strict';
var Instrument = require("../models/instrumentModel");

exports.list_all_instruments = function(req, res) {
	//only the top 1000 will be shown
	Instrument.getAll({}, function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else
			res.json(response);
	});
};

exports.create_instrument = function(req, res) {
	const newInstrument = new Instrument();
	newInstrument.save(req.body, function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else {
			newInstrument.id = response[0].id;
			newInstrument.instrumentName = response[0].instrumentName;
			newInstrument.shortName = response[0].shortName;
			res.json(newInstrument);
		}
	});
};

exports.get_instrument = function(req, res) {
	if (req.params.instrumentId != null)
	{
		const instrument = new Instrument(req.params.instrumentId);
		instrument.findById(function (response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response.length == 0)
			res.status(404).send("Instrument not found");
		else
			res.json(response[0]);
	});
	} else if (req.params.nameSearch != null)
	{
		const instrument = new Instrument();
		instrument.instrumentName = req.params.nameSearch;
		console.log(req.params)
		instrument.findByName(function (response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response.length == 0)
			res.status(404).send("No instrument matched this query");
		else
			res.json(response);
	});
	}
	
};

exports.update_instrument = function(req, res) {
	const instrument = new Instrument();
	instrument.update(req.body, function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response.length == 0)
			res.status(404).send("Instrument not found");
		else 
			res.send(response[0]);
	});
};

exports.delete_instrument = function(req, res) {
	const instrument = new Instrument(req.params.instrumentId);
	instrument.remove(function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response[0].isDeleted == null)
			res.status(404).send("Instrument not found");
		else 
			res.send("Successfully deleted");
	});
};