
export interface IUser {
    id: string;
    name: string
}

export interface ITask {
    id: string;
    title: string;
    status: "in progress" | "completed" | "not started";
    description: string;
    date: string;
    location: keyof typeof categories | string;
    attachments: Array<IAttachment>;
    personId: string;
    geolocation: GeolocationI;
}

export interface GeolocationI {
    lat: number;
    lng: number;
}

export interface IAttachment {
    mimeType: string;
    name: string;
    size: number;
    uri: string;
}

export const categories = {
    "Gardening": "Gardening",
    "Cleaning": "Cleaning",
    "Workout": "Workout",
    "Cooking": "Cooking",
    "Shopping": "Shopping",
    "Job": "Job",
    "Others": "Others"
}

export const colors: Array<{bg: string; text: string}> = [{bg: "#E4B975",text: "#67461D"},{bg: "#B0BCBC",text: "#3B4747"},{bg: "#BBB3CC",text: "#463B63"},{bg: "#CB9CA4",text: "#5D252A"},{bg: "#9DCBC9",text: "#075C5E"},{bg: "#BFCC97",text: "#4F633B"}
]