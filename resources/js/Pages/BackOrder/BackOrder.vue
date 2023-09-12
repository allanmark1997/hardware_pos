<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import BackOrderList from "./BackOrderList.vue";
import Button from "@/Components/Button.vue";

import { inject, provide, ref } from "vue";

const props = defineProps(["back_orders", "date_from", "date_to"]);
</script>
<template>
  <AppLayout title="BackOrderList">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">
          Back-order Management
        </h2>
      </div>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <BackOrderList
          :back_orders="back_orders"
          :date_from="date_from"
          :date_to="date_to"
        />
      </div>
    </div>
  </AppLayout>
</template>