import { useState } from "react";
import QuizApp from "./QuizApp";

const Home = () => {
  const [homeScreen, setHomeScreen] = useState(true);

  return (
    <div className="homeScreen">
      {homeScreen && (
        <div className="home-intro">
          <h2>
            Want to play some <br />
            fun React quiz??
          </h2>
          <button
            className="home-btn"
            onClick={() => {
              setHomeScreen(false);
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
      {!homeScreen && <QuizApp />}
    </div>
  );
};

export default Home;
