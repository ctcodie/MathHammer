$(document).ready(function() {

	// Declare variables

	var ballisticSkill = 4;
	var	numberOfShots = 10;
	var	weaponStrength = 4;
	var	targetToughness = 4;
	var	weaponDamage = 0;
	var	armourSave = 4;
	// Set to 7 for no invul save as default, so logic below operates properly
	var	invulSave = 7;
	var	armourPiercing = 0;
	var	actualSave = 0;
	var hits = 0;
	var wounds = 0;
	var unsavedWounds = 0;
	var flamer = 0;
	var smallBlast = 0;
	var largeBlast = 0;
	var rerollHit = false;
	var rerollWound = false;
	var hitMod = 0;
	var woundMod = 0;
	var woundRoll = 0;
	var woundRatio = 0;

	// Get Inputs



	// Perform initial calculations

	actualSave = armourSave - armourPiercing;

	woundRatio = targetToughness / weaponStrength;

	if (actualSave > invulSave){
		actualSave = invulSave;
	}
	console.log('Actual Save = ' + actualSave);

	// Sets average number of shots for d3 or d6 shot weapons. 

	if (smallBlast != 0){
		numberOfShots = 2;
	}
	if (largeBlast != 0 || flamer != 0){
		numberOfShots = 4;
	} 

	// Sets auto hits for flamer

	if (flamer != 0){
		hitMod = 0;
		ballisticSkill = 1;
	}

	// Calculate the wound roll according to weapon strength and target toughness. eg. S8 wounds T4 on 2+

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

	// Call functions for various scenarios
	// This could probably be DRY-er...
	// Order of calls and variable changes is important, rerolls happen then modifiers as per
	// 40k 8th Ed rules. 24/07/17
	// No rerolls or modifiers
	if (rerollHit==false && rerollWound==false && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("No reroll/mod causes " + unsavedWounds + " unsaved wounds");
	
	// Reroll hit, no modifiers
	
	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit " + unsavedWounds + " unsaved wounds");
	
	// Reroll wound, no modifiers
	
	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll wound " + unsavedWounds + " unsaved wounds");
	
	// No Rerolls, to hit modifier
	
	}else if(rerollHit==false && rerollWound==false && hitMod!=0 && woundMod==0){
		//minus hit mod because it's a dice roll. so minus 1 to hit penalty goes from 3+ to 4+. +1 to hit
		//goes 3+ to 2+...counter intuitive but correct. 
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		console.log(hits +' hits');
		wounds = rollToWound(woundRoll, hits);
		console.log(wounds +' wounds');
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Mod to hit " + unsavedWounds + " unsaved wounds");
	
	// No Reroll, to wound modifier
	
	}else if(rerollHit==false && rerollWound==false && hitMod==0 && woundMod!=0){
		woundRoll -= woundMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		console.log(hits +' hits');
		wounds = rollToWound(woundRoll, hits);
		console.log(wounds +' wounds');
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Mod to hit " + unsavedWounds + " unsaved wounds");
	
	// Reroll to hit and wound, no modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and wound " + unsavedWounds + " unsaved wounds");
	
	// Reroll to wound with hit modifier
	
	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod==0){
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll wound and hit mod " + unsavedWounds + " unsaved wounds");
	
	// Reroll to wound with wound modifier
	
	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll wound and wound mod " + unsavedWounds + " unsaved wounds");
	
	// Reroll wound with to hit and wound modifiers
	
	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod!=0){
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod;
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll wound and wound mod " + unsavedWounds + " unsaved wounds");
	
	// Reroll hit with hit modifier
	
	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and hit mod" + unsavedWounds + " unsaved wounds");
	
	// Reroll hit with wound modifier
	
	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		woundRoll -= woundMod;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit wound mod" + unsavedWounds + " unsaved wounds");
	
	// Reroll hit with to wound and to hit modifiers
	
	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		woundRoll -= woundMod;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and both mod" + unsavedWounds + " unsaved wounds");
	
	// Reroll to hit and wound with hit modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod!=0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and wound with hit mod" + unsavedWounds + " unsaved wounds");
	
	// Reroll to hit and wound with wound modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod;
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and wound with wound mod" + unsavedWounds + " unsaved wounds");

	// Reroll to hit and wound with hit and wound modifiers
	
	}else if(rerollHit==true && rerollWound==true && hitMod!=0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		ballisticSkill -= hitMod;
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod;
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave);
		console.log("Reroll hit and wound with both mod" + unsavedWounds + " unsaved wounds");
	}else{
		console.log("Oh No! Something broke in the ifs");
	}

	// Functions for rolls

	function rollToHit(ballisticSkill, numberOfShots){
		return hits += (numberOfShots * (7 - ballisticSkill))/6;
	}

	function rollToWound(woundRoll,hits){
		return wounds += (hits * (7 - woundRoll))/6;
	}

	function rollToSave(wounds,actualSave){
		return unsavedWounds = (wounds * (7 - actualSave))/6;
	}
});