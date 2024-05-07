

function loadJSON() {
  // use jquery's getJSON()
  // 1: the path to the external json file
  // 2: a function to run a give the json data jquery loaded
  $.getJSON("data.json",
    function(dataReturned) {
      // console.log( dataReturned );
      doBar(dataReturned);
    }
  );
}

// 2. render bar chart into canvas
function doBar(data) {
  //console.log(data);

  // get ref to html canvas element
  var canvas1 = document.getElementById('c1');
  // get ref to 2d drawing context inside the canvas
  var context1 = canvas1.getContext('2d');

  // now we can establish some useful values
  var startX = canvas1.width;
  var bottomY = canvas1.height;
  var maxVal = getMax(data);
  var scaleY = bottomY / maxVal;
  var scaleX = startX / (data.length);
  var i, height, lastX = 0;

  // loop thru and draw some axis scale lines
  for (i = 0; i <= maxVal; i = i + maxVal / 20) {
    context1.beginPath();
    context1.moveTo(0, i * scaleY);
    context1.lineTo(startX, i * scaleY);
    context1.strokeStyle = "gray";
    context1.stroke();

    // draw text for each axis scale line
    context1.fillStyle = "black";
    context1.font = "bold 15px Georgia";
    context1.fillText(maxVal - i, 0, (i * scaleY) - 2);
  }
 
  



  
  // loop thru each data array element and draw rect scaled
  for (i = 0; i < data.length; i++) {
    // set fill color
    context1.fillStyle = data[i].color;
    context1.globalAlpha = 0.8;
    // calc height of rect using scale
    height = data[i].val * scaleY;
    // draw rect
    context1.fillRect(lastX, bottomY - height, scaleX, height);
    //border rectangles
    context1.beginPath();
    context1.rect(lastX, bottomY - height, scaleX, height);
    context1.lineWidth = 4;
    context1.strokeStyle = 'black';
    context1.stroke();

    //label bars
    context1.fillStyle = "black";
    context1.font = "bold 15px Georgia";
    context1.fillText( data[i].text, lastX, bottomY - height + 20  );


    lastX += scaleX;
  }
}

// 3. loops thru json array and finds biggest val property value
function getMax(data) {
  var max = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].val > max) {
      max = data[i].val;
    }
  }
  return max;
}