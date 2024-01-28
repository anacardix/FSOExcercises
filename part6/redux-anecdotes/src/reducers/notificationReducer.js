import { createSlice } from "@reduxjs/toolkit";

const visibleStyle = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};

const hiddenStyle = {
  display: "none",
};

const initialState = { text: "", style: hiddenStyle };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return { text: action.payload, style: visibleStyle };
    },
    resetNotification() {
      return initialState;
    },
  },
});

export const setNotificationWithTimeout = (text, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(text));
    setTimeout(() => {
      dispatch(resetNotification());
    }, timeout * 1000);
  };
};

export const { setNotification, resetNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
