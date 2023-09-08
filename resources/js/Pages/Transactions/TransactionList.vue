<script setup>
import Button from "@/Components/Button.vue";
import { router } from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import Pagination2 from "@/Components/Pagination2.vue";
import TextInput from "@/Components/TextInput.vue";

import moment from "moment";
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["transactions", "date_from", "date_to"]);

const date_from = ref(props.date_from);
const date_to = ref(props.date_to);

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
  });
  formatter.format(data);
  return formatter.format(data);
};

const function_filter_range = () => {
  router.get(
    route("transactions.index", {
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const function_filter_remove = () => {
  router.get(
    route("transactions.index", {
      date_from: null,
      date_to: null,
    })
  );
};

const calculate_item_discount = (data) => {
  let temp_data_discounted = 0;
  let convert_discount = data.sale_discount.discount / 100;
  if (data.status == 1) {
    for (let index = 0; index < data.quantity; index++) {
      temp_data_discounted += data.price.price * convert_discount;
    }
  }
  return temp_data_discounted;
};

const calculate_sub_total = (data) => {
  let temp_data_result = 0;
  let temp_data_discounted = 0;
  let convert_discount = data.sale_discount.discount / 100;
  if (data.status == 1) {
    for (let index = 0; index < data.quantity; index++) {
      temp_data_discounted = data.price.price * convert_discount;
      temp_data_result += data.price.price - temp_data_discounted;
    }
  } else {
    temp_data_result += data.price.price * data.quantity;
  }

  return temp_data_result;
};

const calculate_grand_total = (data, discount, vat, type) => {
  let temp_data_total = 0;
  let temp_data_sub_total = 0;
  let temp_data_grand_total = 0;
  let temp_discounted_total = 0;
  let temp_vat_total = 0;
  let temp_special_discounted = discount / 100;
  let temp_vat = vat / 100;
  data.forEach((element) => {
    let temp_data_result = 0;
    let temp_data_discounted = 0;
    let convert_discount = element.sale_discount.discount / 100;
    if (element.status == 1) {
      for (let index = 0; index < element.quantity; index++) {
        temp_data_discounted = element.price.price * convert_discount;
        temp_data_result += element.price.price - temp_data_discounted;
      }
    }
    temp_data_total += temp_data_result;
  });
  temp_discounted_total = temp_data_total * temp_special_discounted;
  temp_data_sub_total = temp_data_total - temp_discounted_total;
  temp_vat_total = temp_data_sub_total * temp_vat;
  temp_data_grand_total = temp_data_sub_total + temp_vat_total;
  if (type == 0) {
    return temp_data_grand_total;
  } else if (type == 1) {
    return temp_vat_total;
  } else if (type == 2) {
    return temp_discounted_total;
  }
};

const calculate_grand_total_unsuccess = (data) => {
  let temp_data_total = 0;
  data.forEach((element) => {
    if (element.status == 0) {
      temp_data_total = element.price.price * element.quantity;
    }
  });
  return temp_data_total;
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
        route('transactions.export', {
          date_from: date_from,
          date_to: date_to,
        })
      "
      class="bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"
      >Export Transaction</a
    >
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" class="px-6 py-3">Transaction ID</th>
              <th scope="col" class="px-6 py-3">Processed by</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">
                Payment Method & Customer Type
              </th>
              <th scope="col" class="px-6 py-3">Tax & Discount</th>
              <th scope="col" class="px-6 py-3">Products</th>
              <th scope="col" class="px-6 py-3">Total Discount & VAT</th>
              <th scope="col" class="px-6 py-3">Total Paid</th>
              <th scope="col" class="px-6 py-3">Total Unsuccess</th>
              <th scope="col" class="px-6 py-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(transaction, key) in transactions.data"
              :key="key"
            >
              <tr class="bg-white border-">
                <td class="px-6 py-4">{{ transaction.id }}</td>
                <td class="px-6 py-4">
                  <small class="flex gap-2">
                    <img
                      class="h-8 w-8 rounded-full object-cover"
                      :src="transaction.accommodate_by.profile_photo_url"
                      :alt="transaction.accommodate_by.name"
                    />
                    {{ transaction.accommodate_by?.name ?? "Pending" }}
                  </small>
                </td>
                <td class="px-6 py-4">
                  <div v-if="transaction.status == 1" class="flex gap-1">
                    <Icon icon="check" size="sm" />
                    <span class="bg-green-400 rounded-md p-1 text-white">
                      Success
                    </span>
                  </div>
                  <div v-else class="flex gap-1">
                    <Icon icon="wrong" size="xs" />
                    <span class="bg-orange-400 rounded-md p-1 text-white">
                      Unsuccess
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex p-1 w-[8vmin]">
                    <div
                      v-if="transaction.customer_type == 0"
                      class="flex gap-1"
                    >
                      <Icon icon="user" size="md" />

                      <small
                        class="bg-green-400 rounded-md p-1 text-white w-full"
                      >
                        Walk-in
                      </small>
                    </div>
                    <div v-else class="flex gap-1">
                      <Icon icon="user" size="md" />

                      <small class="bg-orange-400 rounded-md p-1 text-white">
                        Regular
                      </small>
                    </div>
                  </div>
                  <div class="flex">
                    <small
                      class="flex gap-1"
                      v-if="transaction.payment_method == 0"
                      ><Icon icon="cash" size="sm" /> Cash
                    </small>
                    <small v-else>Other</small>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex rounded-lg bg-red-400 p-[3px] text-white">
                    <Icon icon="tax" size="sm" />
                    <small>VAT: </small>
                    <small> {{ transaction.tax?.tax }}% </small>
                  </div>
                  <div
                    class="flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"
                  >
                    <Icon icon="wheelchair" size="sm" />
                    <small>SD: </small>
                    <small
                      >{{
                        transaction.special_discount?.discount ?? "0"
                      }}%</small
                    >
                  </div>
                </td>
                <td
                  scope="row"
                  class="px-2 py-1 text-gray-900 whitespace-nowrap"
                >
                  <table class="w-full text-xs text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-1 py-1 flex">Product</th>
                        <th scope="col" class="px-1 py-1">No.</th>
                        <th scope="col" class="px-1 py-1">Price</th>
                        <th scope="col" class="px-1 py-1">Discount %</th>
                        <th scope="col" class="px-1 py-1">Status</th>
                        <th scope="col" class="px-1 py-1">Total Discount</th>
                        <th scope="col" class="px-1 py-1">Sub-total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template
                        v-for="(
                          transaction_detail, key2
                        ) in transaction.transaction_details"
                        :key="key2"
                      >
                        <tr class="bg-white border-">
                          <td class="px-1 py-1 flex">
                            <Icon icon="shopping_cart" size="xs" />
                            {{ transaction_detail.product?.name }}
                          </td>
                          <td class="px-1 py-1">
                            {{ transaction_detail.quantity }}
                          </td>
                          <td class="px-1 py-1">
                            {{ convert_money(transaction_detail.price.price) }}
                          </td>
                          <td class="px-1 py-1">
                            {{ transaction_detail.sale_discount.discount }}%
                          </td>
                          <td class="px-1 py-1">
                            <small
                              v-if="transaction_detail.status == 0"
                              class="bg-orange-400 rounded-sm p-[1px] text-white"
                            >
                              Unsuccess
                            </small>
                            <small
                              v-else
                              class="bg-green-400 rounded-sm p-[1px] text-white"
                            >
                              Success
                            </small>
                          </td>
                          <td class="px-1 py-1">
                            <small>{{
                              convert_money(
                                calculate_item_discount(transaction_detail)
                              )
                            }}</small>
                          </td>
                          <td class="px-1 py-1">
                            <small>{{
                              convert_money(
                                calculate_sub_total(transaction_detail)
                              )
                            }}</small>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </td>
                <td class="px-6 py-4">
                  <div class="flex rounded-lg bg-red-400 p-[3px] text-white">
                    <small class="flex"
                      ><Icon icon="tax" size="sm" />VAT:
                    </small>
                    <small>
                      {{
                        convert_money(
                          calculate_grand_total(
                            transaction.transaction_details,
                            transaction.special_discount?.discount ?? 0,
                            transaction.tax?.tax ?? 0,
                            1
                          )
                        )
                      }}
                    </small>
                  </div>
                  <div
                    class="flex rounded-lg bg-orange-400 p-[3px] text-white mt-1"
                  >
                    <small class="flex"
                      ><Icon icon="wheelchair" size="sm" />SD:
                    </small>
                    <small>{{
                      convert_money(
                        calculate_grand_total(
                          transaction.transaction_details,
                          transaction.special_discount?.discount ?? 0,
                          transaction.tax?.tax ?? 0,
                          2
                        )
                      )
                    }}</small>
                  </div>
                </td>
                <td class="px-6 py-4">
                  {{
                    convert_money(
                      calculate_grand_total(
                        transaction.transaction_details,
                        transaction.special_discount?.discount ?? 0,
                        transaction.tax?.tax ?? 0,
                        0
                      )
                    )
                  }}
                </td>
                <td class="px-6 py-4">
                  {{
                    convert_money(
                      calculate_grand_total_unsuccess(
                        transaction.transaction_details,
                        transaction.special_discount?.discount ?? 0,
                        transaction.tax?.tax ?? 0
                      )
                    )
                  }}
                </td>
                <td class="px-6 py-4 flex gap-2">
                  <Icon icon="calendar" size="md" />
                  <small>
                    {{ date_time(transaction.created_at) }}
                  </small>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <Pagination2
          :links="props.transactions.links"
          :date_from="date_from"
          :date_to="date_to"
        />
        <p class="mt-6 text-sm text-gray-500">
          Showing {{ transactions.data.length }} Transactions
        </p>
      </div>
    </div>
  </section>
</template>