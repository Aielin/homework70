import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/Store/store.ts';
import { Contact } from '../../app/Store/contactsSlice.ts';


const ContactList: React.FC = () => {
  const contacts: Contact[] = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="container mt-4">
      <h1>Contacts</h1>
      <div className="list-group">
        {contacts.map((contact: Contact) => (
          <div key={contact.id} className="list-group-item d-flex align-items-center">
            <img
              src={contact.photo}
              alt={contact.name}
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <div>
              <h5 className="mb-0">{contact.name}</h5>
              <small className="text-muted">{contact.phone}</small>
              <br />
              <small className="text-muted">{contact.email}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
