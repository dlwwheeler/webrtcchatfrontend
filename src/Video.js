import React, {useRef} from 'react';
function Video(props){
  const videoRef = useRef({srcObject:props.props});
  if(videoRef.current){
    videoRef.current.srcObject = props.props;
  }
  console.log(videoRef);
  function Load(){
    console.log("attempting load");
    if(videoRef.current){
      videoRef.current.srcObject = props.props;
      console.log("load successful");
    }
    else{
      console.error("load failed dumping props", props)
    }
  };
  props.props.onactive=Load;
  return (
    <video ref={videoRef} autoPlay={true} />
  );
}
export default Video;
