
function csv_JSON(path) {

var Converter = require("csvtojson").Converter;

var fs = require("fs");

var csvFile='./grade4.csv';

var csvConverter = new Converter({});


csvConverter.on("end_parsed",function(jsonObj){
	//csvData = jsonObj;
	 
	//return jsonObj;
});
//return csvData;
return fs.createReadStream(csvFile).pipe(csvConverter);
}

module.exports = csv_JSON;

/*
if (module === require.main) {
	csv_JSON('');
}*/