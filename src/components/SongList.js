import React from 'react';
import { CircularProgress } from '@material-ui/core';

import Song from './Song';

export default function SongList() {
    let loading = false;

    const song = {
        title: 'LÜNE',
        artist: 'MÖÖN',
        thumbnail: 'https://i.ytimg.com/an_webp/--ZtUFsIgMk/mqdefault_6s.webp?du=3000&sqp=COn8hIEG&rs=AOn4CLBrRwo28tEG90gyWwAyocWkwIBM7Q'
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
