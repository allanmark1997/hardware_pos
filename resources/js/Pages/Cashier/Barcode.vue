<script setup>
import { router } from "@inertiajs/vue3";
import { inject, nextTick, onMounted, ref } from "vue"
import axios from 'axios';
import BarcodeSVG from "./BarcodeSVG.vue";

const form = inject("barcode");

onMounted(async () => {
    const res = await axios.get(route('cashier.generateCode'));
    form.code_generator = res.data.code
});
</script>
<template>
    <BarcodeSVG v-if="form.code_generator != ''" />
</template>