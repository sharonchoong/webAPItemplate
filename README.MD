# Web API Template
This is a web API template built on Express and Node.js for SQL Server or Azure SQL Database.  Swagger is used for documentation in JSDoc.

## Database structure
This template assumes the following MSSQL database design:
- Tables
	- "instruments" with columns "id" INT, "instrumentName" VARCHAR, "shortName" VARCHAR, "categoryId" INT, "description" VARCHAR
	- "categories" with columns "id" INT, "categoryName" VARCHAR, "typeName" VARCHAR, "subTypeName" VARCHAR
- Views
	- "instrumentDetails" with the following select statement:
	```sql
	SELECT instruments.id, instruments.instrumentName, instruments.shortName, 
		   instruments.categoryId, categories.categoryName, categories.typeName, categories.subTypeName, 
		   instruments.description
		   FROM instruments INNER JOIN categories ON categories.id = instruments.categoryId 
	```
- Stored Procedures
	- As specified in the models folder, all create, update and delete operations are saved in stored procedures
	- e.g. "createCategoryStoredProcedure", "deleteCategoryStoredProcedure", "" and "updateInstrumentStoredProcedure"

## Usage
Please update your database connection in database/connect.js.  Run `npm install` after navigating to the folder in the console to install all packages, then `npm run start` to test-run the API.  By default, it will run on port 3000.  Paste http://localhost:3000/docs to the browser to see the Swagger documentation.

Note: Azure SQL database authentication (at authentication/authenticate.js) has not been tested yet.
