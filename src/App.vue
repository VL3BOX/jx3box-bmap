<template>
    <div id="app">
        <BMap mode="simple"></BMap>
    </div>
</template>

<script>
import BMap from "./components/BMap.vue";
export default {
    name: "App",
    components: {
        BMap,
    },
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
};
</script>
