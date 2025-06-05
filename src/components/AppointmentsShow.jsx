import { useSelector } from 'react-redux';

const AppointmentsShow = () => {
  const appointments = useSelector((state) => state.appointment.appointments);

  return (
    <div>
      <h2>Appointments List</h2>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {appointment.name} - {appointment.phone} - {appointment.email} - {appointment.date} at {appointment.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsShow;
