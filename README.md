# Cook-or-Naught

## Overview

Cook-or-Naught is a multi-functional website application that allows the user to seach for recipes and restaurants all in the same application. 

The user can search for specific recipes or ingredients and can save them to a database for reference later(if they are signed in). they can also click "I'm Feeling Lucky" and the site will generate a random recipe. 

If the user decides they no longer want to cook and would rather go out to eat they can seach and get directions to local restaurants that serve a particular cuisine. 

## How It Works

The user is greeted with a colorful page of food images that are randomly generated each time the page is loaded. This information is pulled in from an api. The user can click one of those to see that recipe. The user can also seach for a specific dish or ingredient and 10 relevant recipes will populate for the user to choose from. 

If the user likes one and wants to save it, they can save it to their favorites page. The user must be signed in to do this. This is achieved through user authentication and storage in the Firebase database. The user will stay signed in until they choose to sign out. 

Should the user decide they want to go out to eat instead, an api call will be made to google maps using geolocation to determine the user's current location and the user can then choose the radius and type of cuisine they want to search. They user then picks a location and is then given walking, driving, or transit directions to that location. 

## Functionality achieved through:
  CSS,
  Bootstrap,
  Bootswatch,
  JavaScript,
  jQuery, 
  Firebase, 
  google maps api, 
  recipes api, 
  user authentication
