//Layout
import { HeaderOnly } from '~/components/Layout';

import Home from '~/Pages/Home';
import Following from '~/Pages/Following';
import Upload from '~/Pages/Upload';
import Profile from '~/Pages/Profile';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/:nickname', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
