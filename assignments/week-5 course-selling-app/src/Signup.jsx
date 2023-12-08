import {TextField, Card, Typography, Button} from '@mui/material';
import {useState} from "react";

function Signup(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    return <div>
        <div style={{
            display: "flex", 
            justifyContent: "center",
            paddingTop: 150,
            marginBottom: 10
        }}>
            <Typography variant="h6">
                Welcome to Coursera. Sign up below
            </Typography>
        </div>

        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card variant="outlined" style={{width:400, padding: 20}}>
                <TextField 
                    fullWidth={true}
                    label="Email" 
                    variant="outlined" 
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <br /><br />
                <TextField 
                    fullWidth={true}
                    label="Password" 
                    variant="outlined" 
                    type={"password"}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <br /><br />
                <Button
                    variant="contained"
                    size={"large"}
                    onClick={() => {
                        fetch("http://localhost:3000/admin/signup", {
                            method: "POST",
                            body: JSON.stringify({
                                username: email,
                                password: password,
                            }),
                            headers: {
                                "Content-type": "application/json"
                            }
                        }).then((response) => {
                            response.json().then((data) => {
                                localStorage.setItem("token", data.token);
                                window.location = "/";
                            });
                        });
                    }}
                >SignUp</Button>
            </Card>
        </div>
    </div>
}

export default Signup;