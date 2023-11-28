
import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Divider, Header, Icon, List, ListItem} from "semantic-ui-react";

function App() {
    const [activities, setActivities] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5000/api/activities')
            .then(response =>
            {
                //console.log(response);
                setActivities(response.data.value)
            })
    }, [])

    return (
    <div>

        <Header as='h2' icon='users' content='Reactivities'/>
        <List className="Event-List">
            {activities.map((activity: any) => (
                <ListItem key={activity.id}>
                    <Header as='h3'>
                        {activity.title}<br/>
                    </Header>
                    <Divider>
                        <Icon name='calendar outline' fitted/> {activity.date}
                    </Divider>

                    <Divider>
                        <Icon name='at' fitted/> {activity.venue}
                    </Divider>
                    <br/>
                </ListItem>
            ))}
        </List>
    </div>
  )
}

export default App
