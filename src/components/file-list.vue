<template>
    <ul>
        <li v-for="(item, index) in fileList" :key="'file-item'+index" class="file_item">
            <font-awesome-icon :icon="['fab', 'markdown']" class="file_item_icon" />
            <p class="file_item_title">{{ item.title }}</p>
            <p class="file_item_time">{{ item.time }}</p>
        </li>
    </ul>
</template>

<script>
export default {
    name: `FileList`,

    props: {
        fileList: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" scoped>
.file_item {
    // width: 100%;
    height: 50px;
    // padding: 10px 20px;
    border-bottom: 1px solid rgb(182, 182, 182);
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;

    &:last-child {
        border-bottom: none;
    }

    &_icon {
        // margin-left: 10px;
    }

    &_title {
        margin-left: 10px;
        flex: 1;
    }

    &_time {
        margin-left: auto;
        
    }
}
</style>
