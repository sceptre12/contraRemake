module Weapons{
	interface weaponsList{
		//Labeled "S" on the game and shoots several red balls at the same time
		spreadGun:any = {
			fireRate: 7,
			damage: 5,
			type: string = "S"
		}
		//default Gun starting at the beggining , max fire rate low damage
		machineGun: any = {
			fireRate: 10,
			damage: 6,
			type: string = "M" 
		}
		//Crush gun, very slow fire Rate but powerful
		crushGun: any = {
			fireRate: 4,
			damage: 8
			type: string = "C"
		}
	}	

	export class weapons{
		private currentWeapon: any;

		construct(weapon: any, defaultWeapon: weaponsList){
			this.currentWeapon = defaultWeapon.machineGun;
		}

		setCurrentWeapon(weapon: any){
			this.currentWeapon = weapon;
		}
		getCurrentWeapon(): weapons{
			return this.currentWeapon;
		}


	}
}