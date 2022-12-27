export interface Auth{
    user: string;
    password : string;
    name ?: string;
}

export interface UserToken{
    profile: string;
    user: string
}