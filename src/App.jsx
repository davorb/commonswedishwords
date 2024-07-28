import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Toggler from "./components/Toggler";
import EasyWords from "./assets/swedish_words.json";
import Button from "./components/Button";

const FLIP_TEXT_DURATION = 150;

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [words, setWords] = useState(EasyWords);
  const [hardWords, setHardWords] = useState(null);
  const [mode, setMode] = useState("easy");
  const [isFlipped, setIsFlipped] = useState(false);
  const [word, setWord] = useState(getRandomElement(EasyWords));

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "easy" ? "hard" : "easy"));
  }, []);

  useEffect(() => {
    if (mode === "hard" && !hardWords) {
      fetch("/hard_words.json")
        .then((res) => res.json())
        .then((data) => {
          setHardWords(data);
          setWords(data);
          setIsFlipped(false);
          setWord(getRandomElement(data));
        })
        .catch((err) => {
          console.error("Failed to load hard words", err);
        });
    } else {
      const currentWords = mode === "easy" ? EasyWords : hardWords;
      setWords(currentWords);
      setIsFlipped(false);
      setWord(getRandomElement(currentWords));
    }
  }, [mode, hardWords]);

  const handleClick = useCallback(() => {
    if (isFlipped) {
      setTimeout(() => {
        setWord(getRandomElement(words));
      }, FLIP_TEXT_DURATION);
    }
    setIsFlipped((prevState) => !prevState);
  }, [isFlipped, words]);

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
          <Button />
        </div>
        <Toggler onClick={toggleMode} />
      </div>
      <div className="container">
        <div
          className={`box card ${isFlipped ? "is-flipped" : ""}`}
          id="box"
          onClick={handleClick}
        >
          <div className="box__face box__face--front">{englishWord}</div>
          <div className="box__face box__face--back">
            <b className="fancy">{swedishWord}</b>
            <br />
            {swedishExample}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
