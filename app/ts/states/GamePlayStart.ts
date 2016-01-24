/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../gameObjects/player.ts"/>

module GameStates {
  export class GamePlayStart extends Phaser.State{
    game: Phaser.Game;
    playerSprite: Phaser.Sprite;
    playerClass: Player.playerFactory;
    private bgTile: Phaser.TileSprite;
    private platFormTile: Phaser.TileSprite;
    private platforms: Phaser.Group;

    constructor(){
      super();
    }

    preload(){
      // loading images
      this.game.load.image('platform','app/assets/platform.png');

      // Spritesheet
      this.game.load.spritesheet('dude','app/assets/dude.png', 32,48);
    }
    update(){
      this.game.physics.arcade.collide(this.playerSprite, this.platforms);

      this.bgTile.tilePosition.x -= 1;
      this.platFormTile.tilePosition.x -=1;

      this.playerClass.movement(this.playerSprite);
    }
    create(){

      //  We're going to be using physics, so enable the Arcade Physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.bgTile = <Phaser.TileSprite>this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');



      this.platforms = <Phaser.Group>this.game.add.group();

      // allows all existing and new sprites to have physics body enabled
      this.platforms.enableBody = true;

      //creates ground
      var ground = <Phaser.Sprite>this.platforms.create(0,this.game.world.height -34, 'platform');

      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(4, 2);
      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      this.platforms.create(this.game.width -200, 100, 'platform').body.immovable = true;

      this.platforms.create(400, 250, 'platform').body.immovable = true;

      this.platFormTile = <Phaser.TileSprite>this.game.add.tileSprite(0,0,400,250,'platform');
      // this.platFormTile = <Phaser.TileSprite>this.game.add.tileSprite(0,0,-200,100,'platform');


      this.playerClass = new Player.playerFactory(this.game);
      this.playerSprite = this.playerClass.player;

    }


  }
}
