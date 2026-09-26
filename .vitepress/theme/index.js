/**
 * October CMS Documentation theme.
 */
import Layout from './Layout.vue';
import { installGlobals } from './theme-globals';

import RouterLink from './components/RouterLink.vue';
import OutboundLink from './components/OutboundLink.vue';
import PreHeading from './components/PreHeading.vue';
import PostHeading from './components/PostHeading.vue';

// Global components available inside markdown content
import AvailableIcons from './global-components/AvailableIcons.vue';
import LinkWithIcon from './global-components/LinkWithIcon.vue';
import ProductIcon from './global-components/ProductIcon.vue';
import PulseLoader from './global-components/PulseLoader.vue';
import Redirect from './global-components/Redirect.vue';
import SectionCardLink from './global-components/SectionCardLink.vue';
import VideoBlockLink from './global-components/VideoBlockLink.vue';
import VideoPreview from './global-components/VideoPreview.vue';

export default {
    Layout,

    enhanceApp({ app, router, siteData }) {
        installGlobals(app, router, siteData);

        app.component('RouterLink', RouterLink);
        app.component('OutboundLink', OutboundLink);
        app.component('pre-heading', PreHeading);
        app.component('post-heading', PostHeading);

        app.component('AvailableIcons', AvailableIcons);
        app.component('LinkWithIcon', LinkWithIcon);
        app.component('ProductIcon', ProductIcon);
        app.component('PulseLoader', PulseLoader);
        app.component('Redirect', Redirect);
        app.component('SectionCardLink', SectionCardLink);
        app.component('VideoBlockLink', VideoBlockLink);
        app.component('VideoPreview', VideoPreview);
    }
};
