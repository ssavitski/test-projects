#adapt-course-complete-button

An extension for removing default Go back button from the page and adding a new one after course is finished. This new one button is serve for returning back, signaling activity completion and closing the window

## Settings Overview

The attributes listed below are used in *course.json* to configure **Complete Activity button**, and are properly formatted as JSON in [*example.json*](https://github.com/RetainEd-io/adapt-custom-plugins/blob/master/adapt-course-complete-button/example.json). 

####_settings

The name of the extension object as used in the `course.json` file.

####_isEnabled

Turns on and off the Course complete button extension. Can be set in course.json to enable or disable "Complete Activity" button.

####_completeButton

The name of the object which contains "Complete Activity" button properties.

>#####ariaLabel
>The text that appears as a button description.  

>#####buttonText
>The caption displayed on the button.