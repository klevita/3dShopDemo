<template>
    <q-page class="flex flex-center row wrapper">
        <div style="width:200px">
            <q-select v-model="selectedHead" :options="headOptions" label="headOptions"></q-select>
            <q-select v-model="selectedSleeves" :options="sleevesOptions" label="sleevesOptions"></q-select>
            <!-- <q-select v-model="model" :options="options" label="Тело"></q-select> -->
            <q-select v-model="selectedPocket" :options="pocketOptions" label="pocketOptions"></q-select>
            <q-select v-model="selectedBottom" :options="bottomOptions" label="bottomOptions"></q-select>
        </div>
        <renderer ref="renderer" antialias orbit-ctrl :width="canvasWidth" :height="canvasHeight">
            <camera :position="{z: 10 }"></camera>
            <scene background="#fff" ref='scene'>
                <PointLight color="#FFFFFF" :position="{x:100,y:100,z:100}" :intensity="0.6" />
                <PointLight color="#FFFFFF" :position="{x:-100,y:100,z:-100}" :intensity="0.6" />
                <PointLight color="#FFFFFF" :position="{x:100,y:-100,z:100}" :intensity="0.6" />
                <PointLight color="#FFFFFF" :position="{x:-100,y:-100,z:-100}" :intensity="0.6" />
                <AmbientLight color="#CCCCCC" :intensity="0.4" />
            </scene>
        </renderer>
    </q-page>
</template>
<script>
import { Renderer, Scene, Camera, PointLight, AmbientLight, DirectionalLight } from 'troisjs'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        Renderer, Scene, Camera, AmbientLight, PointLight
    },
    data: () => ({

        selectedHead: 'Капюшон анорак 1 вариант',
        selectedSleeves: 'Манжеты кашкорсе с дырой',
        selectedBody: '',
        selectedPocket: 'Карман кенгуру для низа на резинке или на затяжке',
        selectedBottom: 'Низ на затяжке',

        headOptions: ['Капюшон анорак 1 вариант', 'Капюшон внахлест 1 вариант', 'Капюшон внахлест 1 вариант'],
        sleevesOptions: ['Манжеты кашкорсе с дырой', 'Манжеты рукава кашкорсе', 'Рукава под манжеты'],
        bodyOptions: [],
        pocketOptions: ['Карман кенгуру для низа на резинке или на затяжке', 'Карман кенгуру для низа с кашкорсе', 'Карман тайник'],
        bottomOptions: ['Низ на затяжке', 'Низ на резинке', 'Низ с кашкорсе'],

        headModels: [],
        sleevesModels: [],
        bodyModels: [],
        pocketModels: [],
        bottomModels: [],
    }),
    mounted() {
        const loader = new OBJLoader()
        const axes = new THREE.AxesHelper(100)
        this.$refs.scene.add(axes)
        const texture = new THREE.TextureLoader().load('textures/fabricAmbientOcclusion.jpg')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.6, 0.6);
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            map: texture
        });
        material.color = new THREE.Color("rgb(240, 0, 0)");
        this.loadModels(loader, material)
        loader.load('models/objects/Рукава под манжеты.obj', (model) => {
            model.traverse((v) => {
                if (v.isMesh) {
                    v.material = material
                }
            })
            model.position.set(0, -10.5, 0)
            model.scale.set(0.01, 0.01, 0.01)
            this.$refs.scene.add(model)
        }, undefined, (err) => { console.log(err) })
        loader.load('models/objects/Низ на затяжке.obj', (model) => {
            model.traverse((v) => {
                if (v.isMesh) {
                    v.material = material
                }
            })
            model.position.set(0, -10.5, 0)
            model.scale.set(0.01, 0.01, 0.01)
            this.$refs.scene.add(model)
        }, undefined, (err) => { console.log(err) })
        loader.load('models/objects/Капюшон анорак 1 вариант.obj', (model) => {
            model.traverse((v) => {
                if (v.isMesh) {
                    v.material = material
                }
            })
            model.position.set(0, -10.5, 0)
            model.scale.set(0.01, 0.01, 0.01)
            this.$refs.scene.add(model)
        }, undefined, (err) => { console.log(err) })
        loader.load('models/objects/Карман кенгуру для низа на резинке или на затяжке.obj', (model) => {
            model.traverse((v) => {
                if (v.isMesh) {
                    v.material = material
                }
            })
            model.position.set(0, -10.5, 0)
            model.scale.set(0.01, 0.01, 0.01)
            this.$refs.scene.add(model)
        }, undefined, (err) => { console.log(err) })

    },
    computed: {
        canvasWidth() {
            return "" + (window.innerWidth - 200)
        },
        canvasHeight() {
            return "" + (window.innerHeight - 50)
        }
    },
    methods: {
        setSelectedModels() {
            this.headOptions.forEach(() => {

            })
        },
        loadModels(loader, material) {
            this.headOptions.forEach((option) => {
                loader.load(`models/objects/${option}.obj`, (model) => {
                    model.traverse((v) => {
                        if (v.isMesh) {
                            v.material = material
                        }
                    })
                    model.position.set(0, -10.5, 0)
                    model.scale.set(0.01, 0.01, 0.01)
                    this.headModels.push(model)
                }, undefined, (err) => { console.log(err) })
            })
            this.sleevesOptions.forEach((option) => {
                loader.load(`models/objects/${option}.obj`, (model) => {
                    model.traverse((v) => {
                        if (v.isMesh) {
                            v.material = material
                        }
                    })
                    model.position.set(0, -10.5, 0)
                    model.scale.set(0.01, 0.01, 0.01)
                    this.sleevesModels.push(model)
                }, undefined, (err) => { console.log(err) })
            })
            this.bottomOptions.forEach((option) => {
                loader.load(`models/objects/${option}.obj`, (model) => {
                    model.traverse((v) => {
                        if (v.isMesh) {
                            v.material = material
                        }
                    })
                    model.position.set(0, -10.5, 0)
                    model.scale.set(0.01, 0.01, 0.01)
                    this.bottomModels.push(model)
                }, undefined, (err) => { console.log(err) })
            })
            this.pocketOptions.forEach((option) => {
                loader.load(`models/objects/${option}.obj`, (model) => {
                    model.traverse((v) => {
                        if (v.isMesh) {
                            v.material = material
                        }
                    })
                    model.position.set(0, -10.5, 0)
                    model.scale.set(0.01, 0.01, 0.01)
                    this.pocketModels.push(model)
                }, undefined, (err) => { console.log(err) })
            })
        }
    },
    // setup() {
    //     const rendererBody = ref(null)
    //     const scene = new THREE.Scene();
    //     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     const renderer = new THREE.WebGLRenderer();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     const loader = new OBJLoader();
    //     const loaded = loader.load('/models/objects/manjets.obj', (v) => { console.log(v); console.log(renderer) })
    //     return {
    //     }
    // },
})
</script>
<style scoped lang="scss">

</style>
