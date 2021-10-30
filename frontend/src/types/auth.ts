export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest extends SignInRequest{
    name: string;
}

export interface UserResponse {
    id: string;
    name: string;
}
