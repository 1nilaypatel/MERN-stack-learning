import {useState, useEffect} from "react";
import {Card, Typography} from "@mui/material";

function Courses(){
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer" + localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((data) => {
                setCourses(data.courses);
            });
        });
    }, []);

    return <div>
        {courses.map(course => {
            return <Course course={course} />
        })}
    </div>
}

export function Course(props){
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200
    }}>
        <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.price}</Typography>
        <img src={props.course.imageLink} style={{width: 300}} />
    </Card>
}

export default Courses;