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

  export class playerOne  {
    private damaged: boolean;
    public game: Phaser.Game;
    private weapons: Weapons.weapons;
    private lifes: number;
    private player: Phaser.Sprite;
    private playerState: PlayerState;
    private cursors: any; 
    private keyboardKeys: any;  
    private Escape: Phaser.Key;
    private currentWeapon:boolean;
    

    construct(game: Phaser.Game, config: playerConfig) {
      this.game = game;
      this.player = this.game.add.sprite(50, this.game.world.height, 'player');
      this.game.physics.arcade.enable(this.player);
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.keyboardKeys = this.game.input.keyboard.addKeys({'sWeapon':Phaser.KeyCode.X, 'fire': Phaser.KeyCode.C})
      this.player.body.gravity = playerConfig.gravity;
      this.player.body.collideWorldBounds = playerConfig.worldBounds;
      this.currentWeapon = true;
      //this.player.anchor.set(0.5,1.0);
    }

    updateMovement(): void {    
       if (this.cursors.left.isDown){
        this.moveLeft();
       }
      else if (this.cursors.right.isDown){
        this.moveDown();
       }
      else{
         this.standStill();
       }
      if (this.cursors.up.isDown && this.player.body.touching.down){
        this.moveDown();
      }
      if(this.keyboardKeys.sWeapon.isDown){
          currentWeapon = !currentWeapon;
      }
      if(this.keyboardKeys.fire.isDown){
        this.shoot();
      }
    }

    private moveRight(config: playerConfig): void {
      this.player.body.velocity.x = playerConfig.rightAxis;
      this.player.animations.play('right');
    }

    private standStill() {
      this.player.animations.stop();
      // this.player.frame = (pending frame);
    }

    private moveLeft(config: playerConfig): void {
      this.player.body.velocity.x = playerConfig.leftAxis;
      this.player.animations.play('left');
    }

    private jump(config: playerConfig): void {
      this.player.body.velocity.y = playerConfig.yAxis;
    }

    private shoot(): void {

    }

    setWeapons(weapon: any, weaponOption: number): void {
      this.weapons.setCurrentWeapon(weapon, weaponOption);
    }

    getCurrentWeapon(): Weapons.weapons {
      return this.weapons.getCurrentWeapon();
    }
    getSecondWeapon(): Weapons.weapons {
      return this.weapons.getSecondWeapon()
    }
    //initiates player.
    addAnimations(direction: string, frames: number[], speed: number, loop: boolean) {
      this.player.animations.add(direction, frames, speed, loop);
    }
  }
}
