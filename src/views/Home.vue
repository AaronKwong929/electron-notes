<template>
    <div class="app_wrapper">
        <div class="sidebar_container">
            <file-search />
            <el-button>123</el-button>
        </div>
        <div class="main_container">

        </div>
    </div>
</template>

<script>
import FileSearch from '@components/file-search';

export default {
    name: 'Home',

    components: {
        FileSearch
    }
};
</script>

<style lang="scss" scoped>
.app_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 100vh;
    width: 100vw;

    .sidebar_container {
        flex: 1;
        border-right: 1px solid #eaeefb;
        background-color: lightcoral;
    }

    .main_container {
        flex: 3;
    }
}
</style>
