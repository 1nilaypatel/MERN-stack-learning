import {useEffect, useState} from "react";
import {Card, Button, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

function Course(){
    let {courseId} = useParams();

    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((data) => {
                setCourses(data.courses);
            });
        });
    }, []);

    let course = null;
    for(let i = 0; i < courses.length; i++){
        if(courses[i].id == courseId){
            course = courses[i];
        } 
    }
    if(!course){
        return <div>
            <Typography variant="h6">Course not Found</Typography>
        </div>
    }

    return <div>
        <CourseCard course={course} />
        <UpdateCard course={course} courses={courses} setCourses={setCourses} />
    </div>
}

export function CourseCard(props){
    return <div style={{display: "flex", justifyContent: "center"}}>
        <Card style={{
            margin: 10,
            width: 300,
            minHeight: 200
        }}>
            <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{props.course.price}</Typography>
            <img src={props.course.imageLink} style={{width: 300}} />
        </Card>
    </div>
}

export function UpdateCard(props){
    console.log("hi there from update card")

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    return <div style={{
        display: "flex", 
        justifyContent: "center",
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
                    fetch("http://localhost:3000/admin/courses/" + props.course.id, {
                        method: "PUT",
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
                            let updatedCourses = [];
                            for(let i = 0; i < props.courses.length; i++){
                                if(props.courses[i].id == props.course.id){
                                    updatedCourses.push({
                                        id: props.course.id,
                                        title: title,
                                        description: description,
                                        imageLink: image,
                                        price: price,
                                    });
                                }else{
                                    updatedCourses.push(props.courses[i]);
                                }
                            }
                            props.setCourses(updatedCourses);
                        });
                    });
                }}
            >Update Course</Button>
        </Card>
    </div>
}

export default Course;