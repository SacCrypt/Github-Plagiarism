import Home from "./components/home";
import Navbar from "./components/navbar";
import { ThemeProvider, createTheme } from "@mui/material";
import styles from "../src/static/css/app.module.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Report from "./components/reports";
import { createContext, useState } from "react";

const Context = createContext();

function App() {
  const queryClient = new QueryClient();
  const [color, setColor] = useState("primary");
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
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Context.Provider value={setColor}>
            <div style={styles} className="App">
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Geologica&family=PT+Sans+Narrow&display=swap"
                rel="stylesheet"
              />
              <Navbar color={color} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports/" element={<Report />} />
              </Routes>
            </div>
          </Context.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export { Context };
export default App;
