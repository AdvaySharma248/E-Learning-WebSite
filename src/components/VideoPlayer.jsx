import { Play } from 'lucide-react';

const VideoPlayer = ({ url, title }) => {
  return (
    <div className="video-player-container">
      <video
        className="video-player"
        controls
        controlsList="nodownload"
        src={url}
        title={title}
      >
        Your browser does not support the video tag.
      </video>
      <div style={{ padding: '1rem', backgroundColor: 'var(--dark-bg)', color: 'var(--white)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Play size={20} />
          {title}
        </h4>
      </div>
    </div>
  );
};

export default VideoPlayer;
