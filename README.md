# PBCFinalProject

# 🎧 Spotify Song Recommender

A React-based web app that generates personalized song recommendations using audio attributes and similar-artist discovery. Enter an artist, adjust musical features (danceability, acousticness, energy, loudness, speechiness), and get curated track suggestions ranked by how closely they match your preferences.

# 🚀 Features

Artist search powered by Last.fm’s Similar Artists API
Top track retrieval using Spotify's Web API
Audio feature analysis via Soundcharts
Custom match-percentage algorithm comparing user-selected attributes

# 🛠️ How It Works

User enters an artist name.
The app fetches similar artists from Last.fm.
For each similar artist, it retrieves top tracks using Spotify.
Each track’s audio attributes (energy, acousticness, loudness, etc.) are fetched from Soundcharts.
A match score is computed against the user's selected target attributes.
The app displays the top 10 best-matching tracks.

# 📦 Tech Stack

React (UI + state management)
Spotify Web API (artist & track data)
Last.fm API (similar artists)
Soundcharts API (audio attributes)
Custom attribute-matching algorithm

# ⚙️ Setup & Installation

Clone the repository
Install dependencies:
npm install
Add your API keys & Spotify credentials
(Currently placed directly in the code; ideally moved to environment variables)
Run the app:
npm start