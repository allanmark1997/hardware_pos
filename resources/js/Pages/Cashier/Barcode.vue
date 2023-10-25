<script setup>
import { router } from "@inertiajs/vue3";
import { nextTick, onMounted, ref } from "vue"
import axios from 'axios';
import BarcodeSVG from "./BarcodeSVG.vue";

const props = defineProps(["code"]);

// const code = ref(null)
// axios.get(route('cashier.generateCode')).then((res) => {
//     code.value = res.data.code;
// })
// onMounted(async () => {
//     const res = await axios.get(route('cashier.generateCode'));
//     code.value = res.data.code;
//     // console.log(code.value);
// });
</script>
<template>
    <BarcodeSVG :code="props.code" />
</template>