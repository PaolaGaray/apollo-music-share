import React from 'react';
import { useSubscription } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';

import Song from './Song';
import { GET_SONGS } from '../graphql/subscriptions';

export default function SongList() {

    const { loading, error, data } = useSubscription(GET_SONGS);


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
    };

    if(error) return <div>`Error fetching songs: ${error.message}`</div>

    return (
        <div>
           {data.songs.map(song => (
                <Song key={song.id} song={song}/>
           ))}
        </div>
    );
}
