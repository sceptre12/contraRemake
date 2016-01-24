/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../gameObjects/player.ts"/>

module GameStates {
  export class GamePlayStart extends Phaser.State{
    game: Phaser.Game;
    player: Player.playerFactory;
    private bgTile;
    private platforms: Phaser.Group;

    constructor(){
      super();
    }

    preload(){

    }
    create(){

      //  We're going to be using physics, so enable the Arcade Physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.bgTile = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

      this.platforms = this.game.add.group();
      // allows all existing and new sprites to have physics body enabled
      this.platforms.enableBody = true;

      //creates ground
      var ground = this.platforms.create(0,this.game.height -34, 'platform');
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(4, 2);
      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      var ledge = this.platforms.create(this.game.width -200, 100, 'platform');
      ledge.body.immovable = true;

      ledge = this.platforms.create(400, 250, 'platform');
      ledge.body.immovable = true;


      this.player = new Player.playerFactory(this.game);
    }
    update(){
      this.game.physics.arcade.collide(this.player, this.platforms);
      this.bgTile.tilePosition.x -= 1;
      this.player.movement();
    }

  }
}
