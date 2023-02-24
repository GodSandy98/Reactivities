import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Tab, TabProps, Image } from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileActivities() {


    const panes = [
        { menuItem: 'Future Events', pane: { key: 'future' } },
        { menuItem: 'Past Events', pane: { key: 'past' } },
        { menuItem: 'Hosting', pane: { key: 'hosting' } }
    ];

    const { profileStore } = useStore();
    const { profile, userActivities, loadingActivities, loadUserActivities } = profileStore;

    useEffect(() => {
        loadUserActivities(profile!.username);
    }, [loadUserActivities, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(profile!.username, panes[data.activeIndex as
            number].pane.key);
    };

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16} >
                    <Header
                        floated="left"
                        icon='calendar'
                        content='Activities'
                    />
                </Grid.Column>
                <Grid.Column width={16} >
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userActivities.map((userActivity: UserActivity) => (
                            <Card
                                as={Link}
                                to={`/activities/${userActivity.id}`}
                                key={userActivity.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${userActivity.category}.jpg`}
                                    style={{ minHeight: 100, objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header textAlign="center">{userActivity.title}</Card.Header>
                                    <Card.Meta textAlign="center">
                                        <div>{format(new Date(userActivity.date), 'do LLL')}</div>
                                        <div>{format(new Date(userActivity.date), 'h:mm a')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})