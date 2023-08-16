<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Icon from "@/Components/Icon.vue";
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
const props = defineProps(["product"]);

const totalCart = ref(2);
const sampleData = ref(5);
const samplePurchaseData = ref(2);
const search = ref("");
const scannedCode = '226652446'

const firstDigit = (num) => {
  // 1: get first digit using regex pattern
  const matches = String(num).match(/\d/);
  // 2: convert matched item to integer
  const digit = Number(matches[0]);
  // 3: add sign back as needed
  return num < 0 ? -digit : digit;
};

const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

const search_ = (value) => {
  router.get(route("cashier.index", { search: value }));
};

const scan = () =>{
  search_(scannedCode.value)
}
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">Cashier</h2>
    </template>
    <div class="py-5">
      <button @click="scan()" class="bg-red-200">scan</button>
      <div class="max-w-7xl mx-auto bg-white rounded mt-5 px-1">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-7 p-5">
            <form class="flex items-center">
              <label for="Search products" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Icon class="mr-1" icon="shopping_bag" size="xs" />
                </div>
                <input
                  type="text"
                  id="Search products"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                  placeholder="Search products"
                />
              </div>
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-700 rounded-lg border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <Icon class="mr-5" icon="search_icon" size="xs" />
              </button>
            </form>

            <div
              class="product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[60vmin] overflow-auto"
            >

              <div class="mt-24 flex justify-center" v-if="sampleData == 0">
                <div class="bg-white px-10 py-5 shadow-lg rounded xl">
                  <div class="flex justify-center mb-2">
                    <Icon icon="shopping_bag" size="md" />
                  </div>
                  Scan a product
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-5">
            <div
              class="bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]"
            >
              <div class="flex">
                <Icon icon="shopping_cart" size="sm"></Icon>
                <span class="font-bold">Cart</span>
              </div>
              <div>
                <span class="font-bold"> count: </span>
                <span
                  class="bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center"
                >
                  <small v-if="totalCart >= 1000">{{
                    nFormatter(totalCart)
                  }}</small>
                  <small v-else-if="totalCart >= 100">{{
                    nFormatter(totalCart)
                  }}</small>
                  <small v-else>{{ totalCart }}</small>
                </span>
              </div>
            </div>
            <form class="flex mt-5 mx-5 items-center">
              <label for="Search products" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Icon class="mr-1" icon="shopping_bag" size="xs" />
                </div>
                <input
                  type="text"
                  id="Search products"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                  placeholder="Search products"
                />
              </div>
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-700 rounded-lg border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <Icon class="mr-5" icon="search_icon" size="xs" />
              </button>
            </form>
            <div
              class="relative mt-5 px-2 overflow-x-auto min-h-[45vmin] shadow-md"
            >
              <table class="w-full text-sm text-left text-gray-500">
                <tbody>
                  <tr v-for="data in totalCart" class="bg-white border-b">
                    <td class="px-6 py-4 font-semibold text-gray-900">
                      Wrench
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div>
                          <div class="flex items-center space-x-3">
                            <button
                              class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span class="sr-only">Quantity button</span>
                              <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <input
                                type="number"
                                id="first_product"
                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="1"
                                required
                              />
                            </div>
                            <button
                              class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span class="sr-only">Quantity button</span>
                              <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900">$9992</td>
                    <td class="px-6 py-4 font-semibold text-gray-900">
                      <button>
                        <Icon icon="close_icon" size="sm" class="text-red" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bg-white flex justify-between item-center p-5">
              <p><span class="font-bold">Total:</span> 200</p>
              <button
                type="button"
                class="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Charge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>