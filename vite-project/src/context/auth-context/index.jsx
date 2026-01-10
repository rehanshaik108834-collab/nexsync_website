import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => { 
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const [auth,setAuth] = useState({
        authenticated: false, user: null
    });
    const [loading , setLoading] = useState(true);
    async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log("User registered:", data);
  }
  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log("User logged in:", data);
    if(data.success){
        sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
        setAuth({
            authenticated: true,
            user: data.data.user,
        });
    }else{
        setAuth({
            authenticated: false,
            user: null,
        });
    }
  }

  async function checkAuthUser(){
    try {
        const tokenString = sessionStorage.getItem('accessToken');
        if (!tokenString) {
            setAuth({
                authenticated: false,
                user: null,
            });
            setLoading(false);
            return;
        }
        const data = await checkAuthService();
        if(data && data.success){
            setAuth({
                authenticated: true,
                user: data.data.user,
            });
        }else{
            sessionStorage.removeItem('accessToken');
            setAuth({
                authenticated: false,
                user: null,
            });
        }
    } catch (error) {
        console.error("Auth check failed:", error);
        sessionStorage.removeItem('accessToken');
        setAuth({
            authenticated: false,
            user: null,
        });
    } finally {
        setLoading(false);
    }
  }
  useEffect(()=>{
    checkAuthUser();
  },[]);

    return (
        <AuthContext.Provider value={{signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser, auth}}>
            { loading ? <div className="flex items-center justify-center min-h-screen">Loading...</div> : children}
        </AuthContext.Provider>
    );            
}