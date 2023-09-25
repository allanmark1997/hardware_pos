<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import ProductList from "./ProductList.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Input2 from "@/Components/InputCustom.vue";
import JetInputError from "@/Components/InputError.vue";
import Input from "@/Components/Input.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import Icon from "@/Components/Icon.vue";
import buttonGroup from "@/Components/buttonGroup.vue";

import { onMounted, ref } from "vue";
import { router, useForm } from "@inertiajs/vue3";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps([
  "products",
  "search",
  "categories",
  "category",
  "product_lists",
  "suppliers",
]);
const search = ref(props.search);
const category = ref(props.category);
const add_modal = ref(false);
const add_modal_category = ref(false);
const update_modal_category = ref(false);

const category_object = ref(false);

const post_images = ref([]);
const addTaxModal = ref(false);
const updateTaxEditModal = ref(false);
const addSpecialModal = ref(false);
const updateSpecialModal = ref(false);
const action_modal = ref(false);

const search_results_products_to_add = ref(false);
const search_results_suppliers_to_add = ref(false);

const form = useForm({
  product_id: "",
  product_name: "",
  supplier_id: "",
  supplier_name: "",
  category: "",
  price: "",
});

const form_cat = useForm({
  name: null,
});

const form_update_cat = useForm({
  name: null,
});

