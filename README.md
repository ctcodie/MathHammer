# MathHammer

mathhammer8th.surge.sh

# ToDo
* Add validation on inputs
* Ability to input multiple weapons
* Bonus features, not priority
	* Options for things like Feel no pain? Cover?
	* Account for melta weapons? eg damage 2d6 pick the highest? How does this affect the average? 
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
