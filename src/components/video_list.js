import React from 'react';
import VideoListItem from './video_list_item';


const VideoList = ({ videos, onVideoSelect }) => {
  const videoItems = videos.map(video => <VideoListItem
    onVideoClick={onVideoSelect}
    key={video.etag}
    video={video}
  />);

  return (
    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
};

export default VideoList;