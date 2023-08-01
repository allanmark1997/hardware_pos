<script setup>
import moment from "moment";
const props = defineProps(["products"]);
const convert_money = (data) => {
  let temp_data = data.toFixed(2);
  return temp_data;
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
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ product.name }}
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
          &#8369; {{ convert_money(product.current_price.price) }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Current Price
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ product.sale_discount }}%
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

        <!-- <div class="items-center text-sm text-gray-900 p-2"> -->
        <!-- <button class="p-2 bg-orange-400 rounded-lg mr-2 hover:bg-orange-600">
            Edit
          </button> -->
        <!-- <button
            @click="function_open_modal_confirmation(true, user)"
            class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2"
            v-if="user.status == 0 && user.type != 0"
          >
            Activate
          </button>
          <button
            @click="function_open_modal_confirmation(false, user)"
            class="p-2 bg-red-400 rounded-lg hover:bg-red-600"
            v-else-if="user.status == 1 && user.type != 0"
          >
            Deactivate
          </button>
        </div> -->
      </div>
    </li>
    <!-- <Pagination2 :links="props.users.links" /> -->
    <!-- <Pagination :links="props.users.links" /> -->
  </ul>
</template>