import {Schema, model} from 'mongoose';
import {Song} from '../../interfaces/song';

const songSchema = new Schema<Song>({
    song_name: {type: String, required: true},
    thumbnail: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    genres: {type: [String], required: true},
    api_id: {type: String, required: true},
});

export default model<Song>('Song', songSchema);