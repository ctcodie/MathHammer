# MathHammer

mathhammer8th.surge.sh

A single page static site MathHammer calculator. MathHammer is a method of measuring a units' effectiveness by using averages, for players of the Warhammer 40k tabletop game.

# Bugs
* Reroll ones to wound is causing more wounds than straight reroll

# ToDo
* Add validation on inputs
* Ability to input multiple weapons
* Bonus features, not priority
	* Options for things like Feel no pain? Cover?
	* Account for melta weapons? eg damage 2d6 pick the highest? How does this affect the average? 
		1d6 average is 3.5, so a roll of 4.
		2d6 average is 4.47, which is still a roll of 4?
	* AP modifying / mortal wound abilities like eldar bladestorm and sniper rifles
* Some weapons get multiple d6 damage or shots
* SEO


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
