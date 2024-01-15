export interface list{
    "name": string
    "number": number
}

export interface cart {
    "id": number
    "name": string
    "price": number
    "Image": string
    "sale": number
    "checked": boolean
    "ea": number
}

export interface member {
    "name": string
    "jumin": number
    "juminback": number
    "phone": number
    "id": string
    "pass": string
    "post": number
    "road": string
    "detail": string
}

export type items = {
    [key:string]:{}
}

export interface logState {
    "Id": string
    "logState":boolean
}


export interface login {
    "id": string
    "pass": string
}

export interface product {
    "name": string
    "price": number
    "id": number
    "sale": number
    "Image": string
}
