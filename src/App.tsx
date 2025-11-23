import { HelmetProvider } from "react-helmet-async";
import MainRoutes from "./routes";
import ThemeProvider from "./utils/providers/mantine/mantine.provider";
import ReactQueryProvider from "./utils/providers/reactQuery-provider";

function App() {
  return (
    <HelmetProvider>
      <ReactQueryProvider>
        <ThemeProvider>
          <MainRoutes />
        </ThemeProvider>
      </ReactQueryProvider>
    </HelmetProvider>
  );
}

export default App;
