import { useState } from 'react'

const Account = (props) => {
    const { account } = props
    const [showDetails, setShowDetails] = useState(false)

    const toggleVisibility = () => {
        setShowDetails(!showDetails)
    }

    const accountStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const accountFullDetails = () => {
        return (
            <div className='account'>
                {/*<div className='account-url'>{account.url}</div>*/}
                {/*<div className='account-likes'>likes {account.likes} <button onClick={() => updateAccount(account.id)}>like</button></div>*/}
                {/*{*/}
                {/*    account.user.name ?*/}
                {/*        <div>{account.user.name}</div> :*/}
                {/*        <div>{name}</div>*/}
                {/*}*/}
                <pre>{JSON.stringify(account, null, 2)}</pre>
            </div>
        )
    }

    return (
        <div style={accountStyle}>
            <div className='account-details'>
                <span>{account.email}</span>
                <button onClick={() => toggleVisibility()}>{showDetails===false ? 'view' : 'hide'}</button>
            </div>
            {showDetails===true && accountFullDetails()}
        </div>
    )
}

export default Account