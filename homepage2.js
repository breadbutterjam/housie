function onBodyLoad()
{
    // alert("A")
    addEventListeners();
}

function addEventListeners()
{
    $("#btnNewGame").on("click", newGameClicked)
    $("#btnBack").on("click", newGameBackClicked)
    $("#btnGenerateNumber").on("click", GenerateNumber)

    $("#btnGenerateTicket").on("click", GenerateTicket);
}

function newGameClicked(event)
{
    // alert ("newGameClicked")

    //hide initial selection panel
    $(".initialSelection").hide();

    //show game container, conductor view
    $('.conductorView').show();


    //generate generated number history table
    $('.GeneratedNumberHistory').html(giveTableHTML(10,9));
    Array.from($('td')).forEach(function(elem, ind){
            elem.innerText = ind;
        })

}

function newGameBackClicked(event)
{
    //hide initial selection panel
    $(".initialSelection").show();

    //show game container, conductor view
    $('.conductorView').hide();
}

function hideAllSections()
{

}

let g_arrGeneratedNumbers = [];
function GenerateNumber()
{
    console.log("Ge")
    let runningNumber = UniqueRandomBetween(1, 89, 1, g_arrGeneratedNumbers)[0];

    g_arrGeneratedNumbers.unshift(runningNumber);

    $('.RunningNumber h1').text(runningNumber);

    $('td')[runningNumber].classList.add('generated');
}

/* TICKET GENERATION CODE STARTS */

let g_data, g_rows;
let g_totalTicketsGenerated = 0;

const MIN_NUMBER_IN_EACH_ROW = 5;

function GenerateTicket()
{

    // console.table(g_data)
    GenerateTicketData();
    
    g_totalTicketsGenerated++;

    AddTicketOnScreen();

}

function GenerateTicketData(){
    let xIndices, emptyCols, pendingNums;

    init();

    for (var i=0; i<=1; i++)
	{
		//fill indices for first and second row
		xIndices = UniqueRandomBetween(0, 8, 5);
		// console.log(xIndices)
		
		for (k=0; k<5; k++){
			g_data[i][xIndices[k]] = "A"
		}
	}


    emptyCols = [];
	for (i=0; i<9; i++)
	{
		p = g_data[0][i] + g_data[1][i] + g_data[2][i]
		if (typeof(p) === "number")
		{
			emptyCols.push(i);
		}
    }
    
    pendingNums = 5 - emptyCols.length;
	
	pendingIndices = UniqueRandomBetween(0, 8, pendingNums, emptyCols)
	for (i=0; i<emptyCols.length; i++)
	{
		g_data[2][emptyCols[i]] = "A";
	}
	
	for (i=0; i<pendingIndices.length; i++)
	{
		g_data[2][pendingIndices[i]] = "A";
    }
    
    // console.table(g_data)

    for (i=0; i<9; i++){
		FillNumberIn(i);
    }	

    CleanData();
}




function init()
{	
	g_data = [];
	g_rows = [0, 0, 0];


	for (var j=0; j<3; j++)
	{
		t=[];
		for (var i=0; i<9; i++)
		{
			t.push(-1);	
		}

		g_data.push(t)
    }

    
}


function FillNumberIn(xIndex)
{
	let arrToFill = [];	
	
	//get indices to fill
	for (var i=0; i<3; i++){
		if (typeof(g_data[i][xIndex]) === "string")
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
		g_data[arrToFill[i]][xIndex] = numbersToFill[i];
	}
}


function CleanData()
{
	for (var xIndex=0; xIndex<9; xIndex++)
	{
		for (var yIndex=0; yIndex<3; yIndex++)
		{
			if (g_data[yIndex][xIndex] === -1)
			{
				g_data[yIndex][xIndex] = "";
			}
		}
	}
}


function AddTicketOnScreen()
{
    let ticketContainer = document.createElement('div');
	ticketContainer.classList.add('ticketContainer' + String(g_totalTicketsGenerated));
	ticketContainer.classList.add('ticketNumber' + String(g_totalTicketsGenerated));
	ticketContainer.setAttribute("ticketNumber", g_totalTicketsGenerated)
    ticketContainer.innerHTML = giveTableHTML(3, 9)
    
    // document.body.append(ticketContainer);
    document.querySelector('.playerTicketContainers').append(ticketContainer);

    AddDataToTable(ticketContainer.querySelectorAll('td'), g_data);

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
    ticketHeader.innerText = 'Player ' + String(g_totalTicketsGenerated);
	ticketContainer.prepend(ticketHeader);

	// shareTicketClicked(ticketContainer);

}

function AddDataToTable(tdElems, ticketData){
    dd = ticketData.toLocaleString().split(",");
    // a = $('td')
    a = tdElems;
    for (var i=0; i<a.length; i++){
    //        console.log(a[i])
		a[i].innerText = dd[i];
		if(dd[i]){
			a[i].classList.add('content');
		}
    }

}

/* TICKET GENERATION CODE ENDS */