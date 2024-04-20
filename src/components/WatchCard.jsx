import { Link } from "react-router-dom";

// Functional component representing a card for displaying watch information
export default function WatchCard({ data }) {
  return (
    // Container for the watch card, using Flexbox with a gap between elements
    <div className="flex gap-3">
      {/* Container for the video thumbnail with a relative position */}
      <div className="relative min-w-fit">
        {/* Display the video duration in the bottom-right corner */}
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        
        {/* Link to the video page with the video thumbnail */}
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-24 w-40"
            alt="thumbnail"
          />
        </Link>
      </div>
      
      {/* Container for video details with a gap between elements and a vertical flex layout */}
      <div className="flex gap-1 flex-col">
        {/* Video title with a link, using line clamp to limit to 2 lines */}
        <h4 className="text-sm">
          <a href="#" className="line-clamp-2">
            {data.videoTitle}
          </a>
        </h4>
        
        {/* Container for channel information with a smaller text size */}
        <div className="text-xs text-grap-400">
          {/* Channel name with a link */}
          <div>
            <a href="#" className="hover:text-white">
              {data.channelInfo.name}
            </a>
          </div>
          
          {/* Container for views and video age information */}
          <div>
            <div>
              {/* Display video views with a separator and video age */}
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
