import React from 'react';
import {Button, Container, Menu, MenuItem} from "semantic-ui-react";

export interface Props {
    openForm: (id: string) => void;
}

export default function NavBar({openForm} : Props) {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '5px'}}/>
                    Reactivities
                </MenuItem>
                <MenuItem name='Activities'/>
                <MenuItem>
                    <Button onClick={() => openForm('232332')} positive content='Create Activity'/>
                </MenuItem>
            </Container>
        </Menu>
    )
}