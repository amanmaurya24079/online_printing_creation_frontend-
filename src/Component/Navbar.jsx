import React, { useState } from 'react';
import logo from './images/logo.png'; // Import your logo image file

export default function Navbar() {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/+919598090249', '_blank');
  };

  return (
    <>
      <header className="bg-gradient-to-r from-blue-500 to-green-500  md:sticky top-0 z-10">
        <div className="container mx-auto flex flex-wrap p-2.5 flex-col md:flex-row items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-12 rounded-full mr-2" /> {/* Insert your logo here */}
          
          <div className='ms-auto'>
            <a onClick={handleWhatsAppChat} className="ml-3 text-xl hover:text-green-500">Contact Us</a>
            <a onClick={() => setShowAboutModal(true)} className="ml-3 text-xl hover:text-green-500">About Us</a>
          </div>
        </div>
      </header>

      {showAboutModal && (
        <div className="fixed top-4 right-4 bg-white p-4 rounded-md shadow-md mt-10 max-w-screen-md z-10" onClick={(e) => e.stopPropagation()}>
          <h1 className="text-2xl font-bold mb-2 text-black">About Our Company</h1>
          <p className="mb-4 text-black">Welcome to the Printing Station! We are dedicated to providing high-quality printing services, including printing on notes, shirts, cups, and supporting scholars through our 'Inspire Form for Scholarship' initiative.</p>
          <h1 className="text-2xl font-bold mb-2 text-black">best regards, <br /> Founder: Saurabh Maurya, Co-founder: Aman Maurya</h1>
          <button className='bg-green-500 text-white px-4 py-2 rounded-md transition mr-4' onClick={() => { setShowAboutModal(false); handleWhatsAppChat() }}>Chat With Us</button>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md transition mr-4' onClick={() => setShowAboutModal(false)}>Close</button>
        </div>
      )}
    </>
  );
}
