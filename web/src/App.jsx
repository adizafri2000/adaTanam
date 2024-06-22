import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from "./pages/SignUpPage.jsx";
import { CssBaseline } from '@mui/material'
import HomePage from './pages/HomePage.jsx';
import { green, brown, yellow } from '@mui/material/colors';
import Layout from './layouts/Layout.jsx';
import { UserProvider } from './contexts/UserContext';
import ProfilePage from "./pages/ProfilePage.jsx";
import StorePage from "./pages/StorePage.jsx";
import CreateProducePage from "./pages/CreateProducePage.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <UserProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes>
                      <Route element={<Layout />}>
                        <Route index element={<HomePage/>} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="signup" element={<SignUpPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="store" element={<StorePage />} />
                        <Route path="store/create-produce" element={<CreateProducePage />} />
                        <Route path='*' element={<NotFound/>}/>
                      </Route>
                    </Routes>
                </Router>
                <ToastContainer autoClose={1000} />
            </ThemeProvider>
        </UserProvider>
    )
  
}

export default App
