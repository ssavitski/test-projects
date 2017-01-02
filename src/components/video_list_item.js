import React from 'react';

const VideoListItem = ({ video }) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  const imageTitle = video.snippet.title;

  return (
    <li className="list-group-item">
      <div className="video-list media">

        <div className="media-left">
          <img
            className="media-object"
            src={imageUrl}
            alt={imageTitle}
          />
        </div>

        <div className="media-body">
          <div className="media-heading">{imageTitle}</div>
        </div>

      </div>
    </li>
  );
};

export default VideoListItem;