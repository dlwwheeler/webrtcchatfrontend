import React from 'react';
import Peer from 'peerjs';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import SignIn from './SignIn';
import VideoChat from './VideoChat';
function Display(props) {
	const ID = props.props.state.peerID;
		if (ID&&ID!="") {
			return <VideoChat props={props.props}/>;
	  }
		return <SignIn props={props.props}/>;
}           

class App extends React.Component{
  constructor(props){
    super(props);
    let params = new URLSearchParams(window.location.search);
    const finalURLData = params.get('peerid');
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    console.log(finalURLData);
    this.otherPeers = [];
    this.state={peerID:finalURLData, otherPeers: this.otherPeers, thisPeer:undefined, media: getUserMedia};
    this.state.thisPeer = new Peer(finalURLData,{host: "js.devan-wheeler.net", port:9000, secure:true});
    this.searchPeers = this.searchPeers.bind(this);
  }
  searchPeers(){
    this.state.thisPeer.listAllPeers(function(res){
      res.forEach((item,key)=>{
        console.log(item);
        this.otherPeers.push(item);
      });
    });
  }
	render() {
  	return (
    	<Container maxWidth="sm">
	      <Display props={this}/>
    	</Container>
  	);
	}
}
export default App;
