import React from 'react';

export const initialState = {
  user: '',
  emailId: '',
  calleduser: 'hello',
  calledemailId: '',
};

const AppContext = React.createContext(initialState);

export default AppContext;
