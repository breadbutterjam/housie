function onBodyLoad()
{
    // alert("A")
    console.log("A")

    $('.GeneratedNumberHistory').html(giveTableHTML(10,9));
    
    Array.from($('td')).forEach(function(elem, ind){
        elem.innerText = ind;
    })
}


let arrGeneratedNumbers = [];

function GenerateNumber()
{
    let runningNumber = UniqueRandomBetween(1, 89, 1, arrGeneratedNumbers)[0];

    arrGeneratedNumbers.unshift(runningNumber);

    $('.RunningNumber h1').text(runningNumber);

    $('td')[runningNumber].classList.add('generated');

    saveNumberToFile(runningNumber)
}

data = [];

function saveNumberToFile(nRunningNumber)
{	
    let strData = arrGeneratedNumbers.toLocaleString();
	jQuery.ajax({
		type: "POST",
		url: 'writesfile.php',
        // data :{hNumber: nRunningNumber},
        data :{hNumber: strData},
        
	
		success: function (obj, textstatus) {
            console.log("saved");
            
        }
	});
}


function ResetAll()
{
    let conf = confirm('are you sure?')
    if (conf)
    {
        clearInterval(oAutoGenerateNumber);
        document.querySelector('.RunningNumber h1').innerText = "";
        cels = document.querySelectorAll('.GeneratedNumberHistory td');
        for (x in cels)
        {
            if (!isNaN(+x))
            {
                cels[x].classList.remove('generated'); 
            }
        }
        arrGeneratedNumbers = [];
        saveNumberToFile();
    }
}


let oAutoGenerateNumber;
let jj=0;
function AutoGenerateNumber()
{
    GenerateNumber();
    oAutoGenerateNumber = setInterval(autoGenStart, 50);
}

function autoGenStart()
{
    
    console.log("jj is ", jj)
    jj++;
    if (jj <= 100)
    {
        document.querySelector('.progressIndicator').style.width = String(jj) + "%";
    }
    else{
        jj = 0;
        GenerateNumber();
    }
}