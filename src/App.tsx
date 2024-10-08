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

function TestPage() {
    return (
        <div>
            <h1>Hello World</h1>
            <p>This is a simple test page.</p>
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
                <Route path="/oauth/callback" element={<OAuthCallback />} />
                <Route path="/test" element={<TestPage/>} />
                <Route path="/" element={<SignInWithGoogle />} />
            </Routes>
        </Router>
    );
}

export default App;
