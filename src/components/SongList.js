import React from 'react';
import { CircularProgress } from '@material-ui/core';

import Song from './Song';

export default function SongList() {
    let loading = false;

    const song = {
        title: 'LÜNE',
        artist: 'MÖÖN',
        thumbnail: 'https://i.ytimg.com/an_webp/TAKR_6vNJR8/mqdefault_6s.webp?du=3000&sqp=CMDBh4EG&rs=AOn4CLCUOusBJADKoBkbQ9UZpWOvnT5ecg'
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
