
/*
 * Function that parse the CSV file into an array of array
 * the key being the coulmn name
 */


function parse_csv(path) {
    var columns = ["Last Name","First Name","Birth Date","School ID","Grade","Homeroom Teacher","Recent ASP Date (*)","Next Meeting Sch. (*)","Advanced Math (5-8) (*)","Speech and Language (*)","Student Development (*)","Math Enrichment (1-4) (*)","IU Reading Services (*)","IU Math Services (*)","Earobics (*)","Classroom Behavior (*)","Work Habits (*)","Faculty Student (*)","Youngest Child","Only Child","New Student (*)","Medical Concern (*)","HMP (*)","Last Name","DRA (*)","RAZ Kids ","WTW (*)","iStation (GE) (*)","Math Benchmark","Dibels","CogAT (SAS) Composite","IOWA (NPR)","ELA Total","Extended ELA","Math Total","DIAL 4 Score"];
    
    var csv = require("csv-to-array");
    var parsed_data;
    parsed_data = csv(
        {
            file: 'grade4.csv',
            columns: columns
       	},
    	function(err, data){
            if (data === undefined) {
                console.log('FAIL');
            } 
    		data.splice(0,1);
    		//console.log(err||array);
            //for (var i in array) {
            //    console.log(i);
            //}
    		return data;
    	}
    );
    return 'yay';
}

module.exports = parse_csv;

if (module === require.main){
    console.log(parse_csv('a'));
}
