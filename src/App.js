import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Layout from "./scenes/layout";
import User from "./scenes/users";
import Offers from "./scenes/offers";
import Products from "./scenes/product";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user" element={<User />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/products" element={<Products />} />
            <Route path="/invoices-balances" element={<Invoices />} />
            <Route path="/profile-form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq-page" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
