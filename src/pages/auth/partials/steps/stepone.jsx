import React, { useState, useEffect } from 'react';

const StepOne = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || ''
    });
    
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};
        
        
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (formData.fullName.trim().length < 5 ) {
            newErrors.fullName = 'Name must be at least 5 characters';
        }else if (/[0-9@#\-+*/,;:!ù$^"']/.test(formData.fullName)  ) {
            newErrors.fullName = 'Please enter a valid name';
        }
        
        
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (formData.email.length < 10 || formData.email.split('@').length !== 2 ||  /[#\-+*/,;:!]/.test(formData.email) || /\s/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/[^\d]/g, ''))) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-serif mb-2">
                    Full Name
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your full name"
                />
                {errors.fullName && (
                    <p className="mt-1 text-red-500 text-sm">{errors.fullName}</p>
                )}
            </div>
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-serif mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your email address"
                />
                {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            
            <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-serif mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                    <p className="mt-1 text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
            </div>
            
            <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md font-semibold transition-colors duration-300 
                    ${isFormValid 
                        ? 'bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900' 
                        : 'bg-gray-300 cursor-not-allowed text-gray-700'}`}
                disabled={!isFormValid}
            >
                Next
            </button>
            
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
            </p>
        </form>
    );
};

export default StepOne;