import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrintForm = () => {
  
const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    selectedService: '',
    document_type:"",
    pdfOrPhoto: null,
    printOption: '',
    total_price: 0 // Default total price to 0
  });
  const[status,setstatus]=useState(false)
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
const [total_price,setTotal_price ]=useState(0)

  const uploadFile = async (e) => {
    setLoading(true);
    setstatus(false);
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onloadend = function () {
      var count = reader?.result?.match(/\/Type[\s]*\/Page[^s]/g)?.length;
      console.log('Number of Pages:', count);
      setPdfPageCount(count)
    }

    const formData = new FormData();
    formData.append('profile', file);

    try {
      const response = await fetch('https://online-printing-creation.onrender.com/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data.profile_url);
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        pdfOrPhoto: data.profile_url
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
      setstatus(true); // Set loading to false when upload completes
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePrintOptionChange = (e) => {
    const value = e.target.value;
    setUserInfo(prevInfo => ({
      ...prevInfo,
      printOption: value,
    }));
  };

  const calculatePrice = () => {
    const { selectedService, printOption } = userInfo;

    if (selectedService === 'notesPrint') {
      return printOption === 'oneSide' ? pdfPageCount * 0.75 : pdfPageCount * 1.5;
      
    } else if (selectedService === 'shirtPrint') {
      return 300;
    } else if (selectedService === 'cupPrint') {
      return 100;
    }
    else if(selectedService ==='PhotoFraming'){
      return 100
    }

    return 0; // Default to 0 if no service selected or invalid PDF
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === false){
      alert("Please wait file is uploading")
      return;
    }
    // Calculate price and store it in userInfo
    const price = calculatePrice();
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      total_price: price
    }));
   
    try {
      const response = await fetch(`https://online-printing-creation.onrender.com/send_mail`, {
        method: 'POST',
        body: JSON.stringify(userInfo)
      });
      const data = await response.json();
      console.log(data)
      alert(" youe resonce have been taken ")
      navigate("/")
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
   setUserInfo({...userInfo, total_price:calculatePrice()})
  }, [calculatePrice()])
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-md shadow-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-2xl font-bold mb-4">  pleas fill the form </h1>
        <form onSubmit={handleSubmit}>
          {/* User Information Fields */}
          <div className="mb-4">
            <label className="block text-white">
              First Name:
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white">
              Last Name:
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white">
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white">
              Email:
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              />
            </label>
          </div>

          {/* Service Selection */}
          <div className="mb-4">
            <label className="block text-white">
              Select Service:
              <select
                name="selectedService"
                value={userInfo.selectedService}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              >
                <option value="">Select a Service</option>
                <option value="notesPrint">Notes Print</option>
                <option value="shirtPrint">Print photo on Shirt</option>
                <option value="cupPrint">Print photo on Cup</option>
                <option value="PhotoFraming">Photo Framing</option>
                {/* Add more service options as needed */}
              </select>
            </label>
          </div>

          {/* PDF/Photo Upload */}
          <div className="mb-4">
            <label className="block text-white">
              Upload PDF or Photo:
              <input
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={uploadFile}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                required
              />
            </label>
            {loading ? (
              <div className="text-white flex items-center justify-center mt-2">
                <div className="loader"></div>
                <div className="ml-2">Uploading...</div>
              </div>
            ) : null} {/* Display loading message if loading is true */}
          </div>
          {userInfo?.pdfOrPhoto && (
            <div className="mb-4">
             
              <label className="block text-white">Preview:</label>
              {userInfo?.selectedService === 'notesPrint' ? (
                <div>
                  <p className="text-white"> Total number of pages in your document is ({pdfPageCount} pages)</p>
                </div>
              ) : (
                <img
                  src={userInfo?.pdfOrPhoto?.includes("https") ? userInfo?.pdfOrPhoto : URL.createObjectURL(userInfo?.pdfOrPhoto)}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              )}
            </div>
          )}

          {/* Print Options */}
          {userInfo.selectedService === 'notesPrint' && (
            <div className="mb-4">
              <label className="block text-white">
                Print Option:
                <select
                  name="printOption"
                  value={userInfo.printOption}
                  onChange={handlePrintOptionChange}
                  className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 rounded-md"
                >
                  <option value="oneSide">One Side</option>
                  <option value="bothSides">Both Sides</option>
                </select>
              </label>
            </div>
          )}

          {/* Price Display */}
          <p className="text-white">Estimated Price: ${calculatePrice()}</p>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrintForm;
