import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepOne from './steps/stepone';
import StepTwo from './steps/steptwo';
import StepThree from './steps/stepthree';

const Signup = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        verificationCode: '',
        password: '',
        confirmPassword: ''
    });

    const [correctCode, setCorrectCode] = useState('');
    const [notification, setNotification] = useState(null);

    
    useEffect(() => {
        if ("Notification" in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const sendNotificationCode = (code) => {
        if ("Notification" in window && Notification.permission === 'granted') {
            new Notification("Verification Code", {
                body: `Your verification code is: ${code}`
            });
        }
    };

    const generateCode = () => {
        const newCode = Math.floor(1000 + Math.random() * 9000).toString();
        setCorrectCode(newCode);
        sendNotificationCode(newCode);
    };

    const handleStepOneSubmit = (stepOneData) => {
        setUserData({ ...userData, ...stepOneData });
        generateCode(); 
        setCurrentStep(2);
    };

    const handleStepTwoSubmit = (code) => {
        if (code === correctCode) {
            setUserData({ ...userData, verificationCode: code });
            setCurrentStep(3);
            setNotification({
                type: 'success',
                message: 'Verification successful!',
                details: 'Please set your password to complete registration'
            });
        } else {
            setNotification({
                type: 'error',
                message: 'Invalid verification code',
                details: 'Please check the code and try again'
            });
        }
    };

    const handleStepThreeSubmit = (passwordData) => {
        const finalUserData = { ...userData, ...passwordData };
        setUserData(finalUserData);

        console.log('User registration data:', finalUserData);

        setNotification({
            type: 'success',
            message: 'Registration successful!',
            details: 'Welcome to Bibliotheca! Redirecting to login...'
        });

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const dismissNotification = () => {
        setNotification(null);
    };

    return (
        <div className="relative min-h-screen w-full" style={{ background: `#6F6149` }}>
            <div className="relative pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-decorative text-center mb-6">
                        {currentStep === 1 && 'Create Your Account'}
                        {currentStep === 2 && 'Verify Your Identity'}
                        {currentStep === 3 && 'Secure Your Account'}
                    </h2>

                    
                    
                    {currentStep === 1 && (
                        <StepOne 
                            onSubmit={handleStepOneSubmit} 
                            initialData={userData}
                        />
                    )}

                    {currentStep === 2 && (
                        <StepTwo 
                            onSubmit={handleStepTwoSubmit}
                            onBack={() => setCurrentStep(1)} 
                            prefilledCode={correctCode}
                            onResend={generateCode} 
                        />
                    )}

                    {currentStep === 3 && (
                        <StepThree 
                            onSubmit={handleStepThreeSubmit}
                            onBack={() => setCurrentStep(2)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
