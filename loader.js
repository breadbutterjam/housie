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
    document.querySelector('textarea').value = "";

	addEventListeners();
}

function addEventListeners()
{
	// $('h1').on("click", ticketHeaderClicked)
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

let ticketData = "";

function abc()
{
    ticketData = $('textarea')[0].value.trim()

    let ticketContainer = document.createElement('div');
	ticketContainer.classList.add('ticketContainer');
	ticketContainer.innerHTML = giveTableHTML(3, 10)
    document.body.append(ticketContainer);

    bb = JSON.parse(ticketData);

    AddDataToTable(ticketContainer.querySelectorAll('td'), bb);
}