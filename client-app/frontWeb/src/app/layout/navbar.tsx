import {Button, Container, Menu, MenuItem} from "semantic-ui-react";
import {useStore} from "../stores/store.ts";



export default function NavBar() {
    const {activityStore} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '5px'}}/>
                    Reactivities
                </MenuItem>
                <MenuItem name='Activities'/>
                <MenuItem>
                    <Button onClick={() => activityStore.openForm('232332')} positive content='Create Activity'/>
                </MenuItem>
            </Container>
        </Menu>
    )
}