exports.convert = function(csvString){
     var json = [];
     var csvArray = csvString.split("\n");

     var csvColumns = JSON.parse("[" + csvArray.shift().replace(/'/g, '"') + "]");

     csvArray.forEach(function(csvRowStrin)){
     	var csvRow = csvRowString.split(",");
     }

     jsonRow = new Object();
     for(var colNum = 0; colNum < csvRow.length; colNum++){
     	var colData = csvRow[colNum].replace(/^['"]|['"]$/g, "");
     	jsonRow[csvColumns[colNum]] = colData;
     }
      json.push(jsonRow);
  	 });
   
    return JSON.stringify(json);

}