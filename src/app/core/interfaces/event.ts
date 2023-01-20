import { person } from './person';
export interface event {
    id?: number,
    title: string,
    participants: person[]
    deadline: Date
    finalized?: boolean
}