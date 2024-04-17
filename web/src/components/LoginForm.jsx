const LoginForm = ({ handleLogin, email, setEmail, password, setPassword, style }) => {
    return (
        <div style={style}>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Email
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm;