<script setup>
import { inject, onMounted } from "vue";

const form = inject("barcode")

onMounted(() => {
    console.log(form.code_generator + " Hello")
    JsBarcode(".barcode").init();
})

</script>

<template>
    <svg class="barcode w-[50vmin] h-[20vmin] mx-auto" jsbarcode-format="CODE128" :jsbarcode-value="form.code_generator"
        jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg>
</template>