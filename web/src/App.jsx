import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './layouts/Navbar.jsx'
import SignUpPage from "./pages/SignUpPage.jsx";
import { CssBaseline } from '@mui/material'
import HomePage from './pages/HomePage.jsx';
import { green } from '@mui/material/colors';


const App = () => {

    const theme = createTheme({
        components: {
            MuiCssBaseline: {
              styleOverrides: {
                body: {
                  margin: 0,
                  padding: 0,
                },
              },
            },
        },
        palette: {
          primary: {
            main: green[200],//'#4CAF50',
          },
          secondary: {
            main: '#FF9800',
          },
          error: {
            main: '#f44336',
          },
          warning: {
            main: '#ff9800',
          },
          info: {
            main: '#2196f3',
          },
          success: {
            main: '#4caf50',
          },
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
