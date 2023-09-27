<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import CartList from "./CartList.vue";

const props = defineProps(["group_suppliers"]);
</script>
<template>
  <AppLayout title="Cart">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">Cart</h2>
      </div>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <CartList :group_suppliers="group_suppliers" />
      </div>
    </div>
  </AppLayout>
</template>