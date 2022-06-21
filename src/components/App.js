import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact"
import {v4 as uuid} from 'uuid';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const LOCAL_STORAGE_KEY = "contacts";

  const addContactHandler = async (contact) => {
    const request = {
      id:uuid(),
      ...contact
    }
    const response = await fetch("http://localhost:3006/contacts", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(request)
    });
    const data = await response.json();
    setContacts([...contacts, data]);
  }

  const updateContactHandler = async (contact) => {
    console.log('*****');
    console.log(contact)
    // const request = {
    //   id:uuid(),
    //   ...contact
    // }
    const response = await fetch(`http://localhost:3006/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(contact)
    });
    const data = await response.json();
    const {id,name,email} = data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? {...data} : contact;
    }));
  }

  const removeContactHandler = async (id) => {
    await fetch(`http://localhost:3006/contacts/${id}`, {method: 'DELETE'});
    const newContactList = contacts.filter(contact => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  const retrieveContacts = async () => {
    const response = await fetch("http://localhost:3006/contacts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
       setSearchResults(contacts);
    }
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
            <Route path="/" exact element={ 
              <ContactList 
                contacts={searchTerm.length < 1 ? contacts : searchResults} 
                getContactId={removeContactHandler} 
                term={searchTerm} 
                searchKeyword={searchHandler}/> } />
            <Route path="/add" element={ <AddContact addContactHandler={addContactHandler} />} />
            <Route path="/contact/:id" element={ <ContactDetail /> } />
            <Route path="/edit" element={ <EditContact updateContactHandler={updateContactHandler} /> } />
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
