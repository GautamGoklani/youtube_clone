// Import necessary dependencies and components
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import { clearVideos } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMusicPageVideos } from "../store/reducers/getMusicPageVideos";

// Define the Music component
export default function Music() {
  // Get access to the Redux dispatch function and state
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  // useEffect to clear videos from the Redux store when the component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  // useEffect to fetch music page videos when the component mounts
  useEffect(() => {
    dispatch(getMusicPageVideos(false));
  }, [dispatch]);

  // Render the Music component
  return (
    <div className="max-h-screen overflow-hidden">
      {/* Navbar */}
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>

      {/* Main content area */}
      <div className="flex" style={{ height: "92.5vh" }}>
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 mt-2 mx-auto">Music Videos</h1>

          {/* Check if there are videos */}
          {videos.length ? (
            <InfiniteScroll
              // Set up infinite scrolling with relevant parameters
              dataLength={videos.length}
              next={() => dispatch(getMusicPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={650}
            >
              {/* Display videos in a grid */}
              <div className="grid gap-y-14 gap-x-20 grid-cols-4 p-8">
                {videos.map((item) => (
                  // Display individual video cards
                  <Card data={item} key={item.videoId} />
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            // Display a spinner if there are no videos
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}
