<script setup>
import Icon from "@/Components/Icon.vue";
import Button from "@/Components/Button.vue";
import { useForm } from "@inertiajs/vue3";
import QuantityUpdate from "./QuantityUpdate.vue";
import { ref, watch } from "vue";

const props = defineProps(["group_suppliers"]);
const sub_total_order = ref(0);
const total_order = ref(0);
const form = useForm({
  selected_product: [],
});

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

watch(
  () => form.selected_product,
  (product) => {
    total_order.value = 0;
    product.forEach((element) => {
      // console.log(element.price.price);
      // if (element.id == 1) {

      // }
      total_order.value += element.price.price * element.quantity;
    });
  }
);
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
            <div class="col-span-4 flex gap-2 ml-2">
              <input
                class="my-auto relative -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                :value="product[0]"
                v-model="form.selected_product"
                id="checkboxChecked"
              />
              <img
                class="w-24 h-24 object-scale-down"
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
  <div
    class="fixed bg-white border border-gray-200 rounded-md bottom-0 w-2/3 p-2 gap-2"
  >
    <p class="text-right text-md justify-right">
      Total ({{ form.selected_product.length }}
      {{ form.selected_product.length <= 0 ? " item" : " items" }}):
      <span class="text-lg font-bold text-red-500">
        {{ convert_money(total_order) }}</span
      >
    </p>
    <Button class="pt-1 pb-1 pl-4 pr-4 hover:bg-green-400 hover:text-white"
      >Check Out</Button
    >
  </div>
</template>