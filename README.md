# Super Spotify

## Project Overview

If you are looking for the backend, <a href="https://github.com/njbradley/better-spotify-backend">click</a> here.

## Tech Stack

* React frontend webapp with streamlined UI
* Abstraction layer connecting to Spotify and Apple Music APIs
* Backend for accounts and playlists (Redis or Firebase)

## Database Structure

* Songs table
  * Global, shared across all users
  * Maps song id -> spotify song id, apple music song id

* Users table
  * Username string (required)
  * Email address string (required)
  * List of songs (required)
    * Each song has a song id
    * Each song has a list of custom string tags

  * Spotify permanent token (optional)
  * Spotify hour-long token (optional)
  * Apple authentication token (optional)