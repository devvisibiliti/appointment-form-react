import { createSlice } from "@reduxjs/toolkit";


export const appoint = createSlice({
  name: "appointmentData",
  initialState: {
    appointments: []
  },
  reducers: {
    addAppointment(state, action) {
      state.appointments.push(action.payload);
    }
   
  }});

export const { addAppointment } = appoint.actions;
export default appoint.reducer;