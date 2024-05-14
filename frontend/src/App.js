import React, { useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [serverResponse, setServerResponse] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
      setServerResponse(response.data);
    } catch (error) {
      setServerResponse("Error communicating with server");
    }
  };

  const crashServer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/crash`
      );
      setServerResponse(response.data);
    } catch (error) {
      setServerResponse("Server crashed!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend</h1>
        <p>Server Response: {serverResponse}</p>
        <button className="App-btn" onClick={fetchData}>
          Fetch Data
        </button>
        <button className="App-btn" onClick={crashServer}>
          Crash Server
        </button>
      </header>
    </div>
  );
}

export default App;
