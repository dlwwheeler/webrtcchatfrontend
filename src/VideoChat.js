import React from 'react';
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
    this.state = { peers: [], connectedPeers: [], peer:{}, media: props.props.media, classes: {},videos:[]};
    this.state.connectedPeers.push(props.props.peerID);
    this.searchPeers = this.searchPeers.bind(this);
    this.applyVideoToPeer = this.applyVideoToPeer.bind(this);
    this.addPeer = this.addPeer.bind(this);
    this.state.peer = new Peer(props.props.peerID, {host:"js.devan-wheeler.net", port:9000,debug:1, secure:true});
    var peer = this.state.peer;
    var media = this.state.media;
    var constThis = this;
    this.searchPeers();
    var video;
    media({video: true, audio: true}, function(stream){
      stream.peerID = props.props.peerID;
      constThis.applyVideoToPeer(stream);
    });
    this.state.peer.on('call', function(call){
      call.answer(video); 
      call.on('stream',function(remoteStream) {
        constThis.applyVideoToPeer(remoteStream);
      });
    });

  }
  applyVideoToPeer(video){
    this.setState({videos: this.state.videos.concat(video)}); 
    console.log(this.state.videos);
  }
  searchPeers(){ 
    var allPeers;
    this.state.peer.listAllPeers((list)=>{
      console.log(list);
      this.setState({peers: list}); 
      console.log(this.state.peers);
    });
  }
  addPeer(peerID){
    var constThis = this;
    if(this.state.connectedPeers.includes(peerID)){
      return;
    }
    this.setState({connectedPeers: this.state.connectedPeers.concat(peerID)});    
    this.state.media({video: true, audio: true}, function(stream) {
          stream.peerID = peerID
          var call = constThis.state.peer.call(peerID,  stream);
          call.on('stream', function(remoteStream){
            remoteStream.peerID = peerID;
            console.log("recieved:", remoteStream);
            constThis.applyVideoToPeer(remoteStream);
          });
      }, function (err) {
      console.log(err);
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
        {this.state.videos.map((value,index) => {
        return (
	      <Card key={index} className={JSON.stringify(Theme.form)}>
	        <CardHeader title={`${value.peerID}`}
            className={JSON.stringify(Theme.avatar)}
            />
	          <CardMedia className={JSON.stringify(Theme.media)}
              component="video"
              >
              <video key={value}>
                <source src={value}/>
              </video>
            </CardMedia>
	      </Card>
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
