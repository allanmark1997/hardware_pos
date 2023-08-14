<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps(["props_detail"]);
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        Cashier
      </h2>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto  bg-white rounded mt-5 px-1">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-2 bg-red-200">
            Tabs
          </div>
          <div class="col-span-6 bg-blue-200">

            <form class="flex items-center">
              <label for="Search products" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Icon class="mr-1" icon="shopping_bag" size="xs" />
                </div>
                <input type="text" id="Search products"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                  placeholder="Search products">
              </div>
              <button type="submit"
                class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                <Icon class="mr-5" icon="search_icon" size="xs" />
              </button>
            </form>

            <div class="product_list">

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Image</span>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="w-32 p-4">
                        <img src="/docs/images/products/iphone-12.png" alt="Iphone 12">
                      </td>
                      <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        Iphone 12
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex items-center space-x-3">
                          <button
                            class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product"
                              class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="1" required>
                          </div>
                        <button
                          class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button">
                          <span class="sr-only">Quantity button</span>
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      $999
                    </td>
                    <td class="px-6 py-4">
                      <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>


        </div>
        <div class="col-span-4 bg-yellow-200"></div>
      </div>
    </div>
  </div>
</AppLayout></template>