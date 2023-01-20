export interface person {
    name: string,
    gift?: string,
    show?: boolean
}

export const personEmpty: person = {
    name: '',
    show: false,
}