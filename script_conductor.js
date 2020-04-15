function onBodyLoad()
{
    // alert("A")
    console.log("A")

    $('.GeneratedNumberHistory').html(giveTableHTML(10,10));
    Array.from($('td')).forEach(function(elem, ind){
        elem.innerText = ind;
    })
}


let arrGeneratedNumbers = [];

function GenerateNumber()
{
    let runningNumber = UniqueRandomBetween(1, 99, 1, arrGeneratedNumbers)[0];

    arrGeneratedNumbers.push(runningNumber);

    $('.RunningNumber h1').text(runningNumber);

    $('td')[runningNumber].classList.add('generated');

    saveNumberToFile(runningNumber)
}

data = [];

function saveNumberToFile(nRunningNumber)
{	
	jQuery.ajax({
		type: "POST",
		url: 'writesfile.php',
        data :{hNumber: nRunningNumber},
	
		success: function (obj, textstatus) {
            console.log("saved");
            
        }
	});
}


