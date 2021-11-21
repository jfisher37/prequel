# Prequel-Streaming

![License Badge](https://img.shields.io/badge/license-MIT-blue)

## Description

This application is designed to be a video upload and streaming service specifically for independent film/TV show creators to upload their work and for industry professionals to find new projects to fund. Unaffiliated viewers can view and provide likes/dislikes to videos posted, providing industry professionals with a barometer of public interest in a work as well. The overall goal of the project is to get more industry eyes on up-and-coming independent creators. 

It was created using a MERN-stack setup:

* React as the front-end view
    * React-Bootstrap for styling
* GraphQL with Node.js and Express.js servers
* MongoDB and Mongoose ODM for database storage
* Heroku for deployment
* JWT (JSON WebTokens) for user authentication

Here are screenshots of the app's primary pages:

![Main Page Screenshot]()
![Video Page Screenshot]()

Here is a link to the Heroku deployment: [Prequel Heroku Deployment]()

## Table of Contents

-- [Installation](#installation) - Thinking of getting rid of this section entirely. Leaving in for now

-- [Usage](#usage)

-- [License](#license)

-- [Contributing](#contributing) - Section may be deleted

-- [Tests](#tests) - Section may be deleted

-- [Questions](#questions)

## Installation

Nothing needs to be installed on the Heroku deployment. The app will function upon navigation to the address. However, if the repo will be cloned to your local machine for usage on your own localhost:

To install necessary dependencies, run the following command:

    npm i

This app uses mongoDB and mongoose. To seed the database with the samples provided, run the following command in your terminal:

    node seeders/seeds.js

## Usage

Navigate to the Heroku link provided above to get to the deployed app. Once there, an account can be created, videos can be uploaded, and all videos on the site can be seen on the main page with the most recently uploaded video being at the top of the list. The profile page will display all of the videos that the logged-in user, personally, has uploaded. A user can also delete any video they have uploaded from the database at their leisure. Individual videos can be liked or disliked by a user, with a counter incrementing on the video screen.

When visiting the site, you can create your own account or use a dummy account provided here that has a few uploaded videos already, just to demo the functionality of the site:

- Email:
- Password:

## License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) license. (2021) (Aidan Rich, Nicole Pingar, Joey Fisher, and Phil Bohn)

## Contributing

N/A

## Tests

N/A

## Questions

If there any questions regarding this project, our group, consisting of Aidan Rich, Nicole Pingar, Joey Fisher, and Phil Bohn can be contacted in the following places:

Our GitHub profiles are here: [Aidan Rich](https://github.com/aidanrich) --- [Nicole Pingar](https://github.com/nicolepingar) --- [Joey Fisher](https://github.com/jfisher37) --- [Phil Bohn](https://github.com/lamperouge1218)

Email: philbohn1791@gmail.com
