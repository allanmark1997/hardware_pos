<script setup>
import { onMounted } from "vue"

const props = defineProps(["data"])
onMounted(() => {
    JsBarcode(".barcode").init();
})
</script>
<template>
    <svg class="barcode w-[50vmin] h-[20vmin] mx-auto" jsbarcode-format="CODE128" :jsbarcode-value="'12345'"
        jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg>
</template>