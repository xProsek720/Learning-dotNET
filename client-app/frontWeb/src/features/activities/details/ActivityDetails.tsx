import {Button, Card, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import LoadinComponent from "../../../app/layout/loadinComponent.tsx";


export default function ActivityDetails(){
    const {activityStore} = useStore();
    const {selectedActivity: activity} = activityStore;

    if (!activity) return <LoadinComponent/>;

    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => activityStore.openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={activityStore.cancelSelectedActivity} basic color='blue' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}