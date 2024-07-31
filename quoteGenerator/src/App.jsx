import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [quoteDB, setQuoteDB] = useState([]);
  const [color, setColor] = useState("grey");
  const [colorDB] = useState([
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ]);
  const [loadedStatus, setLoadedStatus] = useState(false);

  function handleClick() {
    const randomQuoteIndex = Math.floor(Math.random() * quoteDB.length);
    const randomColorIndex = Math.floor(Math.random() * colorDB.length);

    setQuote(quoteDB[randomQuoteIndex].quote);
    setAuthor(quoteDB[randomQuoteIndex].author);
    setColor(colorDB[randomColorIndex]);
  }

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then((data) => setQuoteDB(data.quotes))
      .then(setLoadedStatus(true))
  }, []);

  useEffect(() => {
    if(loadedStatus){
      handleClick();
    }
  },[quoteDB]);

  return (
    <div style={{ backgroundColor: color }} id="bg">
      <div id="quote-box">
        <div style={{ color: color }} id="text">
          "{quote}
        </div>
        <div style={{ color: color }} id="author">
          - {author}
        </div>
        <div id="link-container">
          <a
            style={{ backgroundColor: color }}
            id="tweet-quote"
            href="http://twitter.com/intent/tweet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </a>
          <button
            style={{ backgroundColor: color }}
            onClick={handleClick}
            id="new-quote"
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
