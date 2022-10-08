<template>
    <q-layout view="hHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu"></q-btn>
                <q-toolbar-title>
                    Quasar App
                </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="drawerLeft" overlay show-if-above :width="200" :breakpoint="700" elevated
            class="bg-primary text-white">
            <div class="q-py-md q-pr-md">
                <EssentialLink title="Demo" linkName="Demo">
                </EssentialLink>
                <EssentialLink title="Test" linkName="Test"></EssentialLink>
            </div>
        </q-drawer>

        <q-page-container>

            <slot />
        </q-page-container>
    </q-layout>
</template>

<script>
import EssentialLink from 'src/components/EssentialLink.vue';

export default {
    name: "MainLayout",
    data: () => ({
        drawerLeft: false
    }),
    components: { EssentialLink }
}
</script>
