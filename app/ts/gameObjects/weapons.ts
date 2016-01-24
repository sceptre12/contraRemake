/// <reference path="../../libs/jquery.d.ts"/>
/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts"/>

module Weapons {
export abstract class weaponsList {
    //Labeled "S" on the game and shoots several red balls at the same time
    public static spreadGun: any = {
      fireRate: 7,
      damage: 5,
      gunType: "S"
    }
    //default Gun starting at the beggining , max fire rate low damage
    public static machineGun: any = {
      fireRate: 10,
      damage: 6,
      type: "M"
    }
    //Crush gun, very slow fire Rate but powerful
    public static crushGun: any = {
      fireRate: 4,
      damage: 8,
      type: "C"
    }

  }

  export class weapons {
    private currentWeapon: any;
    private secondWeapon: any;
    private defaultWeapon: any;

    construct(weapon: any, defaultWeapon: weaponsList) {
      this.defaultWeapon = weaponsList.machineGun;
      this.currentWeapon = weaponsList.machineGun;
      this.secondWeapon = null;
    }

    setCurrentWeapon(weapon: any, weaponOption:number) {
     switch (weaponOption) {
       case 1:
         this.currentWeapon = weapon; 
         break;
       case 2:
         this.currentWeapon = weapon;
          break;
       default:
         // code...
         break;
     }
      this.currentWeapon = weapon;
    }
    getCurrentWeapon(): weapons {
      return this.currentWeapon;
    }


  }
}
