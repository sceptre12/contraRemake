/// <reference path="../libs/jquery.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="./states/titleScreenState.ts"/>

module ContraRemake {
  export class startGame{
      game: Phaser.Game;
      constructor(){
        this.game = new Phaser.Game(window.innerWidth,428, Phaser.AUTO,'#gameArea',{
          create: this.create, preload: this.preload
        });
      };

      private preload(){
        // Graphics
        this.game.load.image('background','app/assets/background.png');
        this.game.load.image('btn','app/assets/btn.png');
        this.game.load.image('platform','app/assets/platform.png');

        // Spritesheet
        this.game.load.spritesheet('dude','app/assets/dude.png', 32,48);
      }

      private create(){
        this.game.state.add("TitleScreenState", GameStates.TitleScreenState, true);
        this.game.state.add("GamePlayStart", GameStates.GamePlayStart, false);
      }
      private update(){

      }
  };
};
// overrides the onload function
window.onload = () => {
  var game = new ContraRemake.startGame();
}
