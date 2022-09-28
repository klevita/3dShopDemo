<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data: () => ({
    scene: scene,
    camera: camera,
    controls: [],
    renderer: renderer,
    light: light,
    cube: cube,
    axes: axes,
    speed: 0.01,
  }),
});
</script>
