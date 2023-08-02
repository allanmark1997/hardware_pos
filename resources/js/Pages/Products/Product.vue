<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import ProductList from "./ProductList.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Input2 from "@/Components/InputCustom.vue";
import JetInputError from "@/Components/InputError.vue";
import Input from "@/Components/Input.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import { ref } from "vue";
import { router, useForm } from "@inertiajs/vue3";

const props = defineProps(["products", "search", "categories", "category"]);
const search = ref(props.search);
const category = ref(props.category);
const add_modal = ref(false);
const add_modal_category = ref(false);

const form = useForm({
  name: "",
  description: "",
  remarks: "",
  product_image: [],
  quantity: 0,
  category: 0,
  sale_discount: 0,
  price: 0,
});

const form_cat = useForm({
  name: null,
});

const open_modal_add = () => {
  add_modal.value = !add_modal.value;
};

const open_modal_add_category = () => {
  add_modal_category.value = !add_modal_category.value;
};

const search_ = () => {
  router.get(
    route("products.index", { search: search.value, category: category.value })
  );
};
const search_remove = () => {
  search.value = "";
  category.value = "";
  router.get(
    route("products.index", { search: search.value, category: category.value })
  );
};
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        Products
      </h2>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex gap-2">
            <Input
              v-model="search"
              class="rounded-lg mb-2 w-[30vmin]"
              type="text"
              label="Search product"
              @keyup.enter="search_"
            />
            <button class="h-10 my-auto mt-5" @click="search_remove">
              <span class="bg-red-400 p-2 rounded-lg">x</span>
            </button>
            <label
              for="countries"
              class="block text-sm font-medium text-gray-900 w-auto my-auto"
              >Select an option</label
            >
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto h-10 my-auto"
              v-model="category"
              @change="search_"
            >
              <option selected value="">Choose a category</option>
              <template v-for="(category, key) in props.categories" :key="key">
                <option :value="category.id">{{ category.name }}</option>
              </template>
            </select>
          </div>

          <div class="flex gap-2">
            <button
              @click="open_modal_add"
              class="bg-yellow-300 p-2 mb-2 mt-5 rounded-lg w-[15vmin] hover:bg-yellow-500"
            >
              Add product
            </button>
            <button
              @click="open_modal_add_category"
              class="bg-yellow-300 p-2 mb-2 mt-5 rounded-lg w-[15vmin] hover:bg-yellow-500"
            >
              Add category
            </button>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <ProductList
            :products="products"
            :search="search"
            :category="category"
          />
        </div>
      </div>
    </div>

    <JetDialogModal :show="add_modal" @close="add_modal = false" maxWidth="2xl">
      <template #title> Add product here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="text" label="Enter product name" v-model="form.name" />
          </div>
          <div class="col-span-12">
            <textarea
              class="w-full h-[100px]"
              placeholder="Product description"
              v-model="form.description"
            >
            </textarea>
          </div>
          <div class="col-span-6">
            <Input type="text" label="Product remarks" v-model="form.remarks" />
          </div>
          <div class="col-span-6">
            <Input type="text" label="Product price" v-model="form.price" />
          </div>
          <div class="col-span-12">
            <Input type="text" label="Image" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="add_modal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400"
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
    </JetDialogModal>

    <JetDialogModal
      :show="add_modal_category"
      @close="add_modal_category = false"
      maxWidth="2xl"
    >
      <template #title> Add category here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input
              type="text"
              label="Enter product category name"
              v-model="form_cat.name"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="add_modal_category = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400"
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
    </JetDialogModal>
  </AppLayout>
</template>