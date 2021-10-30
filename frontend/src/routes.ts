import {RouteInterface} from "./types/route-interface";
import SignUpPage from "./pages/Signup";
import SignInPage from "./pages/Signin";
import FileListPage from "./pages/Files/List";
import FileUploadPage from "./pages/Files/Edit";
import FileSharePage from "./pages/Files/Share";

const router: RouteInterface[] = [
    {
        exact: true,
        path: '/auth/signin',
        component: SignInPage,
        isPublic: true
    },
    {
        exact: true,
        path: '/auth/signup',
        component: SignUpPage,
        isPublic: true
    },
    {
        exact: true,
        path: '/',
        component: FileListPage,
        isPublic: true
    },
    {
        exact: true,
        path: '/files/upload',
        component: FileUploadPage,
        isProtected: true
    },
    {
        exact: true,
        path: '/files/share/:token',
        component: FileSharePage,
        isPublic: true,
    }
];

export default router;
