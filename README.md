# Age convertor

This full stack app takes in name and date of birth and calculates a users age in years, days and hours.

Calculated data for all entries is displayed in tabular format.

## Table of contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Contact](#contact)

## General info
This app was built to satisfy the following User Story and acceptance criteria:

- **User Story #1**: As a web user, I wish to find out my age accurate to number of hours so that I can impress my friends.

- **Acceptance Criteria #1**: A name can be entered. 
- **Acceptance Criteria #2**: My date of birth can be entered using a date picker.
- **Acceptance Criteria #3**: My age in years days and hours is displayed.
- **Acceptance Criteria #4**: Name and age of previous submissions is displayed

## Technologies
* React.js, express.js, mongoose.js, node.js, mongodb

The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 

## Setup

1. In both the **root** project directory run: `npm install`, to install the required backend dependencies.
2. Navigate to the client/ directory and run: `npm install`, to install the required frontend dependencies.
3. Sign up for a [MongoDB account](https://account.mongodb.com/account/login) (if you don't already have one).
4. Create a .env file within the root project directory and add a <code>MONGO_URI=</code> entry with your MongoDB url.  There should be no whitespace seperating the variable from the value.
5. Within the root directory, run `npm run dev` to start the app

## Available Scripts

In the project directory, you can run:

### 'node server.js'

Runs the app in backend mode.
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.  Note, the server should be restarted to reflect changes in code.

### `npm run dev`

Runs the full stack app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to front or backend code.