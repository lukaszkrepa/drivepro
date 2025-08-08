import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {signIn, getCurrentUser, confirmSignIn} from 'aws-amplify/auth';
import {useAuth} from "../AuthContext.jsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('[Login] Signing in...');
        try {
            const response = await signIn({ username: email, password });

            if (response.nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                const newPassword = prompt('Please enter a new password'); // ⚠️ replace with better UI in production
                await confirmSignIn({ challengeResponse: newPassword });
            }
            setUser(response);
            navigate('/admin');
        } catch (err) {
            console.error('[Login] Login error:', err);
            setError('Login failed. Check your credentials.');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleLogin} style={styles.form}>
                <h2 style={styles.title}>Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Login</button>

                {error && <p style={styles.error}>{error}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f4f4f4',
    },
    form: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    title: {
        margin: 0,
        textAlign: 'center',
        fontSize: '1.5rem',
    },
    input: {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        outline: 'none',
    },
    button: {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: '0.5rem',
        fontSize: '0.9rem',
    }
};

export default Login;
