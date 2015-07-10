/**
 * JavaScript
 * 
 * Hit To Bet - Game.js
 * Created by Christoph Lipphart on 9th July 2015
 * (c) Copyright 2015 Christoph Lipphart
 */

// debug function
function logsomething(dt)
{
	console.log("logsomething: @ " + dt);
}

// register debug function
GCore.RegisterUpdateFunction(logsomething);