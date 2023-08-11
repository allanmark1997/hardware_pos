<script setup>
import Pagination2 from "@/Components/Pagination2.vue";
import Pagination from "@/Components/Pagination.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Dropdown from "@/Components/CustomDropdownPosition.vue";
import Icon from "@/Components/Icon.vue";

import moment from "moment";
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
const props = defineProps(["users", "search"]);
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
  <section class="container px-4 mx-auto">
    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <section class="text-gray-600 p-10">
          <div class="container px-5 mx-auto">
            <!-- <div class="flex flex-wrap w-full mb-5">
              <div class="lg:w-1/2 w-full lg:mb-0">
                <h1
                  class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                >
                  Users
                </h1>
                <div class="h-1 w-20 bg-yellow-500 rounded"></div>
              </div>
            </div> -->
            <div class="flex flex-wrap -m-4">
              <div
                v-for="(user, index) in props.users.data.filter(
                  (user) => user.type != 0 && props.users.data.length != 0
                )"
                :key="index"
                class="xl:w-1/3 md:w-1/2 p-4"
              >
                <div
                  class="bg-gray-50 border border-1 border-yellow-400 shadow-xl p-6 rounded-lg"
                >
                  <img
                    class="h-40 rounded max-w- object-fit object-center mb-6 mx-auto"
                    :src="user.profile_photo_url"
                    :alt="user.name"
                    alt="content"
                  />
                  <h3
                    class="tracking-widest text-indigo-500 text-xs font-medium title-font"
                  >
                    {{ user.email }}
                  </h3>
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                    {{ user.name }}
                  </h2>
                  <div class="flex mt-4 gap-1">
                    <Icon icon="sex" size="sm" />
                    <p class="text-sm font-medium">
                      {{ user.sex == 0 ? "Female" : "Male" }}
                    </p>
                  </div>
                  <div class="flex mt-4 gap-1 mb-1">
                    <Icon icon="birthday" size="sm" />
                    <h4 class="text-gray-700">
                      {{ function_extract_date_time(user.bday) }}
                    </h4>
                  </div>
                  <div class="flex mt-4 gap-2">
                    <Icon icon="mobile" size="sm" />
                    <p class="text-sm">
                      {{ user.contact_no }}
                    </p>
                  </div>
                  <div class="flex mt-4 gap-2">
                    <Icon icon="location" size="sm" />
                    <p class="text-sm">
                      {{ user.address }}
                    </p>
                  </div>
                  <p
                    v-if="user.type != 0"
                    class="leading-relaxed font-bold mt-5 mb-2 text-base"
                  >
                    Controls
                  </p>
                  <div v-if="user.type != 0" class="text-sm whitespace-nowrap">
                    <Dropdown :status="user.type" :id="user.id" />
                  </div>
                  <div v-else class="text-sm mt-3 whitespace-nowrap">
                    <div class="flex my-auto gap-1">
                      <Icon icon="administrator" size="sm" />
                      <p class="text-sm text-gray-700 text-center font-bold">
                        Root admin
                      </p>
                    </div>
                  </div>
                  <div
                    v-if="user.type != 0"
                    class="text-sm mt-2 flex justify-center w-100 whitespace-nowrap"
                  >
                    <button
                      @click="function_open_modal_confirmation(true, user)"
                      class="p-2 bg-green-400 rounded-lg hover:bg-green-600"
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
              </div>
              <div
                v-if="props.users.data.length == 0"
                class="mx-auto text-center"
              >
                <p class="text-4xl text-gray-700">No users!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="flex items-center justify-between my-6">
      <Pagination2 :links="props.users.links" :search="props.search" />
      <p class="mt-6 text-sm text-gray-500">
        Showing {{ props.users.data.length }} Users
      </p>
    </div>
  </section>
  <ConfirmDialogModal
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
  </ConfirmDialogModal>
</template>