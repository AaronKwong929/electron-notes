<template>
    <div class="app_wrapper">
        <div class="sidebar_container">
            <file-search
                v-model.trim="searchTitle"
                @create-file="createFile"
                @search-file="searchFile"
                @keyup.enter.native="searchFile"
                @clear="getFileList"
                @input="handleChange"
                clearable
            />

            <file-list :file-list="fileList" :active.sync="activeIndex" :selectedFile.sync="selectedFile">
                <template #menu>
                    <li @click="switchTopStatus">{{ selectedFile.isTop ? `取消置顶` : `置顶` }}</li>
                    
                    <li @click="fileDelete">删除</li>
                </template>
            </file-list>
        </div>

        <div class="main_container">
            <file-edit
                v-model="fileItem.content"
                :title.sync="fileItem.title"
                :box-shadow="false"
                :subfield="false"
                :shortCut="false"
                @change="updateContent"
                @title-blur="updateTitle"
            />
        </div>
    </div>
</template>

<script>
import FileSearch from '@components/file-search';
import FileList from '@components/file-list';
import FileEdit from '@components/file-edit';

import dayjs from 'dayjs';

export default {
    name: 'Home',

    components: {
        FileSearch,
        FileList,
        FileEdit
    },

    data() {
        return {
            searchTitle: '',
            fileList: [],
            fileItem: {
                title: '',
                content: '',
                isTop: false
            },
            activeIndex: 0,
            contentTimerId: null,

            selectedFile: {} // 右键菜单选中的文件数据
        };
    },

    methods: {
        // 搜索文件
        async getFileList(query = {}) {
            const list = await this.$db.markdown.find(query).sort({ isTop: -1, updatedAt: -1 });
            list.map((item) => {
                item.originalContent = item.content;
                item.createdAt = dayjs(item.createdAt).format(`YYYY-MM-DD HH:mm:ss`);
                item.updatedAt = dayjs(item.updatedAt).format(`YYYY-MM-DD HH:mm:ss`);
                return item;
            });
            this.fileList = list;
        },

        // 选中第一个内容
        activeFirstItem() {
            const [fileItem] = this.fileList;
            this.fileItem = fileItem;
            this.activeIndex = 0;
        },

        // 创建文件
        createFile() {
            const defaultFile = { title: `新建笔记`, content: ``, isTop: false };
            this.$db.markdown.insert(defaultFile).then(async () => {
                await this.refreshList();
            });
        },

        // 更新标题
        updateTitle(title) {
            const { _id } = this.fileItem;
            this.$db.markdown.update({ _id, title: { $ne: title } }, { $set: { title } }).then(async () => {
                await this.refreshList();
            });
        },

        // 更新内容
        updateContent(content) {
            const { _id, originalContent } = this.fileItem;
            if (originalContent === content) return;
            if (this.contentTimerId) clearTimeout(this.contentTimerId);
            this.contentTimerId = setTimeout(() => {
                this.$db.markdown.update({ _id, content: { $ne: content } }, { $set: { content } }).then(async () => {
                    await this.refreshList();
                });
            }, 3000);
        },

        // 删除文章
        fileDelete() {
            this.$confirm(`删除文章`)
                .then(() => {
                    const { _id } = this.selectedFile;
                    this.$db.markdown
                        .remove({ _id })
                        .then((num) => {
                            this.$message.success(`删除了${num}个项目`);
                            this.init();
                        })
                        .catch(() => {
                            this.$message.error('删除失败');
                        });
                })
                .catch(() => {});
        },

        // 切换文章置顶状态
        switchTopStatus() {
            const { _id, isTop } = this.selectedFile;
            this.$db.markdown.update({ _id }, { $set: { isTop: !isTop } }).then(() => {
                this.init();
            });
        },

        // 刷新列表
        async refreshList() {
            // if (this.activeIndex === 0) return;
            await this.getFileList();
            this.activeFirstItem();
        },

        // 搜索标题
        searchFile() {
            if (!this.searchTitle) return;
            const reg = new RegExp(`${this.searchTitle}`, `i`),
                query = { title: reg };
            return this.getFileList(query);
        },

        // 输入栏发生变化
        handleChange(val) {
            if (!val) {
                this.getFileList();
            }
        },

        async init() {
            await this.getFileList();
            if (this.fileList.length === 0) return;
            this.activeFirstItem();
        }
    },

    mounted() {
        this.init();
    },

    watch: {
        activeIndex(newv) {
            this.fileItem = this.fileList[newv];
        }
    }
};
</script>

<style lang="scss" scoped>
.app_wrapper {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;

    .sidebar_container {
        flex: 1;
        border-right: 1px solid #eaeefb;
        display: flex;
        flex-direction: column;

        // &-bottom {
        //     flex: 1;
        //     overflow: hidden;
        //     display: flex;
        //     flex-direction: column;
        // }
    }

    .main_container {
        flex: 3;
    }
}
</style>
