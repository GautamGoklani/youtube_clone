// Importing necessary components and libraries from React and external types
import { Link } from "react-router-dom";

// Functional component for rendering a search card
export default function SearchCard({ data }) {
  return (
    // Outer container with flex layout and gap between child elements
    <div className="flex gap-3">
      {/* Container for video thumbnail with relative positioning */}
      <div className="relative">
        {/* Displaying video duration in a corner */}
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        {/* Link to the video details page */}
        <Link to={`/watch/${data.videoId}`}>
          {/* Displaying video thumbnail */}
          <img
            src={data.videoThumbnail}
            className="h-52 w-96"
            alt="thumbnail"
          />
        </Link>
      </div>
      {/* Container for video details with flex layout and column direction */}
      <div className="flex gap-1 flex-col">
        {/* Video title with a maximum width of 2xl */}
        <h3 className="max-w-2xl">
          {/* Link to the video details page with clamped text */}
          <a href="#" className="line-clamp-2">
            {data.videoTitle}
          </a>
        </h3>
        {/* Container for video views, age, and channel information */}
        <div className="text-xs text-grap-400">
          <div>
            <div>
              {/* Displaying video views and age */}
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge} ago</span>
            </div>
          </div>
        </div>
        {/* Container for channel information with minimum width and margin */}
        <div className="min-w-fit my-2">
          {/* Link to the channel with profile image and name */}
          <a href="#" className="flex items-center gap-2 text-xs text-gray-400">
            {/* Displaying channel profile image */}
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
            {/* Displaying channel name */}
            <span>{data.channelInfo.name}</span>
          </a>
        </div>
        {/* Container for video description with a maximum width of 2xl and clamped text */}
        <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
          {/* Displaying video description */}
          <p>{data.videoDescription}</p>
        </div>
      </div>
    </div>
  );
}
