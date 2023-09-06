<template>
    <div class="m-bmap-simple" :class="isPhone && 'is-map-phone'">
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
                        </div>
                        <div class="u-index">
                            <span class="u-index-number">{{ index * column + cIndex + 1 }}</span>
                        </div>
                        <div class="u-name">{{ floor.bossName }}</div>
                        <div class="u-gift">
                            <span class="u-tag" v-if="floor.effect.tags.length">{{ floor.effect.tags[0] }}</span>
                            <span class="u-coin" v-if="floor.effect.reward">+{{ floor.effect.reward }}</span>
                        </div>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep } from "lodash";
import { arr1to2 } from "../utils/index.js";
export default {
    name: "MapSimple",
    props: {
        maps: {
            type: Array,
            required: true,
        },
        column: {
            type: Number,
            default: 10,
        },
    },
    computed: {
        list() {
            const data = cloneDeep(this.maps);
            return arr1to2(data, this.column);
        },
        isPhone() {
            return document.documentElement.clientWidth <= 768;
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
    padding: 10px 0;
    .u-list {
        margin: 0 auto;
        position: relative;
        .flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
    .u-row {
        position: relative;
        .flex;
        gap: 12px;
        height: 75px;
        @border-color:#eee;

        .u-column {
            position: relative;
            .flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            .w(60px);
            font-size: 12px;
            &::after {
                position: absolute;
                right: -15px;
                top: 16px;
                content: "";
                width: 20px;
                height: 1px;
                background-color: @border-color;
            }

            @s:32px;
            .u-img {
                position: relative;
                .size(@s);
                .r(50%);
                flex: none;
                cursor: pointer;
                transition: 0.2s ease-in-out;
                border:2px solid #d9e0e3;
                box-shadow:0 0 1px rgba(0,0,0,.1);
                overflow:hidden;
                &:hover{
                    filter:brightness(1.2) saturate(1.2);
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
                    color: #c00;
                    background-color: rgba(#000, 0.1);
                    font-size: 20px;
                    transform: scale(0.5);
                    border-radius: 5px;
                }
                &:hover {
                    transform: scale(1.1);
                }
                .u-effect {
                    .size(@s + 4px);
                    .pr;top:-2px;
                }
            }
            // & > div {
            //     flex: none;
            //     display: inline-block;
            //     width: 50px;
            //     overflow: hidden;
            //     text-overflow: ellipsis;
            //     white-space: nowrap;
            //     text-align: center;
            //     font-size: 12px;
            // }

            @mark:9px;
            .u-index {

                position: absolute;
                top: @s - @mark / 2;
                left: 50%;
                margin-left: -@mark/2;
                .size(@mark);
                .x;

                // line-height: 20px;
                // text-align: center;
                // color: #c6e48b;
                // font-weight: bold;
                // background-color: rgba(#000, 0.5);
                // font-size: 20px;
                // transform: scale(0.5);
                // border-radius: 5px;

                &::after{
                    content:'';
                    .pa;top:0;
                    .db;
                    .size(100%);
                    transform:rotate(45deg);
                    background-color:#d6ac6d;
                    box-shadow:1px 1px 0 rgba(0,0,0,.1);
                }

                .u-index-number{
                    line-height: @mark;
                    .pa;left:-@mark - 1px;
                    .z(5);
                    .db;
                    font-size:12px;
                    transform:scale(0.6);
                    color:#eee;
                    .w(@mark*2/0.6);
                    .x;
                    .db;
                }
            }

            .u-name{
                .fz(12px);
                .mt(5px);
                transform: scale(0.9);
                white-space:nowrap;
            }

            .u-gift {
                width: 160px;
                font-size: 20px;
                transform: scale(0.5);
                margin-top: -5px;
                color: #900;
                .x;
                white-space:nowrap;
            }
            .u-coin{
                .ml(5px);
                color:orange;
            }
        }
        &:nth-of-type(even) {
            flex-direction: row-reverse;
            &:not(:last-of-type) {
                &::before {
                    position: absolute;
                    content: "";
                    left: -15px;
                    top: 16px;
                    width: 1px;
                    height: 95px;
                    background-color: @border-color;
                }
                .u-column {
                    &:last-of-type {
                        &::before {
                            position: absolute;
                            left: -15px;
                            top: 16px;
                            content: "";
                            width: 15px;
                            height: 1px;
                            background-color: @border-color;
                        }
                    }
                }
            }
        }
        &:nth-of-type(odd) {
            &::after {
                position: absolute;
                content: "";
                right: -15px;
                top: 16px;
                width: 1px;
                height: 95px;
                background-color: @border-color;
            }
            &:not(:first-of-type) {
                .u-column {
                    &:first-of-type {
                        &::before {
                            position: absolute;
                            left: -15px;
                            top: 16px;
                            content: "";
                            width: 15px;
                            height: 1px;
                            background-color: @border-color;
                        }
                    }
                }
            }
        }
    }
}
.is-map-phone {
    .u-list {
        gap: 5px !important;
    }
    .u-row {
        gap: 5px !important;
        height: 50px !important;
        &::after,
        &::before {
            .none !important;
        }
        .u-column {
            .size(32px, 32px) !important;
            .u-img {
                .size(32px, 32px) !important;
                img {
                    .size(32px, 32px) !important;
                }
            }
            &::after,
            &::before {
                .none !important;
            }
        }
        .u-name {
            margin-top: -3px !important;
            width: 64px !important;
            font-size: 20px !important;
            transform: scale(0.5) !important;
        }
        .u-tag {
            .none !important;
        }
    }
}
.u-bmap-tooltip {
    max-width: 200px;
    background-color:rgba(0,0,0,.8) !important;
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
                font-size: 13px;
                .bold;
                color:#ff0;
            }
            .u-tag {
                color: orange;
            }
        }
    }
    .u-bottom {
        .fz(12px,1.5);
        .mt(10px);
        & > div {
            margin-bottom: 3px;
        }
    }
}
</style>
