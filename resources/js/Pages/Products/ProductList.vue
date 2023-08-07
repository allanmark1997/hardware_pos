<script setup>
import moment from "moment";
import Pagination2 from "@/Components/Pagination2.vue";
import { ref } from "vue";

const props = defineProps(["products", "search", "category"]);

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};
</script>
<template>
  <div>
    <section class="text-gray-600 bg-white rounded-lg py-5 px-5 mb-5">
      <div class="container mx-auto">
        <div class="flex flex-wrap -m-4">
          <div v-if="products.data.length <= 0" class="mx-auto">
            <h1 class="text-4xl font-bold mt-6">No products found!</h1>
          </div>
          <div
            v-else
            class="p-4 md:w-1/4"
            v-for="(product, index) in products.data"
            :key="index"
          >
            <div
              class="h-full border-2 border-gray-100 shadow-md rounded-lg overflow-hidden group"
            >
              <div class="hidden group-hover:flex absolute w-[270px] gap-2">
                <button
                  @click="function_open_modal_confirmation(true, user)"
                  class="p-2 bg-yellow-400 rounded-lg hover:bg-yellow-600 ml-[175px] mt-2 w-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  @click="function_open_modal_confirmation(false, user)"
                  class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mt-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
              <img
                v-if="product.product_image"
                class="lg:h-48 md:h-36 w-full object-scale-down object-center bg-gray-100"
                :src="product.product_image"
                :alt="product.name"
              />
              <img
                v-if="!product.product_image"
                class="lg:h-48 md:h-36 w-full object-scale-down object-center bg-gray-100"
                src="https://dummyimage.com/720x400"
                :alt="product.name"
              />
              <div class="flex justify-between -mt-6">
                <h2
                  class="tracking-widest text-sm title-font font-bold text-yellow-500 mb-1 bg-white"
                >
                  Stocks: {{ product.quantity }}
                </h2>
                <h2
                  class="tracking-widest text-sm title-font font-bold text-orange-500 mb-1 bg-white"
                >
                  Discount: {{ product.current_discount.discount }}%
                </h2>
              </div>
              <div class="p-4">
                <h1
                  class="title-font text-lg capitalize font-bold text-gray-900"
                >
                  {{ product.name }}
                </h1>

                <h2
                  class="tracking-widest text-lg title-font font-bold text-gray-500 mb-3"
                >
                  {{ convert_money(product.current_price.price) }}
                </h2>

                <p class="leading-relaxed mb-3 text-xs truncate">
                  <span class="font-bold text-sm">Description: </span>
                  {{ product.description }}
                </p>
                <p class="leading-relaxed mb-3 text-xs truncate">
                  <span class="font-bold text-sm">Remarks: </span>
                  {{ product.remarks }}
                </p>
                <!-- <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Current Price: </span> {{
                  convert_money(product.current_price.price) }}</p>
                <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Sale Discount: </span> {{
                  product.current_discount.discount }}%</p>
                <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Quantity: </span> {{ product.quantity }}
                </p> -->
                <p class="leading-relaxed text-xs">
                  <span class="font-bold text-sm">Updated by: </span>
                  {{ product.user.name }}
                </p>
                <div class="flex">
                  <p
                    class="leading-relaxed text-xs truncate"
                    :title="date_time(product.updated_at)"
                  >
                    <span class="font-bold text-xs">Updated at: </span>
                    {{ date_time(product.updated_at) }}
                  </p>
                  <p
                    class="leading-relaxed mb-3 text-xs truncate"
                    :title="date_time(product.created_at)"
                  >
                    <span class="font-bold text-xs">Created at: </span>
                    {{ date_time(product.created_at) }}
                  </p>
                </div>

                <!-- <div class="flex items-center  w-10  ">
                  <button @click="function_open_modal_confirmation(true, user)"
                    class="p-2  bg-yellow-400 rounded-lg hover:bg-yellow-600 mr-2 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>

                  </button>
                  <button @click="function_open_modal_confirmation(false, user)"
                    class="p-2  bg-red-400 rounded-lg hover:bg-red-600 w-full ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </button>

                </div> -->
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <Pagination2
            :links="props.products.links"
            :search="props.search"
            :category="category"
          />
          <p class="mt-6 text-sm text-gray-500">
            Showing {{ products.data.length }} Products
          </p>
        </div>
      </div>
    </section>
  </div>

  <!-- <JetDialogModal :show="add_modal" @close="add_modal = false" maxWidth="2xl">
    <template #title> Are you sure you want to update this user?</template>
    <template #content>
      <p class="text-red-500">
        Clicking can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="add_modal = false" class="mr-2">
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
  </JetDialogModal> -->
</template>