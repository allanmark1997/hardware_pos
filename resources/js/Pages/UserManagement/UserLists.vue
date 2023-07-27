<script setup>
import Pagination2 from "@/Components/Pagination2.vue";
import Pagination from "@/Components/Pagination.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Dropdown from "@/Components/CustomDropdownPosition.vue";

import moment from "moment";
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
const props = defineProps(["users"]);
const condfirmationModal = ref(false);
const selected_user = ref("");

const form = useForm({
  status: null,
  type: true,
});

const function_open_modal_confirmation = (data, user) => {
  form.status = data;
  selected_user.value = user;
  condfirmationModal.value = !condfirmationModal.value;
};

const function_extract_date_time = (date) => {
  return moment(date).format("MMMM Do YYYY");
};

const function_update = () => {
  form.put(route("users.update_user", { user: selected_user.value }), {
    preserveScroll: true,
    onSuccess: () => {
      alert("success");
      condfirmationModal.value = !condfirmationModal.value;
      form.reset();
      selected_user.value.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
        <!-- <div class="items-center text-sm text-gray-900">
          {{ user.type == 0 || user.type == 1 ? "Administrator" : "Cashier" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Position
          </p>
        </div> -->
        <Dropdown
          :status="user.type"
          :id="user.id"
          v-if="user.status == 0 && user.type != 0"
        />
        <!-- <div class="items-center text-sm text-gray-900 p-2">
          {{ user.status == 1 ? "Active" : "Deactivated" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Status
          </p>
        </div> -->
        <div class="items-center text-sm text-gray-900 p-2">
          <!-- <button class="p-2 bg-orange-400 rounded-lg mr-2 hover:bg-orange-600">
            Edit
          </button> -->
          <button
            @click="function_open_modal_confirmation(true, user)"
            class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2"
            v-if="user.status == 0 && user.type != 0"
          >
            Activate
          </button>
          <button
            @click="function_open_modal_confirmation(false, user)"
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
  <JetDialogModal
    :show="condfirmationModal"
    @close="condfirmationModal = false"
    maxWidth="2xl"
  >
    <template #title> Are you sure you want to update this user?</template>
    <template #content>
      <p class="text-red-500">
        Clicking can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400"
        @click="function_update"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          /></svg
        >&nbsp;Submit
      </Button>
    </template>
  </JetDialogModal>
</template>