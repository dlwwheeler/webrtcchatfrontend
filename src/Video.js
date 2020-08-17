import React, {useRef} from 'react';
function Video(props){
  const videoRef = useRef({srcObject:props.props});
  if(videoRef.current){
    videoRef.current.srcObject = props.props
  }
  return (
    <video ref={videoRef} autoPlay={true} />
  );
}
export default Video;
