import React from 'react';
import { Typography } from '@material-ui/core';

import QueuedSong from './components/QueuedSong';


export default function QueuedSongList() {

    const song = {
        title: 'LÜNE',
        artist: 'MÖÖN',
        thumbnail: 'https://i.ytimg.com/an_webp/--ZtUFsIgMk/mqdefault_6s.webp?du=3000&sqp=COn8hIEG&rs=AOn4CLBrRwo28tEG90gyWwAyocWkwIBM7Q'
    }

    return (
        <div style={{ margin: '10px 0' }}>
            <Typography color="textSecondary" variant="button">
                QUEUE (5)
            </Typography>
            {Array.from({ length: 5 }, () => song).map((song, i) => (
                <QueuedSong key={i} song={song}/>
            ))}
        </div>
    )
}
