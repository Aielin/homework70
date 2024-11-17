  import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
  import axiosApi from '../../axiosAPI.ts';


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
    contacts: [],
  };

  export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
    const response = await axiosApi.get('/contacts.json');
    const data = response.data;

    const contacts: Contact[] = Object.keys(data || {}).map((id) => ({
      id,
      ...data[id],
    }));

    return contacts;
  });

  export const addContactToFirebase = createAsyncThunk<void, Omit<Contact, 'id'>>(
    'contacts/add',
    async (contact, { dispatch }) => {
      const response = await axiosApi.post('/contacts.json', contact);
      const id = response.data.name;

      dispatch(addContact({ id, ...contact }));
    }
  );

  export const updateContactToFirebase = createAsyncThunk<void, Contact>(
    'contacts/update',
    async (contact) => {
      await axiosApi.put(`/contacts/${contact.id}.json`, contact);
    }
  );

  export const deleteContactFromFirebase = createAsyncThunk<void, string>(
    'contacts/delete',
    async (id, { dispatch }) => {
      await axiosApi.delete(`/contacts/${id}.json`);
      dispatch(deleteContact(id));
    }
  );

  const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
      addContact: (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      },
      deleteContact: (state, action: PayloadAction<string>) => {
        state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      });
      builder.addCase(updateContactToFirebase.fulfilled, (state, action) => {
        const updatedContact = action.meta.arg;
        const index = state.contacts.findIndex((c) => c.id === updatedContact.id);

        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
      });
    },
  });

  export const { addContact, deleteContact } = contactsSlice.actions;
  export default contactsSlice.reducer;

