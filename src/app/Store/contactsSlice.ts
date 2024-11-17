import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../../axiosAPI.ts';


export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export type NewContact = Omit<Contact, 'id'>;

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

export const addContactToFirebase = createAsyncThunk<void, NewContact>(
  'contacts/add',
  async (contact, { dispatch }) => {
    const response = await axiosApi.post('/contacts.json', contact);
    const id = response.data.name;

    dispatch(addContact({ id, ...contact }));
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
  },
});


export const { addContact } = contactsSlice.actions;
export default contactsSlice.reducer;
