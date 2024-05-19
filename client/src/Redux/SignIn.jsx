import { createSlice } from "@reduxjs/toolkit";

const SignedIn = createSlice({
  name: "SignIn",
  initialState: {
    SignedIn: false,
    Email: "",
  },
  reducers: {
    setSignedIn(state, action) {
      state.SignedIn = action.payload;
    },
    setEmail(state, action) {
      state.Email = action.payload
    },
    setUserId(state, action) {
      state.UserId = action.payload
    },
  },
});

export const { setSignedIn,setEmail,setUserId } = SignedIn.actions;
export default SignedIn.reducer;
