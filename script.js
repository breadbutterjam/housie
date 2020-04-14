function onBodyLoad()
{
    // alert("A")
    console.log("A")
}

rows = [0, 0, 0];
data = [];

function init()
{	
	data = [];
	rows = [0, 0, 0];
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])

	addEventListeners();
}

function addEventListeners()
{
	// $('h1').on("click", ticketHeaderClicked)
}





function GenerateTicket()
{
    init();
	
	for (var i=0; i<=1; i++)
	{
		//fill indices for first and second row
		xIndices = UniqueRandomBetween(0, 9, 5);
		// console.log(xIndices)
		
		for (k=0; k<5; k++){
			data[i][xIndices[k]] = "A"
		}
	}
	
	//console.table(data);
	// prntData();
	
	//
	emptyCols = [];
	for (i=0; i<10; i++)
	{
		p = data[0][i] + data[1][i] + data[2][i]
		if (typeof(p) === "number")
		{
			emptyCols.push(i);
		}
		
		
	}
	
	pendingNums = 5 - emptyCols.length;
	
	pendingIndices = UniqueRandomBetween(0, 9, pendingNums, emptyCols)
	for (i=0; i<emptyCols.length; i++)
	{
		data[2][emptyCols[i]] = "A";
	}
	
	for (i=0; i<pendingIndices.length; i++)
	{
		data[2][pendingIndices[i]] = "A";
	}
	
	// prntData();
		
	for (i=0; i<10; i++){
		FillNumberIn(i);
	}	
	
	CleanData();
	
	prntData();

	addToData()
		
}


function AddDataToTable(tdElems, ticketData){
    dd = ticketData.toLocaleString().split(",");
    // a = $('td')
    a = tdElems;
    for (var i=0; i<a.length; i++){
    //        console.log(a[i])
    	a[i].innerText = dd[i];
    }

}

totalTicketsGenerated = 0;

function shareTicketClicked(ticketContainer)
{
	// console.log(event.target)
	// let ticketContainer = event.target.parentElement;
	let ticketNumber = Number(ticketContainer.getAttribute("ticketnumber"))

	
	// console.log(ticketNumber)

	ticketData = deets.ticketsGenerated[ticketNumber - 1];

	// console.table(ticketData)

	salted = addSalt(ticketData);

	// retURL = "http://localhost:1111/housie/player.html?" + salted;
	retURL =  window.location.href  + "player.html?" + salted;

	// console.log(retURL)

	let anchorElem = document.querySelectorAll('.ticketContainer>a')[ticketNumber - 1];
	anchorElem.href = retURL;
	// anchorElem.innerText = retURL; 
	anchorElem.innerText = 'click to launch'
}

function AddTicketOnScreen()
{
    let ticketContainer = document.createElement('div');
	ticketContainer.classList.add('ticketContainer');
	ticketContainer.classList.add('ticketNumber' + String(totalTicketsGenerated));
	ticketContainer.setAttribute("ticketNumber", totalTicketsGenerated)
    ticketContainer.innerHTML = giveTableHTML(3, 10)
    document.body.append(ticketContainer);

    AddDataToTable(ticketContainer.querySelectorAll('td'), data);

	let shareLink = document.createElement('a');
	shareLink.target = "_blank";
	// ticketContainer.append(shareLink)
	ticketContainer.prepend(shareLink)
	
	/* let shareTicketButton = document.createElement('input');
	shareTicketButton.type = "button";
	shareTicketButton.value = "Share";
	shareTicketButton.onclick = shareTicketClicked;
	ticketContainer.prepend(shareTicketButton); */

	let ticketHeader = document.createElement('h1');
	ticketHeader.contentEditable = true;
    ticketHeader.innerText = 'Player ' + String(totalTicketsGenerated);
	ticketContainer.prepend(ticketHeader);

	shareTicketClicked(ticketContainer);

}



function FillNumberIn(xIndex)
{
	arrToFill = [];	
	
	//get indices to fill
	for (var i=0; i<3; i++){
		if (typeof(data[i][xIndex]) === "string")
		{
			arrToFill.push(i);
		}
	}
	
	min = (xIndex * 10);
	if (min === 0) {min = 1};
	
	max = (xIndex * 10) + 9;
	
	numbersToFill = UniqueRandomBetween(min, max, arrToFill.length);
	
	for (i=0; i<arrToFill.length; i++)
	{
		data[arrToFill[i]][xIndex] = numbersToFill[i];
	}
}

function CleanData()
{
	for (var xIndex=0; xIndex<10; xIndex++)
	{
		for (var yIndex=0; yIndex<3; yIndex++)
		{
			if (data[yIndex][xIndex] === -1)
			{
				data[yIndex][xIndex] = "";
			}
		}
	}
}

function prntData(){
	console.table(data);
}

function abc()
{
    totalTicketsGenerated++;
    GenerateTicket();
    // prntData();
    AddTicketOnScreen();
}


let ticketsGenerated = {};

let deets = {};
deets.ticketsGenerated = [];

function addToData()
{
	deets.ticketsGenerated.push(data);
}


/* salting start */

function getXY(num){
    let X = Math.floor(num/10);
    let Y = Math.floor(num%10);
    return [X, Y];
}

xPass = "THUNDERLIG".split("");
yPass = "HTN".split("");

function getCodeFor(param)
{
    let val = param.split(":")[0];
    let arrXY = getXY(param.split(":")[1]);
    
    let strRet = "";

    let strXPass = xPass[arrXY[1]];
	let strYPass = yPass[arrXY[0]];
	let unitVal = val%10;
	
	strRet = strXPass + strYPass + unitVal;
	
	return strRet;

}




function addSalt(paramData)
{
	let a, b, c, d; 
	a = paramData.toLocaleString()
	b = a.split(",");
	c = [];
	for (var i=0; i<b.length; i++)
	{
		if (b[i].length > 0)
		{
			c.push(String(b[i]) + ":" + String(i))
		}
	}
	
	d = "";
	for (var i=0; i<c.length; i++)
	{
		d += getCodeFor(c[i]);
	}
	
	//console.log(d);
	return d;
}


/* salting end */