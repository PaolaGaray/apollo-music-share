import React from 'react';

import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import AddSong from './components/AddSong';


function App() {
  return (
    <>
      <Header />
      <AddSong />
      <SongList />
      <SongPlayer />
    </>
  );
}

export default App;
