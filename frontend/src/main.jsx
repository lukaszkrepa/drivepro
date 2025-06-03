import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
// Amplify.configure(awsExports);