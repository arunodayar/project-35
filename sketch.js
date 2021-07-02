//Create variables here
var dog, dogImg, happyDog, database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var food;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  
  food = new Food();
  
  dog = createSprite(700,290,150,150);
  dog.addImage(dogImg)
  dog.scale = 0.20

  feed = createButton("Feed the Dog");
  feed.position(710,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

}

function draw() {  
  background(46,139,87);
  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })
  fill(255);
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM",350, 30);
  }else{
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }
  dog.display();
  food.display(); 
  drawSprites();

}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}
A
function feedDog(){
  dog.addImage(happyDog);
  food.updateFoodStock(food.getFoodStock()- 1)
  database.ref('/').update({
    Food: food.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
  Food: foodS
  })  
}
