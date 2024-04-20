// Import necessary functions and types from Redux toolkit
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

// Import necessary types and reducers
import { InitialState } from "../Types";
import { getHomePageVideos } from "./reducers/getHomePageVideos";
import { getRecommendedVideos } from "./reducers/getRecommendedVideos";
import { getSearchPageVideos } from "./reducers/getSearchPageVideos";
import { getVideoDetails } from "./reducers/getVideoDetails";
import { getMusicPageVideos } from "./reducers/getMusicPageVideos";
import { getGamingPageVideos } from "./reducers/getGamingPageVideos";
import { getSportsPageVideos } from "./reducers/getSportsPageVideos";
import { getMoviesPageVideos } from "./reducers/getMoviesPageVideos";

// Define the initial state of the Redux store
const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
  musicPageVideos: [],
  gamingPageVideos: [],
  sportsPageVideos: [],
  moviesPageVideos: [],
};

// Create a Redux slice using createSlice from Redux toolkit
const YoutubeSlice = createSlice({
  // Name of the slice
  name: "youtubeApp",
  // Initial state for the slice
  initialState,
  // Reducers to handle state mutations
  reducers: {
    // Clear videos in the state
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    // Change the search term in the state
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    // Clear the search term in the state
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  // Extra reducers to handle asynchronous actions using createAsyncThunk
  extraReducers: (builder) => {
    // Handle successful fetching of home page videos
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getMusicPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getGamingPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSportsPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getMoviesPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    // Handle successful fetching of search page videos
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    // Handle successful fetching of video details
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    // Handle successful fetching of recommended videos
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.parsedData;
    });
  },
});

// Configure the Redux store with the created reducer
export const store = configureStore({
  reducer: {
    youtubeApp: YoutubeSlice.reducer,
  },
});

// Export actions for use in components
export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  YoutubeSlice.actions;

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
