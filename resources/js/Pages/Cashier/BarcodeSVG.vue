<script setup>
import { onMounted } from "vue";


const props = defineProps(["code"]);
onMounted(() => {
    // console.log(props.code + " Hello")
    JsBarcode(".barcode").init();
})

</script>

<template>
    <svg class="barcode w-[50vmin] h-[20vmin] mx-auto" jsbarcode-format="CODE128" :jsbarcode-value="props.code"
        jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg>
</template>