<script setup>
import Icon from "@/Components/Icon.vue";
import Button from "@/Components/Button.vue";
import { useForm } from "@inertiajs/vue3";
import QuantityUpdate from "./QuantityUpdate.vue";

const props = defineProps(["group_suppliers"]);

const form = useForm({
  order: "",
  quantity: "",
});

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};
</script>
<template>
  <div
    class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"
  >
    <div class="border-b-2 border-neutral-100 px-6 py-3">
      <div class="grid grid-cols-12 gap-1 text-sm text-left text-gray-500">
        <div class="col-span-4 px-1 py-1">Product</div>
        <div class="col-span-2 px-1 py-1">Unit Price</div>
        <div class="col-span-2 px-1 py-1">Quantity</div>
        <div class="col-span-2 px-1 py-1">Total Price</div>
        <div class="col-span-2 px-1 py-1">Actions</div>
      </div>
    </div>
  </div>
  <template v-for="(supplier, key) in group_suppliers" :key="key">
    <div
      class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"
    >
      <div class="border-b-2 border-neutral-100 px-6 py-3 text-left flex gap-2">
        <Icon icon="store" size="md" />
        <p class="my-auto">{{ key }}</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-12 gap-1 text-sm text-left text-gray-500">
          <template v-for="(product, key) in supplier" :key="key">
            <div class="col-span-4 flex gap-2">
              <img
                class="w-24 h-24"
                :src="product[0].product?.product?.product_image"
                :alt="product[0].product?.product?.product_image"
              />
              <p class="my-auto text-md font-bold">
                {{ product[0].product?.product?.name }}
              </p>
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                {{ convert_money(product[0].price?.price) }}
              </span>
            </div>
            <div class="col-span-2 px-1 py-1">
              <QuantityUpdate
                :order="product[0]"
                :quantity="product[0].quantity"
              />
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                {{
                  convert_money(product[0].price?.price * product[0].quantity)
                }}
              </span>
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                <a class="cursor-pointer">
                  <Icon icon="trash" size="sm" />
                </a>
              </span>
            </div>
          </template>
        </div>
      </div>
      <div class="border-t-2 border-neutral-100 px-6 py-3">2 days ago</div>
    </div>
  </template>
</template>