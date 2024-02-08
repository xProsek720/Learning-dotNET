import {Grid}from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadinComponent from "../../../app/layout/loadinComponent.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import ActivityDetailedHeader from "./ActivityDetailedHeader.tsx";
import ActivityDetailedInfo from "./ActivityDetailedInfo.tsx";
import ActivityDetailedChat from "./ActivityDetailedChat.tsx";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar.tsx";


export default observer(function ActivityDetails(){
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore;

    const {id} = useParams();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadinComponent/>;

    return(
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={5}>
                <ActivityDetailedSidebar/>
            </Grid.Column>
        </Grid>
    )
})