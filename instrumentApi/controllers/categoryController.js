'use strict';
var Category = require("../models/categoryModel");

exports.list_all_categories = function(req, res) {
	Category.getAll({}, function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else
			res.json(response);
	});
};

exports.create_category = function(req, res) {
	const newCategory = new Category();
	newCategory.save(req.body, function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else {
			newCategory.id = response[0].id;
			res.json(newCategory);
		}
	});
};

exports.get_category = function(req, res) {
	const category = new Category(req.params.categoryId);
	category.findById(function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response.length == 0)
			res.status(404).send("Category not found");
		else
			res.json(response[0]);
	});
};

exports.delete_category = function(req, res) {
	const category = new Category(req.params.categoryId);
	category.remove(function(response, err) {
		if (err)
			res.status(err.number).send(err.message);
		else if (response[0].isDeleted == null)
			res.status(404).send("Category not found");
		else 
			res.send("Successfully deleted");
	});
};