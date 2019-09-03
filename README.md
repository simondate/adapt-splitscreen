# adapt-splitscreen

This extension creates a container on the right hand side of the screen. The container can be used to display additional content for instance a [map](https://github.com/LearnChamp/adapt-minimap) that represents the content of a page. 

### Configure contentObjects.json
The attributes listed below are used in contentObjects.json to configure the splitscreen Plugin for each individual Page. Please see example.json for a working example.

#### Attributes
**_splitscreen** (object): The splitscreen object that contains the configuration values.
>**_isEnabled** (boolean): Enables/disables the splitscreen extension.
>**_screenWidth** (number): Sets the minimum screenwidth fot two column layout.