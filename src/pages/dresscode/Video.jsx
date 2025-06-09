import vif from "../../video/vide.mp4";
import "./v.css";
const Video = () => {
  return (
    <div className="vg">
      <video src={vif} autoPlay loop muted className="videos"></video>
    </div>
  );
};

export default Video;
