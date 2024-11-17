import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/Store/store.ts';
import { updateContactToFirebase, fetchContacts } from '../../app/Store/contactsSlice';

const EditContact: React.FC = () => {
  const { id } = useParams(); // Получаем ID из URL
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');


  useEffect(() => {
    const contactToEdit = contacts.find((contact) => contact.id === id);

    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhone(contactToEdit.phone);
      setEmail(contactToEdit.email);
      setPhoto(contactToEdit.photo);
    } else {
      dispatch(fetchContacts());
    }
  }, [id, contacts, dispatch]);


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateContactToFirebase({
        id: id!,
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
      <h1>Edit Contact</h1>
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
          Save Changes
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

export default EditContact;
