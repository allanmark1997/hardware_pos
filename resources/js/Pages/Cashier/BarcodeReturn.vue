<script setup>
import { router } from "@inertiajs/vue3";
import { inject, nextTick, onMounted, ref } from "vue"
import axios from 'axios';
import BarcodeSVG2 from "./BarcodeSVG2.vue";

const props = defineProps(["code"])


</script>
<template>
    <BarcodeSVG2 v-if="props.code != ''" :code="props.code" />
</template>