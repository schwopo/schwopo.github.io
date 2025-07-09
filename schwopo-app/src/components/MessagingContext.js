import { createContext, useReducer } from 'react';
import { AuthContextProvider } from './AuthContext.jsx';

export class Messaging {
  constructor() {
    this.activePartnerId = null;
  }
}


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
	<AuthContextProvider>
        <MessagingContext.Provider value={{ messaging, state, dispatch }}>
            {children}
        </MessagingContext.Provider>
	</AuthContextProvider>
    );
};
