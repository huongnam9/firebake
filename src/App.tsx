// src/App.tsx
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInWithGoogle from './SignInGoogle';

declare global {
    interface Window {
        Kakao: any; // Declare Kakao as a property on the window
    }
}

function TestPage() {
    const [code, setCode] = useState("")
    useEffect(() => {
        // Extract the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');

        if (authCode) {
            setCode(authCode)
            console.log('Authorization code:', authCode);
            // Handle the authorization code: exchange it for an access token in your backend
            // fetchAccessToken(authCode);
        }
    }, []);
    return (
        <div>
            <h1>Hello World</h1>
            <p>This is code {code}</p>
        </div>
    );
}
function App() {
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('c4cde495e5d83592f2328c1051db550b'); // Replace with your actual Kakao JavaScript Key
            console.log('Kakao initialized:', window.Kakao.isInitialized());
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/callback" element={<TestPage/>} />
                <Route path="/" element={<SignInWithGoogle />} />
            </Routes>
        </Router>
    );
}

export default App;
