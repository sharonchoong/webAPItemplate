var Connection = require('tedious').Connection;
var config = {
    server: '[your server]',
    authentication: {
        type: 'default',
        options: {
            userName: '[the user]',
            password: '[the password]'
        }
    },
    options: {
        database: 'WebAPI',
		encrypt: false,
        //instanceName: 'Sqlexpress',
        rowCollectionOnDone: false,
        useColumnNames: false
    }
}
var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});

module.exports = connection;