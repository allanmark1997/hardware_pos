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
  return moment(data).format("MMMM Do YYYY, h:mm:ss a");
};
</script>
<template>
  <ul class="max-w-full divide-y divide-gray-200 p-2">
    <li
      class="pb-3 hover:bg-blue-50"
      v-for="(product, index) in products.data"
      :key="index"
    >
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            class="w-8 h-8 rounded-full"
            :src="product.product_image"
            :alt="product.name"
          />
        </div>
        <div
          class="items-center text-sm text-gray-900 w-1/4 truncate text-center"
          :title="product.name"
        >
          {{ product.name }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Name
          </p>
        </div>
        <div
          class="items-center text-sm text-gray-900 w-1/4 truncate text-center"
          :title="product.description"
        >
          {{ product.description }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Description
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ product.remarks }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Remarks
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ convert_money(product.current_price.price) }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Current Price
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ product.current_discount.discount }}%
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Sale Discount
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ product.quantity }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Quantity
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ product.user.name }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Updated by
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ date_time(product.updated_at) }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Updated
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ date_time(product.created_at) }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Created
          </p>
        </div>

        <div class="items-center text-sm text-gray-900 p-2">
          <button
            @click="function_open_modal_confirmation(true, user)"
            class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2 w-full"
          >
            Edit
          </button>
          <button
            @click="function_open_modal_confirmation(false, user)"
            class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-full mt-1"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
    <Pagination2
      :links="props.products.links"
      :search="props.search"
      :category="category"
    />
  </ul>

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