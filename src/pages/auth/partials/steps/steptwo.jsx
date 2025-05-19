import React, { useState, useRef, useEffect } from 'react';

const StepTwo = ({ onSubmit, onBack, onResend }) => {
    const [code, setCode] = useState(['', '', '', '']);
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    useEffect(() => {
        if (inputRefs[0].current) {
            inputRefs[0].current.focus();
        }
    }, []);

    useEffect(() => {
        const allFilled = code.every(digit => digit !== '');
        setIsValid(allFilled);
        if (allFilled) setError('');
    }, [code]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (value && !/^\d+$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value.slice(-1);
        setCode(newCode);

        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowRight' && index < 3) {
            inputRefs[index + 1].current.focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs[index - 1].current.focus();
        }

        if (e.key === 'Backspace') {
            if (code[index]) {
                const newCode = [...code];
                newCode[index] = '';
                setCode(newCode);
            } else if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        if (/^\d{4}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setCode(digits);
            inputRefs[3].current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onSubmit(code.join(''));
        } else {
            setError('Please enter all 4 digits');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-gray-600 mb-6 text-center font-serif">
                We've sent a 4-digit verification code to your phone number. 
                Please enter it below to continue.
            </p>

            <div className="mb-6">
                <label className="block text-gray-700 font-serif mb-3 text-center">
                    Verification Code
                </label>

                <div className="flex justify-center gap-3">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={index === 0 ? handlePaste : null}
                            className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength={1}
                        />
                    ))}
                </div>

                {error && (
                    <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
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
                        ${isValid 
                            ? 'bg-[#e3d6b3] hover:bg-[#d6c9a6] text-gray-900' 
                            : 'bg-gray-300 cursor-not-allowed text-gray-700'}`}
                    disabled={!isValid}
                >
                    Verify
                </button>
            </div>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    className="text-blue-600 hover:underline text-sm"
                    onClick={onResend} 
                >
                    Didn't receive the code? Resend
                </button>
            </div>
        </form>
    );
};

export default StepTwo;
