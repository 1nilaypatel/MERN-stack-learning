import {TextField, Card, Typography, Button} from '@mui/material';

function Signin(){
    return <div>
        <div style={{
            display: "flex", 
            justifyContent: "center",
            paddingTop: 150,
            marginBottom: 10
        }}>
            <Typography variant="h6">
                Welcome Back. Sign in below
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
                />
                <br /><br />
                <TextField 
                    fullWidth={true}
                    label="Password" 
                    variant="outlined" 
                    type={"password"}
                />
                <br /><br />
                <Button
                    variant="contained"
                    size={"large"}
                >SignIn</Button>
            </Card>
        </div>
    </div>
}

export default Signin;