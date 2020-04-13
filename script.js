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
		
}


function AddDataToTable(tdElems){
    dd = data.toLocaleString().split(",");
    // a = $('td')
    a = tdElems;
    for (var i=0; i<a.length; i++){
    //        console.log(a[i])
    a[i].innerText = dd[i];
    }

}

totalTicketsGenerated = 0;

function AddTicketOnScreen()
{
    ticketContainer = document.createElement('div');
    ticketContainer.classList.add('ticketContainer');
    ticketContainer.innerHTML = giveTableHTML(3, 10)
    document.body.append(ticketContainer);

    AddDataToTable(ticketContainer.querySelectorAll('td'));

    ticketHeader = document.createElement('h1');
    ticketHeader.innerText = 'Ticket for Player ' + String(totalTicketsGenerated);
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

function addToData()
{

}