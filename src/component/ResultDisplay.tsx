import { Paper, Typography, Box, Chip, Divider, Stack } from "@mui/material";
import type { ResultDisplayProps } from "../types/PropsTypes";

const ResultDisplay = ({ data }: ResultDisplayProps) => {

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 3, width:"100%"}}>
      <Typography variant="h5" gutterBottom>
        📝 Result
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Number:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {data?.number}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Is Prime:
          </Typography>
          <Chip
            label={
              data?.prime !== undefined
                ? data.prime
                  ? "✅ Prime"
                  : "❌ Not Prime"
                : "N/A"
            }
            color={data?.prime ? "success" : "error"}
            variant="outlined"
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" color="text.secondary">
            Factorial:
          </Typography>
          <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
            {data?.factorial !== undefined && data.factorial !== null
              ? data.factorial.toLocaleString()
              : "N/A"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ResultDisplay;
