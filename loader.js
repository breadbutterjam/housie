let oTime;
function onBodyLoad()
{
    // alert("A")
    console.log("A")
	
    if (getURLData().length > 0)
    {
		//if encrypted ticket data is present in the URL
        abc();
	}
	else
	{
		
		GenerateTicket();
		abc(addSalt(data));
	}

	addEventListener();
	
	getNewNumber();
	addNumbersGeneratedTable();

	oTime = setInterval(getNewNumber, 1000)

	
}

function addEventListener()
{
	$('.hasNumber').on("click", numberSelected);
	
	$('.generatedNumberHistory').on("click", stopPress)
}

function stopPress(){
	clearInterval(oTime);
	alert('it is done. Number fetching is paused')
}

function numberSelected(event)
{
    let selElem = event.target;

    if (Array.from(selElem.classList).indexOf('numberFound') > 0)
    {
        bConfirmRemove = confirm("Are you sure you want to deselect?");
        if (bConfirmRemove)
        {
            selElem.classList.remove('numberFound')
        }
    }
    else{
        selElem.classList.add('numberFound');
        playSound()
    }
   
}

function playSound()
{
    document.querySelector('audio').play();
}

function AddDataToTable(tdElems, ticketData){
    dd = ticketData.toLocaleString().split(",");
    // a = $('td')
    a = tdElems;
    for (var i=0; i<a.length; i++){
    //        console.log(a[i])
        a[i].innerText = dd[i];
        if (dd[i].length > 0)
        {
            a[i].classList.add('hasNumber');
        }
    }

}

let ticketData = "";

function abc(urlParam)
{
	//debugger;
    /* ticketData = $('textarea')[0].value.trim()

    let ticketContainer = document.createElement('div');
	ticketContainer.classList.add('ticketContainer');
	ticketContainer.innerHTML = giveTableHTML(3, 10)
    document.body.append(ticketContainer);

    bb = JSON.parse(ticketData); 
    
    // v1 method of loading tickets.  
    */

//    let ticketContainer = document.createElement('div');
	let ticketContainer = document.querySelector('.ticketContainer');
//    ticketContainer.classList.add('ticketContainer');
   ticketContainer.innerHTML = giveTableHTML(3, 9);
//    document.body.append(ticketContainer);

	let URLData;
	urlParam ? URLData = urlParam : URLData = getURLData()

    let ticketData = removingSalt(URLData)

	AddDataToTable(ticketContainer.querySelectorAll('td'), ticketData);
	



	// let generatedNumberHistoryContainer = document.createElement('div');
	// generatedNumberHistoryContainer.classList.add('generatedNumberHistory');
	// ticketContainer.append(generatedNumberHistoryContainer);

	// let generatedNumberTableContainer = document.createElement('div');
	// ticketContainer.append(generatedNumberTableContainer);
}

function getNewNumber()
{
	console.log('getting new number')
	let newNumber = -1;
    jQuery.ajax({
		type: "POST",
		url: 'readfile.php',
		// dataType: 'json',
		// data: {functionname: 'add', arguments: [1, 2]},
		// data: {hNumber: 31},
		
		data: 42,
	
		success: function (obj, textstatus) {
					// console.log("we have lift OFF", obj);
					
					// newNumber = Number(obj)

					// console.log({newNumber})
					// (newNumber != Number())

					
					ccc(obj);	
					// NewNumberGenerated(newNumber)
					
					// return newNumber;
					// console.log({obj}, textstatus)
					//   if( !('error' in obj) ) {
					// 	  yourVariable = obj.result;
						  
					//   }
					//   else {
					// 	  console.log(obj.error);
					//   }
				}
	});
}

function ccc(strParam)
{
	// debugger;
	if (strParam.length > 0)
	{
		let t = [];
		let arrStr = strParam.split(",");
		for (x in arrStr)
		{
			t.push(Number(arrStr[x]))
		}

		arrGeneratedNumbers = Array.from(t);

		let existingNumber = Number(document.querySelector('h1').innerText)
		lastNumGen = t.shift();
		if (lastNumGen != existingNumber)
		{
			document.querySelector('h1').innerText = lastNumGen;
		}


		highLightGeneratedNumbers();

		document.querySelector('.generatedNumberHistory').innerText = getSortedArray(arrGeneratedNumbers).toLocaleString().replace(/,/g, ', ')
	}
	
}

let arrGeneratedNumbers = [];


function addNumbersGeneratedTable(){
	// debugger;
	document.querySelector('.generatedNumberHistoryTable').innerHTML = giveTableHTML(9,10);
	cells = document.querySelectorAll('.generatedNumberHistoryTable td'); 
	let val = -1;
	for (x in cells){
		val = Number(x) + 1;
		cells[x].innerText = String(val);
	}

	
}


function highLightGeneratedNumbers()
{
	cells = document.querySelectorAll('.generatedNumberHistoryTable td');
	// for (x)
	for (x in arrGeneratedNumbers)
	{
		cells[arrGeneratedNumbers[x]-1].classList.add('numberGenerated')
	}
}


/* removing salt start */

xPass = "THUNDERLI".split("");
yPass = "GHT".split("");

function dCode(salted)
{
	let arrPos = salted.split("");
	let xCod = arrPos[0];
	let yCod = arrPos[1];
	let unitVal = arrPos[2];
	
	
	let xPos = xPass.indexOf(xCod);
	let yPos = yPass.indexOf(yCod);


	let val = (10 * xPos) + Number(unitVal) ;
	
	retPos = (yPos * 9) + xPos

	return String(val) + ":" + String(retPos);
	// return String(val) + ":" + String(yPos) + String(xPos);

}


function removingSalt(param)
{

	h = [];
	t = "";
	for (var i=0; i<param.length; i++)
	{
		t += param[i];
		if ((i+1)% 3 === 0){
			h.push(t);
			t = "";
		}
	}

	z = [];
	for (i=0; i<h.length; i++){
		z.push(dCode(h[i]));
	}
	//z is same as c. 
	
	
	
	e = [];
	for (var i=0; i<z.length; i++)
	{
	   val = z[i].split(":")[0];
	   ind = Number(z[i].split(":")[1]);
	   e[ind] = val;
	}
	
	f = []
	for (var i=0; i<27; i++)
	{
		if (e[i] === undefined){
			f.push("");
		}
		else
		{
			f.push(String(e[i]));
		}   
	}
	
	g = [];
	for (var i=0; i<3; i++)
	{
		t = [];
		for (var k=0; k<9; k++){
			orig = f[i*9 + k];
			if (orig.length === 0){
				t.push("");
			}
			else
			{
				t.push(Number(orig))
			}
		}

		g.push(t);
	}
	
	//console.log(g);
	return g;
}

/* removing salt end */