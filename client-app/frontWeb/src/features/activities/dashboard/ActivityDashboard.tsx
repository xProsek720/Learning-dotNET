
import ActivityList from "./ActivityList.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import LoadinComponent from "../../../app/layout/loadinComponent.tsx";


export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) {loadActivities();}
    }, [loadActivities, activityRegistry])


    if (activityStore.loadingInitial) return <LoadinComponent content={"Loading App..."}/>


    return (
                <ActivityList/>

    )
})