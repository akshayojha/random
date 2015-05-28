/*
  matching.js
  A matching algorithm implementation
  in which each candidate has list of preference of
  companies and each company has list of preference of
  candidates
*/
// Applicant or Company class using function
function AorC(name) {
    // Set to zero where first index denotes most preferable
    var index=0;
    this.name =name;
    this.hired =null;
    this.prefs =[];
    //Function returns weight of preference
    this.weight= function(pref) {
	for(var i=0; i<this.prefs.length; i++){
	    if(this.prefs[i]===pref){
		//Less index means highly preferred so it's negative
		//will be more than high index
		return -1*index;
	    }
	}
    }
    //Checks whether given pref is better than already alloted
    this.better= function(pref) {
	return this.weight(pref)> this.weight(this.hired);
    }
    //Returns next preference if desired is not available
    this.nextpref= function() {
	if(index >= this.prefs.length) return null;
	return this.prefs[index++];
    }
    //Hires given applicant to company or vice versa
    this.hire= function(pref) {
	if(pref.hired) pref.hired.hired=null;
	pref.hired= this;
	if(this.hired) this.hired.hired=null;
	this.hired= pref;
    }
}
//Checks whether all applicants have been hired
function allHired(applicants, companies) {
    for(var i=0; i< applicants.length; i++){
	for(var j=0; j< companies.length; j++){
	    if(applicants[i].better(companies[j]) && companies[j].better(applicants[i]))
		return false;
	}
    }
    return true;
}
//Function to hire all applicants if possible
function hireAll(applicants,companies) {
    //Begin matching algorithm
    var stable=false;
    do{
	stable=true;
	for(var i=0;i<applicants.length; i++){
	    var candidate=applicants[i];
	    stable=true;
	    if(!(candidate.hired)){
		stable=false;
		var comp=candidate.nextpref();
		if((!comp.hired) || comp.better(candidate))
		    candidate.hire(comp);
	    }
	}
    } while(!stable); //Do till each applicant is hired by a company
    if(allHired(applicants, companies)) {
	console.log('All candidates have been hired');
    }
    else {
	console.log('Cannot hire all');
    }   
    for(var i=0; i< applicants.length; i++){
	    console.log(applicants[i].name,"is hired by",applicants[i].hired.name);
    }
}
//Company objects
var c1=new AorC("Amazon");
var c2=new AorC("Google");
//Applicant objects
var a1=new AorC("Akshay");
var a2=new AorC("Ojha");
//Preferences
c1.prefs=[a1, a2];
c2.prefs=[a2, a1];
a1.prefs=[c1, c2];
a2.prefs=[c2, c1];
var applicants=[a1,a2];
var companies=[c1,c2];
//Hire all applicants to their preference
hireAll(applicants, companies);
