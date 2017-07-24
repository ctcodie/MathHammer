$(document).ready(function() {

	// Declare variables

	var ballisticSkill = 0;
	var	numberOfShots = 0;
	var	weaponStrength = 0;
	var	targetToughness = 0;
	var	weaponDamage = 1;
	var weaponDamageD3 = false;
	var weaponDamageD6 = false;
	var targetWounds = 1;
	var	armourSave = 7;

	// Set to 7 for no invul save as default, so logic below operates properly
	var	invulSave = 7;
	var	armourPiercing = 3;
	var	actualSave = 0;
	var hits = 0;
	var wounds = 0;
	var unsavedWounds = 0;
	var flamer = false;
	var smallBlast = false;
	var largeBlast = false;
	var rerollHit = false;
	var rerollWound = false;
	var hitMod = 0;
	var woundMod = 0;
	var woundRoll = 0;
	var woundRatio = 0;
	var kills = 0;
	var noSave = false;
	var assault = false;
	var numberOfAttacks = 0;
	var weaponSkill = 0;
	var leadership = 6;
	var moraleCasualties = 0;

	// Get Inputs

	

	// Perform initial calculations
	
	if (assault === true){
		ballisticSkill = weaponSkill;
		numberOfShots = numberOfAttacks;
	}

	// Calculate actual to save roll including ap

	actualSave = armourSave + armourPiercing;

	if (actualSave + armourPiercing >=7){
		noSave = true;
	}

	// Wound ratio determines the To Wound roll

	woundRatio = targetToughness / weaponStrength;

	// Decide whether to use armour save or invul save, whichever is better

	if (actualSave > invulSave){
		actualSave = invulSave;
	}
	console.log('Actual Save = ' + actualSave);

	// Sets average number of shots for d3 or d6 shot weapons. 

	if (smallBlast === true){
		numberOfShots = 2;
	}
	if (largeBlast === true || flamer === true){
		numberOfShots = 4;
	} 

	// Sets auto hits for flamer

	if (flamer === true){
		hitMod = 0;
		ballisticSkill = 1;
	}

	// Sets weapon damage for d3/d6 damage stat

	if (weaponDamage === 0){
		if (weaponDamageD3 === true){
			weaponDamage = 2;
		} else {
			weaponDamage = 4;
		}
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
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("No reroll/mod causes " + kills + " models removed and " + moraleCasualties + " morale");
	
	// Reroll hit, no modifiers
	
	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit " + kills + " models removed");
	
	// Reroll wound, no modifiers
	
	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll wound " + kills + " models removed");
	
	// No Rerolls, to hit modifier
	
	}else if(rerollHit==false && rerollWound==false && hitMod!=0 && woundMod==0){
		//minus hit mod because it's a dice roll. so minus 1 to hit penalty goes from 3+ to 4+. +1 to hit
		//goes 3+ to 2+...counter intuitive but correct. 
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		console.log(hits +' hits');
		wounds = rollToWound(woundRoll, hits);
		console.log(wounds +' wounds');
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Mod to hit " + kills + " models removed");
	
	// No Reroll, to wound modifier
	
	}else if(rerollHit==false && rerollWound==false && hitMod==0 && woundMod!=0){
		woundRoll -= woundMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		console.log(hits +' hits');
		wounds = rollToWound(woundRoll, hits);
		console.log(wounds +' wounds');
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Mod to hit " + kills + " models removed");
	
	// Reroll to hit and wound, no modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and wound " + kills + " models removed");
	
	// Reroll to wound with hit modifier
	
	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod==0){
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll wound and hit mod " + kills + " models removed");
	
	// Reroll to wound with wound modifier
	
	}else if(rerollHit==false && rerollWound==true && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll wound and wound mod " + kills + " models removed");
	
	// Reroll wound with to hit and wound modifiers
	
	}else if(rerollHit==false && rerollWound==true && hitMod!=0 && woundMod!=0){
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod;
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll wound and wound mod " + kills + " models removed");
	
	// Reroll hit with hit modifier
	
	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and hit mod " + kills + " models removed");
	
	// Reroll hit with wound modifier
	
	}else if(rerollHit==true && rerollWound==false && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		woundRoll -= woundMod;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit wound mod " + kills + " models removed");
	
	// Reroll hit with to wound and to hit modifiers
	
	}else if(rerollHit==true && rerollWound==false && hitMod!=0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		woundRoll -= woundMod;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and both mod " + kills + " models removed");
	
	// Reroll to hit and wound with hit modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod!=0 && woundMod==0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		ballisticSkill -= hitMod;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and wound with hit mod " + kills + " models removed");
	
	// Reroll to hit and wound with wound modifier
	
	}else if(rerollHit==true && rerollWound==true && hitMod==0 && woundMod!=0){
		hits = rollToHit(ballisticSkill, numberOfShots);
		numberOfShots -= hits;
		hits = rollToHit(ballisticSkill, numberOfShots);
		wounds = rollToWound(woundRoll, hits);
		woundRoll -= woundMod;
		hits -= wounds;
		wounds = rollToWound(woundRoll, hits);
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and wound with wound mod " + kills + " models removed");

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
		unsavedWounds = rollToSave(wounds, actualSave, noSave);
		kills = calculateKills(unsavedWounds, weaponDamage, targetWounds);
		moraleCasualties = calculateMoraleDamage(leadership, kills);
		console.log("Reroll hit and wound with both mod " + kills + " models removed");
	}else{
		console.log("Oh No! Something broke in the ifs");
	}

	// Put outputs into page

	// Functions for rolls

	function rollToHit(ballisticSkill, numberOfShots){
		return hits += (numberOfShots * (7 - ballisticSkill))/6;
	}

	function rollToWound(woundRoll,hits){
		return wounds += (hits * (7 - woundRoll))/6;
	}

	function rollToSave(wounds,actualSave,noSave){
		if (noSave === true){
			return unsavedWounds = wounds;
		} else {
			return unsavedWounds = (wounds * (7 - actualSave))/6;
		}
	}

	function calculateKills(unsavedWounds, weaponDamage,targetWounds){
		if (weaponDamage < targetWounds){
			kills = (unsavedWounds * weaponDamage) % targetWounds;
		} else {
			kills = Math.floor(unsavedWounds);
		}
		return kills
	}

	function calculateMoraleDamage(leadership, kills){
		moraleCasualties = leadership - kills - 4;
		if (moraleCasualties < 0){
			return moraleCasualties *= -1;
		}else{
			return moraleCasualties = 0;
		}
	}
});