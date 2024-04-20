// Importing necessary modules and functions from other files
import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";

// Retrieving YouTube Data API key from environment variables
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Function to parse YouTube API data
export const parseData = async (items) => {
  try {
    // Arrays to store video and channel IDs for API requests
    const videoIds = [];
    const channelIds = [];

    // Extracting video and channel IDs from the input items
    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    // Fetching data for channels using YouTube API
    const {
      data: { items: channelsData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    // Processing and mapping channel data for easier usage
    const parsedChannelsData = [];
    channelsData.forEach((channel) =>
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      })
    );

    // Fetching data for videos using YouTube API
    const {
      data: { items: videosData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    // Processing and mapping video data, combining with channel data
    const parsedData = [];
    items.forEach((item, index) => {
      // Retrieving channel image based on channel ID
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );

      // Creating a new object with parsed video and channel data
      if (channelImage)
        parsedData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration
          ),
          videoViews: convertRawViewstoString(
            videosData[index].statistics.viewCount
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        });
    });

    // Returning the final parsed data
    return parsedData;
  } catch (err) {
    // Logging any errors that occur during the API requests
    console.log(err);
  }
};
