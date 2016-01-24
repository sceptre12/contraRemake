/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="./weapons.ts"/>

module Player {
  abstract class playerConfig {
    public static gravity: number = 500;
    public static worldBounds: boolean = true;
    public static leftAxis: number = -50;
    public static rightAxis: number = 50;
    public static yAxis: number = -100;
  }

  export enum PlayerState {
    IDLE, WALKING
  }

  export class playerOne extends Phaser.Sprite {
    private damaged: boolean;
    public game: Phaser.Game;
    private weapons: Weapons.weapons;
    private lifes: number;
    private player: Phaser.Sprite;
    private playerState: PlayerState;
    private RIGHT_ARROW: Phaser.Key;
    private LEFT_ARROW: Phaser.Key;
    private Escape: Phaser.Key;
    private walkingSpeed: number;
    public static MAX_SPEED = 50;

    construct(game: Phaser.Game, x: number, y: number, frameName: string, config: playerConfig) {
      this.game = game;
      this.player = this.game.add.sprite(x, y, frameName);
      this.game.physics.arcade.enable(this.player);

      this.player.body.gravity = playerConfig.gravity;
      this.player.body.collideWorldBounds = playerConfig.worldBounds;
    }

    moveRight(config: playerConfig): void {
      this.player.body.velocity.x = playerConfig.rightAxis;
      this.player.animations.play('right');
    }



    standStill() {
      this.player.animations.stop();
      // this.player.frame = (pending frame);
    }

    moveLeft(config: playerConfig): void {
      this.player.body.velocity.x = playerConfig.leftAxis;
      this.player.animations.play('left');
    }

    jump(config: playerConfig): void {
      this.player.body.velocity.y = playerConfig.yAxis;
    }

    shoot(): void {

    }

    setWeapon(weapon: any): void {
      this.weapons.setCurrentWeapon(weapon);
    }

    getWeapon(): Weapons.weapons {
      return this.weapons.getCurrentWeapon();
    }

    addAnimations(direction: string, frames: number[], speed: number, loop: boolean) {
      this.player.animations.add(direction, frames, speed, loop);
    }
  }
}
