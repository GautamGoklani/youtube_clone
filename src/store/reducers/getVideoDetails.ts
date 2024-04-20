// Import necessary libraries and utility functions
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViewstoString, timeSince } from "../../utils";

// Import constants and API key from utility file
import { YOUTUBE_API_URL } from "../../utils/constants";

// Retrieve the YouTube Data API key from environment variables
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Create an asynchronous thunk to fetch video details based on the video ID
export const getVideoDetails = createAsyncThunk(
  "yotubeApp/videoDetails",
  async (id: string) => {
    // Make an API call to fetch video details using the YouTube Data API
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );

    // Parse and return the relevant data from the API response
    return parseData(items[0]);
  }
);

// Define a function to parse video details from the API response
const parseData = async (item: {
  snippet: {
    channelId: string;
    title: string;
    description: string;
    publishedAt: Date;
    channelTitle: string;
  };
  id: string;
  statistics: { viewCount: string; likeCount: string };
}) => {
  // Make an API call to fetch additional channel information using the YouTube Data API
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  // Return a structured object with parsed video and channel details
  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
};
