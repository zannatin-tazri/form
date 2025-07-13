import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const [fields, setFields] = useState([{ id: uuidv4(), input: '', select: '' }]);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Track which field is being considered for deletion
  const [fieldToDelete, setFieldToDelete] = useState(null);

  const updateField = (id, key, value) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const handleAddField = () => {
    setFields([...fields, { id: uuidv4(), input: '', select: '' }]);
  };

  // Called only after user confirms delete
  const confirmDeleteField = () => {
    if (!fieldToDelete) return;
    const id = fieldToDelete;
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
    setFieldToDelete(null);
  };

  const cancelDelete = () => setFieldToDelete(null);

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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-950 via-gray-800 to-cyan-950 text-white p-6 relative">
      <h1 className="text-3xl font-bold text-center mb-6">Frontend Developer Challenge</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-4">
        {fields.map(({ id, input, select }) => (
  <div key={id} className="p-4 border border-gray-300 bg-gray-900 rounded-lg shadow flex flex-col gap-2">
    <div className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex flex-col w-full md:max-w-xs">
        <input
          type="text"
          value={input}
          onChange={(e) => updateField(id, 'input', e.target.value)}
          placeholder="Enter text"
          className="input input-bordered text-black"
        />
        <p className="text-red-400 text-sm mt-1">{errors[`input-${id}`]}</p>
      </div>

      <div className="flex flex-col w-full md:max-w-xs">
        <select
          value={select}
          onChange={(e) => updateField(id, 'select', e.target.value)}
          className="select select-bordered text-black"
        >
          <option value="">Select an option</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Front-end">Front-end</option>
          <option value="Back-end">Back-end</option>
          <option value="DevOps Engineer">DevOps Engineer</option>
        </select>
        <p className="text-red-400 text-sm mt-1">{errors[`select-${id}`]}</p>
      </div>

      {fields.length > 1 && (
        <button
          type="button"
          onClick={() => setFieldToDelete(id)}
          className="btn bg-red-700 text-white px-4 py-2 mt-4 md:mt-0"
        >
          Delete
        </button>
      )}
    </div>
  </div>
))}


        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            type="submit"
            className="btn w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-purple-500 text-white border-none"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleAddField}
            className="btn w-full sm:w-auto text-3xl bg-green-500 text-white"
          >
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

      {/* Confirmation Modal */}
      {fieldToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-xs w-full text-center text-white">
            <p className="mb-4 text-lg font-semibold">You want to delete this field?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDeleteField}
                className="btn bg-red-600 hover:bg-red-700 px-4 py-2"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="btn bg-gray-600 hover:bg-gray-700 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
