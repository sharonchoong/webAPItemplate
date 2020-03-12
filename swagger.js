'use strict';
const pjson = require("./package.json"),
	router = require('express').Router(),
	swaggerUi = require('swagger-ui-express'),
	swaggerJSDoc = require('swagger-jsdoc');

const swagger_options = {
  definition: {
    info: {
      title: pjson.name, 
      version: pjson.version, 
	  description: pjson.description,
    },
	tags: [{
			name: "Instrument",
			description: "Instrument details"
		}, {
			name: "Category",
			description: "Instrument categories, types and sub types"
		}
	],
  },
  apis: [
		'./instrumentApi/models/*.js', 
		'./instrumentApi/routes/*.js'
		],
};
const swaggerSpec = swaggerJSDoc(swagger_options);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerSpec));

module.exports = router;