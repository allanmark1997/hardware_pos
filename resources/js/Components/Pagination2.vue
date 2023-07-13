<script setup>
import { Link, usePage } from "@inertiajs/vue3";
import { computed, inject, onMounted, ref } from "vue";

const props = defineProps(["links", "search"]);
const search_url = computed(() =>
  props.search != "" && props.search != undefined
    ? "&search=" + props.search
    : ""
);
const search_variable = ref("");
const trigger = inject("trigger");
const filter_courses_id = inject("filter_courses_id");
const user_search_key = inject("user_search_key");
const announcement_search_key = inject("announcement_search_key");
const event_search_key = inject("event_search_key");
const year_search_key = inject("year_search_key");
const alumni_search_key = inject("alumni_search_key");
onMounted(() => {
  // search_variable.value += usePage().props.value.searched ? "&searchTxT=" + usePage().props.value.searched:'';
  if (trigger.value) {
    search_variable.value += "&trigger=" + trigger.value;
  }
  if (filter_courses_id) {
    search_variable.value += "&id=" + filter_courses_id;
  }
  if (user_search_key) {
    search_variable.value += "&user_search_key=" + user_search_key;
  }
  if (announcement_search_key) {
    search_variable.value +=
      "&announcement_search_key=" + announcement_search_key;
  }
  if (event_search_key) {
    search_variable.value += "&event_search_key=" + event_search_key;
  }
  if (year_search_key) {
    search_variable.value += "&year_search_key=" + year_search_key;
  }
  if (alumni_search_key) {
    search_variable.value += "&alumni_search_key=" + alumni_search_key;
  }
});
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
        class="mr-1 mb-1 px-2 bg-white py-1 text-sm shadow-sm border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500"
        :class="{
          'bg-white': link.active,
          'ml-auto': links.length === key + 1,
        }"
        :href="link.url + search_url + search_variable"
      >
        <span v-html="link.label"></span>
      </Link>
    </template>
  </div>
</template>
