import { MdHomeFilled, MdOutlineSportsVolleyball } from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { GiFilmStrip } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-2/12 bg-[#212121] pr-15 overflow-auto pb-5 sidebar">
      <ul className="flex flex-col border-b-2 border-gray-700">
        {/* Home */}
        <li className={`pl-6 py-3 hover:bg-zinc-600`}>
          <Link to="/" className="flex items-center gap-5">
            <MdHomeFilled className="text-xl" />
            <span className="text-sm tracking-wider">Home</span>
          </Link>
        </li>

        {/* Music */}
        <li className={`pl-6 py-3 hover:bg-zinc-600`}>
          <Link to="/music" className="flex items-center gap-5">
            <TbMusic className="text-xl" />
            <span className="text-sm tracking-wider">Music</span>
          </Link>
        </li>

        {/* Sports */}
        <li className={`pl-6 py-3 hover:bg-zinc-600`}>
          <Link to="/sports" className="flex items-center gap-5">
            <MdOutlineSportsVolleyball className="text-xl" />
            <span className="text-sm tracking-wider">Sports</span>
          </Link>
        </li>

        {/* Gaming */}
        <li className={`pl-6 py-3 hover:bg-zinc-600`}>
          <Link to="/gaming" className="flex items-center gap-5">
            <TbDeviceGamepad2 className="text-xl" />
            <span className="text-sm tracking-wider">Gaming</span>
          </Link>
        </li>

        {/* Movies */}
        <li className={`pl-6 py-3 hover:bg-zinc-600`}>
          <Link to="/movies" className="flex items-center gap-5">
            <GiFilmStrip className="text-xl" />
            <span className="text-sm tracking-wider">Movies</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
