<script setup>
import Button from "@/Components/Button.vue";
import { router } from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";

import moment from "moment";
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["deliveries", "date_from", "date_to"]);

const date_from = ref(props.date_from);
const date_to = ref(props.date_to);

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
  });
  formatter.format(data);
  return formatter.format(data);
};

const function_filter_range = () => {
  router.get(
    route("deliveries.index", {
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
    })
  );
};
</script>
<template>
  <div class="flex justify-between mt-2">
    <div class="flex gap-2">
      <div class="flex gap-2">
        <div class="flex">
          <span class="text-md mt-2 mr-2">From</span>
          <input class="rounded-lg" type="date" v-model="date_from" />
        </div>
        <div class="flex">
          <span class="text-md mt-2 mr-2">To</span>
          <input
            @keyup.enter="function_filter_range"
            class="rounded-lg"
            type="date"
            v-model="date_to"
          />
        </div>
        <button
          v-if="date_from || date_to"
          class="h-10 my-auto mt-5"
          @click="function_filter_remove"
        >
          <Icon icon="close_icon" size="sm" />
        </button>
      </div>
    </div>
    <a
      :href="
        route('deliveries.export', {
          date_from: date_from,
          date_to: date_to,
        })
      "
      class="bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"
      >Download</a
    >
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Supplier name</th>
              <th scope="col" class="px-6 py-3">Receive by</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Products</th>
              <th scope="col" class="px-6 py-3">Remarks</th>
              <th scope="col" class="px-6 py-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(delivery, key) in deliveries" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">{{ delivery.supplier.supplier_name }}</td>
                <td class="px-6 py-4">{{ delivery.user_receiver?.name }}</td>
                <td class="px-6 py-4">
                  <span class="bg-orange-400 rounded-md p-1 text-white">
                    {{ delivery.status == 1 ? "Success" : "Unsuccessful" }}
                  </span>
                </td>

                <td
                  scope="row"
                  class="px-2 py-1 text-gray-900 whitespace-nowrap"
                >
                  <table class="w-full text-xs text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-1 py-1">Product</th>
                        <th scope="col" class="px-1 py-1">No.</th>
                        <th scope="col" class="px-1 py-1">Price</th>
                        <th scope="col" class="px-1 py-1">Status</th>
                        <!-- <th scope="col" class="px-1 py-1">Created at</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(delivery_detail, key2) in delivery.details"
                        :key="key2"
                      >
                        <tr class="bg-white border-">
                          <td class="px-1 py-1">
                            {{ delivery_detail.product?.name }}
                          </td>
                          <td class="px-1 py-1">
                            {{ delivery_detail.quantity }}
                          </td>
                          <td class="px-1 py-1">
                            {{ convert_money(delivery_detail.price) }}
                          </td>
                          <td class="px-1 py-1">
                            <small
                              class="bg-orange-400 rounded-sm p-[1px] text-white"
                            >
                              {{
                                delivery_detail.status == 1
                                  ? "Success"
                                  : "Unsuccessful"
                              }}
                            </small>
                          </td>
                          <!-- <td class="px-1 py-1">
                            {{ date_time(delivery_detail.created_at) }}
                          </td> -->
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </td>
                <td class="px-6 py-4">{{ delivery.remarks ?? "None" }}</td>
                <td class="px-6 py-4">{{ date_time(delivery.created_at) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>