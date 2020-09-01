<template>
    <div class="app_wrapper">
        <div class="sidebar_container">
            <div class="sidebar_container-top">
                <file-search />
            </div>

            <el-scrollbar class="sidebar_container-bottom">
                <file-list :file-list="fileList" />
            </el-scrollbar>
        </div>
        <div class="main_container"></div>
    </div>
</template>

<script>
import FileSearch from '@components/file-search';
import FileList from '@components/file-list';

export default {
    name: 'Home',

    components: {
        FileSearch,
        FileList
    },

    data() {
        return {
            fileList: [
                { id: 1, title: '文件名 1', time: '2020-06-21' },
                { id: 2, title: '文件名 2', time: '2020-06-21' },
                { id: 3, title: '文件名 3', time: '2020-06-21' },
                { id: 4, title: '文件名 4', time: '2020-06-21' },
                { id: 5, title: '文件名 5', time: '2020-06-21' },
                { id: 6, title: '文件名 6', time: '2020-06-21' },
                { id: 7, title: '文件名 7', time: '2020-06-21' },
                { id: 8, title: '文件名 8', time: '2020-06-21' },
                { id: 9, title: '文件名 9', time: '2020-06-21' },
                { id: 10, title: '文件名 10', time: '2020-06-21' },
                { id: 11, title: '文件名 11', time: '2020-06-21' },
                { id: 12, title: '文件名 12', time: '2020-06-21' },
                { id: 13, title: '文件名 13', time: '2020-06-21' },
                { id: 14, title: '文件名 14', time: '2020-06-21' },
                { id: 15, title: '文件名 15', time: '2020-06-21' }
            ]
        };
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

        &-top {
        }

        &-bottom {
            flex: 1;
            overflow: hidden;
        }
    }

    .main_container {
        flex: 3;
    }
}
</style>
