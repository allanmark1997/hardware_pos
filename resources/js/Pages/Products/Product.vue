<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import ProductList from "./ProductList.vue";
const props = defineProps(["products"]);
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        Products
      </h2>
    </template>
    <ProductList :products="products" />
  </AppLayout>
</template>