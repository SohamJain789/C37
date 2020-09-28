class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    //cars is an array which stores all the four cars 
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
   // textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //Declare the index for the array 
      var index = 0;
      //x and y are the positions for the car 
      var x = 0,y
      //var display_position = 130;
      for(var plr in allPlayers){
        //Add 1 to the index for every player 
        index = index + 1;
        //place the cars at a distance of 200 from each other in the x direction 
        x = x + 200;
        //Get the players distance from the database and subtract it from the display height to place the car in the y direction 
        y = displayHeight - allPlayers[plr].distance;
        //place the cars at x and y position 
        //since we are increasing the index by 1 for every player and the cars come with a index of 0 so we use index-1 over here 
        cars[index-1].x = x;
        cars[index-1].y = y;
        //identify the active player and mark it in red color 
        if (index === player.index){
          cars[index-1].shapeColor = "red";
          ///Place the camera or make it move with the y position of the car,so that we can see the game from diffrent angles
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
