import React from 'react';
import { CircularProgress } from '@material-ui/core';

import Song from './Song';

export default function SongList() {
    let loading = false;

    const song = {
        title: 'Micronoise @Raqpart, Budapest (16.07.2015)@',
        artist: 'Micronoise',
        thumbnail: 'https://i1.sndcdn.com/artworks-000124298819-zkjv66-t500x500.jpg'
    }

    if(loading) {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 50
                }}
            >
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>{Array.from({ length: 10 }, () => song).map((song, i) => (
              <Song key={i} song={song}/>
        ))}
        </div>
    );
}
