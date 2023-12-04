
import './App.css'
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Divider, Header, Icon, List, ListItem} from "semantic-ui-react";
import {Activity} from "../models/activity.ts";
import NavBar from "./navbar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);


    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities')
            .then(response =>
            {
                //console.log(response);
                setActivities(response.data.value)
            })
    }, [])

    return (
    <>
        <NavBar/>
        <Container style={{marginTop: "7em"}}>
            <ActivityDashboard activities={activities}/>
        </Container>
    </>
  )
}

export default App
