import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import SignIn from './SignIn';
import Typography from '@material-ui/core/Typography';
function Display(props) {
  console.log(props);
	const ID = props.peerID!="";
		if (ID) {
			return <Typography> AAAAAAA </Typography>;
	  }
		return <SignIn props={this}/>;
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
	  <Display props={this.state}/>
    	</Container>
  	);
	}
}
export default App;
