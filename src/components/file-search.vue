<template>
    <div class="search-container">
        <el-input placeholder="请输入内容" v-bind="$attrs" v-on="$listeners">
            <el-button slot="append" icon="el-icon-search" @click.native="$emit(`search-file`)"></el-button>
        </el-input>

        <el-dropdown style="margin-left: 10px">
            <el-button type="primary" icon="el-icon-circle-plus-outline" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.prevent.native="$emit('create-file')">新建笔记</el-dropdown-item>
                <el-dropdown-item divided @click.prevent.native="$emit('import-file')">导入文件</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: 'FileSearch'
};
</script>

<style lang="scss" scoped>
.search-container {
    display: flex;
    align-items: center;
    padding: 10px;
    background: #daecfe;
}
</style>
