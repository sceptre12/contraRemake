/// <reference path="../libs/jquery.d.ts"/>
/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts"/>

module gameLayout{
  export class GAMESTATS{
      private  gameWidth: number;
      private gameHeight: number;
      private  render: any;
      private parent: any;
      private state: any;

      constructor(gameWidth: number, gameHeight: number, render: any, parent: any, state: any){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.render = render;
        this.parent = parent;
        this.state = state;
      }
  }
}
