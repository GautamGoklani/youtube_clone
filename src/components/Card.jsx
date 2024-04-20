// Importing the Link component from the "react-router-dom" library
import { Link } from "react-router-dom";

// Defining the Card component that takes 'data' as a prop
export default function Card({ data }) {
  return (
    // Outer container for the card with specific styling
    <div className="w-64 h-60 flex gap-4 flex-col">
      {/* Container for the video thumbnail with positioning for the duration */}
      <div className="relative">
        {/* Displaying the video duration in a styled label */}
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
        {/* Link to navigate to the video details page */}
        <Link to={`/watch/${data.videoId}`}>
          {/* Displaying the video thumbnail as a clickable image */}
          <img
            src={data.videoThumbnail}
            className="h-44 w-72"
            alt="thumbnail"
          />
        </Link>
      </div>
      {/* Container for the video details including channel information */}
      <div className="flex gap-2">
        {/* Container for the channel image with a link (currently a placeholder link) */}
        <div className="min-w-fit">
          <a href="#">
            {/* Displaying the channel image as a rounded avatar */}
            <img
              src={data.channelInfo.image}
              alt="channel"
              className="h-9 w-9 rounded-full"
            />
          </a>
        </div>
        {/* Container for video title and additional information */}
        <div>
          {/* Heading displaying the video title with a link (currently a placeholder link) */}
          <h3>
            <a href="#" className="line-clamp-2">
              {data.videoTitle}
            </a>
          </h3>
          {/* Container for channel name, video views, and age of the video */}
          <div className="text-sm text-gray-400">
            {/* Container for the channel name with a link (currently a placeholder link) */}
            <div>
              <a href="#" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
            {/* Container for video views and age */}
            <div>
              {/* Displaying video views with a separator (currently a bullet point) */}
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              {/* Displaying the age of the video */}
              <span>{data.videoAge} ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
