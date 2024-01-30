import {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";
import {v4 as uuid} from "uuid";
import {Activity} from "../../../app/models/activity.ts";
import LoadinComponent from "../../../app/layout/loadinComponent.tsx";
import {router} from "../../../app/router/Routes.tsx";


export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, deleteActivity,
        loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            createActivity(activity).then(() => router.navigate(`/activities/${activity.id}`))
        }
        else {
            deleteActivity(activity.id);
            createActivity(activity).then(() => router.navigate(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }


    if (loadingInitial) return <LoadinComponent content='Loading Activity...'/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} onChange={handleInputChange} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title'/>
                <Form.Input placeholder='Description' value={activity.description} name='description'/>
                <Form.Input placeholder='Category' value={activity.category} name='category'/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date'/>
                <Form.Input placeholder='City' value={activity.city} name="city"/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue'/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' negative type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})