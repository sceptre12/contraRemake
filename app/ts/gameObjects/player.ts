/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="./weapons.ts"/>

module Player {
  abstract class playerConfig{
    public static gravity: number = 500;
    public static worldBounds: boolean = true;
    public static leftAxis: number = -250;
    public static rightAxis: number =250;
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
    private player: any;
    private playerState: PlayerState;
    private cursors: any;
    private keyboardKeys: any;
    private Escape: Phaser.Key;
    private weaponSelection: boolean;


    constructor(game: Phaser.Game) {
      // initalizes game
      this.game = game;

      this.player = this.game.add.sprite(32, this.game.world.height -100, 'dude');

      // Enables physics properties on the object
      this.game.physics.arcade.enable(this.player);

      // Player physics properties. Give the little guy a slight bounce.
      this.player.body.bounce.y = 0.2;

      /*
        Local gravity applied to this obj, if non zero overrides world gravity
        unless body.allowGravity is set to false
      */
      this.player.body.gravity = playerConfig.gravity;

      /*
        A Body can be set to collide against the World bounds automatically and
        rebound back into the World if this is set to true. Otherwise it will leave the World.
      */
      this.player.body.collideWorldBounds = playerConfig.worldBounds;

      // returns an object containing up/down/left/right
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // Creates hot keys for the game
      this.keyboardKeys = this.game.input.keyboard.addKeys(
        {
          sWeapon: Phaser.Keyboard.X,
          fire: Phaser.Keyboard.C
        }
      )
      this.weaponSelection = true;

      // this.player.anchor.set(0.5,1.0);
    }

    updateMovement(): void {
      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        this.moveLeft();
      }
      else if (this.cursors.right.isDown) {
        console.log(playerConfig.yAxis);
        this.moveRight();
      }
      else {
        this.standStill();
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
        console.log(1,playerConfig.yAxis);
        this.player.body.velocity.Y = playerConfig.yAxis;
      }

      // if (this.keyboardKeys.sWeapon.isDown) {
      //   this.weaponSelection = !this.weaponSelection;
      // }
      // if (this.keyboardKeys.fire.isDown) {
      //   this.shoot();
      // }
    }

    private moveRight(): void {
      this.player.body.velocity.x = playerConfig.rightAxis;
      this.player.animations.play('right');
    }

    private standStill() {
      this.player.animations.stop();
      this.player.frame = 5;
    }

    private moveLeft(): void {
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

    // getSecondWeapon(): Weapons.weapons {
    //   return this.weapons.getSecondWeapon()
    // }
    //initiates player.
    addAnimations(direction: string, frames: number[], speed: number, loop: boolean) {
      this.player.animations.add(direction, frames, speed, loop);
    }
  }
}
