<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DeliveryList from "./DeliveryList.vue";
import { inject, provide, ref } from "vue";

const props = defineProps(["deliveries"]);
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        Delivery Management
      </h2>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <DeliveryList :deliveries="deliveries" />
      </div>
    </div>
  </AppLayout>
</template>