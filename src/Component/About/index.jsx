import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contact from '../Contact ';
import Navbar from '../Navbar';
const logo_path = require('../images/image_1.png');
const service_path =require('../images/service.jpeg');

const AboutPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 60000); // 1 minute delay

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/+919598090249', '_blank');
  };
  const stoppop = () => {
  setShowPopup(false)
  }; 


  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();
  const ourServices = [
    'Print out Notes',
    'Print photo on Shirt',
    'Print photo on Cup',
    'Inspire Form for Scholarship',
    'B_pharma projects',
    'B_tech projects',
    'Photo Framing',
    'Website Making'
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

  const getImageForService = (service) => {
    switch (service) {
      case 'Website Making':
        return require('../images/webdevlopment.png')
      case 'Photo Framing':
        return require('../images/phtoframing.png')
      case 'Inspire Form for Scholarship':
        return require('../images/scholership.png')
       case 'Print out Notes':
        return require('../images/Nots_print.png');
      case 'Print photo on Shirt':
        return require('../images/photo_on_sirt.png');
      case 'Print photo on Cup':
        return require('../images/photo_on_cup.png');
     case 'B_pharma projects':
        return require('../images/project.png');
     case 'B_tech projects':
          return require('../images/project.png');
      // Add more cases for other services and their respective image paths
      default:
        return ''; // Default image path if service not found
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white" onClick={()=>setShowAboutModal(false)}>
      {/* Automatic Slideshow */}
      <Navbar/>
      <section className="text-center ">

       
        <div className="mb-8 ">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100 image-hight " src={logo_path} alt="First slide"/>
    </div>
    <div class="carousel-item">
    <img class="d-block w-100 image-hight" src={service_path} alt="Second slide"/>

    </div>
   
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
          
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
     
      <div className='fixed right-0  bottom-10 '>
      <a href="https://wa.me/9023257109" target="_blank" rel="noopener noreferrer">
    <button
    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >Chat On WhatsApp </button>
  </a></div>
      {/* About Us Modal */}
     
       
      {/* Our Services */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-black">Make a website for your business!</h2>
            <p className="mb-4 text-black">Please contact us for website development services.</p>
            <button onClick={handleWhatsAppChat} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mr-4">Chat on WhatsApp</button>
            <button onClick={stoppop} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mr-4">Close</button>
          </div>
        </div>
      )}
      <section className="px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ourServices.map((service, index) => (
               <div key={service} className="bg-gray-800 p-4 rounded-md shadow-md h-80" style={{ backgroundImage: `url(${getImageForService(service)})` }}>
                <h3 className="text-lg text-black font-semibold mb-2">{service}</h3>


                <button
                  onClick={() => handleServiceClick(service)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:text-green-500 transition m-50"
                >
                  Place Order
                </button>
              </div>
            ))}
           
          </div>
        </div>
      </section>
   <Contact/>
    </div>
  );
};

export default AboutPage;
