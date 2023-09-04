<template>
    <div class="m-bmap-simple">
        <div class="u-list" v-if="maps.length">
            <div class="u-row" v-for="(item, index) in list" :key="index">
                <div class="u-column" v-for="(floor, cIndex) in item" :key="cIndex">
                    <div class="u-img">
                        <img class="u-effect" :src="iconLink(floor.effect.dwIconID)" />
                        <div class="u-index">{{ index * column + cIndex + 1 }}</div>
                    </div>
                    <div class="u-name">{{ floor.bossName }}</div>
                    <!-- <div class="u-avatar">
                        <img :src="floor.bossAvatar" :alt="floor.bossName" />
                    </div> -->
                    <!-- <div class="u-tag" v-for="tag in floor.effect.tags" :key="tag">{{ tag }}</div> -->
                    <!-- v-if="floor.nEffectID" -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { arr1to2 } from "@/utils";
import { cloneDeep } from "lodash";
export default {
    name: "MapSimple",
    computed: {
        ...mapState(["bosses", "effects", "maps", "column", "row"]),

        list() {
            const data = cloneDeep(this.maps);
            return arr1to2(data, this.column);
        },
    },
    methods: {
        iconLink,
    },
};
</script>

<style lang="less">
.m-bmap-simple {
    .u-list {
        .flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
    }
    .u-row {
        height: 80px;
        .flex;
        &:nth-of-type(even) {
            flex-direction: row-reverse;
        }
        .u-column {
            .flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            .size(80px, 80px);
            font-size: 12px;
            .u-img {
                position: relative;
                .u-index {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    color: #c6e48b;
                    font-weight: bold;
                    background-color: rgba(#000, 0.5);
                    font-size: 20px;
                    transform: scale(0.5);
                    border-radius: 5px;
                }
            }
            .u-effect {
                .size(50px, 50px);
            }
            & > div {
                display: inline-block;
                width: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
            }
        }
    }
}
</style>
