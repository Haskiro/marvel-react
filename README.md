# Marvel

Marvel characters and comics.

**Client:**

-  React 18.2
-  Redux Toolkit 1.9.0
-  React-router
-  React-helmet
-  Formik
-  Yup
-  SCSS

**API:**

-  [Marvel Developer](https://developer.marvel.com/docs)

## About project:

**Main page**

-  List of marvel characters
-  Random character block, is updated every 60sec, can be rerolled force
-  Info block, while no character is clicked, skeleton displayed, else info about chosen char is shown
-  Searching characters by their name
-  Loading additional heroes by pressing the load button

**Comics page**

-  List of marvel comics
-  Clicking on comic card links to single comic page
-  Loading additional heroes by pressing the load button

**Single comic and character pages**

-  Info about comic/character
-  Back button

**Navigation**

-  _Characters_ button links to Main page
-  _Comics_ button links to Comics page

**Url routes**

-  _/_ - main page
-  _/comics_ - comics page
-  _/comics/{id}_ - single comic page
-  _/char/{id}_ - single character page

**Other**

-  Handling possible errors in the component using error boundary
-  Displaingy spinner and error component during load/error respectively

## Quick start

To run the project, you need to install all the dependencies with the command:
```
npm install
```
After installing all the dependencies, the application is launched with the command:
```
npm start
```
