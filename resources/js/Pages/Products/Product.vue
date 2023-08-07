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
const update_modal_category = ref(false);

const category_object = ref(false);

const form = useForm({
  name: "",
  description: "",
  remarks: "",
  product_image: "",
  category: "",
  sale_discount: "",
  price: "",
});

const form_cat = useForm({
  name: null,
});

const form_update_cat = useForm({
  name: null,
});

const add_product = () => {
  form.post(route("products.store"), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      alert("Successfully added product");
      open_modal_add();
    },
    onError: (error) => {
      alert("Error adding new product");
    },
  });
};

const open_modal_add = () => {
  add_modal.value = !add_modal.value;
};

const open_modal_add_category = () => {
  add_modal_category.value = !add_modal_category.value;
};
const open_modal_update_category = () => {
  update_modal_category.value = !update_modal_category.value;
};
const add_category = () => {
  form_cat.post(route("categories.store"), {
    preserveScroll: true,
    onSuccess: () => {
      alert("Successfully added category");
      form_cat.reset();
      open_modal_add_category();
    },
    onError: (error) => {
      alert("Error adding new category");
    },
  });
};

const update_selected_category = (category) => {
  category_object.value = category;
  form_update_cat.name = category.name;
};
const save_selected_category = () => {
  // temp_data_categories.value[temp_data_selected_category_id.value - 1]["name"] =
  //   temp_data_selected_category.value;

  form_update_cat.put(route("categories.update", category_object.value), {
    preserveScroll: true,
    onSuccess: () => {
      form_update_cat.reset();
      // alert("Updated selected category");
    },
  });
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

            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-auto h-10 mt-5"
              v-model="category"
              @change="search_"
            >
              <option selected value="">Choose a category</option>
              <template v-for="(category, key) in props.categories" :key="key">
                <option :value="category.id">{{ category.name }}</option>
              </template>
            </select>
            <button
              v-if="category || search"
              class="h-10 my-auto mt-5"
              @click="search_remove"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 text-red-500 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          <div class="flex gap-2">
            <button
              @click="open_modal_add"
              class="bg-yellow-400 text-sm font-bold p-2 mb-2 mt-5 rounded-lg w-[20vmin] hover:bg-yellow-500"
            >
              <a class="my-auto gap-2 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                <span>Add product</span>
              </a>
            </button>
            <button
              @click="open_modal_add_category"
              class="bg-yellow-400 text-sm font-bold mb-2 mt-5 rounded-lg w-[20vmin] hover:bg-yellow-500 flex gap-2 item-center justify-center"
            >
              <a class="my-auto gap-2 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 6h.008v.008H6V6z"
                  />
                </svg>
                <span>Add category</span>
              </a>
            </button>

            <button
              @click="open_modal_update_category"
              class="bg-yellow-400 text-sm font-bold p-2 mb-2 mt-5 rounded-lg w-[20vmin] hover:bg-yellow-500"
            >
              <a class="my-auto gap-1 flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>

                <span>Edit category</span>
              </a>
            </button>
          </div>
        </div>

        <div class="mt-2 overflow-hidden">
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
            <JetInputError :message="form.errors.name" class="mt-2" />
          </div>
          <div class="col-span-12">
            <textarea
              class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Product description"
              v-model="form.description"
            >
            </textarea>
            <JetInputError :message="form.errors.description" class="mt-2" />
          </div>
          <div class="col-span-12">
            <Input type="text" label="Product remarks" v-model="form.remarks" />
            <JetInputError :message="form.errors.remarks" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input type="text" label="Product price" v-model="form.price" />
            <JetInputError :message="form.errors.price" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input
              type="text"
              label="Product discount"
              v-model="form.sale_discount"
            />
            <JetInputError :message="form.errors.sale_discount" class="mt-2" />
          </div>
          <div class="col-span-12">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full h-10 my-auto mt-5"
              v-model="form.category"
            >
              <option selected value="">Choose a category</option>
              <template v-for="(category, key) in props.categories" :key="key">
                <option :value="category.id">{{ category.name }}</option>
              </template>
            </select>
            <JetInputError :message="form.errors.category" class="mt-2" />
          </div>
          <div class="col-span-12">
            <Input type="text" label="Image" v-model="form.product_image" />
            <JetInputError :message="form.errors.product_image" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton
          @click="add_modal = false"
          class="mr-2 hover:bg-red-500"
        >
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400"
          @click="add_product"
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
            <JetInputError :message="form_cat.errors.name" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton
          @click="add_modal_category = false"
          class="mr-2 hover:bg-red-400"
        >
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400"
          @click="add_category"
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
      :show="update_modal_category"
      @close="update_modal_category = false"
      maxWidth="2xl"
    >
      <template #title> Update category here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-10">
            <Input
              type="text"
              label="Enter product category name"
              :disabled="form_update_cat.name == null"
              v-model="form_update_cat.name"
            />
            <JetInputError
              :message="form_update_cat.errors.name"
              class="mt-2"
            />
          </div>
          <div class="col-span-2 my-auto">
            <SecondaryButton
              @click="save_selected_category"
              class="mr-2 hover:bg-green-300 mt-4"
            >
              Save
            </SecondaryButton>
          </div>
        </div>
        <div class="p-2 overflow-auto h-[380px]">
          <template v-for="(category, key) in props.categories" :key="key">
            <div
              class="flex justify-between border-2 border-gray-200 p-2 rounded-lg shadow-sm hover:border-gray-200 mb-1"
            >
              <div>
                <p class="">
                  {{ category.name }}
                </p>
                <small> Category name </small>
              </div>
              <button @click="update_selected_category(category)" class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 text-yellow-500"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            </div>
          </template>
        </div>
      </template>
      <template #footer>
        <SecondaryButton
          @click="update_modal_category = false"
          class="mr-2 hover:bg-red-300"
        >
          Close
        </SecondaryButton>
      </template>
    </JetDialogModal>
  </AppLayout>
</template>