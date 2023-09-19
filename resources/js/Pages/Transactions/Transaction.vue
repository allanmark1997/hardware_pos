<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import TransactionList from "./TransactionList.vue";
import Button from "@/Components/Button.vue";

import { inject, provide, ref } from "vue";

const props = defineProps(["transactions", "date_from", "date_to", "search"]);
</script>
<template>
  <AppLayout title="Transaction">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">
          Transaction Management
        </h2>
      </div>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <TransactionList
          :transactions="transactions"
          :date_from="date_from"
          :date_to="date_to"
          :search="search"
        />
      </div>
    </div>
  </AppLayout>
</template>