const add_product = () => {
  form.post(route("supplier_products.store"), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      toast.success("Product successfully added!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      open_modal_add();
    },
    onError: (error) => {
      toast.error("Something went wrong " + error, {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
};

const open_modal_add = () => {
  add_modal.value = !add_modal.value;
  action_modal.value = false;
};

const open_modal_add_category = () => {
  add_modal_category.value = !add_modal_category.value;
  action_modal.value = false;
};
const open_modal_update_category = () => {
  update_modal_category.value = !update_modal_category.value;
  action_modal.value = false;
};
const add_category = () => {
  form_cat.post(route("supplier_categories.store"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Successfully added category!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form_cat.reset();
      open_modal_add_category();
    },
    onError: (error) => {
      toast.error("Something went wrong " + error, {
        error: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
};

const update_selected_category = (category) => {
  category_object.value = category;
  form_update_cat.name = category.name;
};
const save_selected_category = () => {
  form_update_cat.put(
    route("supplier_categories.update", category_object.value),
    {
      preserveScroll: true,
      onSuccess: () => {
        form_update_cat.reset();
        toast.success("Category successfully updated!", {
          autoClose: 1000,
          transition: toast.TRANSITIONS.FLIP,
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );
};

const search_ = () => {
  router.get(
    route("supplier_products.index", {
      search: search.value,
      category: category.value,
    })
  );
};
const search_remove = () => {
  router.get(
    route("supplier_products.index", {
      search: null,
      category: null,
    })
  );
};

const open_search_product = () => {
  search_results_products_to_add.value = !search_results_products_to_add.value;
};
</script>
<template>
  <AppLayout title="Supplier Products">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">
          Supplier Products
        </h2>
      </div>
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
              <Icon icon="close_icon" size="sm" />
            </button>
          </div>
          <div class="">
            <button
              @click="action_modal = true"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
            >
              <a class="my-auto gap-2 item-center flex">
                <Icon icon="option" size="sm" />
              </a>
            </button>
          </div>
        </div>

        <div class="mt-2 overflow-hidden">
          <ProductList
            :products="products"
            :search="search"
            :category="category"
            :categories="categories"
            :product_lists="product_lists"
            :suppliers="suppliers"
          />
        </div>
      </div>
    </div>
    <buttonGroup
      :show="action_modal"
      @close="action_modal = false"
      maxWidth="2xl"
    >
      <template #title>Actions</template>
      <template #content>
        <div class="grid grid-cols-3 gap-3">
          <button
            @click="open_modal_add"
            class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
          >
            <a class="my-auto gap-2 flex">
              <Icon icon="cart" size="sm" />
              <span>Add product</span>
            </a>
          </button>
          <button
            @click="open_modal_add_category"
            class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
          >
            <a class="my-auto gap-2 flex">
              <Icon icon="tag" size="sm" />
              <span>Add category</span>
            </a>
          </button>

          <button
            @click="open_modal_update_category"
            class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
          >
            <a class="my-auto gap-1 flex">
              <Icon icon="pencil" size="sm" />
              <span>Edit category</span>
            </a>
          </button>
          
          <a
            :href="route('products.export')"
            class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
          >
            <a class="my-auto gap-1 flex">
              <Icon icon="report" size="sm" />
              <span>Export Inventory</span>
            </a>
          </a>
        </div>
      </template>
      <template #footer>
        <SecondaryButton
          @click="action_modal = false"
          class="bg-green-200 mt-2 hover:bg-green-400"
        >
          close
        </SecondaryButton>
      </template>
    </buttonGroup>

    <JetDialogModal :show="add_modal" @close="add_modal = false" maxWidth="2xl">
      <template #title> Add product here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-6">
            <Input
              type="text"
              label="Product name view"
              v-model="form.product_name"
              disabled
            />
            <JetInputError :message="form.errors.product_id" class="mt-2" />
          </div>
          <div class="col-span-5">
            <Input
              :disabled="search_results_products_to_add != true"
              type="text"
              label="Search product name"
              v-model="form.product_name"
            />
            <div
              v-if="search_results_products_to_add == true"
              class="absolute z-50 w-60 bg-white rounded shadow"
            >
              <ul
                class="overflow-y-auto py-1 h-[20vmin] text-gray-700"
                aria-labelledby="dropdownUsersButton"
              >
                <li v-for="(product, index) in product_lists" :key="index">
                  <a
                    v-if="
                      product.name
                        .toLowerCase()
                        .includes(form.product_name.toLowerCase())
                    "
                    class="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    @click="
                      (form.product_name = product.name),
                        (form.product_id = product.id),
                        (search_results_products_to_add = false)
                    "
                  >
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      :src="product.product_image"
                    />
                    {{ product.name }}
                  </a>
                </li>
              </ul>
              <div class="flex justify-center">
                <small>Results</small>
              </div>
              <a
                @click="
                  (search_results_products_to_add = false),
                    (form.product_name = ''),
                    (form.product_id = false)
                "
                class="flex items-center p-3 text-sm font-medium text-blue-600 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 hover:underline"
              >
                clear search
              </a>
            </div>
          </div>
          <div class="col-span-1 my-auto flex">
            <button
              v-if="form.product_id"
              class="h-10 my-auto mt-5"
              @click="
                (search_results_products_to_add = false),
                  (form.product_name = ''),
                  (form.product_id = false)
              "
            >
              <Icon icon="close_icon" size="sm" />
            </button>
            <button
              @click="open_search_product"
              class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center mt-4"
            >
              <Icon icon="search_icon" size="sm" />
            </button>
          </div>

          <div class="col-span-6">
            <Input
              type="text"
              label="Supplier name view"
              v-model="form.supplier_name"
              disabled
            />
            <JetInputError :message="form.errors.supplier_id" class="mt-2" />
          </div>
          <div class="col-span-5">
            <Input
              :disabled="search_results_suppliers_to_add != true"
              type="text"
              label="Search supplier's name"
              v-model="form.supplier_name"
            />
            <div
              v-if="search_results_suppliers_to_add == true"
              class="absolute z-50 w-60 bg-white rounded shadow"
            >
              <ul
                class="overflow-y-auto py-1 h-[20vmin] text-gray-700"
                aria-labelledby="dropdownUsersButton"
              >
                <li v-for="(supplier, index) in suppliers" :key="index">
                  <a
                    v-if="
                      supplier.supplier_name
                        .toLowerCase()
                        .includes(form.supplier_name.toLowerCase())
                    "
                    class="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    @click="
                      (form.supplier_name = supplier.supplier_name),
                        (form.supplier_id = supplier.id),
                        (search_results_suppliers_to_add = false)
                    "
                  >
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      :src="supplier.image"
                    />
                    {{ supplier.supplier_name }}
                  </a>
                </li>
              </ul>
              <div class="flex justify-center">
                <small>Results</small>
              </div>
              <a
                @click="
                  (search_results_suppliers_to_add = false),
                    (form.supplier_name = ''),
                    (form.supplier_id = false)
                "
                class="flex items-center p-3 text-sm font-medium text-blue-600 bg-gray-50 border-t border-gray-200 hover:bg-gray-100 hover:underline"
              >
                clear search
              </a>
            </div>
          </div>
          <div class="col-span-1 my-auto flex">
            <button
              v-if="form.supplier_id"
              class="h-10 my-auto mt-5"
              @click="
                (search_results_suppliers_to_add = false),
                  (form.supplier_name = ''),
                  (form.supplier_id = false)
              "
            >
              <Icon icon="close_icon" size="sm" />
            </button>
            <button
              @click="search_results_suppliers_to_add = true"
              class="bg-yellow-400 text-sm lg:text-xs font-bold rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center mt-4"
            >
              <Icon icon="search_icon" size="sm" />
            </button>
          </div>

          <div class="col-span-full">
            <Input type="number" label="Product price" v-model="form.price" />
            <JetInputError :message="form.errors.price" class="mt-2" />
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
          <template v-for="(category, key) in categories" :key="key">
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
                <Icon icon="pencil" size="sm" />
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