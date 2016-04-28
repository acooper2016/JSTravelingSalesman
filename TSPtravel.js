$(document).ready( function() {
	
	var dotX = [0];
	var dotY = [0];
	console.log(distance(1,2,1,2));

	$("#canvas").click( function() {
		
		//get context of canvas
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");
		
		//add point to arrays
		dotX.push(event.pageX - 6);
		dotY.push(event.pageY - 6);
		
		//add point to canvas (write this)
		ctx.beginPath();
		var x = dotX[dotX.length-1];
		var y = dotY[dotY.length-1];
		ctx.arc(x,y,1,0,2*Math.PI);
		console.log(dotX);
		console.log(dotY);
		ctx.stroke();
	
	});
	
	$("#button1").click(function() {
	
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 1; //change width of line
		
		nearestNeighbor(dotX,dotY,ctx);
	
	})
		
	$("#button2").click( function() {
		
		//do algorithm
		
		
		//draw lines between points
		var canvas = $("#canvas").get(0);
		var ctx = canvas.getContext("2d");	
		ctx.strokeStyle = "#55C"; //change color of line
		ctx.lineWidth = 1; //change width of line
		
		//draw a line between every point
		leastDistance(dotX,dotY,ctx);

	});
});

function nearestNeighbor(arrX, arrY, ctx)
{
	var orderedX = [0];
	var orderedY = [0];
	orderedX.push(arrX.pop());
	orderedY.push(arrY.pop());
	for(var i = 0; i < arrX.length; i++)
	{
		var addX = arrX.pop();
		var addY = arrY.pop();
		var ind = 1;
		var dist = distance(addX,orderedX[0],addY,orderedY[0]);
		for(var i = 1; i < orderedX.length; i++)
		{
			if(distance(addX,orderedX[i],addY,orderedY[i]) < dist)
			{
				ind = i;
				dist =  distance(addX,orderedX[i],addY,orderedY[i]);
			}
		}
		orderedX.splice(ind, 0, addX);
		orderedY.splice(ind, 0, addY);
	}
	draw(orderedX, orderedY, canvas);
	
}


function leastDistance(arrX, arrY, ctx)
{
	var orderedX = [0];
	var orderedY = [0];
	orderedX.push(arrX.pop());
	orderedY.push(arrY.pop());
	orderedX.push(arrX[0]);
	orderedY.push(arrY[0]);
	for(var i = 0; i < arrX.length; i++)
	{
		var addX = arrX.pop();
		var addY = arrY.pop();
		var ind = 1;
		var dist = distance(addX,orderedX[0],addY,orderedY[0]) + distance(addX,orderedX[1],addY,orderedY[1]) - distance(orederedX[0],orderedX[1],orderedY[0],orderedY[1]);
		for(var i = 0; i < orderedX.length - 1; i++)
		{
			if(distance(addX,orderedX[i],addY,orderedY[i]) + distance(addX,orderedX[i + 1],addY,orderedY[i + 1]) - distance(orederedX[i],orderedX[i + 1],orderedY[i],orderedY[i +1])  < dist)
			{
				ind = i;
				dist =  distance(addX,orderedX[i],addY,orderedY[i]) + distance(addX,orderedX[i + 1],addY,orderedY[i + 1]) - distance(orederedX[i],orderedX[i + 1],orderedY[i],orderedY[i +1]);
			}
		}
		orderedX.splice(ind, 0, addX);
		orderedY.splice(ind, 0, addY);
	}
	draw(orderedX, orderedY,canvas);

}

function draw(arrX, arrY, ctx)
{
	ctx.beginPath;
	ctx.moveTo(arrX[0],arrY[0]);
	for(var i = 1; i < arrX.length; i++)
	{
		ctx.lineTo(arrX[i], arrY[i]);
	}
	ctx.stroke();
}

function distance(X1, X2, Y1, Y2)
{
	return Math.sqrt(Math.pow(X2-X1, 2) + Math.pow(Y2-Y1, 2));
}

