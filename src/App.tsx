import ContactList from './containers/ContactList/ContactList.tsx';
import { Route, Routes } from 'react-router-dom';
import AddContact from './containers/AddContact/AddContact.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactList />} />
      <Route path="/new-contact" element={<AddContact />} />
    </Routes>
  );
};

export default App;