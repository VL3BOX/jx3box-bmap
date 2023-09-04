<template>
    <div class="m-bmap-simple">
        <div class="u-list" v-if="maps.length">
            <div class="u-row" v-for="(item, index) in list" :key="index">
                <el-tooltip v-for="(floor, cIndex) in item" :key="cIndex" placement="top" popper-class="u-bmap-tooltip">
                    <div class="u-tip" slot="content">
                        <div class="u-top">
                            <div class="u-avatar">
                                <img :src="floor.bossAvatar" :alt="floor.bossName" />
                            </div>
                            <div class="u-right">
                                <div class="u-name">{{ floor.bossName }}</div>
                                <div class="u-desc">
                                    <div v-if="floor.effect.tags.length" class="u-tag">
                                        {{ floor.effect.tags.join("/") }}
                                        + {{ floor.effect.reward }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="floor.nEffectID" class="u-bottom">
                            <div class="u-name">{{ floor.effect.szName }}</div>
                            <div class="u-desc">{{ floor.effect.szDescription }}</div>
                        </div>
                    </div>
                    <div class="u-column">
                        <div class="u-img" @click="toMap(index * column + cIndex + 1)">
                            <img class="u-effect" :src="iconLink(floor.effect.dwIconID)" />
                            <div class="u-index">{{ index * column + cIndex + 1 }}</div>
                            <div v-if="floor.effect.reward" class="u-coin">+{{ floor.effect.reward }}</div>
                        </div>
                        <div class="u-name">{{ floor.bossName }}</div>
                        <div class="u-tag" v-if="floor.effect.tags.length">{{ floor.effect.tags[0] }}</div>
                    </div>
                </el-tooltip>
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
        toMap(i) {
            let url = process.env.NODE_ENV === "development" ? __Root : location.origin + "/";
            if (!isNaN(i)) {
                url += `fb/baizhan?floor=${i}`;
            }
            window.open(url, "_blank");
        },
    },
};
</script>

<style lang="less">
.m-bmap-simple {
    padding: 10px;
    .u-list {
        .flex;
        flex-direction: column;
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
                .size(50px, 50px);
                flex: none;
                cursor: pointer;
                transition: 0.2s ease-in-out;
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
                .u-coin {
                    position: absolute;
                    bottom: 0;
                    right: -22px;
                    height: 20px;
                    width: 94px;
                    line-height: 20px;
                    text-align: right;
                    font-weight: bold;
                    color: red;
                    background-color: rgba(#000, 0.1);
                    font-size: 20px;
                    transform: scale(0.5);
                    border-radius: 5px;
                }
                &:hover {
                    transform: scale(1.1);
                }
            }
            .u-effect {
                .size(50px, 50px);
            }
            & > div {
                flex: none;
                display: inline-block;
                width: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                font-size: 12px;
                &.u-tag {
                    width: 100px;
                    font-size: 20px;
                    transform: scale(0.5);
                    margin-top: -5px;
                    color: red;
                }
            }
        }
    }
}
.u-bmap-tooltip {
    max-width: 200px;
    .u-top {
        .flex;
        align-items: flex-start;
        gap: 10px;
        .u-avatar {
            width: 36px;
            height: 36px;
        }
        .u-right {
            .flex;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            .u-name {
                font-size: 14px;
            }
            .u-tag {
                color: red;
            }
        }
    }
    .u-bottom {
        margin-top: 5px;
        & > div {
            margin-bottom: 3px;
        }
    }
}
</style>
