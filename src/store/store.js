import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../slice/appointmentSlice';

export const store = configureStore({
  reducer: {  
appointment: appointmentReducer


    }})

    