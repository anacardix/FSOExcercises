import { createContext, useReducer, useContext, useEffect } from "react";

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[0];
};

export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(LoginContext);
  return loginAndDispatch[1];
};

const initialState = null;

const loginReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const [login, loginDispatch] = useReducer(loginReducer, initialState);

  return (
    <LoginContext.Provider value={[login, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
