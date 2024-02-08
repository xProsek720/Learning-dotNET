
import ActivityList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadinComponent from "../../../app/layout/loadinComponent.tsx";
import {Grid} from "semantic-ui-react";
import ActivityFilters from "./ActivityFilters.tsx";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) {loadActivities();}
    }, [loadActivities, activityRegistry])


    if (activityStore.loadingInitial) return <LoadinComponent content={"Loading App..."}/>


    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>

    )
})