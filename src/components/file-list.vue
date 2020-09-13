<template>
    <div class="file_list-container">
        <el-scrollbar class="file_list" wrap-class="scrollbar-filelist" tag="ul">
            <li
                v-for="(item, index) in fileList"
                :key="'file-item' + index"
                class="file_item"
                @click="handleClick(index)"
                :class="{ active: index === activeIndex, 'is-top-bg': item.isTop === true }"
                @contextmenu.prevent="openMenu(item, index, $event)"
            >
                <font-awesome-icon :icon="['fab', 'markdown']" class="file_item_icon" />
                <p class="file_item_title">{{ item.title }}</p>
                <p class="file_item_time">{{ item.updatedAt }}</p>
                <p class="is-top" v-if="item.isTop"><i class="el-icon-download" /></p>
            </li>
        </el-scrollbar>

        <ul v-if="visible" :style="{ left: `${left}px`, top: `${top}px` }" class="contextmenu">
            <slot name="menu"></slot>
        </ul>
    </div>
</template>

<script>
export default {
    name: `FileList`,

    props: {
        fileList: {
            type: Array,
            default: () => []
        },

        active: {
            type: Number
        }
    },

    data() {
        return {
            activeIndex: 0,
            visible: false
        };
    },

    methods: {
        handleClick(index) {
            this.activeIndex = index;
        },

        openMenu(fileItem, index, e) {
            const menuMinWidth = 105;
            const { offsetWidth } = this.$el; // 获取容器的宽
            const maxLeft = offsetWidth - menuMinWidth; // 左侧边界
            const left = e.clientX + 15; // 15 => margin right

            this.left = left > maxLeft ? maxLeft : left;
            this.top = e.clientY;
            this.visible = true;
            this.$emit('update:active', index);
            this.$emit('update:selectedFile', fileItem); // 将当前右键选中的文件返回父组件
        },

        closeMenu() {
            this.visible = false;
        }
    },

    watch: {
        active(newValue) {
            this.activeIndex = newValue;
        },

        activeIndex(newValue) {
            this.$emit(`update:active`, newValue);
        },

        visible(newValue) {
            if (newValue) {
                document.body.addEventListener('click', this.closeMenu);
            } else {
                document.body.removeEventListener('click', this.closeMenu);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.active {
    background-color: rgb(214, 214, 214);
}

.file_list-container {
    border-top: 1px solid rgb(182, 182, 182);
    width: 100%;
    overflow: hidden;
    flex: 1;
    display: flex;

    .file_list {
        width: 100%;
        flex: 1;

        .file_item {
            cursor: pointer;
            height: 50px;
            border-bottom: 1px solid rgb(182, 182, 182);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 0 10px;

            &:last-child {
                border-bottom: none;
            }

            &.is-top-bg {
                background-color: rgb(221, 237, 253);
            }

            .is-top {
                margin-left: 5px;
                transform: rotate(180deg);
                color: #9cb5ce;
                font-size: 0.8rem;
            }

            &_icon {
                // margin-left: 10px;
                color: lightsalmon;
            }

            &_title {
                margin-left: 10px;
                flex: 1;
            }

            &_time {
                margin-left: auto;
                font-size: 0.6rem;
            }
        }
    }
}

// 菜单列表样式
.contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    list-style-type: none;
    color: #333;
    font-size: 12px;
    font-weight: 400;
    z-index: 3000;
    li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
            color: #66b1ff;
            background: #ecf5ff;
        }
    }
}
</style>
