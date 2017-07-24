$(document).ready(function() {
	// Declare variables and get input
	var ballisticSkill = 4;
	var	numberOfShots = 10;
	var	weaponStrength = 4;
	var	targetToughness = 4;
	var	weaponDamage = 0;
	var	armourSave = 4;
	var	invulSave = 7;
	var	armourPiercing = 0;
	var	actualSave = 0;
	var hits = 0;
	var wounds = 0;
	var kills = 0;
	var flamer = 0;
	var smallBlast = 0;
	var largeBlast = 0;
	var rerollHit = false;
	var rerollWound = false;
	var hitMod = -1;
	var woundMod = 0;
	var woundRoll = 0;
	var woundRatio = 0;
	var totalKills = 0;

	// Perform initial calculations
	actualSave = armourSave - armourPiercing;

	woundRatio = targetToughness / weaponStrength;

	if (actualSave > invulSave){
		actualSave = invulSave;
	}
	console.log('Actual Save = ' + actualSave);

	if (flamer != 0){
		numberOfShots = 4;
	}
	if (smallBlast != 0){
		numberOfShots = 2;
	}
	if (largeBlast != 0){
		numberOfShots = 4;
	} 

	if (woundRatio <= 0.5){
		woundRoll = 2;
	}else if (woundRatio > 0.5 && woundRatio < 1){
		woundRoll = 3;
	}else if (woundRatio == 1){
		woundRoll = 4;
	}else if (woundRatio > 1 && woundRatio < 2){
		woundRoll = 5;
	}else if (woundRatio >= 2){
		woundRoll = 6;
	}else{
		console.log("Wound Roll Calculation Failure")
	}
	console.log('Wound Roll =' + woundRoll);

	// Call functions
	// Super messy. Must be a DRY way to do this...
	if (rerollHit==false && rerollWound==false && hitMod==0 && woundMod==0){
		hits = toHit(ballisticSkill, numberOfShots);
		wounds = toWound(woundRoll, hits);
		kills = toKill(wounds, actualSave);
		console.log("No reroll/mod kills " + kills + " one wound models");
	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod==0){
		hits = toHit(ballisticSkill, numberOfShots);
		numberOfShots = numberOfShots - hits;
		hits = toHit(ballisticSkill, numberOfShots);
		wounds = toWound(woundRoll, hits);
		kills = toKill(wounds, actualSave);
		console.log("Reroll hit " + kills + " one wound models");
	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod==0){
		hits = toHit(ballisticSkill, numberOfShots);
		wounds = toWound(woundRoll, hits);
		hits = hits - wounds;
		wounds = toWound(woundRoll, hits);
		kills = toKill(wounds, actualSave);
		console.log("Reroll wound " + kills + " one wound models");
	}else if(rerollHit==false && rerollWound==false && hitMod!=0 && woundMod==0){
		//minus hit mod because it's a dice roll. so minus 1 to hit penalty goes from 3+ to 4+. +1 to hit
		//goes 3+ to 2+...counter intuitive but correct. 
		ballisticSkill -= hitMod;
		hits = toHit(ballisticSkill, numberOfShots);
		console.log(hits +' hits');
		wounds = toWound(woundRoll, hits);
		console.log(wounds +' wounds');
		kills = toKill(wounds, actualSave);
		console.log("Mod to hit " + kills + " one wound models");
	}else if(rerollHit==false && rerollWound==false && hitMod==0 && woundMod!=0){

	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod==0){

	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod==0){

	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod!=0){

	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod!=0){

	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod==0){

	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod!=0){

	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod!=0){

	}else if(rerollHit==true && rerollWound==true && hitMod!=0 && woundMod==0){

	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod!=0){

	}else if(rerollHit==true && rerollWound==true && hitMod!=0 && woundMod!=0){

	}else{
		console.log("Oh No! Something broke in the ifs");
	}

	// Functions for rolls
	function toHit(ballisticSkill, numberOfShots){
		return hits += (numberOfShots * (7 - ballisticSkill))/6;
	}

	function toWound(woundRoll,hits){
		return wounds += (hits * (7 - woundRoll))/6;
	}

	function toKill(wounds,actualSave){
		return kills = (wounds * (7 - actualSave))/6;
	}
});