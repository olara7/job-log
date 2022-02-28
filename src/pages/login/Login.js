import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { Form, FloatingLabel, Button } from 'react-bootstrap'

//styles
import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()

        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2 className='text-center'> Login </h2>
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
            {!isPending && 
            <div className='text-center'>
                <Button variant="success" type="submit"> Login </Button> 
            </div>} 
            {isPending && <button className='btn' disabled> Loading </button>}
            {error && <p> {error} </p>}
        </form>
    )
}