import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

import { Form, FloatingLabel, Button } from 'react-bootstrap'


//styles
import styles from './Signup.module.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const { signup, isPending, error } = useSignup()
    
    const handleSubmit = (e) => {
        e.preventDefault()

        signup(email, password, displayName)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2 className='text-center'> Signup </h2>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label> Email </Form.Label>
                <FloatingLabel label="Email">
                <Form.Control
                    type="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                    />
                </FloatingLabel>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label> Password </Form.Label>
                <FloatingLabel label="Password">
                <Form.Control
                    type="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}
                    />
                </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDisplayName">
                <Form.Label> Display Name </Form.Label>
                <FloatingLabel label="Display Name">
                <Form.Control
                    type="text" 
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Email"
                    value={displayName}
                    />
                </FloatingLabel>
                </Form.Group>
            {!isPending && <div className='text-center'> 
                <Button variant="success" type="submit"> Signup </Button> 
            </div> }
            { isPending && <button className='btn' disabled> loading </button>}
            { error && <p> {error} </p>}
        </form>
    )
}