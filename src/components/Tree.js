import React, { useState } from "react";
import Recursion from "./Recursion";
import Header from "./Header";

function Tree() {
  const [data, setData] = useState("");

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    sessionStorage.setItem("tree", content);
    const data = JSON.parse(sessionStorage.getItem("tree"));
    console.log(data);
    setData(data);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  return (
    <div>
      <Header home register list />
      <div style={{ width: "fit-content", marginTop: "40px", marginLeft: "180px" }}>
        <input
          type="file"
          id="file"
          className="input-file"
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </div>
      {data && <Recursion data={data} />}
    </div>
  );
}

export default Tree;
