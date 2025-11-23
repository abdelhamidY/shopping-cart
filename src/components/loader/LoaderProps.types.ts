export interface LoaderProps {
  isLoading: boolean;
  error?: any;
  timedOut?: boolean;
  pastDelay?: boolean;
  retry?: () => void;
  isSmall?: boolean;
}
