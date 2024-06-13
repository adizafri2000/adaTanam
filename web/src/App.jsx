import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './layouts/Navbar.jsx'
import SignUpPage from "./pages/SignUpPage.jsx";
import { CssBaseline } from '@mui/material'
import HomePage from './pages/HomePage.jsx';
import { green, brown, yellow } from '@mui/material/colors';
import Layout from './layouts/Layout.jsx';


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
            main: green[500],//'#4CAF50',
          },
          secondary: {
            main: brown[400],
          },
          accent: {
            main: yellow[400],
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

    const NotFound = () => {
      return <div>Not found</div>
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<HomePage/>} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                    {/* <Route path="/home" element={<HomePage/>} />
                    <Route path="/" element={<HomePage />} /> */}
                    <Route path='*' element={<NotFound/>}/>
                  </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    )
  
}

export default App
