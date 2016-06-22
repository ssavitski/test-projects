# adapt-proof-of-concept

**Proof of Concept** is an *extension* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).

The **Proof of Concept** extension is very similar to **Trickle** extension. Main difference is that it's allows to navigate through blocks or articles using next or prev page buttons.  The experience is like flipping through a book rather than reading one long single-page document. determines what portion of a page is presented to a learner and when the learner may advance to the next section. Using **Trickle**, a course author may hide/lock the portion of a page that follows an article or a block. A button may be displayed at the end of the visible portion; clicking this button releases the lock and scrolls the page to the next portion. If no button is displayed, the next section will unlock automatically once the current section has been completed by the user.

Many things for this extension were taken form **Trickle** extension and were modified in required manner. Properties that can be configured include: whether to show buttons when step is complete or make them enable, customize text for the buttons, turn off or on "prev page" button etc.


## Settings Overview

### Attributes

**_proofOfConcept** (object): The Proof Of Concept attributes group contains values for **_isEnabled**, **_onChildren**, **_buttons**, and **_stepLocking**.

>**_isEnabled** (boolean):  Turns on and off the **Proof of Concept** extension.
 
>**_onChildren** (boolean):  Determines whether the Proof of Concept settings should be applied to the article alone or if it should apply to its blocks. When set to `true` on an article, the article's Proof of Concept settings do not apply to the article; rather, the settings act as the default Proof of Concept settings for all the blocks contained by the article. When set to `false`, the settings act on the article itself. The default is `true`. (N.B. this attribute is ignored if set on a block.)
  
>**_buttons** (object): The buttons which are Prev and Next page buttons. This `_buttons` attributes group stores the objects for Prev and Next buttons.

>>**_prev** (object): The Prev page button. This "_prev" attributes group contains values for **_isEnabled**, **_style**, and **text**.

>>>**_isEnabled** (boolean):  If set to `false`, no button is displayed. And there is no way to get on previous step.

>>>**_style** (string):  Determines whether the Prev page button is always visible even if there is no previous steps. In this case it is disabled. Or becomes visible when there is at least one step before. Acceptable values are `"hidden"` and `"disabled"`.

>>>**text** (string):  Defines the default button text. The default is `"Prev page"`.

>>**_next** (object): The Next page button. This "_next" attributes group contains values for **_styleBeforeCompletion**, **text**, and **finalText**.
  
>>>**_styleBeforeCompletion** (string):  Determines whether the Next page button is visible and disabled while subsequent sections of the page remain inaccessible. Or appears on the page after next steps become available. Acceptable values are `"hidden"` and `"disabled"`. The default is `"disabled"`.

>>>**text** (string):  Defines the default button text. The default is `"Next page"`.
  
>>>**finalText** (string):  Defines the last item button text. The default is `"Complete Activity"`.

>>**_component** (string):  Defines the Proof of Concept plug-in which should handle the interaction. At present only `"navigate-buttons"` is available, but it is possible to create new plug-ins. The default is `"navigate-buttons"`.
  
>**_stepLocking** (object):  Step locking (section hiding) attributes group contains values for **_isEnabled**, **_isCompletionRequired**, and **_isLockedOnRevisit**.  
  
>>**_isEnabled** (boolean):  Will allow Proof of Concept to truncate the page at the step until the user is allowed to move forward. The default is `true`.
  
>>**_isCompletionRequired** (boolean):  Forces the user to complete the block/article before the step is unlocked. The default is `true`.
  
The following attribute can be added to *config.json* to overide which completion data attribute is used to test when the navigate buttons should be displayed.
  
>**_completionAttribute** (string): Defines which completion attribute is used to test when the navigate buttons should be displayed. By default this is `_isInteractionComplete` but can be changed to the core data attribute `_isComplete`.

## Limitations

No known limitations.
