<script setup>
import Button from "@/Components/Button.vue";
import { router } from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import Pagination2 from "@/Components/Pagination2.vue";
import TextInput from "@/Components/TextInput.vue";
import Input from "@/Components/Input.vue";

import moment from "moment";
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["deliveries", "date_from", "date_to", "search"]);

const date_from = ref(props.date_from);
const date_to = ref(props.date_to);
const search = ref(props.search);

// onMounted(()=>{
//   console.log(props.deliveries)
// })

const notify = () => {
  toast("Default Notification !");

  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.success("FLIP", {
    autoClose: false,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 20
  });
  let total = formatter.format(data);
  let split_data = total.split(".")
  let decimal = String(split_data[1])
  let slice_decimal = decimal.slice(0, 2)
  let validate_decimal = slice_decimal == "un" ? String("00") : slice_decimal
  let final_data = String(split_data[0]) + "." + validate_decimal
  return final_data;
};

const function_filter_range = () => {
  router.get(
    route("deliveries.index", {
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const search_ = () => {
  router.get(
    route("deliveries.index", {
      search: search.value,
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const function_filter_remove = () => {
  router.get(
    route("deliveries.index", {
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
</script>
<template>
  <div class="flex justify-between mt-2">
    <div class="flex gap-2">
      <div class="flex gap-2">
        <div class="flex">
          <span class="text-md mt-2 mr-2">From</span>
          <TextInput id="date_from" v-model="date_from" type="date" class="mt-1 block w-full" />
        </div>
        <div class="flex">
          <span class="text-md mt-2 mr-2">To</span>

          <TextInput id="date_to" v-model="date_to" type="date" class="mt-1 block w-full"
            @keyup.enter="function_filter_range" />
        </div>
        <div class="flex">
          <Input v-model="search" class="rounded-lg w-[30vmin]" type="text" label="Search delivery"
            @keyup.enter="search_" />
        </div>
        <button v-if="date_from || date_to || search" class="h-10 my-auto mt-5" @click="function_filter_remove">
          <Icon icon="close_icon" size="sm" />
        </button>
      </div>
    </div>
    <a :href="route('deliveries.export', {
      date_from: date_from,
      date_to: date_to,
    })
      " class="bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2">Export Delivery</a>
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" class="px-6 py-3">Supplier name</th>
              <th scope="col" class="px-6 py-3">Receive by</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Products</th>
              <th scope="col" class="px-6 py-3">Total Success</th>
              <th scope="col" class="px-6 py-3">Total Unsuccess</th>
              <!-- <th scope="col" class="px-6 py-3">Remarks</th> -->
              <th scope="col" class="px-6 py-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(delivery, key) in deliveries.data" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">
                  <img class="h-8 w-8 rounded-full object-cover" :src="delivery.supplier.image"
                    :alt="delivery.supplier.supplier_name" />
                  {{ delivery.supplier.supplier_name }}
                </td>
                <td class="px-6 py-4">
                  <img class="h-8 w-8 rounded-full object-cover" :src="delivery.user_receiver.profile_photo_url"
                    :alt="delivery.user_receiver.supplier_name" />
                  {{ delivery.user_receiver?.name ?? "Pending" }}
                </td>
                <td class="px-6 py-4">
                  <span v-if="delivery.status == 1" class="bg-green-400 rounded-md p-1 text-white flex">
                    <Icon icon="check" size="sm" />
                    Success
                  </span>
                  <span v-else class="bg-red-400 rounded-md p-1 text-white flex">
                    <Icon icon="wrong" size="sm" />
                    Unuccess
                  </span>
                </td>

                <td scope="row" class="px-2 py-1 text-gray-900 whitespace-nowrap">
                  <table class="w-full text-xs text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-1 py-1">Product</th>
                        <th scope="col" class="px-1 py-1">No.</th>
                        <th scope="col" class="px-1 py-1">Price</th>
                        <th scope="col" class="px-1 py-1">Status</th>
                        <th scope="col" class="px-1 py-1">Sub-total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(delivery_detail, key2) in delivery.details" :key="key2">
                        <tr class="bg-white border-">
                          <td class="px-1 py-1 flex pt-2 font-bold">
                            <Icon icon="shopping_cart" size="xs" />

                            {{ delivery_detail.product?.name }}
                          </td>
                          <td class="px-1 py-1">
                            {{ delivery_detail.quantity }}
                          </td>
                          <td class="px-1 py-1">
                            {{ convert_money(delivery_detail.price.price) }}
                          </td>
                          <td class="px-1 py-1">
                            <small v-if="delivery_detail.status == 1"
                              class="bg-green-400 rounded-md p-1 text-white flex gap-1">
                              <Icon icon="check" size="sm" />
                              Success
                            </small>
                            <small v-else class="bg-red-400 rounded-md p-1 text-white flex gap-1">
                              <Icon icon="wrong" size="xs" />
                              Unsuccess
                            </small>
                          </td>
                          <td class="px-1 py-1">
                            <small>{{
                              convert_money(
                                delivery_detail.quantity *
                                delivery_detail.price.price
                              )
                            }}</small>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </td>
                <td class="px-6 py-4">
                  {{ convert_money(count_total_success(delivery.details)) }}
                </td>
                <td class="px-6 py-4">
                  {{ convert_money(count_total_unsuccess(delivery.details)) }}
                </td>
                <!-- <td class="px-6 py-4">{{ delivery.remarks ?? "None" }}</td> -->
                <td class="px-6 py-4 flex gap-2">
                  <Icon icon="calendar" size="md" />
                  {{ date_time(delivery.created_at) }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <Pagination2 :links="props.deliveries.links" :date_from="date_from" :date_to="date_to" :search="search" />
        <p class="mt-6 text-sm text-gray-500">
          Showing {{ deliveries.data.length }} Deliveries
        </p>
      </div>
    </div>
  </section>
</template>