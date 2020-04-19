
rows = [0, 0, 0];
data = [];


function CleanData()
{
	for (var xIndex=0; xIndex<9; xIndex++)
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

function init()
{	
	data = [];
	rows = [0, 0, 0];


	for (var j=0; j<3; j++)
	{
		t=[];
		for (var i=0; i<9; i++)
		{
			t.push(-1);	
		}

		data.push(t)
	}

	/* data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1])
	data.push([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]) */

}


function GenerateTicket()
{
    init();
	
	for (var i=0; i<=1; i++)
	{
		//fill indices for first and second row
		xIndices = UniqueRandomBetween(0, 8, 5);
		// console.log(xIndices)
		
		for (k=0; k<5; k++){
			data[i][xIndices[k]] = "A"
		}
	}
	
	//console.table(data);
	// prntData();
	
	//
	emptyCols = [];
	for (i=0; i<9; i++)
	{
		p = data[0][i] + data[1][i] + data[2][i]
		if (typeof(p) === "number")
		{
			emptyCols.push(i);
		}
		
		
	}
	
	pendingNums = 5 - emptyCols.length;
	
	pendingIndices = UniqueRandomBetween(0, 8, pendingNums, emptyCols)
	for (i=0; i<emptyCols.length; i++)
	{
		data[2][emptyCols[i]] = "A";
	}
	
	for (i=0; i<pendingIndices.length; i++)
	{
		data[2][pendingIndices[i]] = "A";
	}
	
	// prntData();
		
	for (i=0; i<9; i++){
		FillNumberIn(i);
	}	
	
	CleanData();
	
	// prntData();

	// addToData()
		
}


/* salting start */

function getXY(num){
    let X = Math.floor(num/9);
    let Y = Math.floor(num%9);
    return [X, Y];
}

xPass = "THUNDERLI".split("");
yPass = "GHT".split("");

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

	console.log("a", a)

	b = a.split(",");

	console.log("b", b)

	c = [];
	for (var i=0; i<b.length; i++)
	{
		if (b[i].length > 0)
		{
			c.push(String(b[i]) + ":" + String(i))
		}
	}
	
	console.log("c", c)


	d = "";
	for (var i=0; i<c.length; i++)
	{
		d += getCodeFor(c[i]);
	}
	
	console.log("d", d)


	//console.log(d);
	return d;
}


/* salting end */