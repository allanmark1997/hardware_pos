<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import DeliveryList from "./DeliveryList.vue";

const props = defineProps(["deliveries", "date_from", "date_to", "search"]);
</script>
<template>
  <AppLayout title="Delivery">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">
          Accept Delivery
        </h2>
      </div>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <DeliveryList
          :deliveries="deliveries"
          :date_from="date_from"
          :date_to="date_to"
          :search="search"
        />
      </div>
    </div>
  </AppLayout>
</template>