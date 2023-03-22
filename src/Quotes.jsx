import React, { useEffect, useState, useRef } from "react";
import "./quotes.css";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiOutlineWhatsApp,
  AiFillInstagram
} from "react-icons/ai";

// Random Quote Generator
const Quotes = () => {
  const [fetchNewQuote, setFetchNewQuote] = useState(false);
  const [quote, setQuote] = useState({});
  const [bgColor, setBgColor] = useState("#490A3D");
  const [loading, setLoading] = useState(true);

  const ref = useRef(true);

  var colors = [
    "#490A3D",
    "#BD1550",
    "#E97F02",
    "#F8CA00",
    "#8A9B0F",
    "#69D2E7",
    "#FA6900",
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#77B1A9",
    "#73A857"
  ];
  useEffect(() => {
    const firstRender = ref.current;
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const result = await axios.get(
          "https://api.api-ninjas.com/v1/quotes?category=inspirational",
          {
            headers: {
              "X-Api-Key": "TvabH9S7bW57DN5uCAK4jA==QFeEzSJeEjHUg68s"
            }
          }
        );
        setQuote(result.data[0]);
        if (firstRender) {
          ref.current = false;
        } else {
          setBgColor(colors[Math.floor(Math.random() * 18)]);
        }
      } catch (e) {
        console.error("Api Error");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNewQuote]);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "17rem",
          backgroundColor: "whitesmoke",
          width: "30rem",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "1rem"
        }}
      >
        {loading ? (
          <div>
            <FadeLoader height={35} width={25} color={bgColor} />
          </div>
        ) : (
          <div>
            <div
              style={{
                padding: "0.5rem 1rem",
                fontSize: "1.25rem",
                fontFamily: "emoji"
              }}
            >
              {quote.quote}
            </div>
            <div
              style={{
                paddingLeft: "17rem",
                fontSize: "1.5rem"
              }}
            >
              {"-"}
              {quote.author}
            </div>
            <div
              style={{
                display: "flex",
                paddingTop: "4rem",
                width: "100%",
                justifyContent: "space-between"
              }}
            >
              <div
                style={{
                  paddingLeft: "1rem"
                }}
              >
                <a
                  style={{
                    color: bgColor
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com"
                >
                  <AiFillFacebook size={40} />
                </a>
                <a
                  style={{
                    color: bgColor
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.whatsapp.com"
                >
                  <AiOutlineWhatsApp size={40} />
                </a>
                <a
                  style={{
                    color: bgColor
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com"
                >
                  <AiFillInstagram size={40} />
                </a>
                <a
                  style={{
                    color: bgColor
                  }}
                  target="_blank"
                  href="https://www.twitter.com/"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter size={40} />
                </a>
              </div>
              <div
                style={{
                  paddingRight: "1rem"
                }}
              >
                <button
                  style={{
                    background: "whitesmoke",
                    border: `1px solid ${bgColor}`,
                    borderRadius: "4px",
                    height: "2rem",
                    width: "8rem",
                    color: bgColor
                  }}
                  type="button"
                  onClick={() =>
                    setFetchNewQuote(fetchNewQuote => !fetchNewQuote)
                  }
                >
                  {" "}
                  New Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
