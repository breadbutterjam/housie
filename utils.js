function getRandomNumberBetween(min, max)
{
	diff = max - min; 
    a = Math.random() * diff; 
	b = Number(a.toFixed(0)) + min;
	
	return b;
}

function getURLData(){
   
    let retData = "";
    if (window.location.href.indexOf("?") > -1)
    {
        retData = window.location.href.substr(window.location.href.indexOf("?") + 1);
    }
    else
    {
        retData = ""
    }
    return retData;
}

function UniqueRandomBetween(min, max, numUnique, arrNotThese){
	if (arrNotThese === undefined) {arrNotThese = []}
	cc = [];
	while (cc.length < numUnique)
	{
		t = getRandomNumberBetween(min, max)
		if (cc.indexOf(t) === -1 && arrNotThese.indexOf(t) === -1){
			cc.push(t);
			
		}
	}
	
	cc.sort();
	
    return cc;
}

function getSortedArray(param, bDesc)
{
    let ret = Array.from(param)

    if (bDesc)
    {
        ret.sort((a,b)=>b-a)
    }
    else
    {
        ret.sort((a,b)=>a-b)
    }
    
    return ret;

}

function giveTableHTML(rows, cols, tableId)
{
    if (tableId === undefined)
    {
        tableId = 'table' + String(getRandomNumberBetween(0, 10000)) + String(getRandomNumberBetween(0, 10000))
    }
    let strRet = '';
    let strHead = '<table id="' + tableId + '">'
    let strBody = '';

    for (var i=0; i<rows; i++)
    {
        strBody += giveRows(cols);
    }

    let strEnd = '</table>'

    strRet = strHead + strBody + strEnd;
    return strRet;

}



function giveRows(cols)
{
    let strRet = '<tr>';
    for (var i=0; i<cols; i++)
    {
        strRet += '<td></td>'
    }

    strRet += '</tr>'

    return strRet;
}