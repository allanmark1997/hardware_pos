<script setup>
import Button from "@/Components/Button.vue";
import { router, useForm } from "@inertiajs/vue3";
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

const form = useForm({
  products:[]
})

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
                  <table class="w-full text-xs text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-1 py-1">Product</th>
                        <th scope="col" class="px-1 py-1">No.</th>
                        <th scope="col" class="px-1 py-1">Price</th>
                        <!-- <th scope="col" class="px-1 py-1">Status</th> -->
                        <th scope="col" class="px-1 py-1">Sub-total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(delivery_detail, key2) in delivery.details"
                        :key="key2"
                      >
                        <tr class="bg-white border-">
                          <td class="px-1 py-1 flex">
                            <Icon icon="shopping_cart" size="xs" />

                            {{ delivery_detail.product?.product?.name }}
                          </td>
                          <td class="px-1 py-1">
                            {{ delivery_detail.quantity }}
                          </td>
                          <td class="px-1 py-1">
                            {{ convert_money(delivery_detail.price.price) }}
                          </td>
                          <!-- <td class="px-1 py-1">
                            <small
                              v-if="delivery_detail.status == 1"
                              class="bg-green-400 rounded-md p-1 text-white flex gap-1"
                            >
                              <Icon icon="check" size="sm" />
                              Success
                            </small>
                            <small
                              v-else
                              class="bg-red-400 rounded-md p-1 text-white flex gap-1"
                            >
                              <Icon icon="wrong" size="xs" />
                              Unuccess
                            </small>
                          </td> -->
                          <td class="px-1 py-1">
                            <small>{{
                              convert_money(
                                delivery_detail.quantity *
                                  delivery_detail.price.price
                              )
                            }}</small>
                          </td>
                          <td class="px-1 py-1">
                            <input
                              class="my-auto relative -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                              type="checkbox"
                              :value="delivery_detail"
                              v-model="form.products"
                              id="checkboxChecked"
                            />
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
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
                  <Button>Authorize</Button>
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
</template>