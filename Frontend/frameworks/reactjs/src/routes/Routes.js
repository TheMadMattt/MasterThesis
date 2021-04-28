import HomeIcon from '@material-ui/icons/Home';
import Home from "../pages/Home";
import LifecycleHooksBenchmark from "../pages/LifecycleHooks/LifecycleHooksBenchmark";
import RandomUserGeneratorBenchmark from "../pages/RandomUserGeneratorBenchmark";
import JSONPlaceholderBenchmark from "../pages/JSONPlaceholderBenchmark";
import LocalApiBenchmark from "../pages/LocalApiBenchmark";

const Routes = [
    {
        sidebarName: 'Home',
        component: Home,
        path: '/',
        icon: HomeIcon,
        children: [],
    },
    {
        sidebarName: 'Lifecycle hooks benchmark',
        component: LifecycleHooksBenchmark,
        path: '/benchmarks/lifecycle-crud',
        icon: '',
        children: []
    },
    {
        sidebarName: 'REST API benchmark',
        component: null,
        path: '',
        icon: '',
        children: []
    },
    {
        sidebarName: 'Random User Generator',
        component: RandomUserGeneratorBenchmark,
        path: '/benchmarks/random-user-generator',
        icon: '',
        children: []
    },
    {
        sidebarName: '{JSON} Placeholder',
        component: JSONPlaceholderBenchmark,
        path: '/benchmarks/json-placeholder',
        icon: '',
        children: []
    },
    {
        sidebarName: 'Local API server',
        component: LocalApiBenchmark,
        path: '/benchmarks/local-rest-api',
        icon: '',
        children: []
    }
];

export default Routes;
