import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/Store/store.ts';
import { Contact, fetchContacts } from '../../app/Store/contactsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const ContactList: React.FC = () => {
  const contacts: Contact[] = useSelector((state: RootState) => state.contacts.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Contacts</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/new-contact')}
        >
          Add new contact
        </button>
      </div>
      <div className="list-group">
        {contacts.map((contact: Contact) => (
          <div key={contact.id} className="list-group-item d-flex align-items-center">
            <img
              src={contact.photo}
              alt={contact.name}
              className="rounded-circle me-3"
              style={{width: '60px', height: '60px', objectFit: 'cover'}}
            />
            <div>
              <h5 className="mb-0">{contact.name}</h5>
              <small className="text-muted">{contact.phone}</small>
              <br/>
              <small className="text-muted">{contact.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
