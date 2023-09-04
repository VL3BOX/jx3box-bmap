<template>
    <div class="m-bmap" v-loading="loading">
        <component :is="currentComponent"></component>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MapList from "./MapList.vue";
import MapSimple from "./MapSimple.vue";
export default {
    name: "BMap",
    components: {
        MapList,
        MapSimple,
    },
    props: {
        mode: {
            type: String,
            default: "all",
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState(["bosses", "effects", "maps"]),
        currentComponent() {
            let componentId = "MapComplete";
            const mode = this.mode;
            if (mode === "list") {
                componentId = "MapList";
            }
            if (mode === "simple") {
                componentId = "MapSimple";
            }
            return componentId;
        },
    },
    methods: {
        ...mapActions(["loadBosses", "loadSkills", "loadEffects", "loadMap"]),
        loadData() {
            const proArr = [];

            const bossPro = this.loadBosses();
            proArr.push(bossPro);

            const skillPro = this.loadSkills();
            proArr.push(skillPro);

            const effectPro = this.loadEffects();
            proArr.push(effectPro);
            this.loading = true;
            Promise.allSettled(proArr).then(() => {
                this.loadMap();
                this.loading = false;
            });
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style lang="less">
img {
    max-width: 100%;
}
</style>
