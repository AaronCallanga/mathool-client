import { useEffect, useState } from "react";
import Form from "./component/Form";

import "./App.css";
import ResultDisplay from "./component/ResultDisplay";
import type { PrimeAndFactorialResponse } from "./types/MathTypes";
import ResultHistory from "./component/ResultHistory";
import { Box } from "@mui/material";
import Header from "./component/Header";

function App() {
  // Holds the current result being shown
  const [data, setData] = useState<PrimeAndFactorialResponse | null>(null);
  // Holds the entire history of results
  const [history, setHistory] = useState<PrimeAndFactorialResponse[]>([]);

  // Load history of results from the local storage once component render
  useEffect(() => {
    const results = localStorage.getItem("Results");
    if (results) {
      setHistory(JSON.parse(results));
    }
  }, []);

  /*
   * Handles submission from the Form.tsx.
   * Sends a GET request to the backend depending on selected mode.
   * Mode: (Check Prime, Calculate Factorial, Check Prime and Calculate Factorial at the same time)
   * On success, updates current result and appends to history.
   */
  const handleSubmit = async (number: number, url: string) => {
    try {
      const response = await fetch(url + number);
      const result = await response.json();
      if (!response.ok) {
        // If status is not OK, it's an error, throw with backend error message
        console.error("Validation error:", result);

        // Format errorMessages based on type (from client or from server)
        const errorMessages = (() => {
          if (typeof result.message === "string") return result.message;
          if (typeof result.message === "object")
            return Object.values(result.message).join("\n");
          if (result.error) return result.error;
          return "Unknown error occurred";
        })();

        alert(
          `Error ${result.statusCode} - ${result.statusMessage}:\n${errorMessages}`
        );
        return;
      }
      console.log(result);
      setData(result);

      // Update history and localStorage
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, result];
        localStorage.setItem("Results", JSON.stringify(updatedHistory)); // Save to local storage
        return updatedHistory;
      });
    } catch (err) {
      console.error(err);
    }
  };

  /*
   * Recalculates factorial for a previously saved result.
   * Useful when user initially only requested "Prime" check.
   */
  const handleCalculateFactorial = async (number: number, index: number) => {
    try {
      const response = await fetch(
        //`http://localhost:8080/api/v1/math/factorial?number=${number}`
        `https://mathool.onrender.com/api/v1/math/factorial?number=${number}`
      );
      const result = await response.json();
      if (!response.ok) {
        // If status is not OK, it's an error, throw with backend error message
        console.error("Validation error:", result);

        // Optionally format the error message
        const errorMessages = Object.values(result.message).join("\n");
        alert(
          `Error ${result.statusCode} - ${result.statusMessage}:\n${errorMessages}`
        );
        return;
      }
      console.log(result);

      // Update that item in history
      const updatedHistory = history.map((item, i) =>
        i === index ? { ...item, factorial: result.factorial } : item
      );

      setHistory(updatedHistory);
      localStorage.setItem("Results", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
    }
  };

  /*
   * Rechecks if a number is prime for a previously saved result.
   * Useful when user initially only requested to calculate factorial.
   */
  const handleCheckPrime = async (number: number, index: number) => {
    try {
      const response = await fetch(
        //`http://localhost:8080/api/v1/math/prime?number=${number}`
        `https://mathool.onrender.com/api/v1/math/prime?number=${number}`
      );
      const result = await response.json();
      if (!response.ok) {
        // If status is not OK, it's an error, throw with backend error message
        console.error("Validation error:", result);

        // Optionally format the error message
        const errorMessages = Object.values(result.message).join("\n");
        alert(
          `Error ${result.statusCode} - ${result.statusMessage}:\n${errorMessages}`
        );
        return;
      }
      console.log(result);

      const updatedHistory = history.map((item, i) =>
        i === index ? { ...item, prime: result.prime } : item
      );

      // Update that item in history
      setHistory(updatedHistory);
      localStorage.setItem("Results", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
    }
  };

  // Clears the entire result history.
  const handleClearHistory = () => {
    localStorage.removeItem("Results");
    setHistory([]);
    setData(null);
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          width: "50vw",
          alignItems: "center",
        }}
      >
        {/* Form handles new input and fetch requests */}
        <Form onSubmit={handleSubmit} onClear={handleClearHistory} />

        {/* Displays current result */}
        <ResultDisplay data={data} />
      </Box>

      {/* Displays all past results history */}
      <ResultHistory
        history={history}
        onClickFactorial={handleCalculateFactorial}
        onClickPrime={handleCheckPrime}
      />
    </>
  );
}

export default App;
