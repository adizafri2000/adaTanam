import { useState, useEffect, useRef } from 'react'
import Account from './components/Account.jsx'
import Notification from './components/Notification'
import accountService from './services/accounts/accounts.jsx'
import loginService from './services/accounts/login.jsx'
import LoginForm from "./components/LoginForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
// import Toggleable from './components/Toggleable.jsx'
// import AccountForm from './components/AccountForm.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './layouts/Navbar.jsx'
import SignIn from "./components/SignIn.jsx";
import produceService from "./services/produce";
import SignUpPage from "./pages/SignUpPage.jsx";
import { CssBaseline } from '@mui/material'

const HomePage = () => {
    const [produceList, setProduceList] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsButtonClicked(true);
        setIsLoading(true);
        const result = await produceService.getAll();
        setProduceList(result);
        setIsLoading(false);
    };

    return (
        <>
            <div>Home Page (this is edited on dev after PR to main and should not appear yet on prod)</div>
            <button onClick={handleClick}>Load Produce</button>
            {isLoading ? <div>Loading...</div> : isButtonClicked && produceList.map(produce => <div key={produce.id}>{produce.name}</div>)}
        </>
    );
};

const App = () => {
    // account and metadata in forms
    const [accounts, setAccounts] = useState([])

    // notification & visuals
    const [messageColour, setMessageColour] = useState('green')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const successColour = 'green'
    const failedColour = 'red'
    const [visibleForm, setVisibleForm] = useState(null);

    // auth
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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
            main: '#4CAF50',
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

    const accountFormRef = useRef()

    // useEffect( () => {
    //     accountService.getAll().then(accounts =>
    //         setAccounts( accounts.sort((a,b) => a.likes-b.likes) )
    //     )
    // }, [])

    // check for any user login tokens stored in browser local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedaccountappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            accountService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const loginData = {
                email: email,
                password: password,
            }
            const userToken = await loginService.login(loginData)
            const user = {email, ...userToken}
            // // save user login token to local storage
            window.localStorage.setItem(
                'loggedaccountappUser', JSON.stringify(user)
            )

            // // set user token for account services esp. account creation
            accountService.setToken(user.token)

            console.log('logged in user: ', user)
            setUser(user)
            setEmail('')
            setPassword('')
        } catch (exception) {
            setMessageColour(failedColour)
            setNotificationMessage('wrong email or password')
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

    const addAccount = async (accountObject) => {
        accountFormRef.current.toggleVisibility()

        const response = await accountService.create(accountObject)
        setAccounts(accounts.concat(response))
        setMessageColour(successColour)
        setNotificationMessage(`a new account ${response.title} by ${response.author} is added`)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }

    const likeAccount = async (id) => {
        const account = accounts.find(b => b.id===id)
        const changedAccount = { ...account, likes: account.likes+1 }
        await accountService.update(id, changedAccount)
        setAccounts(accounts.map(account => account.id===id ? changedAccount : account))
    }

    const deleteAccount = async id => {
        await accountService.remove(id)
        setAccounts(accounts.filter(account => account.id !== id))
    }

    const accountForm = () => (
        <Togglable buttonLabel='New Account' ref={accountFormRef}>
            <AccountForm createAccount={addAccount}/>
        </Togglable>
    )

    const logoutHandler = () => {
        window.localStorage.removeItem('loggedaccountappUser')
        setUser(null)
        setMessageColour(successColour)
        setNotificationMessage('Successfully logged out!')

        setTimeout(() => {
            setNotificationMessage(null)
        }, 3000)
        // window.location.reload()
    }

    const toggleLoginForm = () => {
        if (visibleForm === 'login') {
            setVisibleForm(null);
        } else {
            setVisibleForm('login');
        }
    };

    const toggleSignUpForm = () => {
        if (visibleForm === 'signup') {
            setVisibleForm(null);
        } else {
            setVisibleForm('signup');
        }
    };

    const formDivStyle = {
        border: '1px solid black',
        padding: '5px',
        marginBottom: '5px'
    }

    const onSuccessfulSignUp = (message) => {
        setVisibleForm(null);
        setNotificationMessage(message);
        setMessageColour(successColour);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    }

    const oldTest = () => (
        <div>
                <h2>Sample CRUD verification</h2>

                {notificationMessage && <Notification message={notificationMessage} color={messageColour} />}

                {!user && (
                    <>
                        <button onClick={toggleLoginForm}>Login to app</button>
                        <button onClick={toggleSignUpForm}>Sign up for new account</button>
                    </>
                )}

                {!user && visibleForm === 'login' && <LoginForm style={formDivStyle} handleLogin={handleLogin} email={email} password={password} setPassword={setPassword} setEmail={setEmail}/>}

                {!user && visibleForm === 'signup' && <SignUpForm style={formDivStyle} onSuccessfulSignUp={onSuccessfulSignUp}/>}

                {/*{ (notificationMessage) && <Notification message={notificationMessage} color={messageColour} /> }*/}

                {/*/!*if user state is null (no user logged in), display login form*!/*/}
                {/*{!user && <LoginForm handleLogin={handleLogin} email={email} password={password} setPassword={setPassword} setEmail={setEmail}/>}*/}

                {/*if a user has logged in (user state not null), display name and create new account form*/}
                {user && <div>
                    <p>{user.email} logged in</p>
                    <button onClick={logoutHandler}>logout</button>
                </div>
                }

                {/*/!*{user && accountForm()}*!/*/}
                {/*{user && accounts.map(account =>*/}
                {/*    // <Account key={account.id} account={account} updateAccount={likeAccount} deleteAccount={deleteAccount} email={user.email} name={user.name}/>*/}
                {/*    <Account key={account.id} account={account} updateAccount={likeAccount} deleteAccount={deleteAccount} email={user.email} name={user.name}/>*/}
                {/*)}*/}

            </div>
    )

    const SignupPage = () => <SignIn/>;
    const HomePage2 = () => {
        const produceList = produceService.getAll();
        console.log(produceList);
        return (
            <>
                <div>Home Page (this is edited on dev after PR to main and should not appear yet on prod)</div>;
                {produceList.map(produce => <div key={produce.id}>{produce.name}</div>)}
            </>
        )
    
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
