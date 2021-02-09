import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

import QueuedSong from './components/QueuedSong';


export default function QueuedSongList() {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    const song = {
        title: 'LÜNE',
        artist: 'MÖÖN',
        thumbnail: 'https://i.ytimg.com/an_webp/TAKR_6vNJR8/mqdefault_6s.webp?du=3000&sqp=CMDBh4EG&rs=AOn4CLCUOusBJADKoBkbQ9UZpWOvnT5ecg'
    }

    return greaterThanMd && (
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
