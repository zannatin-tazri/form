import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const [fields, setFields] = useState([{ id: uuidv4(), input: '', select: '' }]);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const handleAddField = () => {
    setFields([...fields, { id: uuidv4(), input: '', select: '' }]);
  };

  const handleDeleteField = (id) => {
    const updated = fields.filter((f) => f.id !== id);
    setFields(updated);
    if (submittedData) {
      const filtered = submittedData.filter((f) => f.id !== id);
      setSubmittedData(filtered.length ? filtered : null);
    }
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`input-${id}`];
      delete copy[`select-${id}`];
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    fields.forEach(({ id, input, select }) => {
      if (!input.trim()) newErrors[`input-${id}`] = 'This is a required field';
      if (!select.trim()) newErrors[`select-${id}`] = 'This is a required field';
    });

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmittedData([...fields]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-950 via-gray-800 to-cyan-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Frontend Developer Challenge</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-4">
        {fields.map(({ id, input, select }) => (
          <div key={id} className="p-4 border border-gray-300 bg-gray-900 rounded-lg shadow flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => updateField(id, 'input', e.target.value)}
                placeholder="Enter text"
                className="input input-bordered w-full md:max-w-xs text-black"
              />
              <select
                value={select}
                onChange={(e) => updateField(id, 'select', e.target.value)}
                className="select select-bordered w-full md:max-w-xs text-black"
              >
                <option value="">Select an option</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteField(id)}
                  className="bg-red-700 text-white btn btn-square"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <p className="w-full md:max-w-xs text-red-400 text-sm">{errors[`input-${id}`]}</p>
              <p className="w-full md:max-w-xs text-red-400 text-sm">{errors[`select-${id}`]}</p>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button type="submit" className="btn w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-purple-500 text-white border-none">
            Submit
          </button>
          <button type="button" onClick={handleAddField} className="btn w-full sm:w-auto text-3xl bg-green-500 text-white">
            +
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="mt-6 bg-transparent rounded-xl p-4 shadow-lg w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4 text-white">Input State in a Table</h2>
          <div className="overflow-x-auto">
            <table className="table w-full bg-white text-gray-800 rounded-xl">
              <thead>
                <tr className="bg-gray-200 text-gray-900">
                  <th>No.</th>
                  <th>Input</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map(({ id, input, select }, index) => (
                  <tr key={id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>
                    <td>{input}</td>
                    <td>{select}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
