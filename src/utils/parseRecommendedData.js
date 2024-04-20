// Import necessary modules and functions from other files and libraries
import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";

// Retrieve the YouTube Data API key from environment variables
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Function to parse recommended video data using the YouTube Data API
export const parseRecommendedData = async (items, videoId) => {
  try {
    // Initialize arrays to store video and channel IDs, and a new array for processed items
    const videoIds = [];
    const channelIds = [];
    const newItems = [];

    // Loop through each item in the provided data
    items.forEach((item) => {
      // Collect channel IDs for later use
      channelIds.push(item.snippet.channelId);

      // Check if the item has video details and collect video IDs
      if (item.contentDetails?.upload?.videoId) {
        videoIds.push(item.contentDetails.upload.videoId);
        newItems.push(item); // Add the item to the newItems array for further processing
      }
    });

    // Make an API request to get additional details for the collected video IDs
    const {
      data: { items: videosData },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    // Initialize an array to store parsed video data
    const parsedData = [];

    // Process each new item and its corresponding video data
    newItems.forEach((item, index) => {
      // Check if the index is within the bounds of the videosData array
      if (index >= videosData.length) return;

      // Check if the videoId matches the provided videoId, and skip the current iteration if true
      if (videoId === item?.contentDetails?.upload?.videoId) return;

      // Add parsed data for the current video to the parsedData array
      parsedData.push({
        videoId: item.contentDetails.upload.videoId,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoDuration: parseVideoDuration(
          videosData[index].contentDetails.duration
        ),
        videoViews: convertRawViewstoString(
          videosData[index].statistics.viewCount
        ),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: {
          id: item.snippet.channelId,
          name: item.snippet.channelTitle,
        },
      });
    });

    // Return the parsed data array
    return parsedData;
  } catch (err) {
    // Log any errors that occur during the process
    console.log(err);
  }
};
