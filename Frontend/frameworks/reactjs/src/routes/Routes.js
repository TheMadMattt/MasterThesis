import Home from "../pages/Home/Home";
import HomeIcon from "@material-ui/icons/Home";
import LifecycleHooksBenchmark from "../pages/LifecycleHooks/LifecycleHooksBenchmark";
import SpeedIcon from "@material-ui/icons/Speed";
import JSONPlaceholderBenchmark from "../pages/JSONPlaceholder/JSONPlaceholderBenchmark";
import PublicIcon from "@material-ui/icons/Public";
import LocalApiBenchmark from "../pages/LocalApiBenchmark";
import React from "react";

export const RoutesForRouter = [
    {
        sidebarName: 'Home',
        component: Home,
        route: '/'
    },
    {
        sidebarName: 'Lifecycle hooks benchmark',
        component: LifecycleHooksBenchmark,
        route: '/benchmarks/lifecycle-crud'
    },
    {
        sidebarName: '{JSON} Placeholder',
        component: JSONPlaceholderBenchmark,
        route: '/benchmarks/json-placeholder'
    },
    {
        sidebarName: 'Local API server',
        component: LocalApiBenchmark,
        route: '/benchmarks/local-rest-api'
    }
];

export const Routes = [
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
