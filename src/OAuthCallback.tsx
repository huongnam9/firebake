import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function OAuthCallback() {
    // const navigate = useNavigate();

    useEffect(() => {
        // Extract the authorization code from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');

        if (authCode) {
            console.log('Authorization code:', authCode);
            // Handle the authorization code: exchange it for an access token in your backend
            // fetchAccessToken(authCode);
        } else {
            console.error('Authorization code not found');
        }
    }, []);

    // const fetchAccessToken = async (authCode: string) => {
    //     // You would send the authorization code to your backend
    //     try {
    //         const response = await fetch('http://localhost:5000/auth/kakao/callback', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ code: authCode }),
    //         });
    //         const data = await response.json();
    //         console.log('Access Token:', data.access_token);
    //         // Redirect to another page (e.g., dashboard)
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error('Error fetching access token:', error);
    //     }
    // };

    return <div>Logging you in...</div>;
}

export default OAuthCallback;