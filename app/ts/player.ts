module Player{
	interface playerConfig{
		gravity: number = 500;
		worldBounds: boolean = true;
		leftAxis:number = -50;
		rightAxis: number = 50;
		yAxis: number = -100;
	}

	export enum PlayerState {
		IDLE, WALKING
	}

	export class playerOne extends Phaser.Sprite{
		private damaged: boolean;
		private game: Phaser.Game;
		private weapons: Weapons.weapon; 
		private lifes: number;
		private playerState: PlayerState;
		private RIGHT_ARROW: Phaser.key;
		private LEFT_ARROW: Phaser.key;
		private Escape: Phaser.key;
		private walkingSpeed: number;
		public static MAX_SPEED = 50;
		
		construct(game: Phaser.game){
			this.game = game;
			this.weapons = new Weapons.weapon();
			super(this.game,x,y,frameName);


		}

		setUpPlayer(x: number, y: number, frameName: string, config: playerConfig ): void{
			this.player = this.game.add.sprite(x,y,frameName); 
			this.game.physics.arcade.enable(this.player);
			this.player.body.gravity = config.gravity;
			this.player.body.collideWorldBounds = config.worldBounds;		
		}

		moveRight(config: playerConfig): void{
			this.player.body.velocity.x = config.rightAxis;
			this.player.animations.play('right');			
		}

		standStill(){
			this.player.animations.stop();
			this.player.frame  = (pending frame);
		}

		moveLeft(config: playerConfig): void{
			this.player.body.velocity.x = config.leftAxis;
			this.player.animations.play('left');
		}

		jump(config: playerConfig): void{
			this.player.body.velocity.y = config.yAxis;
		}

		shoot(): void {
				
		}

		setWeapon(weapon: any): void{
			this.weapon.setCurrentWeapon(weapon);
		}

		getWeapon(): weapons{		
			return this.weapon.getWeapon();
		}

		addAnimations(direction: string,frames: number[], speed: number, loop: boolean ){
			this.player.animations.add(direction, frames, speed, loop); 
		}


	}




}