import React, { useState, useEffect } from 'react';

const StepThree = ({ onSubmit, onBack }) => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: 'Password is required'
    });
    
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formData]);

    const calculatePasswordStrength = (password) => {
        if (!password) {
            return { score: 0, feedback: 'Password is required' };
        }
        
        let score = 0;
        let feedback = [];
        
        // Length check
        if (password.length < 8) {
            feedback.push('Password should be at least 8 characters');
        } else {
            score += 1;
        }
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('Add uppercase letters');
        
        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('Add lowercase letters');
        
        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('Add numbers');
        
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else feedback.push('Add special characters');
        
        let strengthFeedback;
        if (score === 0) strengthFeedback = 'Very weak';
        else if (score === 1) strengthFeedback = 'Weak';
        else if (score === 2) strengthFeedback = 'Fair';
        else if (score === 3) strengthFeedback = 'Good';
        else if (score === 4) strengthFeedback = 'Strong';
        else strengthFeedback = 'Very strong';
        
        return { 
            score, 
            feedback: feedback.length > 0 ? feedback.join(', ') : strengthFeedback 
        };
    };

    const validateForm = () => {
        const newErrors = {};
        const strength = calculatePasswordStrength(formData.password);
        setPasswordStrength(strength);
        
        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (strength.score < 3) {
            newErrors.password = 'Password is too weak';
        }
        
        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isFormValid) {
            onSubmit(formData);
        } else {
            validateForm();
        }
    };

    const getPasswordStrengthColor = () => {
        switch(passwordStrength.score) {
            case 0: return 'bg-gray-200';
            case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-lime-500';
            case 5: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-6 text-center font-serif">
                Create a secure password for your account.
            </p>
            
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-serif mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Create a strong password"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                
                {/* Password strength meter */}
                {formData.password && (
                    <div className="mt-1">
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${getPasswordStrengthColor()}`} 
                                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                            ></div>
                        </div>
                        <p className={`mt-1 text-sm ${passwordStrength.score >= 3 ? 'text-green-600' : 'text-orange-600'}`}>
                            {passwordStrength.feedback}
                        </p>
                    </div>
                )}
                
                {errors.password && (
                    <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
                )}
            </div>
            
            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-serif mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Confirm your password"
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
            </div>
            
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                    Back
                </button>
                
                <button
                    type="submit"
                    className={`py-2 px-6 rounded-md font-semibold transition-colors duration-300 
                        ${isFormValid 
                            ? 'bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900' 
                            : 'bg-gray-300 cursor-not-allowed text-gray-700'}`}
                    disabled={!isFormValid}
                >
                    Create Account
                </button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
                By creating an account, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:underline">Terms</a> and{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
            </div>
        </form>
    );
};

export default StepThree;