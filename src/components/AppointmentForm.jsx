import { useState } from 'react';
import { addAppointment } from '../slice/appointmentSlice';
import { useDispatch } from 'react-redux';

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    reason: '',
    treatment: '',    // new field for treatment dropdown
    doctors: []
     // new field for checkbox selections
  });
  const dispatch = useDispatch();

  // Handle standard input and select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  // Handle checkbox changes for selecting doctors
  const handleDoctorChange = (e) => {
    const { value, checked } = e.target;
    let updatedDoctors = [...appointment.doctors];
    if (checked) {
      // Add doctor if checked
      updatedDoctors.push(value);
    } else {
      // Remove doctor if unchecked
      updatedDoctors = updatedDoctors.filter((doc) => doc !== value);
    }
    setAppointment({ ...appointment, doctors: updatedDoctors });
  };

  // Handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();

  dispatch(addAppointment(appointment)); // Optional if you're using Redux to track form state

  const submissionData = {
    ...appointment,
    doctors: appointment.doctors.join(', '), // optional formatting if your backend expects string
  };

  try {
    const response = await fetch('https://your-vercel-backend.vercel.app/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit appointment');
    }

    console.log('Appointment submitted to MongoDB');

    // Reset the form after submission
    setAppointment({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      reason: '',
      treatment: '',
      doctors: [],
    });
  } catch (error) {
    console.error('Error submitting appointment:', error);
  }
};


  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 background-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Book an Appointment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={appointment.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={appointment.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={appointment.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Reason Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Appointment
          </label>
          <textarea
            name="reason"
            value={appointment.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Dropdown for Treatment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Treatment
          </label>
          <select
            name="treatment"
            value={appointment.treatment}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Treatment</option>
            <option value="treatment1">Treatment 1</option>
            <option value="treatment2">Treatment 2</option>
            <option value="treatment3">Treatment 3</option>
          </select>
        </div>

        {/* Checkbox Group for Selecting Doctors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Your Doctors
          </label>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="doctors"
                value="Dr. Smith"
                checked={appointment.doctors.includes('Dr. Smith')}
                onChange={handleDoctorChange}
                className="form-checkbox"
              />
              <span className="ml-2">Dr. Smith</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="doctors"
                value="Dr. Brown"
                checked={appointment.doctors.includes('Dr. Brown')}
                onChange={handleDoctorChange}
                className="form-checkbox"
              />
              <span className="ml-2">Dr. Brown</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="doctors"
                value="Dr. Johnson"
                checked={appointment.doctors.includes('Dr. Johnson')}
                onChange={handleDoctorChange}
                className="form-checkbox"
              />
              <span className="ml-2">Dr. Johnson</span>
            </label>
            {/* Add more doctor options as needed */}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
