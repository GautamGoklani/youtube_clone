// Importing necessary functions and dependencies from Redux Toolkit, Axios, and custom files
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { HomePageVideos } from "../../Types";
import { parseData } from "../../utils";
import { YOUTUBE_API_URL } from "../../utils/constants";

// Retrieving YouTube Data API key from environment variables
const API_KEY = process.env.REACT_APP_YOTUBE_DATA_API_KEY;

// Creating an asynchronous thunk using createAsyncThunk from Redux Toolkit
export const getSearchPageVideos = createAsyncThunk(
  // Action type for this thunk
  "youtubeApp/serachPageVideos",
  // Asynchronous function that will be executed when the thunk is dispatched
  async (isNext: boolean, { getState }) => {
    // Extracting relevant state variables from the Redux store
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm },
    } = getState() as RootState;

    // Making an API request to YouTube with the provided search term and API key
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    // Parsing the received data using a custom parseData function
    const parsedData: HomePageVideos[] = await parseData(items);

    // Returning an object containing parsed data and the next page token
    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
