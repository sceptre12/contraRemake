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
      var background = this.game.add.sprite(0,0,'background');
      background.width = this.game.width;
      // Welcome Text to start the game
      var textX = this.game.width/2 - 150;
      var textY = this.game.height/2 - 150 ;
      this.game.add.text(textX, textY, 'Welcome to ContraRemake', { fontSize: '32px', fill: '#000' });

      // start button for the game
      var bDecrease = 350;
      var bWidth = window.innerWidth/2;
      var bHeight = window.innerHeight/3 - 100;
      this.game.add.button(bWidth,bHeight, 'btn', this.startGame);
    }

    private startGame(): void{
      this.game.state.start('GamePlayStart');
    }
  }
}
