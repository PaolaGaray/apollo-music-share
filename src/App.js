import React, { createContext, useContext, useReducer } from 'react';
import { Grid, useMediaQuery } from '@material-ui/core';

import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import AddSong from './components/AddSong';
import songReducer from './reducer';


export const SongContext = createContext({
  song: {
    id: "252db9db-7e9d-44c4-be84-f6a394ce5a32",
    title: "YokoO - DHA Mix #267",
    artist: "DHA FM (Deep House Amsterdam)",
    thumbnail: "https://i1.sndcdn.com/artworks-000209830520-2e3r67-t500x500.jpg",
    url: "https://soundcloud.com/deep-house-amsterdam/yokoo-dha-mix-267",
    duration: 11202.957
  },
  isPlaying: false
});


function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      {greaterThanSm && <Header />}
      <Grid container spacing={3}>
        <Grid
          style={{
            paddingTop: greaterThanSm ? 80 : 10
          }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd ? {
              position:'fixed',
              width: '100%',
              right: 0,
              top: 70
            } : {
              position:'fixed',
              width: '100%',
              left: 0,
              bottom: 0
            }}
          item xs={12} md={5} >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
