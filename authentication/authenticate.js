'use strict';
var passport = require("passport");
var BearerStrategy = require('passport-azure-ad').BearerStrategy;

/* Update these four variables with your values from the B2C portal */
var clientID = "[client Id]"; 
var b2cDomainHost = "[domain]";
var tenantIdGuid = "[tenant]";
var policyName = "[policy name]";

var options = {
    identityMetadata: "https://" + b2cDomainHost + "/" + tenantIdGuid + "/" + policyName + "/v2.0/.well-known/openid-configuration/",
    clientID: clientID,
    policyName: policyName,
    isB2C: true,
    validateIssuer: false,
    loggingLevel: 'info',
    loggingNoPII: false,
    passReqToCallback: false
};

var bearerStrategy = new BearerStrategy(options,
    function (token, done) {
        // Send user info using the second argument
        done(null, {}, token);
    }
);

module.exports = function(app) {
	app.use(passport.initialize());
	passport.use(bearerStrategy);

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
}

module.exports.validate_request = function(){
	passport.authenticate('oauth-bearer', {session: false}),
    function (req, res) {
        var claims = req.authInfo;
        console.log('User info: ', req.user);
        console.log('Validated claims: ', claims);
        
        if (claims['scp'].split(" ").indexOf("demo.read") !== -1) {
            // Service relies on the name claim.  
            res.status(200).json({'name': claims['name']});
        } else {
            console.log("Invalid Scope, 403");
            res.status(403).json({'error': 'insufficient_scope'}); 
        }
    }
}