import {useState} from "react";
import auth from "../services/auth";
import CircularIndeterminate from "./CircularIndeterminate";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({style}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bankNumber, setBankNumber] = useState('')
    const [bankName, setBankName] = useState('')
    const [type, setType] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setName('')
        setPhone('')
        setBankNumber('')
        setBankName('')
        setType('')
    }

    const handleSignUp = async (event) => {
        setIsLoading(true)
        event.preventDefault()

        const data = {
            email,
            password,
            name,
            phone,
            bankNumber,
            bankName,
            type,
            isActive: true
        }

        try {
            const response = await auth.signup(data);
            
            if (response.status < 200 || response.status >= 300) {
                throw new Error(response.data.message);
            }
            setIsLoading(false)
            window.alert('Signup successful!')
            clearForm()
            navigate("/")
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            window.alert(error || 'Signup failed. Please try again.')
        }
    }

    return (
        <div style={style}>
            <h2>Sign up for new account</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={email}
                        required={true}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='passwordHash'
                        value={password}
                        required={true}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={({ target }) => setPhone(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='bankNumber'>Bank Number</label>
                    <input
                        type='text'
                        id='bankNumber'
                        name='bankNumber'
                        value={bankNumber}
                        onChange={({ target }) => setBankNumber(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='bankName'>Bank Name</label>
                    <input
                        type='text'
                        id='bankName'
                        name='bankName'
                        value={bankName}
                        onChange={({ target }) => setBankName(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='type'>Type</label>
                    <select
                        id='type'
                        name='type'
                        value={type}
                        onChange={({target}) => setType(target.value)}
                        required={true}
                    >
                        <option value=''>Select type</option>
                        <option value='Consumer'>Consumer</option>
                        <option value='Farmer'>Farmer</option>
                        <option value='Admin'>Admin</option>
                    </select>
                </div>
                <button type='submit'>Sign up</button>
            </form>
            {isLoading && <CircularIndeterminate/>}
        </div>
    )
}

export default SignUpForm