import { useEffect, useState } from "react";
import Form from "./component/Form";

import "./App.css";
import ResultDisplay from "./component/ResultDisplay";
import type { PrimeAndFactorialResponse } from "./types/MathTypes";
import ResultHistory from "./component/ResultHistory";
import { Box } from "@mui/material";
import Header from "./component/Header";

function App() {
  const [data, setData] = useState<PrimeAndFactorialResponse | null>(null);
  const [history, setHistory] = useState<PrimeAndFactorialResponse[]>([]);

  useEffect(() => {
    const results = localStorage.getItem("Results");
    if (results) {
      setHistory(JSON.parse(results));
    }
  }, []);

  const handleSubmit = async (number: number, url: string) => {
    try {
      const response = await fetch(url + number);
      const result = await response.json();
      if (!response.ok) {
        // If status is not OK, it's an error, throw with backend error message
        console.error("Validation error:", result);

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
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, result];
        localStorage.setItem("Results", JSON.stringify(updatedHistory)); // Save to local storage
        return updatedHistory;
      });
    } catch (err) {
      console.error(err);
    }
  };

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

      const updatedHistory = history.map((item, i) =>
        i === index ? { ...item, factorial: result.factorial } : item
      );

      setHistory(updatedHistory);
      localStorage.setItem("Results", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
    }
  };

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

      setHistory(updatedHistory);
      localStorage.setItem("Results", JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
    }
  };

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
        <Form onSubmit={handleSubmit} onClear={handleClearHistory} />
        <ResultDisplay data={data} />
      </Box>
      <ResultHistory
        history={history}
        onClickFactorial={handleCalculateFactorial}
        onClickPrime={handleCheckPrime}
      />
    </>
  );
}

export default App;
