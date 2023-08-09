<script setup>
import moment from "moment";
import Pagination2 from "@/Components/Pagination2.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import JetInputError from "@/Components/InputError.vue";
import Input from "@/Components/Input.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import Icon from "@/Components/Icon.vue";

import { ref } from "vue";
import { router, useForm } from "@inertiajs/vue3";

const props = defineProps(["products", "search", "category", "categories"]);
const condfirmationModal = ref(false);
const updateModal = ref(false);

const form = useForm({
  product: false,
});

const form_update = useForm({
  product: false,
  name: "",
  description: {},
  product_image: "",
  category: "",
  sale_discount: "",
  price: "",
});

const function_open_modal_confirmation = (product) => {
  form.product = product;
  condfirmationModal.value = !condfirmationModal.value;
};

const function_open_modal_update = (product) => {
  form_update.product = product;
  form_update.name = product.name;
  form_update.description = product.description;
  form_update.remarks = product.remarks;
  form_update.category = product.category_id;
  form_update.sale_discount = product.current_discount.discount;
  form_update.price = product.current_price.price;
  updateModal.value = !updateModal.value;
};

const remove_product = () => {
  form.put(route("products.remove", form.product), {
    preserveScroll: true,
    onSuccess: () => {
      alert("Product removed");
      condfirmationModal.value = false;
      form.reset();
    },
    onError: (error) => {
      alert("Something went wrong " + error);
    },
  });
};

const update_product = () => {
  form_update.post(route("products.update", form_update.product), {
    preserveScroll: true,
    onSuccess: () => {
      alert("Product update");
      updateModal.value = false;
      form_update.reset();
    },
    onError: (error) => {
      alert("Something went wrong " + error);
    },
  });
};

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
          <div v-else class="p-4 md:w-1/4" v-for="(product, index) in products.data" :key="index">
            <div class="h-full border-2 border-gray-100 shadow-md rounded-lg overflow-hidden group">
              <div class="relative">
                <img v-if="product.product_image"
                  class="lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100" :src="product.product_image"
                  :alt="product.name" />
                <img v-if="!product.product_image"
                  class="lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100"
                  src="https://dummyimage.com/720x400" :alt="product.name" />
                <div class="absolute hidden group-hover:block top-0 right-0 text-white p-2 rounded">
                  <button @click="function_open_modal_update(product)"
                    class="p-2 bg-yellow-400 rounded-lg hover:bg-yellow-600 mr-2 w-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button @click="function_open_modal_confirmation(product)"
                    class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex justify-between -mt-5 relative">
                <h2 class="tracking-widest text-sm title-font font-bold bg-yellow-500 bg-white rounded-lg p-1">
                  Stocks: {{ product.quantity }}
                </h2>
                <h2 class="tracking-widest text-sm title-font font-bold bg-red-500 rounded-lg p-1">
                  <span class="text-white">Discount: {{ product.current_discount.discount }}%</span>
                </h2>
              </div>
              <div class="p-4">
                <h1 class="title-font text-lg capitalize font-bold text-gray-900 -mt-2">
                  {{ product.name }}
                  <span v-if="product.quantity == 0" class="italic text-xs text-red-500">- (Out of stocks)</span>
                </h1>

                <h2 class="tracking-widest text-lg title-font font-bold text-gray-500 mb-2">
                  {{ convert_money(product.current_price.price) }}
                </h2>

                <p class="leading-relaxed mb-1 text-xs break-words">
                  <span class="font-bold text-sm">Description: </span>
                  {{ product.description.details }}
                </p>
                <p class="leading-relaxed mb-1 text-xs break-words">
                  <span class="font-bold text-sm ">
                    {{ product.description.specification.spec_title }}
                  </span>
                </p>
                <div class="grid grid-cols-12 gap-1 mb-2">
                  <template v-for="(specification, key) in product.description.specification.spec_details" :key="key">
                  <div class="col-span-6 text-xs">
                    <p class="break-words">{{ specification.spec_details }}</p>
                    <p class="font-bold break-words italic">{{ specification.spec_name }}</p>
                  </div>
                  </template>
                </div>
                <!-- <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Current Price: </span> {{
                  convert_money(product.current_price.price) }}</p>
                <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Sale Discount: </span> {{
                  product.current_discount.discount }}%</p>
                <p class="leading-relaxed mb-3"><span class="font-bold text-sm">Quantity: </span> {{ product.quantity }}
                </p> -->
                <p class="leading-relaxed text-xs flex gap-2 mb-2">
                  <img class="w-6 h-6 rounded-full" :src="product.user.profile_photo_url" :alt="product.user.name" />
                  {{ product.user.name }}
                </p>
                <div class="flex">
                  <p class="flex leading-relaxed text-xs break-words" :title="date_time(product.updated_at)">
                    <!--<span class="font-bold text-xs">Updated at: </span>-->
                    <Icon icon="calendar_minus" size="xs" />
                    {{ date_time(product.updated_at) }}
                  </p>
                  <p class="flex leading-relaxed mb-3 text-xs break-words" :title="date_time(product.created_at)">
                    <!-- <span class="font-bold text-xs">Created at: </span> -->
                    <Icon icon="calendar_plus" size="xs" />

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
          <Pagination2 :links="props.products.links" :search="props.search" :category="category" />
          <p class="mt-6 text-sm text-gray-500">
            Showing {{ products.data.length }} Products
          </p>
        </div>
      </div>
    </section>
  </div>
  <ConfirmDialogModal :show="condfirmationModal" @close="condfirmationModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to remove this product?</template>
    <template #content>
      <p class="text-red-500">
        This action can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="remove_product">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Submit
      </Button>
    </template>
  </ConfirmDialogModal>
  <JetDialogModal :show="updateModal" @close="updateModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to update this product?</template>
    <template #content>
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-12">
          <Input type="text" label="Enter product name" v-model="form_update.name" />
          <JetInputError :message="form_update.errors.name" class="mt-2" />
        </div>
        <div class="col-span-12">
          <textarea
            class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Product description" v-model="form_update.description">
          </textarea>
          <JetInputError :message="form_update.errors.description" class="mt-2" />
        </div>
        <div class="col-span-12">
          <Input type="text" label="Product remarks" v-model="form_update.remarks" />
          <JetInputError :message="form_update.errors.remarks" class="mt-2" />
        </div>
        <div class="col-span-6">
          <Input type="number" label="Product price" v-model="form_update.price" />
          <JetInputError :message="form_update.errors.price" class="mt-2" />
        </div>
        <div class="col-span-6">
          <Input type="number" label="Product discount" v-model="form_update.sale_discount" />
          <JetInputError :message="form_update.errors.sale_discount" class="mt-2" />
        </div>
        <div class="col-span-12">
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full h-10 my-auto mt-5"
            v-model="form_update.category">
            <option selected value="">Choose a category</option>
            <template v-for="(category, key) in props.categories" :key="key">
              <option :value="category.id">{{ category.name }}</option>
            </template>
          </select>
          <JetInputError :message="form_update.errors.category" class="mt-2" />
        </div>
        <div class="col-span-12">
          <Input type="text" label="Image" v-model="form_update.product_image" />
          <JetInputError :message="form_update.errors.product_image" class="mt-2" />
        </div>
      </div>
    </template>
    <template #footer>
      <SecondaryButton @click="updateModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form_update.processing }" :disabled="form_update.processing"
        class="bg-green-200 hover:bg-green-400" @click="update_product">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Submit
      </Button>
    </template>
  </JetDialogModal>
</template>