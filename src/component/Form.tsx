import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import type { Mode } from "../types/UtilTypes";
import type { FormProps } from "../types/PropsTypes";


const modeOptions: Mode[] = [
  {
    label: "Check Prime",
    url: `https://mathool.onrender.com/api/v1/math/prime?number=`,
    //"http://localhost:8080/api/v1/math/prime?number=",
  },
  {
    label: "Calculate Factorial",
    url: `https://mathool.onrender.com/api/v1/math/factorial?number=`,
    //"http://localhost:8080/api/v1/math/factorial?number=",
  },
  {
    label: "Prime & Factorial",
    url: `https://mathool.onrender.com/api/v1/math/prime-factorial?number=`
    //"http://localhost:8080/api/v1/math/prime-factorial?number=",
  },
];

const Form = ({ onSubmit, onClear }: FormProps) => {
  const [number, setNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<Mode>(modeOptions[2]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
    setError(""); // reset error on input change
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const parsedNumber = Number(number);
    if (isNaN(parsedNumber)) {
      setError("Please enter a valid number.");
      return;
    }

    if (!Number.isInteger(parsedNumber)) {
      setError("Please enter a whole number.");
      return;
    }

    if (parsedNumber < 0) {
      setError("Number must be zero or positive.");
      return;
    }

    setError("");
    onSubmit(parsedNumber, mode.url);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4, width: "30%"}}>
      <FormControl fullWidth>
        <InputLabel id="mode-select-label">Select Mode</InputLabel>
        <Select
          labelId="mode-select-label"
          value={mode.url}
          label="Select Mode"
          onChange={(e) => {
            const selected = modeOptions.find((m) => m.url === e.target.value);
            if (selected) setMode(selected);
          }}
        >
          {modeOptions.map((m) => (
            <MenuItem key={m.url} value={m.url}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Enter a Number"
        value={number}
        onChange={handleChange}
        type="text"
        fullWidth
        error={Boolean(error)}
        helperText={error}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
      <Button variant="contained" color="warning" onClick={onClear}>
        Clear History
      </Button>
    </Box>
  );
};

export default Form;
