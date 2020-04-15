function onBodyLoad()
{
    // alert("A")
    console.log("A")

    if (getURLData().length > 0)
    {
        abc();
    }

    addEventListener();
}

function addEventListener()
{
    $('.hasNumber').on("click", numberSelected);
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

function abc()
{
    /* ticketData = $('textarea')[0].value.trim()

    let ticketContainer = document.createElement('div');
	ticketContainer.classList.add('ticketContainer');
	ticketContainer.innerHTML = giveTableHTML(3, 10)
    document.body.append(ticketContainer);

    bb = JSON.parse(ticketData); 
    
    // v1 method of loading tickets.  
    */

   let ticketContainer = document.createElement('div');
   ticketContainer.classList.add('ticketContainer');
   ticketContainer.innerHTML = giveTableHTML(3, 10)
   document.body.append(ticketContainer);

    let URLData = getURLData();

    let ticketData = removingSalt(URLData)

    AddDataToTable(ticketContainer.querySelectorAll('td'), ticketData);
}

function getNewNumber()
{
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
					newNumber = Number(obj)
					console.log({newNumber})
					document.querySelector('h1').innerText = newNumber;
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


/* removing salt start */

xPass = "THUNDERLIG".split("");
yPass = "HTN".split("");

function dCode(salted)
{
	let arrPos = salted.split("");
	let xCod = arrPos[0];
	let yCod = arrPos[1];
	let unitVal = arrPos[2];
	
	
	let xPos = xPass.indexOf(xCod);
	let yPos = yPass.indexOf(yCod);
	let val = (10 * xPos) + Number(unitVal) ;
	
	return String(val) + ":" + String(yPos) + String(xPos);

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
	for (var i=0; i<30; i++)
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
		for (var k=0; k<10; k++){
			orig = f[i*10 + k];
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