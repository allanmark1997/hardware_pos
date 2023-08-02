<script setup>
import { Link, usePage } from "@inertiajs/vue3";
import { computed, inject, onMounted, ref } from "vue";

const props = defineProps(["links", "search", "category"]);
const search_url = computed(() =>
  props.search != "" && props.search != undefined
    ? "&search=" + props.search
    : ""
);
const category_url = computed(() =>
  props.category != "" && props.category != undefined
    ? "&category=" + props.category
    : ""
);

onMounted(() => {});
</script>

<template>
  <div class="mt-6 -mb-1 flex flex-wrap">
    <template v-for="(link, key) in links" :key="key">
      <div
        v-if="link.url === null"
        class="mr-1 mb-1 px-2 py-1 text-sm bg-white border rounded text-gray-400"
        :class="{ 'ml-auto': links.length === key + 1 }"
      >
        <span v-html="link.label"></span>
      </div>
      <Link
        v-else
        class="mr-1 mb-1 px-2 bg-white py-1 text-sm shadow-sm border rounded hover:bg-white focus:border-yellow-500 focus:text-yellow-500"
        :class="{
          'bg-white': link.active,
          'ml-auto': links.length === key + 1,
        }"
        :href="link.url + search_url + category_url"
      >
        <span v-html="link.label"></span>
      </Link>
    </template>
  </div>
</template>
