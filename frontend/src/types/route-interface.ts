import {RouteProps} from "react-router-dom";

export interface RouteInterface extends Partial<RouteProps> {
    path: string;
    isProtected?: boolean;
    isPublic?: boolean;
}
