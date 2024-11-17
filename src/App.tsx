import ContactList from './containers/ContactList/ContactList.tsx';
import { Route, Routes } from 'react-router-dom';
import AddContact from './containers/AddContact/AddContact.tsx';
import EditContact from './containers/EditContact/EditContact.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactList />} />
      <Route path="/new-contact" element={<AddContact />} />
      <Route path="/edit-contact/:id" element={<EditContact />} />
    </Routes>
  );
};

export default App;