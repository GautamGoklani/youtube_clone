// Importing necessary modules and components
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import WatchCard from "../components/WatchCard";

// Functional component representing the Watch page
export default function Watch() {
  // State to manage the "Show more/less" button status
  const [showMoreStatus, setShowMoreStatus] = useState(false);

  // React Router hooks to get parameters and navigation
  const { id } = useParams();
  const navigate = useNavigate();

  // Redux hooks for dispatch and selecting state
  const dispatch = useAppDispatch();
  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommendedVideos
  );

  // useEffect hook to fetch video details when the component mounts or when the video ID changes
  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      // Redirect to the home page if there is no video ID
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  // useEffect hook to fetch recommended videos when the current video changes
  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  // Rendering the Watch component
  return (
    <>
      {/* Display the Watch component only if there's a video playing */}
      {currentPlaying && currentPlaying?.videoId === id && (
        <div className="max-h-screen overflow-hidden">
          {/* Navbar component */}
          <div style={{ height: "7.5vh" }}>
            <Navbar />
          </div>

          {/* Main content area */}
          <div className="flex w-full" style={{ height: "92.5vh" }}>
            <div className="flex gap-y-10 gap-x-5 p-7 mx-20 mr-0 w-full overflow-auto">
              {/* Video player section */}
              <div style={{ maxWidth: "800px" }}>
                <div>
                  {/* YouTube embedded video player */}
                  <iframe
                    width="800"
                    height="502"
                    src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>

                  {/* Video details section */}
                  <div className="mt-5">
                    <p className="text-xl">{currentPlaying.videoTitle}</p>
                    {/* Video metadata */}
                    <div className="flex justify-between mt-1">
                      {/* Views and age of the video */}
                      <div className="text-sm text-gray-400">
                        <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>

                      {/* Like, Dislike, Share, Clip, Save, and More options */}
                      <div className="flex items-center gap-4 uppercase">
                        {/* Like button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-xl" />
                          <strong>{currentPlaying.videoLikes}</strong>
                        </div>

                        {/* Dislike button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="text-xl" />
                          <strong>dislike</strong>
                        </div>

                        {/* Share button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FaShare className="text-xl" />
                          <strong>share</strong>
                        </div>

                        {/* Clip button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HiScissors className="text-xl" />
                          <strong>clip</strong>
                        </div>

                        {/* Save button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <MdOutlinePlaylistAdd className="text-xl" />
                          <strong>save</strong>
                        </div>

                        {/* More options button */}
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>

                    {/* Channel information and description section */}
                    <div className="flex gap-4 flex-col border-solid border-gray-400 border-2 my-5 pb-3 border-l-transparent border-r-transparent">
                      {/* Channel information */}
                      <div className="flex items-center gap-5 mr-5 mt-4">
                        <div>
                          {/* Channel profile image */}
                          <img
                            src={currentPlaying.channelInfo.image}
                            alt=""
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div className="w-5/6">
                          {/* Channel name and subscribers count */}
                          <h5 className="text-sm">
                            <strong>{currentPlaying.channelInfo.name}</strong>
                          </h5>
                          <h6 className="text-gray-400 text-xs">
                            {currentPlaying.channelInfo.subscribers} subscribers
                          </h6>
                        </div>
                        <div>
                          {/* Subscribe button */}
                          <button className="uppercase bg-red-600 rounded-sm p-2 text-sm tracking-wider">
                            subscribe
                          </button>
                        </div>
                      </div>

                      {/* Video description section */}
                      <div
                        className={`${
                          !showMoreStatus ? "max-h-16 overflow-hidden" : ""
                        } text-sm w-11/12`}
                      >
                        {/* Displaying video description */}
                        <pre
                          style={{
                            fontFamily: `"Roboto", sans-serif`,
                          }}
                          className="whitespace-pre-wrap"
                        >
                          {currentPlaying.videoDescription}
                        </pre>
                      </div>

                      {/* "Show more/less" button */}
                      <div>
                        <button
                          className="uppercase text-sm cursor-pointer"
                          onClick={() => setShowMoreStatus(!showMoreStatus)}
                        >
                          Show {showMoreStatus ? "less" : "more"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended videos section */}
              <div className="mr-24 flex flex-col gap-3">
                {/* Mapping over recommended videos and rendering WatchCard component for each */}
                {recommendedVideos.length &&
                  recommendedVideos.map((item) => {
                    return <WatchCard data={item} key={item.videoId} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
