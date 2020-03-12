'use strict';
const db = require("../../database/dbContext")
const TYPES = require('tedious').TYPES; 

/**
 * @swagger
 *
 * definitions:
 *   Instrument:
 *     allOf: 
 *       - type: object
 *         required:
 *           - instrumentId
 *         properties:
 *           instrumentId:
 *             type: integer
 *       - $ref: '#/definitions/NewInstrument'
 *   InstrumentDetails:
 *     allOf: 
 *       - $ref: '#/definitions/Instrument'
 *       - $ref: '#/definitions/NewInstrument'
 *       - type: object
 *         required:
 *           - instrumentId
 *         properties:
 *           categoryName:
 *             type: string
 *           typeName:
 *             type: string
 *           subTypeName:
 *             type: string
 *   NewInstrument:
 *     type: object
 *     required:
 *       - instrumentName
 *       - shortName
 *       - categoryId
 *       - investmentRegionId
 *     properties:
 *       instrumentName:
 *         type: string
 *       shortName:
 *         type: string
 *       categoryId:
 *         type: integer
 *       description:
 *         type: string
 */

class Instrument {
	constructor(id) {
		if (id != null)
			this.instrumentId = id;
	}
	
	get SQLdetails() {
		let sqlParams = [];
		if (this.instrumentId != null) sqlParams.push({ name: 'id', type: TYPES.Int, value: this.instrumentId });
		if (this.instrumentName != null) sqlParams.push({ name: 'instrumentName', type: TYPES.VarChar, value: this.instrumentName });
		if (this.shortName != null) sqlParams.push({ name: 'shortName', type: TYPES.VarChar, value: this.shortName });
		if (this.categoryId != null) sqlParams.push({ name: 'categoryId', type: TYPES.Int, value: this.categoryId });
		if (this.description != null) sqlParams.push({ name: 'description', type: TYPES.VarChar, value: this.description });
		return sqlParams;
	}
	
	save (newData, response) {
		this.instrumentName = newData.instrumentName;
		this.shortName = newData.shortName;
		this.categoryId = newData.categoryId;
		this.description = newData.description;
		return db.post("[createInstrumentStoredProcedure]", response, this.SQLdetails);
	}
	
	update (data, response) {
		this.instrumentId = data.instrumentId;
		this.instrumentName = data.instrumentName;
		this.shortName = data.shortName;
		this.categoryId = data.categoryId;
		this.description = data.description;
		console.log(this);
		return db.post("[updateInstrumentStoredProcedure]", response, this.SQLdetails);
	}
	
	remove (response) {
		return db.post("[deleteInstrumentStoredProcedure]", response, this.SQLdetails);
	}
	
	findById(response) {
		db.get("SELECT * FROM instrumentDetails WHERE id = @id", response, this.SQLdetails);
	}
	
	findByName(response) {
		this.instrumentName = "%" + this.instrumentName.replace(/\s/g, "%") + "%";
		db.get("SELECT * FROM instrumentDetails WHERE instrumentName LIKE @instrumentName OR shortName LIKE @instrumentName", response, this.SQLdetails);
	}
	
	static getAll (options, response) {
		let query = "SELECT TOP 1000 * FROM instruments";
	
		//where clauses
		let query_where_clause = [];
		if (options.categories_in != null)
			query_where_clause.push("categoryId IN (" + options.categories_in.join(",") +  ")");
		if (options.categories_out != null)
			query_where_clause.push("categoryId NOT IN (" + options.categories_out.join(",") +  ")");
		if (options.description != null)
			query_where_clause.push("description LIKE '%" + options.description.replace(/\s/g, "%") +  "%'");
		
		if (Object.keys(options).length !== 0)
			query += " WHERE " + query_where_clause.join(" AND ");
		return db.get(query, response);
	}
}

module.exports = Instrument;