# Pup Snuggles App

Pup Snuggles is a fun app that shows you dogs in your area in need of Snuggles! The app is built using Gatsby, and uses Gatsby Functions to retrieve the data from a remote source using an API key.

However, there seems to be a problem with the app!

An engineer recently merged some changes, and now it appears that the app is having some problems. When you run the app, the 'Loading' spinner continues to run.

Walk through the app, determine what the error(s) are, and update the code to get the app running again. These pups need snuggles!

## To get started:

- From the root directory, `npm i` to install dependencies
- Create a `.env.development` file in the root directory. We will provide you with an API key to use during the exercise
- `npm start` to start the app in develop mode.

## Overview of the app components

To help get you acquainted with the codebase, here's a general mental model of the frontend app and its components:

`src/pages/

- index.js: The entry-point to the app. Contains the parent `Catalog` component, which renders the `Layout` and `Dogs` components.
- 404.js: A 404 page rendered when there is no page at a given path.

`src/components`

- breed/: Renders a dropdown of available dog breeds
- clear-button/: Fires a search to fetch all available dog breeds (clearing any active filter)
- dog/: Renders the information about a specific dog
- dogs/: Renders the Toolbar and a list of Dogs (or a loading spinner, if we are fetching data)
- loader/: Renders a loading spinner
- location/: Fetches possible zipcodes to filter search
- search-button/: Fires a new fetch of dogs
- toolbar/: Renders the location and breed filters, along with the search button
- layout/: Wraps the main content with a header
