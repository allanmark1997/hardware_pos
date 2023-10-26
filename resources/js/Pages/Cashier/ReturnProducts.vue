<script setup>
import Icon from "@/Components/Icon.vue";
import Input from "@/Components/Input.vue"
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import { onMounted } from "vue";
import moment from "moment";
const props = defineProps(["search", "transaction"])

const form = useForm({
  search: props.search ?? "",
})

onMounted(() => {
});

const search_transaction = () => {
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true
  })
}
const search_remove = () => {
  form.search = ''
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true
  })
}

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const calculate_discounted_total = (price, discount, quantity) => {
  let discount_val = discount / 100;
  let total = (price * discount_val) * quantity;
  return total;
}

const calculate_subtotal = (price, discount, quantity) => {
  let discounted_total = calculate_discounted_total(price, discount, quantity);
  let total = (price - discounted_total) * quantity;
  return total;
}

const calculate_grandtotal = () => {
  let grandTotal = 0;
  let subtotal = 0;
  let subtotal_2 = 0;
  let discount_val = 0;
  let price_discount = 0;
  props.transaction?.transaction_details.forEach(detail => {
    discount_val = detail.sale_discount.discount / 100;
    price_discount = (detail.price.price * discount_val) * detail.quantity;
    subtotal = detail.price - price_discount;
    subtotal_2 = subtotal;

  });

  return subtotal_2;
}
</script>
<template>
  <Head :title="'Return'" />
  <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-700">
    <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
      <Link :href="route('cashier.index')"
        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
      Dashboard
      </Link>
    </div>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <div class="mt-16">
        <div class="text-center">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome back {{ usePage().props.auth.user.name }}!
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            "The nice thing about teamwork is that you always have others on
            your side." <br />- Margaret Carty
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Input label="Transaction Code" class="rounded-lg w-full mb-2" type="text" v-model="form.search"
              @keyup.enter="search_transaction" />
            <button v-if="search" class="my-auto mx-auto" @click="search_remove">
              <Icon icon="close_icon" size="sm" />
            </button>
          </div>
          <div>
            <p class="text-2xl text-white" v-if="props.transaction == null">
              No Results
            </p>
            <div v-else class="container mx-auto my-5 p-5">
              <div class="md:flex no-wrap md:-mx-2 ">
                <!-- Left Side -->
                <div class="w-full md:w-3/12 md:mx-2">
                  <!-- Profile Card -->
                  <div class="bg-white p-3 border-t-4 border-green-400">
                    <p class="text-left text-xs text-gray-700 font-bold">
                      #{{ transaction?.id }}
                    </p>
                    <p class="text-left text-xs text-gray-700 font-bold">
                      {{ transaction?.code }}
                    </p>
                    <div class="image overflow-hidden">
                      <img class="h-auto w-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt="">
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ transaction?.name }}</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">{{ transaction?.address }}</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="flex gap-2">
                        Cashier:
                        <img class="rounded-full w-10 h-10" :src="transaction?.accommodate_by.profile_photo_url" alt="">
                        {{ transaction?.accommodate_by.name }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Payment Method: {{ transaction?.payment_method == 0 ? "Cash" : "Others" }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        VAT({{ transaction?.tax.tax }}%): {{ convert_money(1000) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Special Discount({{ transaction?.special_discount?.discount ?? 0 }}%): {{ convert_money(1000) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Cash Rendered: {{ convert_money(transaction?.cash) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Customer Change: {{ convert_money(transaction?.cash) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Success Grand Total: {{ calculate_grandtotal() }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Cancelled Grand Total: {{ convert_money(transaction?.cash) }}
                      </span>
                    </p>
                    <ul
                      class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li class="flex items-center py-3">
                        <span>Status</span>
                        <span class="ml-auto">
                          <span v-if="transaction?.status == 1" class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            Active
                          </span>
                          <span v-else class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                            Cancelled
                          </span>
                        </span>
                      </li>
                      <li class="flex items-center py-3">
                        <span>Transaction Date</span>
                        <span class="ml-auto overflow-hidden text-sm">
                          {{ moment(transaction?.created_at).format("MMMM D, YYYY")
                          }}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <!-- End of profile card -->
                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-70">
                  <!-- Profile tab -->
                  <!-- About Section -->
                  <div class="bg-white p-3 shadow-sm rounded-sm h-full">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                      <div class="grid grid-cols-12 text-sm gap-2 break-words">
                        <template v-for="(detail, key) in transaction?.transaction_details " :key="key">
                          <div class="col-span-2 flex mx-auto ">
                            <Icon icon="cart" size="sm" class="mx-auto" />
                            <div>
                              <p class="font-semibold">
                                {{ detail.product.name }}
                              </p>
                              <span class="text-xs font-normal w-full">
                                Product Name
                              </span>
                            </div>
                          </div>
                          <div class="col-span-1">
                            <p class="font-semibold">
                              {{ detail.quantity }}
                            </p>
                            <span class="text-xs font-normal w-full">
                              Quantity
                            </span>
                          </div>
                          <div class="col-span-2">
                            <p class="font-semibold">
                              {{ convert_money(detail.price.price) }}
                            </p>
                            <span class="text-xs font-normal w-full">
                              Price
                            </span>
                          </div>
                          <div class="col-span-1">
                            <p class="font-semibold">
                              {{ detail.sale_discount.discount }}%
                            </p>
                            <span class="text-xs font-normal w-full">
                              Discount
                            </span>
                          </div>

                          <div class="col-span-2">
                            <p class="font-semibold">
                              {{ convert_money(calculate_discounted_total(detail.price.price,
                                detail.sale_discount.discount,
                                detail.quantity)) }}
                            </p>
                            <span class="text-xs font-normal w-full">
                              Discounted Total
                            </span>
                          </div>
                          <div class="col-span-2">
                            <p class="font-semibold">
                              {{ convert_money(calculate_subtotal(detail.price.price,
                                detail.sale_discount.discount,
                                detail.quantity)) }}
                            </p>
                            <span class="text-xs font-normal w-full">
                              Subtotal
                            </span>
                          </div>
                          <div class="col-span-2">
                            <p class="font-semibold">
                              <span class="ml-auto">
                                <span v-if="detail?.status == 1"
                                  class="bg-green-500 py-1 px-1 rounded text-white text-xs">
                                  Active
                                </span>
                                <span v-else class="bg-red-500 py-1 px-1 rounded text-white text-xs">
                                  Cancelled
                                </span>
                              </span>
                            </p>
                            <span class="text-xs font-normal w-full">
                              Status
                            </span>
                          </div>
                          <hr class="col-span-12 w-full">

                        </template>

                      </div>
                    </div>
                  </div>
                  <!-- End of about section -->
                  <!-- End of profile tab -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>