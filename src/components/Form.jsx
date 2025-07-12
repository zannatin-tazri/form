import React, { useState } from 'react';

const Form = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!inputValue.trim()) {
      newErrors.input = "This is a required field";
    }
    if (!selectValue.trim()) {
      newErrors.select = "This is a required field";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save data and reset form
    setSubmittedData({ input: inputValue, select: selectValue });
    setInputValue('');
    setSelectValue('');
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-950 via-gray-800 to-cyan-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Frontend Developer Challenge
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text"
            className="input input-bordered w-full max-w-xs text-black"
          />
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="text-black select select-bordered w-full max-w-xs"
          >
            <option value="">Select an option</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
          </select>
        </div>

        {/* Error messages */}
        <div className="flex gap-4 mt-1">
          <div className="w-full max-w-xs text-red-400 text-sm">
            {errors.input}
          </div>
          <div className="w-full max-w-xs text-red-400 text-sm">
            {errors.select}
          </div>
        </div>

        
        <div className="mt-6 flex justify-start">
          <button
            type="submit"
            className="btn bg-gradient-to-r from-cyan-400 to-purple-500 text-white border-none"
          >
            Submit
          </button>
        </div>
      </form>

     
      {submittedData && (
        <div className="mt-6 bg-white rounded-xl p-4 shadow-lg text-gray-900 w-full max-w-2xl">
          <h3 className="text-lg font-semibold mb-2">Input: {submittedData.input}</h3>
          <h3 className="text-lg font-semibold">Select: {submittedData.select}</h3>
        </div>
      )}
    </div>
  );
};

export default Form;
