import {TextField, Card, Button} from "@mui/material";
import {useState} from "react";

function Addcourse(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    return <div style={{
            display: "flex", 
            justifyContent: "center",
            paddingTop: 150,
            marginBottom: 10
        }}>
        <Card variant="outlined" style={{width:400, padding: 20}}>
            <TextField 
                fullWidth={true}
                label="Title"
                variant="outlined" 
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <br /><br />
            <TextField 
                fullWidth={true}
                label="Description"
                variant="outlined" 
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />
            <br /><br />
            <TextField 
                style={{width: 190, marginRight: 20}}
                label="Price in INR"
                variant="outlined" 
                type="number"
                onChange={(e) => {
                    setPrice(e.target.value);
                }}
            />
            <TextField 
                style={{width: 190}}
                label="Image Link"
                variant="outlined" 
                onChange={(e) => {
                    setImage(e.target.value);
                }}
            />
            <br /><br />
            <Button 
                variant={"contained"} 
                size={"large"}
                onClick={() => {
                    fetch("http://localhost:3000/admin/courses", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            description: description,
                            imageLink: image,
                            price: price,
                            published: true
                        }),
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        }
                    }).then((response) => {
                        response.json().then((data) => {
                            alert("Course Added!")
                        });
                    });
                }}
            >Add Course</Button>
        </Card>
    </div>
}

export default Addcourse;