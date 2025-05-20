import config from '~/config';

//Layout
import { HeaderOnly, OnlyContent } from '~/layouts';

//Page
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';
import Profile from '~/pages/Profile';
import VideoPage from '~/pages/VideoPage';
import { LoginPage } from '~/pages/Authentication';

const publicRoutes = [
  { path: config.routes.root, component: Home },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.upload, component: Upload, layout: HeaderOnly },
  { path: config.routes.video, component: VideoPage, layout: OnlyContent },
  { path: config.routes.login, component: LoginPage, layout: OnlyContent },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
