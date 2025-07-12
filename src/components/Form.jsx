import React from 'react';

const Form = () => {
    return (

<div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-950 via-gray-800 to-cyan-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Frontend Developer Challenge
      </h1>            <form className=''>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter text"
                        className="input input-bordered w-full max-w-xs" 
                    />
                    <select className="text-black select select-bordered w-full max-w-xs">
                        <option value="">Select an option</option>
                        <option value="Full">Full Stack</option>
                        <option value="Front">Front-end</option>
                        <option value="Back">Back-end</option>
                        <option value="DevOps">DevOps Engineer</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Form;