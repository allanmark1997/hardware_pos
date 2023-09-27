<script setup>
import { useForm } from "@inertiajs/vue3";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["quantity", "order"]);
const form = useForm({
  order: props.order,
  quantity: props.quantity,
});
const update_quantity = (type) => {
  if (type == 1) {
    form.quantity = form.quantity + 1;
    form.put(route("cart.update_quantity", { order: form.order }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Added quantity", {
          autoClose: 1000,
          transition: toast.TRANSITIONS.FLIP,
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    });
  } else {
    if (form.quantity <= 0) {
      toast.error("Looks like your quantity is less than 0", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      form.quantity = form.quantity - 1;
      form.put(route("cart.update_quantity", { order: form.order }), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Deducted quantity", {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
        },
      });
    }
  }
};
</script>
<template>
  <div
    class="flex rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 w-full pb-1 pt-1"
    role="group"
  >
    <button
      @click="update_quantity(0)"
      type="button"
      class="inline-block rounded-l bg-primary text-md font-medium uppercase leading-normal text-gray-700 transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 p-2"
    >
      -
    </button>
    <input
      class="inline-block rounded-l bg-primary text-xs font-medium leading-normal w-full"
      type="number"
      v-model.number="form.quantity"
    />
    <button
      @click="update_quantity(1)"
      type="button"
      class="inline-block rounded-r bg-primary text-md font-medium uppercase leading-normal text-gray-700 transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700 p-2"
    >
      +
    </button>
  </div>
</template>