import React from 'react';
import Container from '@material-ui/core/Container';
import SignIn from './SignIn';
import VideoChat from './VideoChat';
function Display(props) {
  props = props.props;
	const ID = props.peerID;
  if (ID&&ID!="") {
	  return (<VideoChat props={props}/>);
	}
	return (<SignIn props={props.peerID}/>);
}
class App extends React.Component {
  constructor(props) {
    super(props);
    let params = new URLSearchParams(window.location.search);
    const finalURLData = params.get('peerid');
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    this.state={peerID:finalURLData, media: getUserMedia};
  }
	render() {
  	return (
    	<Container maxWidth="sm">
	      <Display props={this.state}/>
    	</Container>
  	);
	}
}
export default App;
