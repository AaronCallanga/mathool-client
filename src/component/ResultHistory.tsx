import {
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  Chip,
  Box,
  Button,
} from "@mui/material";
import type { ResultHistoryProps } from "../types/PropsTypes";

const ResultHistory = ({
  history,
  onClickFactorial,
  onClickPrime,
}: ResultHistoryProps) => {
  // If no history is present, don't render the component
  if (history.length === 0) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        📜 Matho.oL History
      </Typography>

      {/* Header row labels */}
      <Box
        display="grid"
        gridTemplateColumns="1fr 2fr 2fr 6fr"
        gap={2}
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        <Typography>#</Typography>
        <Typography>Number</Typography>
        <Typography>Prime</Typography>
        <Typography>Factorial</Typography>
      </Box>

      {/* Render each history entry */}
      <List>
        {history.map((entry, index) => (
          <div key={index}>
            <ListItem disableGutters>
              <Box
                display="grid"
                gridTemplateColumns="1fr 2fr 2fr 6fr"
                alignItems="center"
                justifyItems="center"
                gap={2}
                width="100%"
              >
                <Typography>#{index + 1}</Typography>
                <Typography>{entry.number}</Typography>

                {/* Display prime result or an action button to check if the number is prime*/}
                {entry.prime !== undefined && entry.prime !== null ? (
                  <Chip
                    label={
                      entry.prime !== undefined && entry.prime !== null
                        ? entry.prime
                          ? "Prime"
                          : "Not Prime"
                        : ""
                    }
                    color={
                      entry.prime !== undefined && entry.prime !== null
                        ? entry.prime
                          ? "success"
                          : "error"
                        : "default"
                    }
                    size="small"
                  />
                ) : (
                  <Button onClick={() => onClickPrime(entry.number, index)}>
                    Check Prime
                  </Button>
                )}

                {/* Display factorial result or an action button to calculate the factorial of the number */}
                {entry.factorial !== undefined && entry.factorial !== null ? (
                  <Typography>{entry.factorial}</Typography>
                ) : (
                  <Button onClick={() => onClickFactorial(entry.number, index)}>
                    Calculate Factorial
                  </Button>
                )}
              </Box>
            </ListItem>
            {index < history.length - 1 && <Divider sx={{ my: 1 }} />}
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default ResultHistory;
