/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="./weapons.ts"/>

module Player {
  export class playerFactory {
     game: Phaser.Game;
     player: Phaser.Sprite;
     cursors: Phaser.CursorKeys;

    constructor(game: Phaser.Game) {
      this.game = game;

      // Initializes the player obj
      this.player = <Phaser.Sprite>this.game.add.sprite(52, this.game.height - 80, 'dude');


      // Adds the player object to the physics
      this.game.physics.arcade.enable(this.player);

      //  Player physics properties. Give the little guy a slight bounce.
      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;
      this.player.body.setSize(20, 32, 5, 16);

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true);

      this.cursors = this.game.input.keyboard.createCursorKeys();
    }
    movement(playerObj: Phaser.Sprite): void {
      //  Reset the players velocity (movement)
      playerObj.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        //  Move to the left
        playerObj.body.velocity.x = -150;
        playerObj.animations.play('left');
      }
      else if (this.cursors.right.isDown) {
        //  Move to the right
        playerObj.body.velocity.x = 150;
        playerObj.animations.play('right');
      }
      else {
        //  Stand still
        playerObj.animations.stop();
        playerObj.frame = 4;
      }
      //  Allow the player to jump if they are touching the ground.
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        playerObj.body.velocity.y = -350;
      }
    }
  }
}
