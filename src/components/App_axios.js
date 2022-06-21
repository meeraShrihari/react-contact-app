import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import {v4 as uuid} from 'uuid';


function App() {
  const [contacts, setContacts] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = async (contact) => {
    const request = {
      id:uuid(),
      ...contact
    }

    const response = await api.post("/contacts", request)
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter(contact => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  useEffect(() => {
    // const retrieveStoredContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retrieveStoredContacts) setContacts(retrieveStoredContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) {
        setContacts(allContacts);
      }
    }
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
          <Routes>
            <Route path="/" exact element={ <ContactList contacts={contacts} getContactId={removeContactHandler} /> } />
            <Route path="/add" element={ <AddContact addContactHandler={addContactHandler} />} />
            <Route path="/contact/:id" element={ <ContactDetail /> } />
            {/* <Route path="/" exact render={(props) =>
              <ContactList 
                {...props} 
                contacts={contacts} 
                getContactId={removeContactHandler} 
              />}
            />
            <Route path="/add" render={(props) =>
              <AddContact 
                {...props} 
                addContactHandler={addContactHandler} 
              />}
            /> */}
          </Routes>        
        
        
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
