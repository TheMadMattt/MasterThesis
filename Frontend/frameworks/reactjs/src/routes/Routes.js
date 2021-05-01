import HomeIcon from '@material-ui/icons/Home';
import SpeedIcon from '@material-ui/icons/Speed';
import PublicIcon from '@material-ui/icons/Public';
import Home from "../pages/Home/Home";
import LifecycleHooksBenchmark from "../pages/LifecycleHooks/LifecycleHooksBenchmark";
import LocalApiBenchmark from "../pages/LocalApiBenchmark";
import JSONPlaceholderBenchmark from "../pages/JSONPlaceholder/JSONPlaceholderBenchmark";

const Routes = [
    {
        sidebarName: 'Home',
        component: Home,
        path: '/',
        icon: <HomeIcon/>,
        children: [],
    },
    {
        sidebarName: 'Lifecycle hooks benchmark',
        component: LifecycleHooksBenchmark,
        path: '/benchmarks/lifecycle-crud',
        icon: <SpeedIcon/>,
        children: []
    },
    {
        sidebarName: 'REST API benchmark',
        component: null,
        path: '',
        icon: <SpeedIcon/>,
        children: []
    },
    {
        sidebarName: '{JSON} Placeholder',
        component: JSONPlaceholderBenchmark,
        path: '/benchmarks/json-placeholder',
        icon: <PublicIcon/>,
        children: []
    },
    {
        sidebarName: 'Local API server',
        component: LocalApiBenchmark,
        path: '/benchmarks/local-rest-api',
        icon: <PublicIcon/>,
        children: []
    }
];

export default Routes;
