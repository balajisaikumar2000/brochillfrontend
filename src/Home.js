import React, { useState, useRef } from "react";
import "./Home.css";
import axios from "axios";

// import { useNavigate } from "react-router-dom";

export default function Home() {
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const nameChange = (e) => {
    setName(e.target.value);
    setStatus(false);
  };
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const submit = (e) => {
    const formData = new FormData();
    e.preventDefault();
    console.log("sxsx", name);
    console.log("file:", file);
    formData.append("name", name);
    formData.append("testImage", file);
    axios
      .post("http://localhost:5000/", formData)
      .then((res) => {
        setStatus(true);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    setName("");
    inputRef.current.value = null;
  };

  return (
    <div className="home">
      <div className="header">
        <h1 className="h11">select image to upload</h1>
      </div>
      <form onSubmit={(e) => submit(e)} encType="multipart/form-data">
        <div className="fieldname">
          <label htmlFor={"name"}>Name:</label>
          <input
            type={"text"}
            name="name"
            onChange={nameChange}
            required
            value={name}
          />
        </div>
        <div className="fieldname">
          <label htmlFor={"image"}>Select image:</label>
          <input
            type={"file"}
            filename="testImage"
            id="image"
            onChange={fileChange}
            required
            ref={inputRef}
          />
        </div>
        <div className="fieldname">
          <button className="submit" type={"submit"}>
            Submit
          </button>
        </div>
      </form>
      {status ? <h4>Image Saved Successfully....!</h4> : ""}
    </div>
  );
}
