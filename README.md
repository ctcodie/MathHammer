# MathHammer

mathhammer8th.surge.sh

A single page static site MathHammer calculator. MathHammer is a method of measuring a units' effectiveness by using averages, for players of the Warhammer 40k tabletop game.

# Bugs
<tumble weed>

# Fixed
* Updated average damage and shots on d6 to be more accurate, using 3.5.
* Armour saves with high AP weapons was functioning incorrectly. 
* Issue with reroll ones to hit/wound paired with reroll wound/hit not working.


# ToDo
* Add validation on inputs
* Ability to input multiple weapons
* Bonus features, not priority
	* Options for things like Feel no pain? Cover?
	* AP modifying / mortal wound abilities like eldar bladestorm and sniper rifles
	* Quantum shielding
	* reroll/reroll ones armour saves
* Some weapons get multiple d6 damage or shots
* SEO
* Requested features
	* Allow users to see damage dealt from the attacking model, regardless of models removed. So 0.06 Unsaved Wounds, dealing 2 damage each, would result in 0.12 damage against multi-wound targets. Used for whole unit shooting. Need to add multi weapon support, for now shot values can be multiplied.
	* Compare different units and weapon configurations. Will require a lot of entry fields since can't use stats storage. Maybe have a "history" table? Highlight row with best results?
	* Damage per point is an important metric in tournament list building.
	* Show users a breakdown of damage & DPP against multiple toughness levels, and show them overall average Damage & DPP stats. For example. How good is a strength 4 weapon against toughness range 3 through 7?

# Done
* Generated site using jekyll
* Styled theme
* Set up input form
* Wrote JS, Functionality includes:
	* Flamers
	* large and small blasts
	* invul saves
	* full re-rolls and any modifiers, combinations of the two
* Updated columns to improve tab navigation
* Some test cases complete
	* D<W
	* D=W
	* D>W
	* D>>W
	* Invul < Save
	* Invul = Save
	* Invul > Save
	* Actual Save > 6
	* Actual Save < 6
	Believe they are all functioning correctly
* Fixed issue with unsaved wounds. Didn't realise was returning successful saves instead of fails...
* Fixed issues with multiwound vs multidamage. Should be calculating models removed correctly now.
* Added Google Analytics
* Created new email account and added to footer for contact
* Reroll ones to hit and to wound functionality added
* 2d6 pick highest damage weapons added
* Huge re-factor of JavaScript. Makes way more sense now...and it fixed reroll one/all combo issue

