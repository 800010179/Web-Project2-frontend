import excpect from 'expect';
import request from 'supertest';
import { Song, SongTest } from '../src/interfaces/song';
import randomstring from 'randomstring';


const getSongList = (url: string | Function): Promise<SongTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: '{songs{id song_name thumbnail artist album genres api_id}}',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const songs = response.body.data.songs;
          expect(songs).toBeInstanceOf(Array);
          expect(songs[0]).toHaveProperty('id');
          expect(songs[0]).toHaveProperty('song_name');
          expect(songs[0]).toHaveProperty('thumbnail');
          expect(songs[0]).toHaveProperty('artist');
          expect(songs[0]).toHaveProperty('album');
          expect(songs[0]).toHaveProperty('genres');
          expect(songs[0]).toHaveProperty('api_id');
          resolve(response.body.data.songs);
        }
      });
  });
};

const getSongById = (
  url: string | Function,
  id: string
): Promise<SongTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query SongById($songByIdId: ID!) {
            songById(id: $songByIdId) {
              id
              song_name
              thumbnail
              artist
              album
              genres
              api_id
            }
          }`,
        variables: {
          songByIdId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const song = response.body.data.songById;
          expect(song.id).toBe(id);
          expect(song).toHaveProperty('song_name');
          expect(song).toHaveProperty('thumbnail');
          expect(song).toHaveProperty('artist');
          expect(song).toHaveProperty('album');
          expect(song).toHaveProperty('genres');
          expect(song).toHaveProperty('api_id');
          resolve(response.body.data.songById);
        }
      });
  });
};

const postSong = (
  url: string | Function,
  song: SongTest
): Promise<SongTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation PostSong($postSongSongName: String!, $postSongThumbnail: String!, $postSongArtist: String!, $postSongAlbum: String!, $postSongGenres: [String!]!, $postSongApiId: String!) {
            addSong(song_name: $postSongSongName, thumbnail: $postSongThumbnail, artist: $postSongArtist, album: $postSongAlbum, genres: $postSongGenres, api_id: $postSongApiId) {
              id
              song_name
              thumbnail
              artist
              album
              genres
              api_id
            }
          }`,
        variables: {
          postSongSongName: song.song_name,
          postSongThumbnail: song.thumbnail,
          postSongArtist: song.artist,
          postSongAlbum: song.album,
          postSongGenres: song.genres,
          postSongApiId: song.api_id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const song = response.body.data.addSong;
          expect(song).toHaveProperty('id');
          expect(song).toHaveProperty('song_name');
          expect(song).toHaveProperty('thumbnail');
          expect(song).toHaveProperty('artist');
          expect(song).toHaveProperty('album');
          expect(song).toHaveProperty('genres');
          expect(song).toHaveProperty('api_id');
          resolve(response.body.data.addSong);
        }
      });
  });
};

const deleteSong = (url: string | Function, id: string): Promise<SongTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation DeleteSong($deleteSongId: ID!) {
            deleteSong(id: $deleteSongId) {
              id
              song_name
              thumbnail
              artist
              album
              genres
              api_id
            }
          }`,
        variables: {
          deleteSongId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const song = response.body.data.deleteSong;
          expect(song).toHaveProperty('id');
          expect(song).toHaveProperty('song_name');
          expect(song).toHaveProperty('thumbnail');
          expect(song).toHaveProperty('artist');
          expect(song).toHaveProperty('album');
          expect(song).toHaveProperty('genres');
          expect(song).toHaveProperty('api_id');
          resolve(response.body.data.deleteSong);
        }
      });
  });
};

const updateSong = (
  url: string | Function,
  songId: string
): Promise<SongTest> => {
  return new Promise((resolve, reject) => {
    const newName = 'Updated Song ' + randomstring.generate(7);
    const song: SongTest = {
      id: songId,
      song_name: newName,
      thumbnail: 'updatedthumbnail',
      artist: 'updatedartist',
      album: 'updatedalbum',
      genres: ['updatedgenre'],
      api_id: 'updatedapiid',
    };
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation UpdateSong($updateSongId: ID!, $updateSongSongName: String!, $updateSongThumbnail: String!, $updateSongArtist: String!, $updateSongAlbum: String!, $updateSongGenres: [String!]!, $updateSongApiId: String!) {
            updateSong(id: $updateSongId, song_name: $updateSongSongName, thumbnail: $updateSongThumbnail, artist: $updateSongArtist, album: $updateSongAlbum, genres: $updateSongGenres, api_id: $updateSongApiId) {
              id
              song_name
              thumbnail
              artist
              album
              genres
              api_id
            }
          }`,
        variables: {
          updateSongId: song.id,
          updateSongSongName: song.song_name,
          updateSongThumbnail: song.thumbnail,
          updateSongArtist: song.artist,
          updateSongAlbum: song.album,
          updateSongGenres: song.genres,
          updateSongApiId: song.api_id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const song = response.body.data.updateSong;
          expect(song).toHaveProperty('id');
          expect(song).toHaveProperty('song_name');
          expect(song).toHaveProperty('thumbnail');
          expect(song).toHaveProperty('artist');
          expect(song).toHaveProperty('album');
          expect(song).toHaveProperty('genres');
          expect(song).toHaveProperty('api_id');
          resolve(response.body.data.updateSong);
        }
      });
  });
};

export { getSongList, getSongById, postSong, deleteSong, updateSong };