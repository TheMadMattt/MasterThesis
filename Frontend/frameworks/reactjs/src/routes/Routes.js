import Home from "../pages/Home/Home";
import HomeIcon from "@material-ui/icons/Home";
import SpeedIcon from "@material-ui/icons/Speed";
import PublicIcon from "@material-ui/icons/Public";
import React, {lazy} from "react";

const LifecycleHooks = lazy(() => import('../pages/LifecycleHooks/LifecycleHooksBenchmark'));
const JSONPlaceholder = lazy(() => import('../pages/JSONPlaceholder/JSONPlaceholderBenchmark'));
const LocalApi = lazy(() => import('../pages/LocalApi/LocalApiBenchmark'));

export const RoutesForRouter = [
    {
        sidebarName: 'Home',
        component: Home,
        route: '/'
    },
    {
        sidebarName: 'Lifecycle hooks benchmark',
        component: LifecycleHooks,
        route: '/benchmarks/lifecycle-crud'
    },
    {
        sidebarName: '{JSON} Placeholder',
        component: JSONPlaceholder,
        route: '/benchmarks/json-placeholder'
    },
    {
        sidebarName: 'Local API server',
        component: LocalApi,
        route: '/benchmarks/local-rest-api'
    }
];

export const RoutesForDrawer = [
    {
        sidebarName: 'Home',
        route: '/',
        icon: <HomeIcon/>,
        children: [],
    },
    {
        sidebarName: 'Lifecycle hooks benchmark',
        route: '/benchmarks/lifecycle-crud',
        icon: <SpeedIcon/>,
        children: []
    },
    {
        sidebarName: 'REST API benchmark',
        route: '',
        icon: <SpeedIcon/>,
        children: [
            {
                sidebarName: '{JSON} Placeholder',
                route: '/benchmarks/json-placeholder',
                icon: <PublicIcon/>,
                children: []
            },
            {
                sidebarName: 'Local API server',
                route: '/benchmarks/local-rest-api',
                icon: <PublicIcon/>,
                children: []
            }
        ]
    }
];
