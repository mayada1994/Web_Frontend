import React from "react";
import './home-page.css';
import MusicTable from "../music-table/music-table";
import {useEffect, useState} from "react";
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import * as config from '../../configs/development';
import * as songConfigs from '../../configs/dropdowns';


const songsTypes = {
    songs: 'songs'
};

function HomePage() {

    const isAuthorized = !!localStorage.getItem('auth-token');

    const [songs, setSongs] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState(songConfigs.genres[0]);

    const fetchSongs = () => {
        axios.get(config.api.baseUrl + 'table/songs')
            .then(res => setSongs(res.data))
            .catch(err => console.log(err));
    };

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    };

    const handleAlbumChange = (event) => {
        setAlbum(event.target.value);
    };

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };

    const handleSongsUpdate = (updatedSongs) => {
        setSongs(updatedSongs);
    };

    const saveSong = () => {
        const song = {
            title: title,
            artist: artist,
            album: album,
            genre: genre
        };

        axios.post(config.api.baseUrl + 'table/song', {body: song})
            .then(result => {
                song._id = result.data;
                setSongs([...songs, song]);
                setIsDialogOpen(false);
            });

    };


    useEffect(() => {
        fetchSongs(songsTypes.songs);
    }, []);

    return (
        <div>
            <MusicTable tableData={songs} songsUpdateHandler={handleSongsUpdate} />

            <Fab style={isAuthorized ? {} : {display: 'none'}}
                 className="fab" color="primary" aria-label="edit" onClick={openDialog}>
                <AddIcon/>
            </Fab>

            <Dialog open={isDialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new song</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a new song, please enter full song information in fields below and press "SAVE"
                    </DialogContentText>

                    <TextField
                        autoFocus
                        fullWidth
                        label="Title"
                        onChange={handleTitleChange}/>

                    <TextField
                        fullWidth
                        label="Artist"
                        onChange={handleArtistChange}/>

                    <TextField
                        fullWidth
                        label="Album"
                        onChange={handleAlbumChange}/>

                    <InputLabel className="inputLabel" id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre"
                        value={genre}
                        fullWidth
                        onChange={handleGenreChange}
                    >
                        {songConfigs.genres.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={saveSong} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HomePage;
