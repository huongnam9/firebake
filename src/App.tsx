// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OAuthCallback from './OAuthCallback';
import SignInWithGoogle from './SignInGoogle';

declare global {
    interface Window {
        Kakao: any; // Declare Kakao as a property on the window
    }
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
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                <Route path="/" element={<SignInWithGoogle />} />
            </Routes>
        </Router>
    );
}

export default App;
