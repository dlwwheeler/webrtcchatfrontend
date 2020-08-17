import React from 'react';
import Video from './Video';
import { VideoHTMLAttributes, useEffect, useRef } from 'react'
import Peer from 'peerjs';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Theme from "./theme.js"
import "../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Webcam from "react-webcam";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="https://devan-wheeler.net">
        Devan Wheeler
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class VideoChat extends React.Component {
  constructor(props){
    super(props);
    this.state = { peers: [], connectedPeers: [], peer:{}, media, classes: {},videos:[],video:{}};
    this.searchPeers = this.searchPeers.bind(this);
    this.applyVideoToPeer = this.applyVideoToPeer.bind(this);
    this.initVideo = this.initVideo.bind(this);
    this.addPeer = this.addPeer.bind(this);
    this.state.peer = new Peer(props.props.peerID, {host:"js.devan-wheeler.net", port:9000,debug:1, secure:true});
    const peer = this.state.peer;
    var media = this.state.media;
    const constThis = this;
    this.searchPeers();
    peer.on('call', function(call){
      if(constThis.state.video){
      console.log("recieved");
      call.answer(constThis.state.video); 
      }
      call.on('stream',function(remoteStream) {
        console.log(remoteStream);
        if(!constThis.state.connectedPeers.includes(call.metadata.peerID)){
          constThis.setState({connectedPeers: constThis.state.connectedPeers.concat(call.metadata.peerID)});
          constThis.applyVideoToPeer({video:remoteStream, peerID: call.metadata.peerID});
        }
      });
    });
  }
  applyVideoToPeer(video){
    if(video.peerID){
      this.setState({videos: this.state.videos.concat({video:video.video,peerID: video.peerID})});
    }
  }
  initVideo(){
    this.setState({video: this.webcam.stream});
  }
  searchPeers(){ 
    var allPeers;
    this.state.peer.listAllPeers((list)=>{
      this.setState({peers: list}); 
    });
  }
  addPeer(peerID){
    const constThis = this;
    console.log(peerID);
    if(this.state.connectedPeers.includes(peerID)||peerID===this.state.peer.id){
      return;
    }
      var metadata = {peerID : this.state.peer.id, connectedPeers : constThis.state.connectedPeers};
      const peer = this.state.peer;
      var call = peer.call(peerID,  this.state.video, {metadata: metadata});
      call.on('stream', function(remoteStream){
      console.log(remoteStream, call.metadata.peerID);
      if(!constThis.state.connectedPeers.includes(call.metadata.peerID)){
        console.log("add video");
        constThis.applyVideoToPeer({video:remoteStream,peerID: call.metadata.peerID});
        constThis.setState({connectedPeers : constThis.state.connectedPeers.concat(call.metadata.peerID)});
      }
    });
  }
    
  render() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={JSON.stringify(Theme.paper)}>
        <Typography component="h1" variant="h5">
          Video Chat
        </Typography>
        <Webcam
          ref={e => this.webcam = e}
          onUserMedia={this.initVideo}
        />
        {this.state.videos.map((value,index) => {
        return (
	      /*<Card key={index} className={JSON.stringify(Theme.form)}>
	        <CardHeader title={`${value.peerID}`}
            className={JSON.stringify(Theme.avatar)}
            />
	          <CardMedia className={JSON.stringify(Theme.media)}
              >
              <Video props={value.video}/>
            </CardMedia>
	      </Card>
        */
        <div key={index}>
          <Video props={value.video}/>
        </div>
        )})}
	      <Button
          onClick={this.searchPeers}
	        variant="contained"
	        color="primary"
	        className={JSON.stringify(Theme.submit)}>
          Check Who's Online
	      </Button>
      </div>
      <List>
        {this.state.peers.map((value,index)=>{
        return(
        <ListItem button key={index} onClick={()=>{
          this.addPeer(value);}}>
          <ListItemText primary={value}/>
        </ListItem>
        )})}
      </List>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
  }
}
export default VideoChat;
