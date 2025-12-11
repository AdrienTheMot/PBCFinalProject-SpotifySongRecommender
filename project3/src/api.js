const LASTFM_API_KEY = "765b398a184f12f2d3b4e75536e62641"; 
const SPOTIFY_TOKEN = "BQBBr4wt-DFdPomd_7i3Cf-P4gASO0cnolOHbabug1afonOGzo9w_-A91waL6U9zd7gpKTySt29QhrnkfzOAShwtZ9yZ3Hbsa1huDZIQ2c051xizYN1Y_va8XjgZ0BJfIh7NB1Wd708";  // Replace with your Spotify OAuth token
const SOUNDCHARTS_APP_ID = "HHUNTER-API_497A5641"; 
const SOUNDCHARTS_API_KEY = "fb47bdcfad423799"; 

function normalizeLoudness(dB) {
  return (dB + 60) / 60;
}

function computeCloseness(attrs, target) {
  let score = 0;

  const normalizedAttrs = {
    danceability: attrs.danceability,
    energy: attrs.energy,
    acousticness: attrs.acousticness,
    speechiness: attrs.speechiness,
    loudness: normalizeLoudness(attrs.loudness ?? -60)
  };

  for (const key of Object.keys(target)) {
    if (normalizedAttrs[key] !== undefined) {
      score += Math.abs(normalizedAttrs[key] - target[key]);
    }
  }

  return score;
}
async function getSimilarArtistsFromLastFM(artistName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_API_KEY}&format=json&limit=3`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Last.fm API error: ${res.statusText}`);
  const data = await res.json();
  return data.similarartists.artist.map(a => a.name);
}

async function getTopTracksFromSpotify(artistName) {
  const query = encodeURIComponent(artistName);
  const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` },
  });

  const data = await res.json();
  const artistId = data.artists.items[0]?.id;
  
  if (!artistId) return [];

  const topTracksUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;

  const tracksRes = await fetch(topTracksUrl, {
    headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` },
  });

  const tracksData = await tracksRes.json();
  return tracksData.tracks.slice(0, 2);
}

async function getSongAttributesFromSoundcharts(spotifyTrackId) {
  const url = `https://customer.api.soundcharts.com/api/v2.25/song/by-platform/spotify/${spotifyTrackId}`;

  const res = await fetch(url, {
    headers: {
      "x-app-id": SOUNDCHARTS_APP_ID,
      "x-api-key": SOUNDCHARTS_API_KEY
    },
  });

  const data = await res.json();
  return data.object.audio;
}

export async function getSimilarArtistsTopTracks(artistName, targetAttributes) {
  try {
    const similarArtists = await getSimilarArtistsFromLastFM(artistName);

    const results = [];

    for (const artist of similarArtists) {
      const topTracks = await getTopTracksFromSpotify(artist);

      for (const track of topTracks) {
        const attrs = await getSongAttributesFromSoundcharts(track.id);
        if (!attrs) continue;

        const closeness = computeCloseness(attrs, targetAttributes);

        results.push({
          artist: track.artists[0]?.name ?? artist,
          url: track.external_urls.spotify,
          closeness
        });
      }
    }

    results.sort((a, b) => a.closeness - b.closeness);

    const uniqueArtistResults = [];
    const seenArtists = new Set();

    for (const r of results) {
      if (!seenArtists.has(r.artist)) {
        seenArtists.add(r.artist);
        uniqueArtistResults.push(r);
      }
      if (uniqueArtistResults.length === 5) break;
    }

    return uniqueArtistResults;

  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

