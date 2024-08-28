import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MyContext } from "../AppContext/contextProvider";
import axios from "axios";

export default function Home(){
    const goTo = useNavigate()
    const token = localStorage.getItem("token");
    const {user, setUser} = useContext(MyContext);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const headers = { 'Authorization': `Bearer ${token}` };
            try{
                const res = await axios.get(
                    "http://localhost:8081/api/admin/profile",
                    {headers: headers}
                    )

                setUser(res.data);
                goTo(`/users/${res.data._id}`)
            }catch(e){
                console.error("Failed to fetch user profile", e);
            }
        }

        fetchUserProfile()
    }, [])

    return(
        <div style={{
                display:"flex",
                alignItems:"center", 
                height:"90vh",
                flexDirection:"column"
            }}
        >
            <h1 style={{fontSize:"4rem"}}>Welcome to Photo Sharing App</h1>
            {!token && <span 
                className="link-text" 
                style={{fontSize:"2rem"}}
                onClick={() => goTo("/login")}
            >
                Log in
            </span>}
        </div>
    )
}