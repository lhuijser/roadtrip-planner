import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

async function setUserId() {
  await axios({
    url: 'https://api.spotify.com/v1/me',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      localStorage.setItem('spotify_user_id', response.data.id);
    }
  });
}

export async function createPlaylist(name, description, setPlaylistId) {
  const accessToken = localStorage.getItem('access_token');
  const spotify_user_id = localStorage.getItem('spotify_user_id');

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  if (!spotify_user_id) {
    await setUserId();
  }

  spotify
    .createPlaylist(localStorage.getItem('spotify_user_id'), {
      name,
      description,
      public: false,
      collaborative: true,
    })
    .then((r) => setPlaylistId(r.id));
}

const handlePlaylistData = (response) => {
  const playlist = {
    name: null,
    description: null,
    tracks: [],
  };

  playlist.name = response.name;
  playlist.description = response.description;

  // Handle tracks
  response.tracks.items.forEach((item) => {
    const { track } = item;

    const artistList = [];
    track.artists.forEach((artist) => {
      artistList.push(artist.name);
    });

    const value = {
      name: track.name,
      artists: artistList,
    };

    playlist.tracks.push(value);
  });

  return playlist;
};

export function getPlaylist(id, setPlaylist) {
  const accessToken = localStorage.getItem('access_token');

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken(accessToken);

  spotify.getPlaylist(id, {}).then((r) => setPlaylist(handlePlaylistData(r)));
}
