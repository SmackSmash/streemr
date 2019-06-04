export const signIn = () => {
  return {
    type: 'SIGN_IN',
    payload: {
      signedIn: true
    }
  };
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      signedIn: false
    }
  };
};
