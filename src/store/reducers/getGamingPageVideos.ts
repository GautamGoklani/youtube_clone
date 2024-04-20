// Importing necessary functions and libraries from Redux Toolkit, Axios, and custom files
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from ".."; // Assuming ".." refers to the parent directory
import { GamingPageVideos } from "../../Types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

// Retrieving the YouTube Data API key from environment variables
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Creating an asynchronous thunk using createAsyncThunk from Redux Toolkit
export const getGamingPageVideos = createAsyncThunk(
  // Defining the action type string for the asynchronous operation
  "youtubeApp/gamingPageVideos",

  // Asynchronous function to fetch Gaming videos with optional pagination
  async (isNext: boolean, { getState }) => {
    // Extracting relevant state variables using RootState and destructuring
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;

    // Making an API call to YouTube Data API to fetch videos based on search query
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="Trending gaming videos worldwide by views"&key=${API_KEY}&part=snippet&type=video&${isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    // Logging relevant information for debugging purposes
    console.log({ items, nextPageTokenFromState, nextPageToken });

    // Parsing the received data using a custom parseData function
    const parsedData: GamingPageVideos[] = await parseData(items);

    // Returning an object containing parsed data and next page token
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);