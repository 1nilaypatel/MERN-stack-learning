import {Typography, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";

function Appbar(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/admin/me", {
            method: "GET", 
            headers: {
                "Authorization": "Bearer" + localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((data) => {
                if(data.userEmail){
                    setUserEmail(data.userEmail)
                }
            });
        });
    }, []);

    if(userEmail){
        return <div style={{
            display: "flex",
            justifyContent: "space-between", 
            padding: 4
        }}>
            <div>
                <Typography variant="h6">Coursera</Typography>
            </div>
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    {userEmail}
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    }else{
        return <div style={{
            display: "flex", 
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography variant="h6"> Coursera </Typography>
            </div>
            <div style={{display: "flex"}}>
                <div style={{marginRight: 10}}>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >SignUp</Button>
                </div>
                <div>
                    <Button 
                        variant="contained"
                        onClick={() => {
                            navigate("/signin")
                        }}
                    >SignIn</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;