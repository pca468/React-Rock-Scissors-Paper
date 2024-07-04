import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './MainBox.css'

const MainBox = () => {
  const images = [
    "http://isweb.joongbu.ac.kr/~jgm/photo/rock.jpeg",
    "http://isweb.joongbu.ac.kr/~jgm/photo/sissor.jpeg",
    "https://blog.kakaocdn.net/dn/bmjB2s/btqXHhp6kpG/TH14W4U612SxKo9uuR2sB0/img.png",
  ];

  const [imageAlter, setImageAlter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageAlter((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{
        border: "1px solid black",
        width: 500,
        height: 600,
        borderRadius: "10px",
        padding: "3rem",
        textAlign: "center",
      }}
    >
      <h1 className="fontStyle">가위바위보 게임</h1>
      <img
        src={images[imageAlter]}
        style={{ width: 300, height: 300, objectFit: "cover", marginTop: "1rem" }}
      />
      <div style={{ marginTop: "5rem" }}>
        <Link to="/gamepage">
          <button
            style={{
              backgroundColor: "#808080",
              border: "none",
              color: "white",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin : "4px 2px",
              transitionDuration : "0.4s",
              cursor : "pointer",
              borderRadius: "12px",
              boxShadow : "0 5px #999"
            }}
          >
            start!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainBox;
