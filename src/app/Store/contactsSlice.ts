import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [
    {
      id: '1',
      name: 'John Shepard',
      phone: '+996 555 555 555',
      email: 'john@normandy.space',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Jack Daniels',
      phone: '+996 555 123 456',
      email: 'jack@whiskey.com',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
