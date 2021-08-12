import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="btndiv">
        <Link to={`/register`}>
          <button className="button btn1">Register</button>
        </Link>
        <Link to={`/list`}>
          <button className="button btn2">Patient List</button>
        </Link>
        <Link to={`/tree`}>
          <button className="button btn3"> Tree Upload</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
