'use strict';
const db = require("../../database/dbContext")
const TYPES = require('tedious').TYPES; 

/**
 * @swagger
 *
 * definitions:
 *   Category:
 *     allOf: 
 *       - type: object
 *         required:
 *           - categoryId
 *         properties:
 *           categoryId:
 *             type: integer
 *       - $ref: '#/definitions/NewCategory'
 *   NewCategory:
 *     type: object
 *     required:
 *       - categoryName
 *       - typeName
 *     properties:
 *       categoryName:
 *         type: string
 *       typeName:
 *         type: string
 *       subTypeName:
 *         type: string
 */

 
class Category {
	constructor(id) {
		if (id != null)
			this.categoryId = id;
	}
	
	get SQLdetails() {
		let sqlParams = [];
		if (this.categoryId != null) sqlParams.push({ name: 'id', type: TYPES.Int, value: this.categoryId });
		if (this.categoryName != null) sqlParams.push({ name: 'categoryName', type: TYPES.VarChar, value: this.categoryName });
		if (this.typeName != null) sqlParams.push({ name: 'typeName', type: TYPES.VarChar, value: this.typeName });
		if (this.subTypeName != null) sqlParams.push({ name: 'subTypeName', type: TYPES.VarChar, value: this.subTypeName });
		return sqlParams;
	}
	
	save (newData, response) {
		this.categoryName = newData.categoryName;
		this.typeName = newData.typeName;
		this.subTypeName = newData.subTypeName;
		return db.post("[createCategoryStoredProcedure]", response, this.SQLdetails);
	}
	
	remove (response) {
		return db.post("[deleteCategoryStoredProcedure]", response, this.SQLdetails);
	}
	
	findById(response) {
		db.get("SELECT id, categoryName, typeName, subTypeName FROM categories WHERE id = @id", response, this.SQLdetails);
	}
	
	static getAll (options, response) {
		return db.get("SELECT * FROM categories", response);
	}
}

module.exports = Category;