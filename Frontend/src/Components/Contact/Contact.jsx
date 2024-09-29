import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual IDs
    const serviceID = 'service_dk7ahmo';
    const templateID = 'template_x96awp6';
    const userID = 'cbxo14mC-CUtwG0mT';

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Your message has been sent successfully!');
      }, (error) => {
        console.error('FAILED...', error);
        alert('Failed to send your message. Please try again.');
      });

    // Clear form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form-title">
          <p>Contact</p>
        </div>
        <div className="form-group">
          <input 
            type="text" 
            id="name" 
            name="name"
            placeholder='Name' 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder='Email'
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <textarea 
            id="message" 
            name="message" 
            placeholder='Message'
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
