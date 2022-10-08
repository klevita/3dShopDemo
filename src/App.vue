<template>
    <MainLayout>
        <router-view />
    </MainLayout>
</template>
<script setup>
import MainLayout from './layouts/MainLayout.vue';

</script>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App'
})
</script>
