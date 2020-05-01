function onBodyLoad(){
    // loadData();
    init();
    addEventListeners();
}

function addEventListeners()
{

}

function loadData(){
	if (localStorage.housie)
	{
        //if data exists. load from existing data
        allData = JSON.parse(localStorage.housie)

        gameData = allData.gameData;
        playerData = allData.playerData;
	}
	else{
		//if site is being loaded for the first time. 
        init();
        saveGameData();
	}
}


function getUniqueGameId()
{
    let retId = -1;
    gameIds = alldata.gameData.gameIds;
    retId = getUniqueID(gameIds);

    return retId;
}

let currGameID = -1;
let currPlayerID = -1;
const GAME_ID = "game_id: "
function createNewGameControls()
{

    let newGameId = getUniqueGameId();

    document.querySelector('.newGameID').innerText = GAME_ID + String(newGameId);

    //show the next set of controls 
    document.querySelector('.NewGame').classList.remove('DontShowOnStart');
    
    //hide first controls
    document.querySelector('.initialSelection').classList.add('DontShow');

}

function addToAllData(player, game, ticket){
    if (player)
    { 
        let playerId = player.playerID;
        alldata.playerData.playerIds.push(playerId);
        alldata.playerData.players[playerId] = player;
        console.log('player saved')
    }

    if (game)
    {
        let gameId = game.gId;
        alldata.gameData.gameIds.push(gameId);
        alldata.gameData.games[gameId] = game;
        console.log('game saved')

    }

    if (ticket)
    {
        let ticketId = ticket.tId;
        alldata.ticketData.ticketIds.push(ticketId);
        alldata.ticketData.tickets[ticketId] = ticket;
        console.log('ticket saved')

    }
}

function createNewGame(){
    let playerName = document.querySelector('.playerName').innerText.trim();
    let gameId = document.querySelector('.newGameID').innerText.replace(GAME_ID, "");
    let gameName = document.querySelector('.playerName').innerText.trim();

    oPlayerDeets = createNewPlayer(playerName, gameId);

    oGameDeets = JSON.parse(JSON.stringify(gameDeetsTemplate));
    oGameDeets.gId = gameId;
    oGameDeets.gName = gameName;
    oGameDeets.players.push(oPlayerDeets.playerID);
    let radioBothConductorPlayer = document.querySelector('#both');
    if(radioBothConductorPlayer.checked)
    {
        oGameDeets.conductor = oPlayerDeets.playerID;
    }


    oTicketdeets = JSON.parse(JSON.stringify(ticketDeetsTemplate))
    let ticketId = getUniqueID(alldata.ticketData.ticketIds);
    let ticketData = GenerateTicket();
    
    oTicketdeets.tId = ticketId;
    oTicketdeets.ticketData = ticketData;
    oTicketdeets.gameId = gameId;
    oTicketdeets.playerId = oPlayerDeets.playerID;

    oGameDeets.tickets.push(ticketId);
    oPlayerDeets.tickets.push(ticketId);

    addToAllData(oPlayerDeets, oGameDeets, oTicketdeets);

    

/* ticketDeetsTemplate = {
    tId: -1,
    ticketData: "",
    gameId: -1,
    playerId: -1
} */

    /* let gameDeetsTemplate = {
    gId: -1,
    gName: "",
    conductor: -1,
    tickets: [],
    players: []
}; */
    
}

function getUniquePlayerID()
{
  
    let retId = -1;
    let playerIds = alldata.playerData.playerIds;
    retId = getUniqueID(playerIds);

    return retId;
}

function createNewPlayer(playerName, gameId)
{
    let ret = JSON.parse(JSON.stringify(playerDeetsTemplate));
    /* let playerDeetsTemplate = {
        playerID: -1, 
        playerName: "",
        games: [],
        tickets: []
    } */

    let playerId = getUniquePlayerID();
    ret.playerID = playerId;
    ret.playerName = playerName;
    ret.games.push(gameId);

    return ret;
}


function createPlayerObject(playerName)
{
    let retPlayer = JSON.parse(JSON.stringify(playerTemplate));

    retPlayer.playerID = currPlayerID;
    retPlayer.playerName = playerName;
    retPlayer.currGame = currGameID;

    return retPlayer;
}

function cancelGame()
{
    document.querySelector('.NewGame').classList.add('DontShowOnStart');
    document.querySelector('.initialSelection').classList.remove('DontShow');

}

function addGame(gameId)
{
    let strIndex = String(gameId)
    gameData.games[strIndex] = JSON.parse(JSON.stringify(gameTemplate));
    
}

function saveGameData()
{
    allData.gameData = gameData;
    allData.playerData = playerData;
    
    
    localStorage.housie = JSON.stringify(allData);

    console.log('data saved')
}

