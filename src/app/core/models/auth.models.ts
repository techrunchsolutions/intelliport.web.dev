export class User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    email?: string;
}

export class Token {
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    refresh_token?: string;
    scope?: string;
}