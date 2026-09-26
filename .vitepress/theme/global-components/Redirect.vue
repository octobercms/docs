<template>
    <div style="margin:100px auto;text-align:center">
        <PulseLoader />
    </div>
</template>

<script>
    import PulseLoader from './PulseLoader.vue'

    /** Redirects to the given 'to' url, which is relative to the current location. */
    export default {
        name: 'Redirect',
        components: { PulseLoader },
        props: {
            to: {
                type: String,
                required: true
            }
        },
        beforeMount() {
            var self = this;
            setTimeout(function() {
                try {
                    self.$router.push(self.to);
                }
                catch (e) {}
            }, 1000);
        }
    }
</script>
