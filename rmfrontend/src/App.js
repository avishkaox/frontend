import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Calendar from "./scenes/calendar";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Login from "./scenes/user/login";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode} >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route
              path="/login"
              element={
                <Login />
              }
            />
            <Route
              path="/"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Dashboard />
                  </main>
                </div>
              }
            />
            <Route
              path="/team"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Team />
                  </main>
                </div>
              }
            />
            <Route
              path="/contacts"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Contacts />
                  </main>
                </div>
              }
            />
            <Route
              path="/invoices"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Invoices />
                  </main>
                </div>
              }
            />
            <Route
              path="/form"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Form />
                  </main>
                </div>
              }
            />
            <Route
              path="/calendar"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Calendar />
                  </main>
                </div>
              }
            />
            <Route
              path="/bar"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Bar />
                  </main>
                </div>
              }
            />
            <Route
              path="/pie"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Pie />
                  </main>
                </div>
              }
            />
            <Route
              path="/line"
              element={

                <div className="fullview">
                  <Sidebar />
                  <main className="content">
                    <Topbar />
                    <Line />
                  </main>
                </div>
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
