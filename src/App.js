import React from 'react';
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
    console.log(finalURLData);
    this.state={peerID:finalURLData};
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
