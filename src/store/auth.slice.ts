import { getAccessToken, history, removeTokens, setTokens } from "@/helper";
import authService from "@/services/auth.services";
import { IAuth, LoginForm } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// export const login = createAsyncThunk("auth/login",
//   async (loginFrom: LoginForm) => {
//     try {

//     } catch (error) {

//     }
//   }
// );



const name = "auth";
const initialState: IAuth = {
  isAuthenticated: getAccessToken() ? true : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      removeTokens();
    },
    start: (state) => {
      console.log('Loading starts');
      state.loading = true
    },
    success: (state, action: PayloadAction<any>) => {
      console.log('Loading success :', action.payload);
      state.isAuthenticated = true
      state.loading = false
      setTokens(action.payload)
      history.navigate('/')
    },
    error: (state, action: PayloadAction<any>) => {
      console.log('Loading error:', action.payload);

      state.loading = false
      state.error = action.payload!
    }
  },
});



export const authenticateUser = (loginForm: LoginForm) => async (dispatch: any) => {

  dispatch(start())
  authService.login(loginForm).then((res) => {
    const data = res?.data;
    dispatch(success(data))
  }).catch((err) => {
    dispatch(error(err.message));
  });
};


export const { logout, start, success, error } = authSlice.actions;
export const selectUser = (state: IAuth) => state.isAuthenticated;
export default authSlice;
