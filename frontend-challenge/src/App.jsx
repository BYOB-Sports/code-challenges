import "./App.css";
import Header from "./components/Header";
import Courts from "./components/Courts";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="  bg-white">
      <div className="mb-10">
        <Header
          title="Tennis Courts"
          description="Find your perfect tennis court"
        />
      </div>

      <div>
        <Courts />
      </div>
      <Outlet />
    </div>
  );
}

export default App;
