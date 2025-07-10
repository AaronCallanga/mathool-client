import type { PrimeAndFactorialResponse } from "./MathTypes";

export interface FormProps {
  onSubmit: (number: number, url: string) => void;
  onClear: () => void;
}

export interface ResultDisplayProps {
  data: PrimeAndFactorialResponse | null;
}

export interface ResultHistoryProps {
  history: PrimeAndFactorialResponse[];
  onClickFactorial: (number: number, index: number) => void;
  onClickPrime: (number: number, index: number) => void;
}