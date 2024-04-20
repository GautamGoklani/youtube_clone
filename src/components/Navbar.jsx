// Importing necessary components and libraries from React and external libraries
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeSearchTerm, clearSearchTerm, clearVideos } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import logo from "../logo.svg";

// Defining the functional component for the Navbar
export default function Navbar() {
  // Using react-router-dom hooks for location and navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Using custom Redux hooks to access dispatch and state
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  
  // Function to handle the search functionality
  const handleSearch = () => {
    // If not on the search page, navigate to it
    if (location.pathname !== "/search") navigate("/search");
    else {
      // If already on the search page, clear existing videos and fetch new ones
      dispatch(clearVideos());
      dispatch(getSearchPageVideos(false));
    }
  };

  // JSX for the Navbar component
  return (
    <div className="flex justify-between items-center px-4 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      {/* Left section with YouTube logo */}
      <div className="flex gap-8 items-center text-2xl">
        <div></div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center">
            <img src={logo} width={50} />
            <span className="text-xl font-medium">YouTube</span>
          </div>
        </Link>
      </div>

      {/* Center section with search bar and microphone icon */}
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            // Preventing default form submission and handling search
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              {/* Input field for search term */}
              <input
                type="text"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />

              {/* Close icon to clear search term */}
              <AiOutlineClose
                className={`text-xl cursor-pointer ${
                  !searchTerm ? "invisible" : "visible"
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
            </div>
            {/* Button for initiating search */}
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>
      </div>
      <div className="flex gap-5 items-center text-xl">
      </div>
    </div>
  );
}
