// src/App.tsx
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInWithGoogle from './SignInGoogle';

declare global {
    interface Window {
        Kakao: any; // Declare Kakao as a property on the window
        naver: any;
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
function TestPage2() {
    const [accessToken, setToken] = useState("")
    useEffect(() => {
        // Extract the authorization code from the URL
        // Extract access_token from the URL hash fragment
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1)); // Remove the # and create URLSearchParams
        const accessToken = params.get('access_token');

        if (accessToken) {
            setToken(accessToken);
            console.log('Access Token:', accessToken);
        } else {
            console.error('Access Token not found');
        }
    }, []);
    return (
        <div>
            <h1>Hello World</h1>
            <p>This is code {accessToken}</p>
        </div>
    );
}
function App() {
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('c4cde495e5d83592f2328c1051db550b'); // Replace with your actual Kakao JavaScript Key
            console.log('Kakao initialized:', window.Kakao.isInitialized());
        }
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: "XveFaBhbm88KMdARVsd2",
            callbackUrl: "https://dreamy-mermaid-eebe3d.netlify.app/callback2",
            isPopup: true,
            loginButton: { color: 'green', type: 3, height: 50 } // Customize the button here

        });
        naverLogin.init();

    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/callback" element={<TestPage/>} />
                    <Route path="/callback2" element={<TestPage2/>} />
                    <Route path="/" element={<SignInWithGoogle />} />
                </Routes>
            </Router>
            <div id="naverIdLogin"></div> {/* This div is where the Naver button will be rendered */}
        </>
    );
}

export default App;
