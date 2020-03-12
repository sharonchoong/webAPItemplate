const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES; 
const connection = require('./connect');

function GetExecute(qry, response, params = [], isStoredProcedure = false) {
    return makeRequest(qry, response, params, isStoredProcedure);
}


function PostExecute(qry, response, params = [], isStoredProcedure = true) {
    return makeRequest(qry, response, params, isStoredProcedure, true);
}

function makeRequest(qry, response, params, isStoredProcedure, isPost = false) {
    const request = new Request(qry, function (err, rowCount) {
        if (err) {  
			console.log(err);
			let errResponse;
			if (err.code === "EPARAM")
				errResponse = { number: 400, message: err.message };
			else
				errResponse = { number: 500, message: (error_Codes[err.number] || "Internal Server Error") };
			return response(null, errResponse);
		}
		console.log(results.length + ' rows returned'); 
		return response(results); 
	});
	
	params.forEach(function (param) {
		request.addParameter(param.name, param.type, param.value);
	});
	
	let results = [];
	request.on("row", function (columns) {
		let row = {};
		columns.forEach(column => {
		  row[column.metadata.colName] = column.value;
		});
		results.push(row);
	});
	if (isStoredProcedure) {
		connection.callProcedure(request);
	} else {
		connection.execSql(request);
	}
}

module.exports = {
	get: GetExecute,
	post: PostExecute
};

error_Codes = {
	"-2": "Timeout expired",
	"547": "A database constraint linked to another model was infringed. Please make sure your references (e.g. ID numbers) to related models (e.g. categories) exist in the database",
	"201": "Required parameters are missing from the request",
	"2601": "Duplicates not allowed",
	"2627": "Issue with the identifier"
}