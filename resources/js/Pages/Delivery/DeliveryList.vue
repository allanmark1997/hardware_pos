<script setup>
import { inject, onMounted, provide, ref } from 'vue';
const emit = defineEmits(['deliveries'])
const deliveries = inject('deliveries')
emit('deliveries', deliveries)
</script>
<template>
    <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
        <div class="container mx-auto">
            <p>table</p>
            <input type="text" v-model="deliveries">
        </div>
    </section>
</template>