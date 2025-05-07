//Layout
import { HeaderOnly } from '~/components/Layout';

import routes from '~/config/routes';
import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Upload from '~/Pages/Upload';
import Profile from '~/Pages/Profile';

const publicRoutes = [
    { path: routes.root, component: Home },
    { path: routes.following, component: Following },
    { path: routes.profile, component: Profile },
    { path: routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
