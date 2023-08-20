<script setup>
import Pagination2 from "@/Components/Pagination2.vue";
import Pagination from "@/Components/Pagination.vue";
import JetDialogModal from "@/Components/DialogModal.vue";

import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Dropdown from "@/Components/CustomDropdownPosition.vue";
import Icon from "@/Components/Icon.vue";
import Input from "@/Components/Input.vue";
import JetInputError from "@/Components/InputError.vue";

import moment from "moment";
import { ref } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
const props = defineProps(["suppliers", "search"]);
const condfirmationModal = ref(false);
const updateModal = ref(false);
const selected_supplier = ref("");
const post_image = ref([]);

const form = useForm({
  status: null,
  type: true,
});

const form_update = useForm({
  supplier_name: "",
  address: "",
  mobile_no: "",
  image: [],
});

const function_open_modal_confirmation = (data, supplier) => {
  form.status = data;
  selected_supplier.value = supplier;
  condfirmationModal.value = !condfirmationModal.value;
};

const function_open_modal_confirmation_details = (supplier) => {
  post_image.value = [];
  post_image.value.push(supplier.image);
  form_update.supplier_name = supplier.supplier_name;
  form_update.address = supplier.address;
  form_update.mobile_no = supplier.mobile_no;
  selected_supplier.value = supplier;
  updateModal.value = !updateModal.value;
};

const function_extract_date_time = (date) => {
  return moment(date).format("MMMM Do YYYY");
};

const function_extract_time = (date) => {
  return moment(date).fromNow();
};

