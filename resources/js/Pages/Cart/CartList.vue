<script setup>
import Icon from "@/Components/Icon.vue";
import Button from "@/Components/Button.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";

import { useForm } from "@inertiajs/vue3";
import QuantityUpdate from "./QuantityUpdate.vue";
import { ref, watch } from "vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["group_suppliers"]);
const condfirmationModal = ref(false);
const condfirmationDeliveryModal = ref(false);
const sub_total_order = ref(0);
const total_order = ref(0);
const form = useForm({
  order: "",
  selected_product: [],
});

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 20
  });
  let total = formatter.format(data);
  let split_data = total.split(".")
  let decimal = String(split_data[1])
  let slice_decimal = decimal.slice(0, 2)
  let validate_decimal = slice_decimal == "un" ? String("00") : slice_decimal
  let final_data = String(split_data[0]) + "." + validate_decimal
  return final_data;
};

watch(
  () => form.selected_product,
  (product) => {
    total_order.value = 0;
    product.forEach((element) => {
      total_order.value += element.price.price * element.quantity;
    });
  }
);

const delete_open = (data) => {
  form.order = data;
  condfirmationModal.value = !condfirmationModal.value;
};
const delete_ = () => {
  form.delete(route("cart.remove", form.order), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Successfully removed", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      condfirmationModal.value = false;
      form.reset();
    },
  });
};

const delivery_open = () => {
  if (form.selected_product.length <= 0) {
    toast.error("Cannot check out if there's no products selected", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    condfirmationDeliveryModal.value = !condfirmationDeliveryModal.value;
  }
};
const delivery_ = () => {
  form.post(route("deliveries.store"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Successfully added in purchase order", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      condfirmationDeliveryModal.value = false;
      form.reset();
    },
  });
};
</script>
<template>
  <div
    class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2">
    <div class="border-b-2 border-neutral-100 px-6 py-3">
      <div class="grid grid-cols-12 gap-1 text-sm text-left text-gray-500">
        <div class="col-span-2 px-1 py-1">Product</div>
        <div class="col-span-2 px-1 py-1">Remarks</div>
        <div class="col-span-2 px-1 py-1">Unit Price</div>
        <div class="col-span-2 px-1 py-1">Quantity</div>
        <div class="col-span-2 px-1 py-1">Total Price</div>
        <div class="col-span-2 px-1 py-1">Actions</div>
      </div>
    </div>
  </div>
  <div class="mb-12">
  <template v-for="(supplier, key) in group_suppliers" :key="key">
    <div
      class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2">
      <div class="border-b-2 border-neutral-100 px-6 py-3 text-left flex gap-2">
        <Icon icon="store" size="md" />
        <p class="my-auto">{{ key }}</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-12 gap-1 text-sm text-left text-gray-500">
          <template v-for="(product, key) in supplier" :key="key">
            <div class="col-span-2 flex gap-2 ml-2">
              <input
                class="my-auto relative -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox" :value="product" v-model="form.selected_product" id="checkboxChecked" />
              <img class="w-24 h-24 object-scale-down" :src="product.product?.product_image"
                :alt="product.product?.product_image" />
              <p class="my-auto text-md font-bold">
                {{ product.product?.name }}
              </p>
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto text-xs break-words w-10">
                {{ product.remarks }}
              </span>
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                {{ convert_money(product.price?.price) }}
              </span>
            </div>
            <div class="col-span-2 px-1 py-1">
              <QuantityUpdate :order="product" :quantity="product.quantity" />
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                {{ convert_money(product.price?.price * product.quantity) }}
              </span>
            </div>
            <div class="col-span-2 px-1 py-1">
              <span class="my-auto">
                <a @click="delete_open(product)" class="cursor-pointer">
                  <Icon icon="trash" size="sm" />
                </a>
              </span>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="border-t-2 border-neutral-100 px-6 py-3">2 days ago</div> -->
    </div>
  </template>
</div>
  <div
    class="fixed bg-white border border-gray-200 rounded-md bottom-0 sm:w-[885px] md:w[1150px] lg:w-[1180px] xl:w-[1200px] 2xl:w-[1200px] p-2 gap-2 block rounded-lg text-right mt-2">
    <p class="text-right text-md justify-right">
      Total ({{ form.selected_product.length }}
      {{ form.selected_product.length <= 1 ? " item" : " items" }}): <span class="text-lg font-bold text-red-500">
        {{ convert_money(total_order) }}</span>
    </p>
    <Button @click="delivery_open" class="pt-1 pb-1 pl-4 pr-4 hover:bg-green-400 hover:text-white mt-2">Check Out</Button>
  </div>
  <ConfirmDialogModal :show="condfirmationModal" @close="condfirmationModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to remove this item?</template>
    <template #content>
      <p class="text-red-500">
        This action can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationModal = false" class="mr-2">
        Cancel
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="delete_">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Submit
      </Button>
    </template>
  </ConfirmDialogModal>
  <ConfirmDialogModal :show="condfirmationDeliveryModal" @close="condfirmationDeliveryModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to deliver this item/s?</template>
    <template #content>
      <p class="text-red-500">
        This action can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationDeliveryModal = false" class="mr-2">
        Cancel
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="delivery_">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Submit
      </Button>
    </template>
  </ConfirmDialogModal>
</template>