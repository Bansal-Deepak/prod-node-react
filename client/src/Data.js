import React, { useState, useEffect } from "react";
import axios from "axios";
let Data = () => {
  let [res, setRes] = useState(" ");
  useEffect(async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await axios.get("/say", config);
    setRes(response.data.msg);
  }, []);
  return (
    <div>
      <h1>Hello From Frontend</h1>
      <h1>{res}</h1>
    </div>
  );
};

export default Data;
