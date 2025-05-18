import React, { useState } from 'react';
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
    
    // For demo purposes - this would normally be generated on the backend
    const [correctCode, setCorrectCode] = useState('');
    const [notification, setNotification] = useState(null);

    const handleStepOneSubmit = (stepOneData) => {
        // Update user data with step one information
        setUserData({ ...userData, ...stepOneData });
        
        // Generate a random 4-digit code (this would normally be done on the backend)
        const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
        setCorrectCode(generatedCode);
        
        // Show the notification with the code
        setNotification({
            type: 'info',
            message: `Verification code: ${generatedCode}`,
            details: 'In a real app, this would be sent via SMS or email'
        });
        
        // Move to step two
        setCurrentStep(2);
    };

    const handleStepTwoSubmit = (code) => {
        // Validate the verification code
        if (code === correctCode) {
            // Update user data with verification code
            setUserData({ ...userData, verificationCode: code });
            
            // Move to step three
            setCurrentStep(3);
            
            // Show success notification
            setNotification({
                type: 'success',
                message: 'Verification successful!',
                details: 'Please set your password to complete registration'
            });
        } else {
            // Show error notification
            setNotification({
                type: 'error',
                message: 'Invalid verification code',
                details: 'Please check the code and try again'
            });
        }
    };

    const handleStepThreeSubmit = (passwordData) => {
        // Update user data with password information
        const finalUserData = { ...userData, ...passwordData };
        setUserData(finalUserData);
        
        // This would normally send the data to a backend API
        console.log('User registration data:', finalUserData);
        
        // Show success notification
        setNotification({
            type: 'success',
            message: 'Registration successful!',
            details: 'Welcome to Bibliotheca! Redirecting to login...'
        });
        
        // Redirect to login page after a delay
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    const dismissNotification = () => {
        setNotification(null);
    };

    return (
        <div className="relative min-h-screen w-full" style={{ background: `#6F6149` }}>
            {/* Content container */}
            <div className="relative pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-decorative text-center mb-6">
                        {currentStep === 1 && 'Create Your Account'}
                        {currentStep === 2 && 'Verify Your Identity'}
                        {currentStep === 3 && 'Secure Your Account'}
                    </h2>
                    
                    {/* Progress bar */}
                    <div className="mb-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-serif">Your Information</span>
                            <span className="text-sm font-serif">Verification</span>
                            <span className="text-sm font-serif">Password</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-green-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    {/* Notification */}
                    {notification && (
                        <div className={`mb-6 p-4 rounded-md ${
                            notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' : 
                            notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
                            'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                            <div className="flex justify-between">
                                <p className="font-bold">{notification.message}</p>
                                <button onClick={dismissNotification} className="text-gray-500 hover:text-gray-700">
                                    &times;
                                </button>
                            </div>
                            <p className="text-sm mt-1">{notification.details}</p>
                        </div>
                    )}
                    
                    {/* Form Steps */}
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