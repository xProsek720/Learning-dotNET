import React from "react";
import {Button, Divider, Grid, GridColumn, Header, Icon, List, ListItem} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";
import ActivityList from "./ActivityList.tsx";


interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({activities}: Props) {
    return (
        <Grid>
            <GridColumn width='10'>
                <ActivityList activities={activities}/>
            </GridColumn>
        </Grid>
    )
}