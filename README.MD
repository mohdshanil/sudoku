# README
/******************************************************************/
# Author : Mohamed Shanil PA
# Language: Javascript
# Version: ES5
/******************************************************************/

# Tech Stack
  Node
  HTML5
  CSS3
  Javascript
  jquery  
  less   
  materialize
  Express

# RequireJS
NOTE : Javascript Module powewred by AMD with RequireJS !!

# Development / Unit Testing Stack
  NodeJS   Express   Karma   Jasmine-core   Jasmine-jquery   RequireJS   karma-requirejs   karma-jasmine-jquery

# Dir Structure
    # src - Development stuff

    ```
    app - UI components  
    images - pictures   
    lib - vendor library     
    styles - less style sheets   
    ```

    # test - testing
      Yet to work on

# Prerequisite  Setup
Step-1   -Install Nodejs in your machine.

Step-2   Install Bower, Karma globally on your machine (For OSX & Linux)

# Bower

```
-Go to the root directory
-Run command in terminal => npm install -g bower
-NOTE: Bower depends on Node.js and npm. Also make sure that git is installed as some bower packages require it   to be fetched and installed.
-NOTE: use sudo command if required
```

# Karma (Optional) Unit Test cases for Sudoku is not wriiten.

```
-Typing ./node_modules/karma/bin/karma start sucks and so you might find it useful to install karma-cli    globally. You will need to do this if you want to run Karma on Windows from the command line.
-Go to the root directory
-Run command in terminal => npm install -g karma-cli
```

Step-3   -To setup the Application environment you need to install package dependencies using the NPM & Bower package manager

# Install NPM packages

```
-Go to the root directory
-Run command in terminal => npm install
-NOTE: NPM packages are installed to node_modules directory.
```

# Install Bower packages

```
-Go to the root directory
-Run command in terminal => bower install
-NOTE: Bower packages are installed to src/lib directory.
```

Step-4

# Application bootstrap
  -You can use inbuilt Express package of NodeJS to bootstrap the Application.(NOT mandatory)   
  -To Start the Application run the following commands

-Go to the root directory -Run command in terminal => node server.js
-Open a browser and go to localhost:8080

Step-5

# Unit Testing (Optional)
- Unit testing is done using Jasmine, Karma test runner, RequireJS & the NPM packages. NPM packages mentioned in Step-3 needs to be installed prior to run test cases.
- -NOTE: Remove src/lib/Materialize/test folder. (Mandatory)
- -To start the Karma
- Run command in terminal => start karma
- By default Chrome browser will run the test specs. Go to localhost:9876


# Thanks to Atom IDE for making Javascript coding awesome !!
# For any query on the component please feel free to contact me
# Email : mohdshanil@yahoo.co.in
