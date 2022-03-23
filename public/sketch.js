
let socket;

let table;
let timer = 0;
let previousSecond = 0;
let counted = false;
let path = 0;
let day = 0;
let phase = 2;
let rows;
let rowCount;
let waning = false;
let waxing = true;
let eclipse = 0;
let eclipsing = 0;
let azimoth = 0;

function preload(){
  table = loadTable('assets/Delhi_Az_Eclipse_tenyears.csv', 'csv', 'header');
}

function setup() {
  socket = io.connect('localhost:3000');
  
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  rows = table.getRow();
  rowCount = table.getRowCount();


  for (let r = 0; r < table.getRowCount(); r++) {
  
    //print('row ' + r + ' has the date ' + table.get(r, day));
    //print('row ' + r + ' has the phase ' + table.get(r, phase));
      
    }


  createCanvas(800, 800);
}

function draw() {
  background(0);
  //print(path);
  if (millis() % 1000 > 500){
    if(!counted){
      timer++;
      path = table.get(timer, phase);
      eclipse = table.get(timer, 7);
      azimoth = table.get(timer, 1);
      counted = true;
      if (table.get(timer, 6) == 1) { //6 is NewMoon
        waxing = true;
        waning = false;
      }
      if (table.get(timer, 5) == 1) { //5 is FullMoon
        waning = true;
        waxing = false;
      }
      if (waning == true) {
        path = map(path, 0, 100, 630, 400);
      }
      if (waxing == true) {
        path = map(path, 0, 100, 160, 400);
      }
      if (eclipse > 0){
        eclipsing = 1;
        print("Eclipse!");
      } else if (eclipse == 0){
        eclipsing = 0;
      }
      let pathX = path;
      let pathY = 0.0025 * ((path-400)*(path-400)) + 400;
      print(azimoth);
      sendpath(pathX, pathY, eclipsing, azimoth);
    }
  }else{ //if millies() % 1000 < 500
    if(counted == true){
      counted = false;
    }
  }
  if (timer >= rowCount){
    timer = 0;
  }

  fill(150);
  ellipse(width/2, height/2, width/3, height/3);
  
  for (var i = 0; i < timer; i++) { //2.66 is the 800/r  
    fill(0);
    ellipse(path, 0.0025 * ((path-400)*(path-400)) + 400, width/3, height/3);
  }
  
}


// Function for sending to the socket
function sendpath(pathX, pathY, eclipsing, azimoth) {


  var data = {
    x: pathX,
    y: pathY,
    e: eclipsing,
    a: azimoth
  };

  // Send that object to the socket
  socket.emit('data',data);
}
