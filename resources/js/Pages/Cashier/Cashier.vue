<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";

    const props = defineProps(["props_detail"]);
</script>
<template>
    <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        Cashier
      </h2>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
    This is Cashier page {{ props.props_detail }}
</div></div>
    </AppLayout>
</template>