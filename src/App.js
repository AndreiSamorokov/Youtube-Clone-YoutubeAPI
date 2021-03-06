import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';


import VideoList from './components/VideoList'
import VideoDetails from './components/VideoDetails'
import youtube from './api/api'

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles' 
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


function App() {
 
  const [videos, setVideos] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [channelId, setChannelId] = React.useState('UCsUzcuvRZmPfJIqPcnmo3xw');
  const [qstring, setQstring] = React.useState('Sam Jiyon');

  const theme = createMuiTheme({
    // palette: {
    //   primary: {
    //     // main: orange[500],
    //   }
    // }
  })

  const channels = ([
    {
      'title' : 'Владилен Минин',
      'channelId' : 'UCg8ss4xW9jASrqWGP30jXiw'
    },
    {
      'title' : 'Traversy Media',
      'channelId' : 'UC29ju8bIPH5as8OGnQzwJyA'
    }, 
 
  ]);
 
  const KEY = 'Your Google API KEY';
 
  React.useEffect(() => {
    fetchVideos(); 
  }, [channelId]); // <-- Have to pass in [] here!
 

  const fetchVideos = async  () => {
    await youtube.get('/search', {
        params: {
            key: KEY,
            channelId: channelId,
            part: 'snippet',
            // q: qstring,
            maxResults: 5,
            order: 'date'
        }
    }).then(response => {  
      setVideos( response.data.items ); 
      setSelectedVideo( response.data.items[0] );  
    });
    
  }

  function onVideoSelect(video){ 
    setSelectedVideo( video );  
  }

  function onChannelSelect( qstringval, channelIdval ){ 
    setChannelId( channelIdval );
    setQstring  ( qstringval );  
  }

  return selectedVideo ? (
    <ThemeProvider theme={theme}>   
          <AppBar position="relative">
              <Toolbar>
                <VideoLibraryIcon />
                <Typography variant="h5" > Learning Videos </Typography> 
                { channels.map((channel) =>(
                  <Button variant="outlined" key={channel.title}  onClick={() => onChannelSelect(channel.title, channel.channelId)} color="inherit">{channel.title}</Button>
                ))}                
              </Toolbar> 
          </AppBar>
          <main> 
          <Container >
            <Grid container spacing={3}>  
                <VideoDetails video={selectedVideo} />  
                <VideoList 
                  videos = {videos}
                  onVideoSelect = {onVideoSelect}
                  />  
            </Grid>   
          </Container>
        </main>
    </ThemeProvider>
  ) : (
    <div>
      Loading ...
    </div>
  )
}

export default App;
