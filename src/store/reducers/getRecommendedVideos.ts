// Importing necessary functions and modules from Redux Toolkit, axios, and custom files.
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";  // Assuming ".." is the correct relative path to the root state.
import { RecommendedVideos } from "../../Types";  // Assuming the correct path to the RecommendedVideos type.
import { parseRecommendedData } from "../../utils";  // Assuming the correct path to the parseRecommendedData function.
import { YOUTUBE_API_URL } from "../../utils/constants";

// Retrieving the YouTube Data API key from environment variables.
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Creating an asynchronous thunk for fetching recommended videos.
export const getRecommendedVideos = createAsyncThunk(
  // Unique identifier for this thunk action.
  "yotubeApp/getRecommendedVideos",
  
  // Async function that performs the actual API request and data manipulation.
  async (videoId: string, { getState }) => {
    // Extracting necessary information from the Redux store state.
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState() as RootState;

    // Making an API request to YouTube Data API to fetch activities related to the channel.
    const {
      data: { items },
    } = await axios.get(
      `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );

    // Parsing the retrieved data using a utility function.
    const parsedData: RecommendedVideos[] = await parseRecommendedData(
      items,
      videoId
    );

    // Returning the parsed data as the result of the asynchronous operation.
    return { parsedData };
  }
);
