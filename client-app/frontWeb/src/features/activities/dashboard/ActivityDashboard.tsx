
import {Grid, GridColumn} from "semantic-ui-react";
import ActivityList from "./ActivityList.tsx";
import ActivityDetails from "../details/ActivityDetails.tsx";
import ActivityForm from "../form/ActivityForm.tsx";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";


export default observer(function ActivityDashboard() {

    const activityStore = useStore();
    const {selectedActivity, editMode} = activityStore.activityStore;


    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList/>
            </GridColumn>
            <GridColumn width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode &&
                <ActivityForm/>}
            </GridColumn>
        </Grid>
    )
})