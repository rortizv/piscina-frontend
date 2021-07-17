export interface TokenModel{
    unique_name: string; //name
    nameid: string; //#Identificacion
    given_name: string;
    family_name: string;
    role: string;
    actor: string;
    exp: number;
    iss: string;
    aud: string;
    rolename: string;
}