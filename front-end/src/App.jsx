// src/App.jsx
import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import AuthContainer from './components/AuthContainer'
import ContactModal from './components/ContactModal'
import Listings from './components/Listings' // 1. Import the new component
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [myListings, setMyListings] = useState(false);

  function onLogout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setMyListings(false);
  }

  //Resolved issue 7 by ensuring valid tokens don't have to re-login.
  function checkTokenExpiry(token) {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && !checkTokenExpiry(token)) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }) 

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center px-6">
          <AuthContainer onLoginClick={() => setIsLoggedIn(true)} />
        </div>
      ) : (
        <>
          <Header setMyListings={setMyListings} onLogout={onLogout} />

          <main className="flex-grow px-[50px] py-10">
            <Listings onSelectItem={(item) => setSelectedItem(item)} myListings={myListings} />
          </main>

          <Footer />

          <ContactModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            email={selectedItem?.owner_email}
            title={selectedItem?.title}
          />
        </>
      )}
    </div>
  )
}

export default App