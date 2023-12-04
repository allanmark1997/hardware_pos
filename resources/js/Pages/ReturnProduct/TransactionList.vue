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

const props = defineProps(["transactions", "date_from", "date_to", "search"]);
const date_from = ref(props.date_from);
const date_to = ref(props.date_to);
const search = ref(props.search);
const paginated_transactions = ref({});
const entries = ref(10);

function Paginator(items, page, per_page) {
  var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: page,
    per_page: per_page,
    prev_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}
console.log(props.transactions);

onMounted(() => {
  paginated_transactions.value = Paginator(props.transactions, 1, entries.value);
  console.log(paginated_transactions.value);
});

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
    route("return.index", {
      search: search.value,
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const search_ = () => {
  router.get(
    route("return.index", {
      search: search.value,
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const function_filter_remove = () => {
  router.get(
    route("return.index", {
      date_from: null,
      date_to: null,
      search: null,
    })
  );
};

const calculate_item_discount = (data) => {
  let temp_data_discounted = 0;
  let convert_discount = data.sale_discount.discount / 100;

  for (let index = 0; index < data.quantity; index++) {
    temp_data_discounted += data.price.price * convert_discount;
  }

  return temp_data_discounted;
};

const calculate_sub_total = (data) => {
  let temp_data_result = 0;
  let temp_data_discounted = 0;
  let convert_discount = data.sale_discount.discount / 100;
  for (let index = 0; index < data.quantity; index++) {
    temp_data_discounted = data.price.price * convert_discount;
    temp_data_result += data.price.price - temp_data_discounted;
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
    if (element.status == 1 || element.status == 2 || element.status == 3) {
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
      temp_data_total += element.price.price * element.quantity;
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
          <TextInput id="date_from" v-model="date_from" type="date" class="mt-1 block w-full" />
        </div>
        <div class="flex">
          <span class="text-md mt-2 mr-2">To</span>
          <TextInput id="date_to" v-model="date_to" type="date" class="mt-1 block w-full"
            @keyup.enter="function_filter_range" />
        </div>
        <div class="flex">
          <Input v-model="search" class="rounded-lg w-[30vmin]" type="text" label="Search transaction"
            @keyup.enter="search_" />
        </div>
        <button v-if="date_from || date_to || search" class="h-10 my-auto mt-5" @click="function_filter_remove">
          <Icon icon="close_icon" size="sm" />
        </button>
      </div>
    </div>
    <!-- <a :href="route('transactions.export', {
      date_from: date_from,
      date_to: date_to,
      search: search,
    })
      " class="bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2">Export Transaction</a> -->
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" class="px-6 py-3">Transaction ID</th>
              <th scope="col" class="px-6 py-3">Products</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(transaction, key) in paginated_transactions.data" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">{{ transaction.transaction_id }}</td>
                <td scope="row" class="px-2 py-1 text-gray-900">
                  <table class="w-full text-xs text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th scope="col" class="px-1 py-1 flex">Product</th>
                        <th scope="col" class="px-1 py-1">No.</th>
                        <th scope="col" class="px-1 py-1">Price</th>
                        <th scope="col" class="px-1 py-1">Discount %</th>
                        <th scope="col" class="px-1 py-1">Type</th>
                        <th scope="col" class="px-1 py-1">Total Discount</th>
                        <th scope="col" class="px-1 py-1">Sub-total</th>
                        <th scope="col" class="px-1 py-1">Created Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(transaction_detail, key2) in transaction.data" :key="key2">
                        <tr class="bg-white border-">
                          <td class="px-1 py-1 flex ">
                            <Icon icon="shopping_cart" size="xs" />
                            <p class="w-[20vmin] break-words">
                              {{ transaction_detail.product?.name }}
                            </p>

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
                            <small v-if="transaction_detail.type == 1" class="bg-red-300 rounded-lg p-1">Damage</small>
                            <small v-else-if="transaction_detail.type == 2"
                              class="bg-green-300 rounded-lg p-1">Inventory</small>
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
                          <td class="px-1 py-1">
                            <small>{{
                              date_time(
                                transaction_detail.created_at
                              )
                            }}</small>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <!-- <Pagination2 :links="props.transactions.links" :date_from="date_from" :date_to="date_to" :search="search" /> -->
        <nav class="w-full">
          <ul class="inline-flex -space-x-px text-sm">
            <li>
              <button @click="paginated_transactions = Paginator(props.transactions, paginated_transactions.prev_page, 1)"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                :disabled="paginated_transactions.prev_page == null"
                :class="paginated_transactions.prev_page == null ? 'cursor-not-allowed text-gray-100' : ''">
                Previous
              </button>
            </li>
            <template v-for="(page_number, key) in 10" :key="key">
              <li>
                <a v-if="paginated_transactions.page != page_number" href="#"
                  @click="paginated_transactions = Paginator(props.transactions, page_number, entries)" class=" flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border
                border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{ page_number }}</a>
                <a v-else href="#" @click="paginated_transactions = Paginator(props.transactions, page_number, entries)"
                  class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 ">{{
                    page_number }} </a>
              </li>
            </template>
            <li>
              <button
                @click="paginated_transactions = Paginator(props.transactions, paginated_transactions.next_page, entries)"
                :disabled="paginated_transactions.next_page == null"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                :class="paginated_transactions.next_page == null ? 'cursor-not-allowed text-gray-100' : ''">
                Next
              </button>
            </li>
          </ul>
        </nav>
        <p class="mt-6 text-sm text-gray-500 flex justify-between gap-4">
          <Input type="number" label="Input showing" v-model="entries"
            @keyup.enter=" paginated_transactions = Paginator(props.transactions, 1, entries)" />
          <span class="text-sm text-gray-700 flex mt-4">
            Page: {{ paginated_transactions.page }}
          </span>
          <span class="text-sm text-gray-700 mt-4">
            Showing
            <span class="font-semibold text-gray-900">
              {{ paginated_transactions.per_page }}</span>
            of
            <span class="font-semibold text-gray-900">{{
              paginated_transactions.total
            }}</span>
            Entries
          </span>
          <!-- Showing {{ transactions.data.length }} Transactions -->
        </p>
      </div>
    </div>
  </section>
</template>