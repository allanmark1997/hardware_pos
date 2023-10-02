<script setup>
import Button from "@/Components/Button.vue";
import { router, useForm } from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import Pagination2 from "@/Components/Pagination2.vue";
import TextInput from "@/Components/TextInput.vue";
import Input from "@/Components/Input.vue";
import Product from "./Product.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

import moment from "moment";
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["deliveries", "date_from", "date_to", "search"]);

const date_from = ref(props.date_from);
const date_to = ref(props.date_to);
const search = ref(props.search);

const condfirmationModal = ref(false);

const form = useForm({
  delivery: false,
  status: false,
});

const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const function_filter_range = () => {
  router.get(
    route("deliveries.receive_index", {
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const search_ = () => {
  router.get(
    route("deliveries.receive_index", {
      search: search.value,
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const function_filter_remove = () => {
  router.get(
    route("deliveries.receive_index", {
      date_from: null,
      date_to: null,
      search: null,
    })
  );
};

const count_total_success = (data) => {
  let temp_data = 0;
  data.forEach((element) => {
    if (element.status == 1) {
      temp_data += element.quantity * element.price.price;
    }
  });
  return temp_data;
};

const count_total_unsuccess = (data) => {
  let temp_data = 0;
  data.forEach((element) => {
    if (element.status == 0) {
      temp_data += element.quantity * element.price.price;
    }
  });
  return temp_data;
};

const open_authorize = (data) => {
  form.product = data;
  condfirmationModal.value = !condfirmationModal.value;
};

const authorize = () => {
  if (form.product.status == 1) {
    form.status = 0;
  } else {
    form.status = 1;
  }
  form.put(route("deliveries.authenticate", form.delivery), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Selected delivery has been updated", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form.reset();
    },
  });
};
</script>
<template>
  <div class="flex justify-between mt-2">
    <div class="flex gap-2">
      <div class="flex gap-2">
        <div class="flex">
          <span class="text-md mt-2 mr-2">From</span>
          <TextInput
            id="date_from"
            v-model="date_from"
            type="date"
            class="mt-1 block w-full"
          />
        </div>
        <div class="flex">
          <span class="text-md mt-2 mr-2">To</span>

          <TextInput
            id="date_to"
            v-model="date_to"
            type="date"
            class="mt-1 block w-full"
            @keyup.enter="function_filter_range"
          />
        </div>
        <div class="flex">
          <Input
            v-model="search"
            class="rounded-lg w-[30vmin]"
            type="text"
            label="Search delivery"
            @keyup.enter="search_"
          />
        </div>
        <button
          v-if="date_from || date_to || search"
          class="h-10 my-auto mt-5"
          @click="function_filter_remove"
        >
          <Icon icon="close_icon" size="sm" />
        </button>
      </div>
    </div>
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" class="px-6 py-3">Supplier name</th>
              <!-- <th scope="col" class="px-6 py-3">Status</th> -->
              <th scope="col" class="px-6 py-3">Products</th>
              <th scope="col" class="px-6 py-3">Total</th>
              <!-- <th scope="col" class="px-6 py-3">Total Unsuccess</th> -->
              <!-- <th scope="col" class="px-6 py-3">Remarks</th> -->
              <th scope="col" class="px-6 py-3">Created at</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(delivery, key) in deliveries.data" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">
                  <img
                    class="h-8 w-8 rounded-full object-cover"
                    :src="delivery.supplier.image"
                    :alt="delivery.supplier.supplier_name"
                  />
                  {{ delivery.supplier.supplier_name }}
                </td>
                <!-- <td class="px-6 py-4">
                  <span
                    v-if="delivery.status == 1"
                    class="bg-green-400 rounded-md p-1 text-white flex"
                  >
                    <Icon icon="check" size="sm" />
                    Success
                  </span>
                  <span
                    v-else
                    class="bg-red-400 rounded-md p-1 text-white flex"
                  >
                    <Icon icon="wrong" size="sm" />
                    Unuccess
                  </span>
                </td> -->

                <td
                  scope="row"
                  class="px-2 py-1 text-gray-900 whitespace-nowrap"
                >
                  <Product :delivery_details="delivery.details" />
                </td>
                <!-- <td class="px-6 py-4">
                  {{ convert_money(count_total_success(delivery.details)) }}
                </td> -->
                <td class="px-6 py-4">
                  {{ convert_money(count_total_unsuccess(delivery.details)) }}
                </td>
                <!-- <td class="px-6 py-4">{{ delivery.remarks ?? "None" }}</td> -->
                <td class="px-6 py-4 flex gap-2">
                  <Icon icon="calendar" size="md" />
                  {{ date_time(delivery.created_at) }}
                </td>
                <td class="px-6 py-4 gap-2">
                  <Button @click="open_authorize(delivery)">Authorize</Button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <Pagination2
          :links="props.deliveries.links"
          :date_from="date_from"
          :date_to="date_to"
          :search="search"
        />
        <p class="mt-6 text-sm text-gray-500">
          Showing {{ deliveries.data.length }} Deliveries
        </p>
      </div>
    </div>
  </section>
  <ConfirmDialogModal
    :show="condfirmationModal"
    @close="condfirmationModal = false"
    maxWidth="2xl"
  >
    <template #title>
      Are you sure you want to authorize this delivery?</template
    >
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
        @click="authorize"
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