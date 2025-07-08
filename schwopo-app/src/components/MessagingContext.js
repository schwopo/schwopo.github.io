import { createContext } from 'react';
import { Messaging } from '../api/Messaging.js';

export const MessagingContext = createContext(new Messaging());
