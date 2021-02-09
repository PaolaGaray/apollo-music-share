import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';

import QueuedSong from './QueuedSong';


export default function QueuedSongList() {
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    const song = {
        title: 'Micronoise @Raqpart, Budapest (16.07.2015)@',
        artist: 'Micronoise',
        thumbnail: 'https://i1.sndcdn.com/artworks-000124298819-zkjv66-t500x500.jpg'
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
