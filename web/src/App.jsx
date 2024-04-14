import { useState, useEffect, useRef } from 'react'
import Account from './components/Account.jsx'
import Notification from './components/Notification'
import accountService from './services/accounts.jsx'
import loginService from './services/login.jsx'
// import Togglable from './components/Togglable.jsx'
// import AccountForm from './components/AccountForm.jsx'

const App = () => {
    const dummy = process.env.DUMMY | '0'
    console.log(`dummy: ${dummy}`)
    // account and metadata in forms
    const [accounts, setAccounts] = useState([])

    // notification
    const [messageColour, setMessageColour] = useState('green')
    const [notificationMessage, setNotificationMessage] = useState(null)
    const successColour = 'green'
    const failedColour = 'red'

    // auth
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // const accountFormRef = useRef()

    useEffect( () => {
        accountService.getAll().then(accounts =>
            setAccounts( accounts.sort((a,b) => a.likes-b.likes) )
        )
    }, [])

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
            const user = await loginService.login({
                email: username,
                password: password,
            })
            // // save user login token to local storage
            window.localStorage.setItem(
                'loggedaccountappUser', JSON.stringify(user)
            )

            // // set user token for account services esp. account creation
            accountService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setMessageColour(failedColour)
            setNotificationMessage('wrong username or password')
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    // const addAccount = async (accountObject) => {
    //     accountFormRef.current.toggleVisibility()
    //
    //     const response = await accountService.create(accountObject)
    //     setAccounts(accounts.concat(response))
    //     setMessageColour(successColour)
    //     setNotificationMessage(`a new account ${response.title} by ${response.author} is added`)
    //     setTimeout(() => {
    //         setNotificationMessage(null)
    //     }, 5000)
    // }

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

    // const accountForm = () => (
    //     <Togglable buttonLabel='New Account' ref={accountFormRef}>
    //         <AccountForm createAccount={addAccount}/>
    //     </Togglable>
    // )

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

    return (
        <div>
            <h2>Accounts</h2>

            { (notificationMessage) && <Notification message={notificationMessage} color={messageColour} /> }

            {/*if user state is null (no user logged in), display login form*/}
            {!user && loginForm()}

            {/*if a user has logged in (user state not null), display name and create new account form*/}
            {user && <div>
                <p>{user.name} logged in</p>
                <button onClick={logoutHandler}>logout</button>
            </div>
            }

            {/*{user && accountForm()}*/}
            {user && accounts.map(account =>
                // <Account key={account.id} account={account} updateAccount={likeAccount} deleteAccount={deleteAccount} username={user.username} name={user.name}/>
                <Account key={account.id} account={account} updateAccount={likeAccount} deleteAccount={deleteAccount} username={user.username} name={user.name}/>
            )}
        </div>
    )
}

export default App
