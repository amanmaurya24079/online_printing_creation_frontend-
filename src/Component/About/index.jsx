import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const image_path = require('../images/logo.jpeg')
const AboutPage = () => {
  const navigate = useNavigate();
  const ourServices = [
    'Print out Notes ',
    'Print photo on Shirt',
    'Print photo on Cup',
    'Inspire Form for Scholarship',
    'B_pharma projects',
    'B_tech projects',
    'Photo Framing'
    // Add more services as needed
  ];

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [showAboutModal, setShowAboutModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % ourServices.length);
    }, 5000); // Change the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [ourServices.length]);

  const handleServiceClick = (serviceName) => {
    // Handle button click, you can navigate to a new page or show a form for detailed input
    navigate("/User_detail")
    console.log(`User clicked on ${serviceName}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" onClick={()=>setShowAboutModal(false)}>
      {/* Automatic Slideshow */}
      <section className="text-center ">


        <div className="mb-8 ">
          <img src={image_path} alt="" className="!w-full" />

          <div className="overflow-x-auto whitespace-nowrap bg-gray-900  p-4 rounded-md">
            <div className="overflow-hidden bg-gray-900  p-4 rounded-md">

              <div className="overflow-hidden bg-gray-900  p-4 rounded-md">
                <div className="flex space-x-4 animate-marquee">
                  {ourServices.map((service, index) => (
                    <div
                      key={service}
                      className={`py-2 px-4 rounded-lg shadow-md ${index === currentServiceIndex ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                        } transition-all duration-1000 ease-in-out`}
                    >
                      <p className="text-lg font-semibold">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>



        </div>

      </section>
      {/* Button to Open About Modal */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowAboutModal(true)}}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        About Us
      </button>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7155178841161511"
    crossorigin="anonymous"></script>

<ins class="adsbygoogle"
    //style="display:inline-block;width:728px;height:90px"
    data-ad-client="ca-pub-7155178841161511"
    data-ad-slot="1420801333"></ins>
<script>
    (adsbygoogle = window.adsbygoogle || []).push({});
</script>
      {/* About Us Modal */}
      {showAboutModal && (
        <div className="fixed top-4 right-4 bg-gray-900  p-4 rounded-md shadow-md" onClick={(e)=> e.stopPropagation()}>
          <h1 className="text-2xl font-bold mb-2">About Our Company</h1>
          <p className="mb-4">
            Welcome to the Printing Station! We are dedicated to providing high-quality printing services, including
            printing on notes, shirts, cups, and supporting scholars through our "Inspire Form for Scholarship" initiative.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => {
              setShowAboutModal(false);
              handleServiceClick('About Us');
            }}
          >
            Learn More
          </button>
        </div>
      )}
     
      {/* Our Services */}
      <section className="px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ourServices.map((service, index) => (
              <div key={service} className="bg-gray-800 p-4 rounded-md shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <button
                  onClick={() => handleServiceClick(service)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Place Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