function init()
{
    //run only if data is not found in localstorage
    oPlayers = {
        playerIds: [],
        players:{}
    }

    oGames = {
        gameIds: [],
        games: {} 
    }

    oTickets = {
        ticketIds: [],
        tickets:{}
    }

    alldata = {};
    alldata.playerData = oPlayers;
    alldata.gameData = oGames;
    alldata.ticketData = oTickets;


}

/* all players */
let oPlayers, oGames, oTickets, alldata;

/* player deets */
let playerDeetsTemplate = {
    playerID: -1, 
    playerName: "",
    games: [],
    tickets: []
}

/* store info on games */
let gameDeetsTemplate = {
    gId: -1,
    gName: "",
    conductor: -1,
    tickets: [],
    players: []
};

let ticketDeetsTemplate = {
    tId: -1,
    ticketData: "",
    gameId: -1,
    playerId: -1
}

function joinGame()
{
	
}

function getUniqueID(existingIds)
{
    let randomIndex;
    // let arrGameIDs = gameData.gameIDs;
    let arrIds = existingIds;

    do {
    randomIndex = parseInt(Math.random() * 10364);
    } while(arrIds.indexOf(randomIndex) > 0);

    return randomIndex;
}

function Conductor()
{
    let currGame = gameData.games[currGameID];
    currGame.conductor = currPlayerID;

    document.querySelector('.NewGame').classList.add('DontShow');
    document.querySelector('.NumberGenerator').classList.remove('DontShowOnStart')

    createNumberHistoryTable();



    // alert("okay!");
}

function createNumberHistoryTable()
{
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

    $('.GeneratedNumberHistory td')[runningNumber].classList.add('generated');

    // saveNumberToFile(runningNumber)
}




function initTicket()
{	
	let ticketData = [];
	rows = [0, 0, 0];
	for (var j=0; j<3; j++)
	{
		t=[];
		for (var i=0; i<9; i++)
		{
			t.push(-1);	
		}

		ticketData.push(t)
    }
    return ticketData
}

function GenerateTicket()
{
    let ticketData = initTicket();
	
	for (var i=0; i<=1; i++)
	{
		//fill indices for first and second row
		xIndices = UniqueRandomBetween(0, 8, 5);
		// console.log(xIndices)
		
		for (k=0; k<5; k++){
			ticketData[i][xIndices[k]] = "A"
		}
	}
	
	//console.table(data);
	// prntData();
	
	//
	emptyCols = [];
	for (i=0; i<9; i++)
	{
		p = ticketData[0][i] + ticketData[1][i] + ticketData[2][i]
		if (typeof(p) === "number")
		{
			emptyCols.push(i);
		}
		
		
	}
	
	pendingNums = 5 - emptyCols.length;
	
	pendingIndices = UniqueRandomBetween(0, 8, pendingNums, emptyCols)
	for (i=0; i<emptyCols.length; i++)
	{
		ticketData[2][emptyCols[i]] = "A";
	}
	
	for (i=0; i<pendingIndices.length; i++)
	{
		ticketData[2][pendingIndices[i]] = "A";
	}
	
	// prntData();
		
	for (i=0; i<9; i++){
		FillNumberIn(i, ticketData);
	}	
	
    CleanData(ticketData);
    
    return ticketData;
		
}

function prntData(){
	console.table(data);
}

function FillNumberIn(xIndex, ticketData)
{
	arrToFill = [];	
	
	//get indices to fill
	for (var i=0; i<3; i++){
		if (typeof(ticketData[i][xIndex]) === "string")
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
		ticketData[arrToFill[i]][xIndex] = numbersToFill[i];
	}
}

function CleanData(ticketData)
{
	for (var xIndex=0; xIndex<10; xIndex++)
	{
		for (var yIndex=0; yIndex<3; yIndex++)
		{
			if (ticketData[yIndex][xIndex] === -1)
			{
				ticketData[yIndex][xIndex] = "";
			}
		}
	}
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











function saveDataToFile()
{	
    saveGameData()
    // let oData = JSON.parse(localStorage.housie)
    let oData = localStorage.housie;
    
	jQuery.ajax({
		type: "POST",
        url: 'writesfile.php',
        data: {hData: oData},
        // data :{hNumber: nRunningNumber},
	
		success: function (obj, textstatus) {
            console.log("saved");
            
        }
	});
}

function readDataFromFile()
{
    jQuery.ajax({
		type: "POST",
		url: 'readfile2.php',		
		data: 42,
	
		success: function (obj, textstatus) {
					//console.log("we have lift OFF", obj);
					// newNumber = Number(obj)
					//console.log({obj})
                    // document.querySelector('h1').innerText = newNumber;
                    
                    if (typeof(obj) === 'string')
                    {
                        // data is not found
                        init();
                    }
                    else
                    {
                        allData = JSON.parse(obj);
                    }


				}
	});
}