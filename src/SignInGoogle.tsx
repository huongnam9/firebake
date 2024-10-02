import React, { useState, useEffect } from "react";
import { ConfirmationResult, getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration object (replace with your actual configuration)
const firebaseConfig = {
  apiKey: "AIzaSyDJ5aFe9ISFkuBtT3a3D4PNM5CS_6wIWlc",
  authDomain: "showplus-dev-e642f.firebaseapp.com",
  projectId: "showplus-dev-e642f",
  storageBucket: "showplus-dev-e642f.appspot.com",
  messagingSenderId: "939914942724",
  appId: "1:939914942724:web:a1b8494dd59cb4cda4d851",
  measurementId: "G-8RJ6Y9J4GK"
};

// Initialize Firebase app and auth instance
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// RecaptchaVerifier.prototype.verify = () => Promise.resolve();
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const SignInWithGoogle: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("+84123456789");
  const [otp, setOtp] = useState<string>("");
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [message, setMessage] = useState<string>("");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      console.log("Google Access Token:", token);

      const user = result.user;
      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);
      console.log("Result:", result);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = OAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      const idToken = credential?.idToken;

      console.log("Apple Access Token:", accessToken);
      console.log("Apple ID Token:", idToken);

      const user = result.user;
      const firebaseIdToken = await user.getIdToken();
      console.log("Firebase ID Token:", firebaseIdToken);
      console.log("Sign-in result:", result);
    } catch (error: any) {
      console.error("Error during Apple sign-in:", error);
      console.log("Error details:", {
        errorCode: error.code,
        errorMessage: error.message,
        email: error.customData?.email,
        credential: OAuthProvider.credentialFromError(error),
      });
    }
  };

  // Function to set up reCAPTCHA verifier
  useEffect(() => {
    addRecaptchaScript();
    setupRecaptcha();
  }, []);
  const addRecaptchaScript = () => {
    const existingScript = document.getElementById('recaptcha-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.id = 'recaptcha-script';
      script.onload = () => {
        console.log('reCAPTCHA script loaded successfully.');
      };
      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script.');
        setMessage('Failed to load reCAPTCHA script. Please check your network settings.');
      };
      document.head.appendChild(script);
    }
  };
  // Set up reCAPTCHA verifier (necessary even if bypassed)
  const setupRecaptcha = () => {
    try {
      // Initialize reCAPTCHA only if it hasn't been set up

      if (!window.recaptchaVerifier) {
        console.log("log01")

        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
            }
        );
        console.log("log1", window.recaptchaVerifier)

        // Render the reCAPTCHA verifier
        window.recaptchaVerifier.render().then((widgetId) => {
          console.log('reCAPTCHA rendered with widget ID:', widgetId);
        });
      }
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      setMessage('Failed to set up reCAPTCHA. Please try again.');
    }
  };

// Send OTP to the user's phone number
  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {

      console.log("Sending OTP to:", phoneNumber);
      const verified = window.recaptchaVerifier;
      // Check if verified is defined
      if (!verified) {
        throw new Error("Recaptcha verifier is not initialized.");
      }

      console.log("verified", verified)
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verified);
      console.log("OTP sent successfully:", confirmationResult);
      setVerificationId(confirmationResult);
      setMessage("OTP sent successfully!");
    } catch (error: unknown) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        console.error("Error during OTP send:", error);
        setMessage(`Error during OTP send: ${error.message}`);
      } else {
        // Handle unexpected error types
        console.error("Unexpected error during OTP send:", error);
        setMessage("Unexpected error occurred while sending OTP.");
      }
    }
  };

  // Verify the OTP entered by the user
  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationId) {
      setMessage("Please request an OTP first.");
      return;
    }

    try {
      console.log("Verifying OTP...");
      const result = await verificationId.confirm(otp);
      const user = result.user;
      console.log("namlog", result)
      setMessage(`User authenticated successfully! User ID: ${user.uid}`);
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setMessage(`Error verifying OTP: ${error.message}`);
    }
  };

  return (
      <div>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
        <button onClick={signInWithApple}>Sign In with Apple</button>
        <div>
          <h2>Firebase SMS Verification</h2>
          <form onSubmit={sendOTP}>
            <input
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button type="submit">Send OTP</button>
          </form>

          <form onSubmit={verifyOTP}>
            <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify OTP</button>
          </form>

          <div id="recaptcha-container"></div> {/* This is required for reCAPTCHA */}
          <p>{message}</p>
        </div>
      </div>
  );
};

export default SignInWithGoogle;
