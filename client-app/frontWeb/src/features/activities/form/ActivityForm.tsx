import React, {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/activity.ts";

export interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    submitting: boolean
}

export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting} : Props) {

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
        createOrEdit(activity);
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' negative type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}