// Importing necessary modules and components
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "../components/SearchCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { clearVideos } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

// Functional component representing the Search page
export default function Search() {
  // React Router hook for navigation
  const navigate = useNavigate();

  // Redux hooks for dispatch and selecting state
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  // useEffect hook to perform actions when component mounts or when searchTerm changes
  useEffect(() => {
    // Clearing previous videos when component mounts
    dispatch(clearVideos());

    // Navigating back to the home page if the search term is empty
    if (searchTerm === "") navigate("/");
    else {
      // Fetching videos based on the search term
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  // Rendering the Search component
  return (
    <div className="max-h-screen overflow-hidden">
      {/* Navbar component */}
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex" style={{ height: "92.5vh" }}>
        {/* Sidebar component */}
        <Sidebar />

        {/* Checking if there are videos to display */}
        {videos.length ? (
          // If there are videos, display them using InfiniteScroll
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {/* Mapping over videos and rendering SearchCard component for each */}
              {videos.map((item) => (
                <div className="my-5" key={item.videoId}>
                  <SearchCard data={item} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          // If no videos, display a loading spinner
          <Spinner />
        )}
      </div>
    </div>
  );
}
