import { loadYamlConfig } from '../lib/config-loader.mjs';

export default {
    title: "October CMS - %v",
    setTitle: "Docs",
    handle: "octobercms",
    icon: "/images/october-leaf.svg",
    baseDir: "",
    versions: [
        ["4.x", { label: "4.x" }],
        ["3.x", { label: "3.x" }],
        ["2.x", { label: "2.x" }],
        ["1.x", { label: "1.x" }]
    ],
    defaultVersion: "4.x",
    defaultUri: "/4.x/setup/installation",
    searchPlaceholder: "Search",
    primarySet: true,
    locales: {
        "/": {
            lang: "en-US",
            name: "English",
            title: "October CMS - %v",
            config: {
                messages: loadYamlConfig('.config/lang-en.yaml'),
                sidebar: {
                    "1.x": loadYamlConfig('1.x/.config/nav-main.yaml'),
                    "2.x": loadYamlConfig('2.x/.config/nav-main.yaml'),
                    "3.x": loadYamlConfig('3.x/.config/nav-main.yaml'),
                    "4.x": loadYamlConfig('4.x/.config/nav-main.yaml'),
                },
                sidebarExtra: {
                    "1.x": loadYamlConfig('1.x/.config/nav-extra.yaml'),
                    "2.x": loadYamlConfig('2.x/.config/nav-extra.yaml'),
                    "3.x": loadYamlConfig('3.x/.config/nav-extra.yaml'),
                    "4.x": loadYamlConfig('4.x/.config/nav-extra.yaml'),
                }
            }
        },
        "/ru/": {
            lang: "ru",
            name: "Русский",
            title: "October CMS - %v",
            config: {
                messages: loadYamlConfig('.config/lang-ru.yaml'),
                sidebar: {
                    "1.x": loadYamlConfig('1.x/ru/.config/nav-main.yaml'),
                    "3.x": loadYamlConfig('3.x/ru/.config/nav-main.yaml'),
                },
                sidebarExtra: {
                    "1.x": loadYamlConfig('1.x/ru/.config/nav-extra.yaml'),
                    "3.x": loadYamlConfig('3.x/ru/.config/nav-extra.yaml'),
                }
            }
        },
        "/zh-cn/": {
            lang: "zh-cn",
            name: "简体中文",
            title: "October CMS - %v",
            config: {
                messages: loadYamlConfig('.config/lang-zh-cn.yaml'),
                sidebar: {
                    "3.x": loadYamlConfig('3.x/zh-cn/.config/nav-main.yaml'),
                    "2.x": loadYamlConfig('2.x/zh-cn/.config/nav-main.yaml'),
                },
                sidebarExtra: {
                    "3.x": loadYamlConfig('3.x/zh-cn/.config/nav-extra.yaml'),
                    "2.x": loadYamlConfig('2.x/zh-cn/.config/nav-extra.yaml'),
                }
            }
        },
    }
};
