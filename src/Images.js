import React, { useState, useEffect } from "react";
import "./Images.css";
import Loader from "./Loader";
import axios from "axios";

export default function Images() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      // .get("https://mobileresponsiveimagedataapi.herokuapp.com/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => console.log(err, "it has an error"));
  }, []);
  return (
    <div className="images">
      <div className="inputFielder">
        <input
          type={"text"}
          size={16}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder={"enter a string to search"}
        />
      </div>

      <div className="storage">
        {loading ? (
          <div className="spinner">
            <h1>Fetching Your Images</h1>
            <div className="loader"></div>
          </div>
        ) : (
          data
            .filter((singleData) => {
              return singleData.name
                .toLowerCase()
                .includes(query.toLowerCase());
            })
            .map((singleData, i) => {
              const base64String = btoa(
                new Uint8Array(singleData.img.data.data).reduce(function (
                  data,
                  byte
                ) {
                  return data + String.fromCharCode(byte);
                },
                "")
              );
              // const base64String = btoa(
              //   String.fromCharCode(...new Uint8Array(singleData.img.data.data))
              // );
              return (
                <div key={i} className="imgContainer">
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    alt="uploads"
                  />
                  <p className="tagName">{singleData.name}</p>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
