import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addContactToFirebase } from '../../app/Store/contactsSlice.ts';
import { AppDispatch } from '../../app/Store/store.ts';

const AddContact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert('Please fill in all required fields (Name, Phone, Email)');
      return;
    }

    dispatch(
      addContactToFirebase({
        name,
        phone,
        email,
        photo: photo || 'https://via.placeholder.com/150',
      })
    );
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <h1>Add New Contact</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Photo URL</label>
          <input
            type="text"
            className="form-control"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <div className="mb-3 text-center">
          <label className="form-label">Photo Preview</label>
          <div>
            <img
              src={photo || 'https://via.placeholder.com/150'}
              alt="Preview"
              className="rounded"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/')}
        >
          Back to contacts
        </button>
      </form>
    </div>
  );
};

export default AddContact;
