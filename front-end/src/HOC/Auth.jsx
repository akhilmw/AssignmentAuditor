import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { checkIsTokenValid } from "../api/userApi";
import { CircularProgress } from "@mui/material";
import { useJwt } from "../components/UserProvider";



const AuthGuard = (Component) => {

    const {jwtToken, setJwtToken} = useJwt();
    const [tokenValid, setTokenValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await checkIsTokenValid(jwtToken);
                if(response.status === 200) {
                    setTokenValid(response.data);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        validateToken();
    }, [jwtToken]);


    class AuthHoc extends React.Component {

        authCheck = () => {

            if(loading) {
                return <CircularProgress color='secondary' className='h-screen flex justify-center items-center' />
            }
            if(jwtToken && tokenValid){
                return <Component {...this.props}/>
            }else{
                return <Navigate to="/login"/>
            }
        }
        
        render() {
            return this.authCheck()
        }
    }
    return AuthHoc
}

export default AuthGuard
