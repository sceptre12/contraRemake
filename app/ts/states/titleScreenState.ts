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
      this.game.add.text(16, 16, 'Welcome to ContraRemake', { fontSize: '32px', fill: '#000' });
      // start button for the game
      var decrease = 200;
      var width = this.game.width/2 - decrease;
      var height = this.game.height/2 - decrease ;
      this.game.add.button(height,width, 'btn', this.startGame);
    }

    private startGame(): void{
      this.game.state.start('GamePlayStart');
    }
  }
}
