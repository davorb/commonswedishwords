import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Toggler from "./components/Toggler";
import Button from "./components/Button";
import Settings from "./components/Settings";

const FLIP_TEXT_DURATION = 150;

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fileName, setFileName] = useState("hard_words.json");
  const [words, setWords] = useState();
  const [mode, setMode] = useState("A");
  const [isFlipped, setIsFlipped] = useState(false);
  const [word, setWord] = useState();

  const [showSettings, setShowSettings] = useState(false);

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "A" ? "B" : "A"));
  }, []);
  const toggleSettings = useCallback(() => {
    setShowSettings((prev) => !prev);
  }, []);

  useEffect(() => {
    fetch(`/${fileName}`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setWord(getRandomElement(data));
        setIsLoading(false);
        console.log("Loaded words", fileName);
      })
      .catch((err) => {
        console.error("Failed to load words", err);
      });
  }, [fileName]);

  const handleClick = useCallback(() => {
    if (isFlipped) {
      setTimeout(() => {
        setWord(getRandomElement(words));
      }, FLIP_TEXT_DURATION);
    }
    setIsFlipped((prevState) => !prevState);
  }, [isFlipped, words]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (showSettings) {
    return (
      <Settings toggleSettings={toggleSettings} selectItem={setFileName} />
    );
  }

  const {
    swedish: swedishWord,
    example: swedishExample,
    english: englishWord,
  } = word;

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ marginTop: "18px" }}>
          <Button onClick={toggleSettings}>⚙️</Button>
        </div>
        <Toggler onClick={toggleMode} />
      </div>
      <div className="container">
        <div
          className={`box card ${isFlipped ? "is-flipped" : ""}`}
          id="box"
          onClick={handleClick}
        >
          <div className="box__face box__face--front">
            <div class="cr cr-top cr-right cr-sticky cr-blue">
              {mode === "A" ? "🇬🇧" : "🇸🇪"}
            </div>
            <b>{mode === "A" ? englishWord : swedishWord}</b>
          </div>
          <div className="box__face box__face--back">
            <div class="cr cr-top cr-right cr-sticky cr-yellow">
              {mode === "A" ? "🇸🇪" : "🇬🇧"}
            </div>

            <b className="fancy back-word">
              {mode === "A" ? swedishWord : englishWord}
            </b>
            <br />
            {swedishExample}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
