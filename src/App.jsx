import { useState, useCallback } from "react";
import "./App.css";
import Words from "./assets/swedish_words.json";

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = useCallback(() => {
    if (isFlipped) {
      setTimeout(() => setWord(getRandomElement(Words)), 600);
    }
    setIsFlipped((state) => !state);
  }, [isFlipped]);

  const [word, setWord] = useState(getRandomElement(Words));
  const swedishWord = word.swedish;
  const swedishExample = word.example;
  const englishWord = word.english;

  return (
    <div className="container">
      <div
        className={"box card " + (isFlipped && "is-flipped")}
        id="box"
        onClick={handleClick}
      >
        <div className="box__face box__face--front ">{englishWord}</div>
        <div className="box__face box__face--back">
          <b className="fancy">{swedishWord}</b>
          <br />
          {swedishExample}
        </div>
      </div>
    </div>
  );
}

export default App;
