import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode";
import {url} from "./api"

const getLocalStorage = (key: string, initialValue: any) => {
    if (typeof window === "undefined") {
      return initialValue;
    }
  
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  };
interface UserJWT {
    name: string;
    email: string;
    isAdmin: boolean;
    userLoaded: boolean;

}
interface UserLogin {
    name?: string,
    email: string,
    password?: string | number;
}
const initialState = {
    token: getLocalStorage("token", ""),
    name: "",
    email: "",
    isAdmin: false,
    userLoaded: false
}
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user : UserLogin, {rejectWithValue}) => {
        try {
            const token = await axios.post(`${url}/register`,{
                name: user.name,
                email: user.email,
                password: user.password
            });
            localStorage.setItem("token",token.data);
            return token.data            
        } catch (error: any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user : UserLogin, {rejectWithValue}) => {
        try {
            const response  = await axios.post(`${url}/login`,{
                email: user.email,
                password: user.password
            });
            const token = response.data;
            localStorage.setItem("token",token);
            return token           
        } catch (error : any) {
            console.log(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        LoadUser(state) {
            const token = state.token
            if (token) {
                const user = jwtDecode<UserJWT>(token);
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userLoaded: true,
                }
            }
        },
        LogOutUser(state){
            localStorage.removeItem("token")
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                userLoaded: false
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            return { ...state}
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload){
                const user = jwtDecode<UserJWT>(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                }
            }
            else return state
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
            }
        })
        
        builder.addCase(loginUser.pending, (state) => {
            return { ...state, loginStatus: "pending"}
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload){
                const user = jwtDecode<UserJWT>(action.payload)
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    userLoaded: true
                }
            }
            else return state
        })
        builder.addCase(loginUser.rejected, (state) => {
            return {
                ...state,
                loginStatus: "rejected",
            }
        })
    }
})
export const { LoadUser, LogOutUser} = authSlice.actions
export default authSlice.reducer;