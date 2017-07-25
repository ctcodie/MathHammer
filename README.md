# MathHammer

# ToDo
* Add validation on inputs
* Account for special re-rolls, e.g reroll ones.
* Options for things like Feel no pain?
* Account for melta weapons? eg damage 2d6 pick the highest? 
* Something being weird about multidamage weapons.
	* When wounds are higher than weapon damage
	* When weapon damage is higher than wounds
* Need to do a lot of testing of rolls
* SEO and Google Analytics once it's hosted properly
* Contact me email address to add


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
	* Invul < Save
	* Invul = Save
	* Invul > Save
	* Actual Save > 6
	* Actual Save < 6
	Believe they are all functioning correctly
* Fixed issue with unsaved wounds. Didn't realise was returning successful saves instead of fails...
