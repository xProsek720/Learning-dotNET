
import './App.css'
import {useEffect} from "react";
import {Container} from "semantic-ui-react";
import NavBar from "./navbar.tsx";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard.tsx";
import LoadinComponent from "./loadinComponent.tsx";
import {useStore} from "../stores/store.ts";
import {observer} from "mobx-react-lite";

function App() {
    const {activityStore} = useStore();
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore])


    if (activityStore.loadingInitial) return <LoadinComponent content={"Loading App..."}/>

    return (
    <>
        <NavBar/>
        <Container style={{marginTop: "7em"}}>
            <ActivityDashboard />
        </Container>
    </>
  )
}

export default observer(App);
