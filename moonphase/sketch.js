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

function preload(){
  table = loadTable('assets/Delhi_Az_Eclipse_tenyears.csv', 'csv', 'header');
}

function setup() {
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
  print(path);
  if (millis() % 1000 > 500){
    if(!counted){
      timer++;
      path = table.get(timer, phase);
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
  //noStroke();
  //fill(255, 252, 212, 20);
  //ellipse(width/3, height/2, width/2, width/2);
  for (var i = 0; i < timer; i++) { //2.66 is the 800/r  
    fill(0);
    ellipse(path, 0.0025 * ((path-400)*(path-400)) + 400, width/3, height/3);
  }
}
