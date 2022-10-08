const routes = [
    { path: "/", redirect: { name: "Demo" } },
    {
        path: "/demo",
        name: "Demo",
        component: () => import("pages/DemoPage.vue"),
    },
    {
        path: "/test",
        name: "Test",
        component: () => import("pages/TestPage.vue"),
    },
    // Always leave this as last one,
    {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
    },
];

export default routes;
