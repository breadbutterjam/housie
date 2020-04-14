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

function shareTicketClicked(event)
{
	// console.log(event.target)
	let ticketContainer = event.target.parentElement;
	let ticketNumber = Number(ticketsGenerated.getAttribute("ticketNumber"))


	// console.log(ticketsGenerated.getAttribute("ticketNumber"))
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

	
	
	let shareTicketButton = document.createElement('input');
	shareTicketButton.type = "button";
	shareTicketButton.value = "Share";
	shareTicketButton.onclick = shareTicketClicked;
	ticketContainer.prepend(shareTicketButton);

	let ticketHeader = document.createElement('h1');
	ticketHeader.contentEditable = true;
    ticketHeader.innerText = 'Player ' + String(totalTicketsGenerated);
	ticketContainer.prepend(ticketHeader);

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