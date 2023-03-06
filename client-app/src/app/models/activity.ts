import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees: Profile[];
}

export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(actvity?: ActivityFormValues) {
        if (actvity) {
            this.id = actvity.id;
            this.title = actvity.title;
            this.category = actvity.category;
            this.description = actvity.description;
            this.date = actvity.date;
            this.venue = actvity.venue;
            this.city = actvity.city;
        }
    }
}

export class Activity implements Activity {
    constructor(init?: ActivityFormValues) {
        Object.assign(this, init);
    }
}