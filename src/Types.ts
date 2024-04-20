// This interface defines the structure of the initial state for the application
export interface InitialState {
  videos: HomePageVideos[]; // Array of videos displayed on the homepage
  currentPlaying: CurrentPlaying | null; // Information about the currently playing video or null if none is playing
  searchTerm: string; // The current search term entered by the user
  searchResults: []; // Placeholder for search results (should be updated with the actual type)
  nextPageToken: string | null; // Token to fetch the next page of videos (or null if no more pages)
  recommendedVideos: RecommendedVideos[]; // Array of recommended videos displayed on the homepage
  musicPageVideos: MusicPageVideos[];
  gamingPageVideos: GamingPageVideos[];
  sportsPageVideos: SportsPageVideos[];
  moviesPageVideos: MoviesPageVideos[];
}

// This interface defines the structure of a video displayed on the homepage
export interface HomePageVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoLink: string; // URL link to the video

  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
  };
}

// This interface defines the structure of a video displayed on the Musicpage
export interface MusicPageVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoLink: string; // URL link to the video

  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
  };
}

// This interface defines the structure of a video displayed on the Gamingpage
export interface GamingPageVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoLink: string; // URL link to the video

  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
  };
}

// This interface defines the structure of a video displayed on the Sportspage
export interface SportsPageVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoLink: string; // URL link to the video

  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
  };
}

// This interface defines the structure of a video displayed on the Moviespage
export interface MoviesPageVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoLink: string; // URL link to the video

  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
  };
}

// This interface defines the structure of the currently playing video
export interface CurrentPlaying {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoDescription: string; // Description of the video
  videoViews: string; // Number of views the video has
  videoLikes: string; // Number of likes the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    image: string; // URL link to the channel's image
    name: string; // Name of the channel
    subscribers: string; // Number of subscribers the channel has
  };
}

// This interface defines the structure of recommended videos displayed on the homepage
export interface RecommendedVideos {
  videoId: string; // Unique identifier for the video
  videoTitle: string; // Title of the video
  videoThumbnail: string; // URL link to the video thumbnail
  videoDuration: string; // Duration of the video
  videoViews: string; // Number of views the video has
  videoAge: string; // Age of the video (e.g., how long ago it was uploaded)
  channelInfo: {
    id: string; // Unique identifier for the channel
    name: string; // Name of the channel
  };
}

// This interface defines the structure of an item retrieved from an external source (e.g., YouTube API)
export interface Item {
  snippet: {
    title: string; // Title of the video
    thumbnails: { medium: { url: string } }; // URL link to the video thumbnail
    publishedAt: Date; // Date when the video was published
    channelTitle: string; // Name of the channel
    channelId: string; // Unique identifier for the channel
  };
  contentDetails: { upload: { videoId: string } }; // Details about the content (upload information, video identifier)
}
