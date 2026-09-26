import { loadYamlConfig } from '../lib/config-loader.mjs';

export default {
    title: "October CMS User Guide",
    setTitle: "User Guide",
    handle: "getting-started",
    icon: "/images/october-leaf.svg",
    baseDir: "user-guide",
    searchPlaceholder: "Search User Guide",
    primarySet: true,
    defaultUri: "/user-guide/quickstart/introduction/welcome",
    sidebar: loadYamlConfig('user-guide/.config/nav-main.yaml'),
    sidebarExtra: loadYamlConfig('user-guide/.config/nav-extra.yaml')
};
