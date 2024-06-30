import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { green, brown, yellow } from '@mui/material/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './layouts/Layout.jsx';
import { UserProvider } from './contexts/UserContext';

import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";
import StorePage from './pages/StorePage.jsx';
import CreateProducePage from './pages/CreateProducePage.jsx';
import CreateStorePage from "./pages/CreateStorePage.jsx";
import UpdatePasswordPage from './pages/UpdatePasswordPage.jsx';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import CartPage from './pages/CartPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import DetailedProducePage from './pages/DetailedProducePage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import ProduceListPage from './pages/ProduceListPage.jsx';
import ConfirmationPage from "./pages/ConfirmationPage.jsx";
import StoreOrdersPage from "./pages/StoreOrdersPage.jsx";

const App = () => {
    const theme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        margin: 0,
                        padding: 0,
                        overflowY: 'scroll',
                    },
                },
            },
        },
        palette: {
            primary: {
                main: green[500],
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
                            <Route index element={<HomePage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignUpPage />} />
                            <Route path="profile" element={<ProfilePage />} />
                            <Route path="profile/update-password" element={<UpdatePasswordPage />} />
                            <Route path="search" element={<SearchResultsPage />} />
                            <Route path="store" element={<StorePage />} />
                            <Route path="store/create-store" element={<CreateStorePage />} />
                            <Route path="store/create-produce" element={<CreateProducePage />} />
                            <Route path="store/orders" element={<StoreOrdersPage />} />
                            <Route path="produce" element={<ProduceListPage />} />
                            <Route path="produce/:id" element={<DetailedProducePage />} />
                            <Route path="cart" element={<CartPage />} />
                            <Route path="orders" element={<OrderHistoryPage />} />
                            <Route path="payment" element={<PaymentPage />} />
                            <Route path="confirm-account" element={<ConfirmationPage />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
                <ToastContainer autoClose={1800} />
            </ThemeProvider>
        </UserProvider>
    );
};

export default App;
