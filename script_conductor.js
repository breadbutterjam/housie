function onBodyLoad()
{
    // alert("A")
    console.log("A")

    $('.GeneratedNumberHistory').html(giveTableHTML(10,10));
    Array.from($('td')).forEach(function(elem, ind){
        elem.innerText = ind;
    })
}

// from utils


//end of code from utils
let arrGeneratedNumbers = [];

function GenerateNumber()
{
    let runningNumber = UniqueRandomBetween(1, 99, 1, arrGeneratedNumbers)[0];

    arrGeneratedNumbers.push(runningNumber);

    $('.RunningNumber h1').text(runningNumber);

    $('td')[runningNumber].classList.add('generated');


}

data = [];

function init()
{	
	data = [];
	rows = [0, 0, 0];
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
}
