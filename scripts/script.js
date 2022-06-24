
 
// Brett Svendsen, UMass Lowell Computer Science
// brett_svendsen@student.uml.edu


"use strict";

// This is required to update the min/max
// rules for the table input
$('#tableCreationForm').focusout(function(){
	$('#tsX').rules('add', {
		max: parseInt( $('#teX').val() )-1
	});

	$('#teX').rules('add', {
		min: parseInt( $('#tsX').val() )+1
	});

	$('#tsY').rules('add', {
		max: parseInt( $('#teY').val() )-1
	});

	$('#teY').rules('add', {
		min: parseInt( $('#tsY').val() )+1
	});
});

$( document ).ready(function(){
	// -- Validation plugin Start --
	$.validator.setDefaults({
		submitHandler: function(){ genTable(); }
	});

	$( "#tableCreationForm" ).validate({
		rules: {
			tsX: {digits: true, max: parseInt( $('#teX').val() )-1},
			teX: {digits: true, min: parseInt( $('#tsX').val() )+1},
			tsY: {digits: true, max: parseInt( $('#teY').val() )-1},
			teY: {digits: true, min: parseInt( $('#tsY').val() )+1}
		}
	});


})

function isNum(_string){ return /^-?\d+$/.test(_string); }
function mathRange(_num1, _num2){ return Math.abs(_num1 - _num2); }

function TableObject(_startX, _endX, _startY, _endY, 
			_offsetX=0, _offsetY=0, _stepX=1, _stepY=1){

	this.startX = _startX;
	this.endX = _endX;
	this.startY = _startY;
	this.endY = _endY;

	// These members do nothing yet
	this.offsetX = _offsetX;
	this.offsetY = _offsetY;
	this.stepX = _stepX;
	this.stepY = _stepY;
}

function makeHTMLTable(_tObj){

	if(_tObj.constructor.name != 'TableObject'){
		console.log("ERROR: Attempted to pass an object of type: " 
			+ _tObj.constructor.name);
		return -1337;
	}

	console.log("SUCCESS: Got table");
	console.log("TABLE X: " + _tObj.startX + " to " + _tObj.endX);
	console.log("TABLE Y: " + _tObj.startY + " to " + _tObj.endY);

	let table = document.createElement('table');

	// make first row
	let row1 = document.createElement('tr');
	let deadCell = document.createElement('td');
	deadCell.classList.add('deadcell');

	row1.appendChild(deadCell);

	for(let i = _tObj.startX; i <= _tObj.endX; i++){
		let headerCell = document.createElement('th');
		headerCell.appendChild(document.createTextNode(i))
		headerCell.classList.add("cell-header");

		row1.appendChild(headerCell);
	}

	table.appendChild(row1);

	// We traverse the 2d list by going left to right
	// and then down
	for(let y = _tObj.startY; y <= _tObj.endY; y++){
		let row = document.createElement('tr');
		let rowY = document.createElement('th');
		rowY.appendChild(document.createTextNode(y));
		rowY.classList.add("cell-header");

		row.appendChild(rowY);

		for(let x = _tObj.startX; x <= _tObj.endX; x++){
			let cellX = document.createElement('td');
			cellX.appendChild(document.createTextNode(x*y));

			row.appendChild(cellX);
		}

		table.appendChild(row);
	}

	return table;

}

function genErrorMsg(_message){
	let errorMsg = document.createElement('span');
	errorMsg.appendChild(document.createTextNode(_message))
	errorMsg.classList.add("error-msg")

	return errorMsg;
}

function genTable(){
	let sX = document.getElementById("tsX");
	let eX = document.getElementById("teX");
	let sY = document.getElementById("tsY");
	let eY = document.getElementById("teY");

	const MAX_INTEGER = 1000*1000*1000*1000;
	const MAX_RANGE = 500;

	// -- ERROR CHECKING -- //

	// Clean old error messages
	document.querySelectorAll(".error-msg").forEach(element => {
		element.remove();
	});

	let FAILED = false;

	// __ check input format __ // 

	if(!isNum(sX.value)){
		document.getElementById("tableStartXInput")
			.appendChild(genErrorMsg("ERROR: That is not a number."));
		FAILED = true;
		console.log("FAILED");
	}

	if(!isNum(eX.value)){
		document.getElementById("tableEndXInput")
			.appendChild(genErrorMsg("ERROR: That is not a number."));
		FAILED = true;
		console.log("FAILED");
	}

	if(!isNum(sY.value)){
		document.getElementById("tableStartYInput")
			.appendChild(genErrorMsg("ERROR: That is not a number."));
		FAILED = true;
		console.log("FAILED");
	}

	if(!isNum(eY.value)){
		document.getElementById("tableEndYInput")
			.appendChild(genErrorMsg("ERROR: That is not a number."));
		FAILED = true;
		console.log("FAILED");
	}

	if (FAILED) return 0;

	// __ check input value __ //

	if(+sX.value >= +eX.value){
		document.getElementById("tableStartXInput")
			.appendChild(genErrorMsg("ERROR: Start must be smaller than End."));
		FAILED = true;
		console.log("FAILED");
	}

	if(+sY.value >= +eY.value){
		document.getElementById("tableStartYInput")
			.appendChild(genErrorMsg("ERROR: Start must be smaller than End."));
		FAILED = true;
		console.log("FAILED");
	}

	if (FAILED) return 0;

	// __ check input size __ // 

	if(MAX_INTEGER < +sX.value || -MAX_INTEGER > +sX.value){
		document.getElementById("tableStartXInput")
			.appendChild(genErrorMsg("ERROR: That number is too large."));
		FAILED = true;
		console.log("FAILED");
	}

	if(MAX_INTEGER < +eX.value || -MAX_INTEGER > +eX.value){
		document.getElementById("tableEndXInput")
			.appendChild(genErrorMsg("ERROR: That number is too large."));
		FAILED = true;
		console.log("FAILED");
	}

	if(MAX_INTEGER < +sY.value || -MAX_INTEGER > +sY.value){
		document.getElementById("tableStartYInput")
			.appendChild(genErrorMsg("ERROR: That number is too large."));
		FAILED = true;
		console.log("FAILED");
	}

	if(MAX_INTEGER < +eY.value || -MAX_INTEGER > +eY.value){
		document.getElementById("tableEndYInput")
			.appendChild(genErrorMsg("ERROR: That number is too large."));
		FAILED = true;
		console.log("FAILED");
	}

	if (FAILED) return 0;

	// __ check input value __ //

	if(mathRange(+sX.value, +eX.value) > MAX_RANGE){
		document.getElementById("tableStartXInput")
			.appendChild(genErrorMsg("ERROR: Range must be within 500 numbers."));
		FAILED = true;
		console.log("FAILED");
	}

	if(mathRange(+sY.value, +eY.value) > MAX_RANGE){
		document.getElementById("tableStartYInput")
			.appendChild(genErrorMsg("ERROR: Range must be within 500 numbers."));
		FAILED = true;
		console.log("FAILED");
	}

	if (FAILED) return 0;

	// -- REAL START OF FUNCTION -- //

	let myTable = new TableObject(sX.value, eX.value, sY.value, eY.value);

	// Remove old table to keep the page clean
	let oldTable = document.getElementById('mult-table');
	if (oldTable) oldTable.remove();

	let newTable = makeHTMLTable(myTable);
	newTable.id = 'mult-table';
	console.log(newTable);
	newTable.cellspacing = '0';
	newTable.cellpadding = '0';

	// IF range is beyond 11, set container to overflow:scaling

	document.getElementById('table-div').appendChild(newTable)
}



