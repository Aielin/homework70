import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/Store/store.ts';
import { Contact, deleteContactFromFirebase, fetchContacts } from '../../app/Store/contactsSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';


const ContactList: React.FC = () => {
  const contacts: Contact[] = useSelector((state: RootState) => state.contacts.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleShowModal = (contact: Contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
    setShowModal(false);
  };


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
          <div
            key={contact.id}
            className="list-group-item d-flex align-items-center"
            onClick={() => handleShowModal(contact)}
            style={{cursor: 'pointer'}}
          >
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

      {selectedContact && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedContact?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedContact?.photo}
              alt={selectedContact?.name}
              className="img-fluid rounded-circle mb-3"
            />
            <p><strong>Phone:</strong> {selectedContact?.phone}</p>
            <p><strong>Email:</strong> {selectedContact?.email}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => navigate(`/edit-contact/${selectedContact?.id}`)}
            >
              Edit
            </Button>

            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (selectedContact) {
                  dispatch(deleteContactFromFirebase(selectedContact.id));
                  handleCloseModal();
                }
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

      )}
    </div>
  );
};

export default ContactList;
