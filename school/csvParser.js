
/*
 * Function that parse the CSV file into an array of array
 * the key being the coulmn name
 */


var columns = ["Last Name","First Name","Birth Date","School ID","Grade","Homeroom Teacher","Recent ASP Date (*)","Next Meeting Sch. (*)","Advanced Math (5-8) (*)","Speech and Language (*)","Student Development (*)","Math Enrichment (1-4) (*)","IU Reading Services (*)","IU Math Services (*)","Earobics (*)","Classroom Behavior (*)","Work Habits (*)","Faculty Student (*)","Youngest Child","Only Child","New Student (*)","Medical Concern (*)","HMP (*)","Last Name","DRA (*)","RAZ Kids ","WTW (*)","iStation (GE) (*)","Math Benchmark","Dibels","CogAT (SAS) Composite","IOWA (NPR)","ELA Total","Extended ELA","Math Total","DIAL 4 Score"];

var path = "grade4.csv"

var csv = require("csv-to-array");
csv({
	file: path,
	columns: columns
   	},
	(function(err,array){
		array.splice(0,1);
		console.log(err||array);
		return array;
	} ));


