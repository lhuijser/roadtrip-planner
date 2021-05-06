import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { getCode, fetchAccessToken, requestAuthorization, refreshAccessToken } from './utils/authorize';
import CreatePlaylist from '../../../components/playlist/CreatePlaylist/CreatePlaylist';
import Playlist from '../../../components/playlist/Playlist/Playlist';
import { getPlaylist } from './utils/spotifyApiCalls';
import { OrganiserContext } from '../../../contexts/OrganiserContextProvider';

// TODO handle when access token expires
export default function SpotifyPlaylistPage() {
  const { isUserOrganiser } = useContext(OrganiserContext);
  const [playlistId, setPlaylistId] = useState(null); // TODO Get from backend
  const [playlist, setPlaylist] = useState({
    name: null,
    description: null,
    tracks: [],
  });

  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const refreshToken = localStorage.getItem('refresh_token');

  // If no playlist has been set up, and the user is not a host
  if (!playlistId && !isUserOrganiser) {
    return (
      <div>
        <h1>Playlist</h1>
        <p>The organiser has not created a playlist yet.</p>
      </div>
    );
  }

  const code = getCode();
  if (code && (!accessToken || !refreshToken)) {
    fetchAccessToken(code, setAccessToken);
  } else if (!accessToken || !refreshToken) {
    return <Button onClick={requestAuthorization}>Authorize Spotify</Button>;
  }

  // Check if access token is valid (they only last 1 hour)
  const ONE_HOUR = 60 * 60 * 1000;
  if (!accessToken && new Date().getTime() - localStorage.getItem('token_retrieved') >= ONE_HOUR) {
    refreshAccessToken(setAccessToken);
  }

  if (playlistId && accessToken && !playlist.name) {
    getPlaylist(playlistId, setPlaylist);
  }

  return (
    <div>
      {playlist.name && playlistId && (
        <Playlist
          playlistId={playlistId}
          content={playlist}
          isUserOrganiser={isUserOrganiser}
          setPlaylist={setPlaylist}
        />
      )}
      {!playlistId && accessToken && <CreatePlaylist setPlaylistId={setPlaylistId} />}
    </div>
  );
}
