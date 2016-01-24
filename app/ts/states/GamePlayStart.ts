/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

module GameStates {
  export class GamePlayStart extends Phaser.State{
    game: Phaser.Game;
    private bgTile;

    constructor(){
      super();
    }

    preload(){

    }
    create(){      
      this.bgTile = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

      var platforms = this.game.add.group();

      // allows all existing and new sprites to have physics body enabled
      platforms.enableBody = true;

      //creates ground
      var ground = platforms.create(0,this.game.height -34, 'platform');
      //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
      ground.scale.setTo(4, 2);
      //  This stops it from falling away when you jump on it
      ground.body.immovable = true;

      var ledge = platforms.create(this.game.width -200, 100, 'platform');
      // ledge.scale.setTo(2,2);
      ledge.body.immovable = true;

      ledge = platforms.create(400, 250, 'platform');
      // ledge.scale.setTo(2,2);
      ledge.body.immovable = true;
    }
    update(){
      this.bgTile.tilePosition.x -= 1;
    }

  }
}
