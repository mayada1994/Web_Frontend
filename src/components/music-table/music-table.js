import React, {useEffect, useState} from 'react';
import './music-table.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import * as config from '../../configs/development';
import axios from 'axios';

function MusicTable({tableData, songsUpdateHandler}) {

    const isAuthorized = !!localStorage.getItem('auth-token');

    const [songs, setSongs] = useState(tableData);

    useEffect(() => {
        setSongs(tableData);
    }, [tableData]);

    const removeItem = (index) => {
        axios.delete(config.api.baseUrl + `table/song/` + songs[index]._id)
            .then(res => {
                const resultSongs = [...songs];
                resultSongs.splice(index, 1);
                setSongs(resultSongs);
                songsUpdateHandler(resultSongs)
            })
            .catch(error => console.log(error));
    };

    return (
        <Paper>
            <Table>
                <TableHead className="tableHead">
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Artist</TableCell>
                        <TableCell>Album</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {songs.map((song, index) => (
                        <TableRow key={index}>
                            <TableCell>{song.title}</TableCell>
                            <TableCell>{song.artist}</TableCell>
                            <TableCell>{song.album}</TableCell>
                            <TableCell>{song.genre}</TableCell>
                            <TableCell style={isAuthorized ? {} : {display: 'none'}}>
                                <DeleteIcon className="removeIcon" onClick={() => removeItem(index)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}

export default MusicTable;
