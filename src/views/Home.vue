<template>
    <div class="app_wrapper">
        <div class="sidebar_container"></div>
        <div class="main_container"></div>
    </div>
</template>

<script>
export default {
    name: 'Home'
};
</script>

<style lang="scss" scoped>
.app_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .sidebar_container {
        max-width: 25%;
        height: 100vh;
        border-right: 1px solid #eaeefb;
    }

    .main_container {
        flex: 1;
    }
}
</style>
