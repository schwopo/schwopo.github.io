import { createContext, useReducer } from 'react';
import { Messaging } from '../api/Messaging.js';

export const MessagingContext = createContext(new Messaging());

export const MessagingProvider = ({ children }) => {
    const messaging = new Messaging();

    const messagingReducer = (state, action) => {
	switch (action.type) {
	    case 'SET_ACTIVE_PARTNER':
		return { ...state, activePartnerId: action.payload };
	    default:
		return state;
	}
    };

    const [state, dispatch] = useReducer(messagingReducer, messaging);

    return (
        <MessagingContext.Provider value={{ messaging, state, dispatch }}>
            {children}
        </MessagingContext.Provider>
    );
};
