var csvjson= require('./csvtoJSON');

var json = csvjson('');

if (module === require.main) {
	console.log(json);
}