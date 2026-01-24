import emailjs from 'emailjs-com';
import { BookingDetails } from '../types';

// REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export const sendBookingNotification = async (details: BookingDetails, type: 'booking_request' | 'payment_success') => {
  try {
    const templateParams = {
      to_email: 'astroshrijan@gmail.com',
      from_name: details.name,
      from_email: details.email,
      phone: details.phone,
      service_name: details.serviceName,
      price: details.price,
      message_type: type === 'payment_success' ? 'PAYMENT SUCCESSFUL' : 'NEW BOOKING REQUEST',
      booking_details: `
        Name: ${details.name}
        Phone: ${details.phone}
        Email: ${details.email}
        Service: ${details.serviceName}
        Price: ₹${details.price}
        DOB: ${details.dob}
        Time: ${details.timeOfBirth || 'Not provided'}
        Place: ${details.placeOfBirth || 'Not provided'}
        Questions: ${details.questions || 'None'}
      `
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log('Email sent successfully!', response.status, response.text);
    return true;
  } catch (err) {
    console.error('Failed to send email:', err);
    return false;
  }
};
