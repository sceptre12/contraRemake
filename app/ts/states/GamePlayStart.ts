/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>
/// <reference path="../gameObjects/player.ts"/>

module GameStates {
  export class GamePlayStart extends Phaser.State {
    game: Phaser.Game;
    playerSprite: Phaser.Sprite;
    playerClass: Player.playerFactory;
    private bgTile: Phaser.TileSprite;
    private platforms: Phaser.Group;
    private landingPlats: Phaser.Group;
    private ground: Phaser.TileSprite;
    private stopped: boolean = false;

    constructor() {
      super();
    }

    preload() {
      // loading images
      this.game.load.image('platform', 'app/assets/platform.png');

      // Spritesheet
      this.game.load.spritesheet('dude', 'app/assets/dude.png', 32, 48);
    }
    update() {
      var cursor = this.playerClass.cursors;

      // detects and execute collision functions
      this.game.physics.arcade.collide(this.playerSprite, this.ground);
      this.game.physics.arcade.collide(this.playerSprite, this.landingPlats);


      this.playerClass.movement(this.playerSprite);

      if (cursor.right.isDown) {
        this.bgTile.tilePosition.x -= 1;
      }

      if (!this.stopped && this.playerSprite.x < this.game.width) {
        this.stopped = true;
        if (cursor.right.isDown) {
          this.landingPlats.forEachExists(function(landPlat) {
            landPlat.body.velocity.x = -150;
          }, this);
        }
      } else {
        this.stopped = false;
        this.landingPlats.forEachExists(function(landPlat) {
          landPlat.body.velocity.x = 0;
        }, this);
      }

      var count = 0;
      if (!this.stopped && this.playerSprite.x > this.game.width / 2) {
        if (cursor.right.justDown) {
              var curr = this;
              var platform = this.generatePlatforms(this.game, this.playerSprite);

              platform.forEachExists(function(landPlat) {
                landPlat.body.velocity.x = -150;
              }, this);
        }
      }

    }
    create() {

      //  We're going to be using physics, so enable the Arcade Physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.bgTile = <Phaser.TileSprite>this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

      //creates ground
      this.ground = <Phaser.TileSprite>this.game.add.tileSprite(0, this.game.world.height - 34, this.game.width, this.game.height, 'platform');

      this.game.physics.arcade.enable(this.ground);

      //  This stops it from falling away when you jump on it
      this.ground.body.immovable = true;


      this.landingPlats = <Phaser.Group>this.game.add.group();

      this.landingPlats.enableBody = true;

      this.landingPlats.create(this.game.width - 200, 100, 'platform').body.immovable = true;

      this.landingPlats.create(400, 250, 'platform').body.immovable = true;

      this.playerClass = new Player.playerFactory(this.game);

      this.playerSprite = this.playerClass.player;

      this.game.camera.follow(this.playerSprite);
    }

    generatePlatforms(game: Phaser.Game, player: Phaser.Sprite): Phaser.Group {
      var plat = <Phaser.Group>game.add.group();

      //Enable phsyics on these groups
      plat.enableBody = true;

      var ranPlatNum = this.game.rnd.integerInRange(0, 2);
      var platform: Phaser.Sprite;

      for (var i = 0; i < ranPlatNum; i++) {
        // add Sprite within an area excluding the beginning and ending
        var x = game.rnd.integerInRange(game.width, game.world.width);
        var y = game.rnd.integerInRange(game.height, game.world.height - game.height);
        plat.create(x, y, 'platform').body.immovable = true;

      }
      game.physics.arcade.collide(player, plat);

      return plat;
    }

  }
}