const function_update = () => {
  form.put(
    route("suppliers.update_supplier", { supplier: selected_supplier.value }),
    {
      preserveScroll: true,
      onSuccess: () => {
        alert("success");
        condfirmationModal.value = !condfirmationModal.value;
        form.reset();
        selected_supplier.value.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

const function_update_details = () => {
  form_update.post(
    route("suppliers.update_supplier_details", {
      supplier: selected_supplier.value,
    }),
    {
      preserveScroll: true,
      onSuccess: () => {
        alert("success");
        updateModal.value = !updateModal.value;
        form_update.reset();
        selected_supplier.value.reset();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
};

const openFile = () => {
  let hidden = document.getElementById("profile_photo");
  hidden.click();
  hidden.onchange = (e) => {
    post_image.value.push(window.URL.createObjectURL(e.target.files[0]));
    form_update.image = e.target.files[0];
  };
};

const dragFile = (e) => {
  e.preventDefault();
  for (const file of e.dataTransfer.files) {
    var objectURL = URL.createObjectURL(file);
    post_image.value.push(objectURL);
    form_update.image = file;
  }
};

const remove_image = (key) => {
  post_image.value.splice(key, 1);
  form_update.image = null;
};
</script>
<template>
  <section class="container px-4 mx-auto">
    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <section class="text-gray-600 p-10">
          <div class="container px-5 mx-auto">
            <div class="flex flex-wrap -m-4">
              <div
                v-for="(supplier, index) in props.suppliers.data"
                :key="index"
                class="xl:w-1/3 md:w-1/2 p-4"
              >
                <div
                  class="bg-gray-50 border border-1 border-yellow-400 shadow-xl p-6 rounded-lg group"
                >
                  <div class="">
                    <Button
                      @click="
                        function_open_modal_confirmation_details(supplier)
                      "
                      class=""
                      ><Icon icon="pencil" size="sm"
                    /></Button>
                  </div>
                  <img
                    class="h-40 rounded max-w- object-fit object-center mb-6 mx-auto"
                    :src="supplier.image"
                    :alt="supplier.name"
                    alt="content"
                  />
                  <h2 class="text-lg text-gray-900 font-medium title-font mb-4">
                    {{ supplier.supplier_name }}
                  </h2>
                  <div class="flex mt-4 gap-2">
                    <Icon icon="mobile" size="sm" />
                    <p class="text-sm">
                      {{ supplier.mobile_no }}
                    </p>
                  </div>
                  <div class="flex mt-1 gap-2">
                    <Icon icon="location" size="sm" />
                    <p class="text-sm">
                      {{ supplier.address }}
                    </p>
                  </div>
                  <div class="flex mt-1 gap-2">
                    <Icon icon="calendar" size="sm" />
                    <p class="text-sm">
                      {{ function_extract_date_time(supplier.created_at) }}
                    </p>
                  </div>
                  <div class="flex mt-1 gap-2">
                    <Icon icon="clock" size="sm" />
                    <p class="text-sm">
                      {{ function_extract_time(supplier.updated_at) }}
                    </p>
                  </div>
                  <div
                    v-if="supplier.type != 0"
                    class="text-sm mt-2 flex justify-center w-100 whitespace-nowrap"
                  >
                    <button
                      @click="function_open_modal_confirmation(true, supplier)"
                      class="p-2 bg-green-400 rounded-lg hover:bg-green-600"
                      v-if="supplier.status == 0 && supplier.type != 0"
                    >
                      Activate
                    </button>
                    <button
                      @click="function_open_modal_confirmation(false, supplier)"
                      class="p-2 bg-red-400 rounded-lg hover:bg-red-600"
                      v-else-if="supplier.status == 1 && supplier.type != 0"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="props.suppliers.data.length == 0"
                class="mx-auto text-center"
              >
                <p class="text-4xl text-gray-700">No Suppliers!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div class="flex items-center justify-between my-6">
      <Pagination2 :links="props.suppliers.links" :search="props.search" />
      <p class="mt-6 text-sm text-gray-500">
        Showing {{ props.suppliers.data.length }} Suppliers
      </p>
    </div>
  </section>
  <ConfirmDialogModal
    :show="condfirmationModal"
    @close="condfirmationModal = false"
    maxWidth="2xl"
  >
    <template #title> Are you sure you want to update this supplier status?</template>
    <template #content>
      <p class="text-red-500">
        Clicking can update the system and it may cause a possible error!
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
  <JetDialogModal
    :show="updateModal"
    @close="updateModal = false"
    maxWidth="2xl"
  >
    <template #title> Update Supplier </template>
    <template #content>
      <div class="flex-shrink-0">
        <img
          class="w-10 h-10 rounded-full"
          :src="usePage().props.auth.user.profile_photo_url"
          :alt="usePage().props.auth.user.name"
        />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ usePage().props.auth.user.name }}
        </p>
        <p class="text-sm text-gray-500 truncate">
          {{ usePage().props.auth.user.email }}
        </p>
      </div>
      <div class="grid grid-cols-12 gap-2">
        <div v-if="post_image.length != 0" class="col-span-12 mx-auto">
          <template v-for="(image, key) in post_image" :key="key">
            <div class="flex-shrink-0">
              <img class="w-16 h-16 rounded-full" :src="image" />
              <button
                @click="remove_image(key)"
                class="flex text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    class="text-red-500"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                <span class="text-red-500">Remove</span>
              </button>
            </div>
          </template>
        </div>
        <div
          v-if="post_image.length != 1"
          class="col-span-12"
          @dragover.prevent
          @drop.prevent
        >
          <label
            @drop="dragFile"
            @click="openFile"
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mb-1 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG (MAX.1024kb)
              </p>
            </div>
            <input
              id="profile_photo"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              class="hidden"
            />
          </label>
        </div>
        <JetInputError
          :message="form_update.errors.image"
          class="mt-2 col-span-12"
        />
        <div class="col-span-12">
          <Input
            label="Supplier's name"
            type="text"
            class="mt-1 block w-full"
            v-model="form_update.supplier_name"
            autofocus
          />
          <JetInputError
            :message="form_update.errors.supplier_name"
            class="mt-2"
          />
        </div>
        <div class="col-span-12">
          <Input
            label="Contact No"
            type="text"
            class="block w-full"
            v-model="form_update.mobile_no"
            autofocus
          />
          <JetInputError :message="form_update.errors.mobile_no" class="mt-2" />
        </div>
        <div class="col-span-12">
          <Input
            label="Supplier's Address"
            type="text"
            class="block w-full"
            v-model="form_update.address"
            autofocus
          />
          <JetInputError :message="form_update.errors.address" class="mt-2" />
        </div>
      </div>
    </template>
    <template #footer>
      <SecondaryButton @click="updateModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button
        :class="{ 'opacity-25': form_update.processing }"
        :disabled="form_update.processing"
        @click="function_update_details"
        class="bg-yellow-200 hover:bg-yellow-400"
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
        >&nbsp;Save
      </Button>
    </template>
  </JetDialogModal>
</template>