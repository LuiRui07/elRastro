import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from API or local storage here
    // and set it using setUser
    const id = localStorage.getItem('id');
    if (id) {
      axios.get('http://localhost:5002/usuarios/' + id)
        .then((response) => {
          const { data } = response;
          const { message } = data;
          if (message === "No se ha encontrado ningún usuario con ese id.") {
            console.log("No se ha encontrado ningún usuario con ese id.");
          } else {
            setUser({
              id: data._id,
              name: data.nombreCompleto,
              email: data.correo,
            });
          }
        })
        .catch((error) => console.log(error));
    }

  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };