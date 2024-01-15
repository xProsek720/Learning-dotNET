import {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store.ts";
import {observer} from "mobx-react-lite";


export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, closeForm, createActivity, updateActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>)
    {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }

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
                <Button onClick={closeForm} floated='right' negative type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})