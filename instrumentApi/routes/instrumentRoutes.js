'use strict';
var express = require("express");
var router = express.Router();

var instrument = require('../controllers/instrumentController');


router.route('/instruments')
/**
 * @swagger
 * /instruments:
 *   get:
 *     description: Lists all instruments (limit to 1,000 instruments)
 *     tags:
 *      - Instrument
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved 
 *         content: 
 *           application/json: 
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Instrument'
 */
	.get(instrument.list_all_instruments)
  /**
 * @swagger
 *
 * /instruments:
 *   post:
 *     description: Creates an instrument
 *     tags:
 *      - Instrument
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: instrument
 *         description: Instrument object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewInstrument'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Instrument'
 *       400:
 *         description: Error with parameters passed
 *       500:
 *         description: Server error or error validating database constraints.  Please see the response message for more information.
 */
    .post(instrument.create_instrument);

router.route('/instrument/:instrumentId')
/**
 * @swagger
 * /instrument/{instrumentId}:
 *   get:
 *     description: Get an instrument's details
 *     tags:
 *      - Instrument
 *     parameters:
 *      - name: instrumentId
 *        in: path
 *        schema: 
 *          type: integer
 *        required: true
 *        description: Numeric identifier of the instrument
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         schema:
 *           items:
 *             $ref: '#/definitions/InstrumentDetails'
 *       400:
 *         description: Error with parameters passed
 *       404:
 *         description: Instrument not found
 */
	.get(instrument.get_instrument)
/**
 * @swagger
 * /instrument/{instrumentId}:
 *   put:
 *     description: Update an instrument
 *     tags:
 *      - Instrument
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: instrument
 *         description: Instrument object
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Instrument'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Instrument'
 *       400:
 *         description: Error with parameters passed
 *       500:
 *         description: Server error or error validating database constraints.  Please see the response message for more information.
 */
	.put(instrument.update_instrument)
/**
 * @swagger
 * /instrument/{instrumentId}:
 *   delete:
 *     description: Delete an instrument
 *     tags:
 *      - Instrument
 *     parameters:
 *      - name: instrumentId
 *        in: path
 *        schema: 
 *          properties:
 *            instrumentId:
 *              type: integer
 *        required: true
 *        description: Numeric identifier of the instrument
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully deleted
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Instrument'
 *       400:
 *         description: Error with parameters passed
 *       404:
 *         description: Instrument not found
 */
	.delete(instrument.delete_instrument);
	
router.route('/instrument/search/:nameSearch')
/**
 * @swagger
 * /instrument/search/{nameSearch}:
 *   get:
 *     description: Find an instrument by searching its name
 *     tags:
 *      - Instrument
 *     parameters:
 *      - name: nameSearch
 *        in: path
 *        schema: 
 *          type: string
 *        required: true
 *        description: Instrument name search
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved
 *         schema:
 *           items:
 *             $ref: '#/definitions/InstrumentDetails'
 *       400:
 *         description: Error with parameters passed
 *       404:
 *         description: Instrument not found
 */
	.get(instrument.get_instrument)
	
module.exports = router;