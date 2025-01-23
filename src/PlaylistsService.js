const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const queryPlaylist = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const querySongs = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs 
      INNER JOIN songs ON playlist_songs.song_id = songs.id 
      WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const resultPlaylist = await this._pool.query(queryPlaylist);
    const resultSongs = await this._pool.query(querySongs);

    return {
      id: resultPlaylist.rows[0].id,
      name: resultPlaylist.rows[0].name,
      songs: resultSongs.rows,
    };
  }
}

module.exports = PlaylistsService;
