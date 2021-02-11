import { gql } from '@apollo/client';


export const ADD_OR_REMOVE_FROM_QUEUE= gql `
    mutation addOrRemoveFromQueue($input: SongInput!) {
        addOrRemoveFromQueue(input: $input) @client
    }
`;

export const ADD_SONG = gql`
    mutation addSong(
        $title: String!,
        $artist: String!,
        $thumbnail: String!,
        $duration: Float!,
        $url: String!
        ) {
        insert_songs(
            objects: {
                url: $url,
                artist: $artist,
                duration: $duration,
                thumbnail: $thumbnail,
                title: $title
            }) {
        affected_rows
        }
    }
`;

