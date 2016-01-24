/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
module GameStates {
  export class TitleScreenState extends Phaser.State{
    game: Phaser.Game; // gets an instance of the game
    titleScreenImage: Phaser.Sprite;

    constructor(){
      super();
    }

    preload(){

    }

    create(){
      this.game.add.sprite(0,0,'sky');
      // Welcome Text to start the game
      var textX = this.game.width/2 - 200;
      var textY = this.game.height/2 - 300;
      this.game.add.text(textX, textY, 'Welcome to ContraRemake', { fontSize: '32px', fill: '#000' });

      // start button for the game
      var bDecrease = 100;
      var bWidth = this.game.width/2 - bDecrease;
      var bHeight = this.game.height/2 - bDecrease ;
      this.game.add.button(bHeight,bWidth, 'btn', this.startGame);
    }

    private startGame(): void{
      this.game.state.start('GamePlayStart');
    }
  }
}
