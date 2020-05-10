import React from 'react'

import { Grid } from 'semantic-ui-react';

import './LoggedLayout.scss';

export default function LoggedLayout(porps) {

    const { user } = porps;

    console.log('User ', user);

    return (
        <Grid className="logged-layout">
            <Grid.Row>

                <Grid.Column width={3}>
                    <h2>Menu</h2>
                </Grid.Column>

                <Grid.Column className="content" width={13}>
                    <h2>Menu right</h2>

                    <h2>
                        Content
                    </h2>
                </Grid.Column>

            </Grid.Row>

            <Grid.Row>

                <Grid.Column width={16}>
                    <h2>Player</h2>
                </Grid.Column>

            </Grid.Row>

        </Grid>
    )
}
