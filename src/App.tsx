import { Link } from "react-router-dom";
import intel from "./assets/intel.svg";
import background from "./assets/background.svg";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <div>
          <img src={intel} alt="Intel logo" className="w-20 h-20 ml-5" />
        </div>
        <div>
          <Link to="/login">
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded mr-3">
              Login
            </button>
          </Link>
        </div>
      </div>
      <img src={background} alt="Background" className="min-h-full" />
    </div>
  );
};

export default App;
