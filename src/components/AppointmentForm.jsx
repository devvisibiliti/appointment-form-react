
import { useState } from 'react';
import { addAppointment } from '../slice/appointmentSlice';
import { useDispatch } from 'react-redux';



const AppointmentForm = ()=> {
    const[appointment, setAppointment] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        time: '',
        reason: ''
    });
     const dispatch = useDispatch();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });
    };

    // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(addAppointment(appointment));

  const formData = new URLSearchParams(appointment);

  try {
    await fetch('https://script.google.com/macros/s/AKfycbxJo7cbgmiIZhtYS_v_-zvIME0IrHYowcFmnJaZAgkOrLo4E-AOLFQsWA8nZT2mCef33A/exec', {
      method: 'POST',
      body: formData
    });
    console.log('Submitted to Google Sheets');
  } catch (error) {
    console.error('Error submitting appointment:', error);
  }

  setAppointment({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: ''
  });
};



   




    return (
        <>  
            <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 background-gray-50">

  <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book an Appointment</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
      <input
        type="text"
        name="name"
        value={appointment.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
      <input
        type="tel"
        name="phone"
        value={appointment.phone}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={appointment.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input
        type="date"
        name="date"
        value={appointment.date}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
      <input
        type="time"
        name="time"
        value={appointment.time}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
      <textarea
        name="reason"
        value={appointment.reason}
        onChange={handleChange}
        rows="4"
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Book Appointment
    </button>
  </form>
</div>
</>

        
    );};

    export default AppointmentForm;

