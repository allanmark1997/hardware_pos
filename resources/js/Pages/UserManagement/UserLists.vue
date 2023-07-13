<script setup>
import Pagination2 from "@/Components/Pagination2.vue";
import Pagination from "@/Components/Pagination.vue";
import moment from "moment";
const props = defineProps(["users"]);

const function_extract_date_time = (date) => {
  return moment(date).format("MMMM Do YYYY");
};
</script>
<template>
  <ul class="max-w-full divide-y divide-gray-200 p-2">
    <li
      class="pb-3 hover:bg-blue-50"
      v-for="(user, index) in props.users.data"
      :key="index"
    >
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            class="w-8 h-8 rounded-full"
            :src="user.profile_photo_url"
            :alt="user.name"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user.name }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ user.email }}
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ user.sex == 0 ? "Female" : "Male" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Sex
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ function_extract_date_time(user.bday) }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Birthday
          </p>
        </div>
        <div
          class="items-center text-sm text-gray-900 w-1/4 truncate text-center"
          :title="user.address"
        >
          {{ user.address }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Hometown
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ user.contact_no }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Contact number
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ user.type == 0 || user.type == 1 ? "Administrator" : "Cashier" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Position
          </p>
        </div>
        <div class="items-center text-sm text-gray-900 p-2">
          {{ user.status == 1 ? "Active" : "Deactivated" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Status
          </p>
        </div>
        <div class="items-center text-sm text-gray-900 p-2">
          <!-- <button class="p-2 bg-orange-400 rounded-lg mr-2 hover:bg-orange-600">
            Edit
          </button> -->
          <button
            class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2"
            v-if="user.status == 0 && user.type != 0"
          >
            Activate
          </button>
          <button
            class="p-2 bg-red-400 rounded-lg hover:bg-red-600"
            v-else-if="user.status == 1 && user.type != 0"
          >
            Deactivate
          </button>
        </div>
      </div>
    </li>
    <Pagination2 :links="props.users.links" />
    <!-- <Pagination :links="props.users.links" /> -->
  </ul>
</template>