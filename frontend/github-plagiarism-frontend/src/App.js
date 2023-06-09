import Home from "./components/home";
import Navbar from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material";
import styles from "../src/static/css/app.module.css";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgba(61, 58, 240, .8)",
      },
      secondary: {
        main: "#0d0b0b",
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div style={styles} className="App">
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Geologica&family=PT+Sans+Narrow&display=swap"
            rel="stylesheet"
          />
          <Navbar />
          <Home />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
