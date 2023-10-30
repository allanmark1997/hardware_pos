<script setup>
import { useForm } from "@inertiajs/vue3";
import { inject, ref } from "vue";

const form = inject("form_return");
const input_qty = ref(false);

</script>
<template>
    <div class="items-center mb-4">
        <!-- <input id="default-checkbox" type="checkbox" :value="detail" v-model="selected_products"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
        <label for="default-checkbox" class="ml-2 text-xs font-medium text-gray-900">
            Return
        </label> -->
        <Input type="number" v-model="form.quantity" label="Qty" />
    </div>
</template>