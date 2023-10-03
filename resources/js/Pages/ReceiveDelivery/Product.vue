
<script setup>
import { useForm } from "@inertiajs/vue3";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["delivery_details"]);
const form = useForm({
  product: false,
  status: false,
});

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const recieve = (data) => {
  form.product = data;
  if (data.status == 1) {
    form.status = 0;
  } else {
    form.status = 1;
  }
  form.put(route("deliveries.update_item_status", form.product), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Selected item has been updated", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form.reset();
    },
  });
};
</script>
<template>
  <table class="w-full text-xs text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        <th scope="col" class="px-1 py-1">Product</th>
        <th scope="col" class="px-1 py-1">No.</th>
        <th scope="col" class="px-1 py-1">Price</th>
        <th scope="col" class="px-1 py-1">Sub-total</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(delivery_detail, key2) in delivery_details" :key="key2">
        <tr class="bg-white border-">
          <td class="px-1 py-1 flex font-bold">
            <Icon icon="shopping_cart" size="xs" />

            {{ delivery_detail.product?.name }}
          </td>
          <td class="px-1 py-1">
            {{ delivery_detail.quantity }}
          </td>
          <td class="px-1 py-1">
            {{ convert_money(delivery_detail.price.price) }}
          </td>
          <td class="px-1 py-1">
            <small>{{
              convert_money(
                delivery_detail.quantity * delivery_detail.price.price
              )
            }}</small>
          </td>
          <td class="px-1 py-1">
            <input
              class="my-auto relative -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
              type="checkbox"
              :value="delivery_detail"
              @change="recieve(delivery_detail)"
              :checked="delivery_detail.status == 1"
              id="checkboxChecked"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>