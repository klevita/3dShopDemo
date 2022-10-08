<template>
    <q-page class="flex flex-center wrapper">
        <div style="width:200px">
            <q-file accept=".glb" v-model="model" label="Model (only .glb format)"></q-file>
        </div>
        <renderer ref="renderer" antialias orbit-ctrl :width="canvasWidth" :height="canvasHeight">
            <camera :position="{z: 2 }"></camera>
            <scene background="#fff" ref='scene'>
                <PointLight color="#FFFFFF" :position="{x:100,y:100,z:100}" :intensity="0.5" />
                <PointLight color="#FFFFFF" :position="{x:-100,y:100,z:-100}" :intensity="0.5" />
                <PointLight color="#FFFFFF" :position="{x:100,y:-100,z:100}" :intensity="0.5" />
                <PointLight color="#FFFFFF" :position="{x:-100,y:-100,z:-100}" :intensity="0.5" />
                <AmbientLight color="#CCCCCC" :intensity="0.3" />
            </scene>
        </renderer>
        <q-btn style="display:absolute; left:200px;top:200px" @click='randomColors'>показать сетки</q-btn>
    </q-page>
</template>
<script>
import { Renderer, Scene, Camera, PointLight, AmbientLight, DirectionalLight } from 'troisjs'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TestPage',
    components: {
        Renderer, Scene, Camera, AmbientLight, PointLight
    },
    data: () => ({
        model: undefined,
        loader: new GLTFLoader()
    }),
    mounted() {
        const set = new Set()
        const colorsArr = []
        for (let i = 0; i < 170; i++) {
            colorsArr.push(new THREE.Color(Math.random(256), Math.random(256), Math.random(256)))
        }
        this.loader.load('models/bomber/4.gltf', (model) => {
            model.scene.children[0].translateY(-1.3)
            let i = 0
            const meshes = model.scene.children[0].children[0].children
            this.$refs.scene.add(model.scene)
        }, undefined, (err) => { console.log(err) })
    },
    methods: {
        randomColors() {
            console.log('in dev')
        },
        setModel(buffer) {
            this.$refs.scene.scene.children.forEach((obj) => {
                if (!obj.isLight) {
                    this.$refs.scene.scene.remove(obj)
                }
            })
            console.log(this.$refs.scene)
            this.loader.parse(buffer, '', (model) => {
                model.scene.children[0].translateY(-1.3)
                this.$refs.scene.add(model.scene)
            }, undefined, (err) => { console.log(err) })
        }
    },
    computed: {
        canvasWidth() {
            return "" + (window.innerWidth)
        },
        canvasHeight() {
            return "" + (window.innerHeight - 50)
        }
    },
    watch: {
        async model(newModel, prevModel) {
            const buffer = await this.model.arrayBuffer()
            console.log(buffer)
            this.setModel(buffer)
        }
    },
})
</script>
<style scoped lang="scss">

</style>
