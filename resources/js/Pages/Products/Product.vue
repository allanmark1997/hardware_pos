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
  "tax",
  "special_discount",
]);
const search = ref(props.search);
const category = ref(props.category);
const add_modal = ref(false);
const add_modal_category = ref(false);
const update_modal_category = ref(false);

const category_object = ref(false);

const specification = ref({});
const spec_name = ref("");
const spec_details = ref("");
const post_images = ref([]);
const addTaxModal = ref(false);
const updateTaxEditModal = ref(false);
const addSpecialModal = ref(false);
const updateSpecialModal = ref(false);
const action_modal = ref(false)

const form = useForm({
  name: "",
  barcode: "",
  description: {
    details: "",
    specification: {
      spec_title: "",
      spec_details: [],
    },
  },
  product_image: "",
  category: "",
  sale_discount: 0,
  price: "",
  text_image: null,
});

const form_cat = useForm({
  name: null,
});

const form_update_cat = useForm({
  name: null,
});

const form_tax = useForm({
  tax: "",
});

const form_tax_update = useForm({
  tax: "",
});

const form_special = useForm({
  discount: "",
});

const form_special_update = useForm({
  discount: "",
});

const add_product = () => {
  form.post(route("products.store"), {
    preserveScroll: true,
    onSuccess: () => {
      form.reset();
      toast.success("Product successfully added!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      open_modal_add();
      post_images.value = [];
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
  action_modal.value = false
};

const open_modal_add_category = () => {
  add_modal_category.value = !add_modal_category.value;
  action_modal.value = false
};
const open_modal_update_category = () => {
  update_modal_category.value = !update_modal_category.value;
  action_modal.value = false
};
const add_category = () => {
  form_cat.post(route("categories.store"), {
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
  form_update_cat.put(route("categories.update", category_object.value), {
    preserveScroll: true,
    onSuccess: () => {
      form_update_cat.reset();
      toast.success("Category successfully updated!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
};

const open_modal_add_tax = () => {
  addTaxModal.value = !addTaxModal.value;
  action_modal.value = false
};
const create_tax = () => {
  form_tax.post(route("taxes.store"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Tax successfully added!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form_tax.reset();
      open_modal_add_tax();
    },
  });
};

const open_modal_update_tax = () => {
  form_tax_update.tax = props.tax.tax ?? 0;
  updateTaxEditModal.value = !updateTaxEditModal.value;
};
const update_tax = () => {
  form_tax_update.post(route("taxes.update", { tax: props.tax }), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Tax successfully updated!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form_tax_update.reset();
      open_modal_update_tax();
    },
  });
};

const open_modal_add_special = () => {
  addSpecialModal.value = !addSpecialModal.value;
  action_modal.value = false
};
const create_special = () => {
  form_special.post(route("specials.store"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Special Discount successfully added!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      form_special.reset();
      open_modal_add_special();
    },
  });
};

const open_modal_update_special = () => {
  form_special_update.discount = props.special_discount.discount ?? 0;
  updateSpecialModal.value = !updateSpecialModal.value;
};
const update_special = () => {
  form_special_update.post(
    route("specials.update", { special: props.special_discount }),
    {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Special Discount successfully updated!", {
          autoClose: 1000,
          transition: toast.TRANSITIONS.FLIP,
          position: toast.POSITION.TOP_RIGHT,
        });
        form_special_update.reset();
        open_modal_update_special();
      },
    }
  );
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

const add_specification = () => {
  if (
    specification.value.spec_name == null ||
    specification.value.spec_name == ""
  ) {
    spec_name.value = "The specification name is required";
  } else if (
    specification.value.spec_details == null ||
    specification.value.spec_details == ""
  ) {
    spec_details.value = "The specification details is required";
  } else {
    spec_details.value = "";
    spec_name.value = "";
    form.description.specification.spec_details.push(specification.value);
    specification.value = {};
  }
};

const openFile = () => {
  let hidden = document.getElementById("post_image");
  hidden.click();
  hidden.onchange = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      post_images.value.push(window.URL.createObjectURL(e.target.files[index]));
      form.text_image = e.target.files[index];
    }
  };
};

const dragFile = (e) => {
  e.preventDefault();
  try {
    if (e.dataTransfer.files.length > 1) {
      // toast.error("Only 1 image can be selected");
      return;
    } else {
      for (const file of e.dataTransfer.files) {
        var objectURL = URL.createObjectURL(file);
        post_images.value.push(objectURL);
        form.text_image = file;
      }
    }
  } catch (error) {
    // toast.error(error);
  }
};

const remove_image = (key) => {
  post_images.value.splice(key, 1);
  form.text_image = null;
};

const remove_spec = (key) => {
  form.description.specification.spec_details.splice(key, 1);
};
</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <div class="flex justify-between">
        <h2 class="font-semibold text-lg text-gray-800 leading-tight">
          Products management
        </h2>
        <div class="-mt-4">
          <small class="font-semibold text-xs text-white border p-1 rounded-lg bg-green-400 flex gap-1">
            <Icon icon="tax" size="sm" />

            VAT: {{ props.tax?.tax }}%
          </small>
          <h2 class="font-semibold text-xs text-white border p-1 rounded-lg mt-1 bg-red-400 -mb-5 flex gap-1">
            <Icon icon="wheelchair" size="sm" />

            SD: {{ props.special_discount?.discount }}%
          </h2>
        </div>
      </div>
    </template>
    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex gap-2">
            <Input v-model="search" class="rounded-lg mb-2 w-[30vmin]" type="text" label="Search product"
              @keyup.enter="search_" />

            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-auto h-10 mt-5"
              v-model="category" @change="search_">
              <option selected value="">Choose a category</option>
              <template v-for="(category, key) in props.categories" :key="key">
                <option :value="category.id">{{ category.name }}</option>
              </template>
            </select>
            <button v-if="category || search" class="h-10 my-auto mt-5" @click="search_remove">
              <Icon icon="close_icon" size="sm" />
            </button>
          </div>
          <div class="">
            <button @click="action_modal = true"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-2 item-center flex">
                <Icon icon="option" size="sm" />

              </a>
            </button>
          </div>
          <!-- <div class="grid grid-cols-5 gap-2 ml-1">
            <button @click="open_modal_add"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-2 flex">
                <Icon icon="cart" size="sm" />
                <span>Add product</span>
              </a>
            </button>
            <button @click="open_modal_add_category"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-2 flex">
                <Icon icon="tag" size="sm" />
                <span>Add category</span>
              </a>
            </button>

            <button @click="open_modal_update_category"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-1 flex">
                <Icon icon="pencil" size="sm" />
                <span>Edit category</span>
              </a>
            </button>
            <button v-if="props.tax?.tax == undefined || props.tax?.tax == null" @click="open_modal_add_tax"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-1 flex">
                <Icon icon="tax" size="sm" />

                <span>Add Tax</span>
              </a>
            </button>
            <button v-if="props.tax?.tax != undefined || props.tax?.tax != null" @click="open_modal_update_tax"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-1 flex">
                <Icon icon="tax" size="sm" />

                <span>Edit Tax</span>
              </a>
            </button>
            <button v-if="props.special_discount?.discount == undefined ||
              props.special_discount?.discount == null
              " @click="open_modal_add_special"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-1 flex">
                <Icon icon="wheelchair" size="sm" />
                <span>Add Special Discount</span>
              </a>
            </button>
            <button v-if="props.special_discount?.discount != undefined ||
              props.special_discount?.discount != null
              " @click="open_modal_update_special"
              class="bg-yellow-400 text-sm lg:text-xs font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
              <a class="my-auto gap-1 flex">
                <Icon icon="wheelchair" size="sm" />
                <span>Edit Special Discount</span>
              </a>
            </button>
          </div> -->
        </div>

        <div class="mt-2 overflow-hidden">
          <ProductList :products="products" :search="search" :category="category" :categories="categories" :tax="tax"
            :special_discount="special_discount" />
        </div>
      </div>
    </div>
    <buttonGroup :show="action_modal" @close="action_modal = false" maxWidth="2xl">
      <template #title>Actions</template>
      <template #content>
        <div class="grid grid-cols-3 gap-3  ">
          <button @click="open_modal_add"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-2 flex">
              <Icon icon="cart" size="sm" />
              <span>Add product</span>
            </a>
          </button>
          <button @click="open_modal_add_category"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-2 flex">
              <Icon icon="tag" size="sm" />
              <span>Add category</span>
            </a>
          </button>

          <button @click="open_modal_update_category"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-1 flex">
              <Icon icon="pencil" size="sm" />
              <span>Edit category</span>
            </a>
          </button>
          <button v-if="props.tax?.tax == undefined || props.tax?.tax == null" @click="open_modal_add_tax"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-1 flex">
              <Icon icon="tax" size="sm" />

              <span>Add Tax</span>
            </a>
          </button>
          <button v-if="props.tax?.tax != undefined || props.tax?.tax != null" @click="open_modal_update_tax"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-1 flex">
              <Icon icon="tax" size="sm" />

              <span>Edit Tax</span>
            </a>
          </button>
          <button v-if="props.special_discount?.discount == undefined ||
            props.special_discount?.discount == null
            " @click="open_modal_add_special"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-1 flex">
              <Icon icon="wheelchair" size="sm" />
              <span>Add Special Discount</span>
            </a>
          </button>
          <button v-if="props.special_discount?.discount != undefined ||
            props.special_discount?.discount != null
            " @click="open_modal_update_special"
            class="bg-yellow-400 text-sm lg:text-xs font-bold  rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center">
            <a class="my-auto gap-1 flex">
              <Icon icon="wheelchair" size="sm" />
              <span>Edit Special Discount</span>
            </a>
          </button>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="action_modal=false" class="bg-green-200 mt-2 hover:bg-green-400">
          close
        </SecondaryButton>
      </template>
    </buttonGroup>

    <JetDialogModal :show="add_modal" @close="add_modal = false" maxWidth="2xl">
      <template #title> Add product here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="text" label="Enter product name" v-model="form.name" />
            <JetInputError :message="form.errors.name" class="mt-2" />
          </div>
          <div class="col-span-12">
            <Input type="text" label="Enter product barcode" v-model="form.barcode" />
            <JetInputError :message="form.errors.barcode" class="mt-2" />
          </div>

          <div class="col-span-12">
            <textarea
              class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Product description" v-model="form.description.details">
            </textarea>
            <!-- <JetInputError
              :message="form.errors.description.details"
              class="mt-2"
            /> -->
          </div>
          <div class="col-span-12">
            <Input type="text" label="Specification title" v-model="form.description.specification.spec_title" />
            <!-- <JetInputError
              :message="form.errors.description.specification.spec_title"
              class="mt-2"
            /> -->
          </div>
          <div v-if="form.description.specification.spec_title != ''" class="col-span-3">
            <Input type="text" label="Specification name" v-model="specification.spec_name" />
            <JetInputError :message="spec_name" class="mt-2" />
          </div>
          <div v-if="form.description.specification.spec_title != ''" class="col-span-6">
            <Input type="text" label="Specification details" v-model="specification.spec_details" />
            <JetInputError :message="spec_details" class="mt-2" />
          </div>
          <div v-if="form.description.specification.spec_title != ''" class="col-span-3 flex flex-row item-center">
            <SecondaryButton @click="add_specification" class="bg-green-200 mt-2 hover:bg-green-400">
              Add Specification
            </SecondaryButton>
          </div>
          <div v-if="form.description.specification.spec_details.length != 0 &&
            form.description.specification.spec_title != ''
            " class="col-span-12">
            <div class="grid grid-cols-12 border p-2 gap-2">
              <template v-for="(spec, key) in form.description.specification
                .spec_details" :key="key">
                <div class="col-span-11 border-b-2">
                  <p>{{ spec.spec_details }}</p>
                  <span>{{ spec.spec_name }}</span>
                </div>
                <div class="col-span-1">
                  <Button class="bg-red-400 hover:bg-red-500 hover:text-white" title="Remove spec"
                    @click="remove_spec(key)">x</Button>
                </div>
              </template>
            </div>
          </div>
          <div class="col-span-6">
            <Input type="number" label="Product price" v-model="form.price" />
            <JetInputError :message="form.errors.price" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input type="number" label="Product discount" v-model="form.sale_discount" />
            <JetInputError :message="form.errors.sale_discount" class="mt-2" />
          </div>
          <div class="col-span-12">
            <select
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full h-10 my-auto mt-5"
              v-model="form.category">
              <option selected value="">Choose a category</option>
              <template v-for="(category, key) in props.categories" :key="key">
                <option :value="category.id">{{ category.name }}</option>
              </template>
            </select>
            <JetInputError :message="form.errors.category" class="mt-2" />
          </div>
          <div v-if="post_images == 0" class="col-span-12 flex items-center justify-center w-full mt-4" @dragover.prevent
            @drop.prevent>
            <label @drop="dragFile" @click="openFile" for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="post_image" type="file" accept="image/png, image/gif, image/jpeg" class="hidden" />
            </label>
          </div>

          <div class="col-span-12 flex items-center justify-center mt-4">
            <template v-for="(image, key) in post_images" :key="key">
              <div class="w-auto mt-2 mx-auto lg:max-w-[20vmin] z-30">
                <div class="shadow-lg bg-white p-3">
                  <img class="w-full max-h-[40vmin] object-cover" :src="image" />
                  <ul class="mt-3 flex justify-end flex-wrap">
                    <li>
                      <button @click="remove_image(key)" class="flex text-gray-400 hover:text-gray-600">
                        <Icon icon="trash" size="sm" />
                        <span class="text-red-500">Remove</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
          <JetInputError :message="form.errors.text_image" class="mt-2 col-span-12" />
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="add_modal = false" class="mr-2 hover:bg-red-500">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400" @click="add_product">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>

    <JetDialogModal :show="add_modal_category" @close="add_modal_category = false" maxWidth="2xl">
      <template #title> Add category here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="text" label="Enter product category name" v-model="form_cat.name" />
            <JetInputError :message="form_cat.errors.name" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="add_modal_category = false" class="mr-2 hover:bg-red-400">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400" @click="add_category">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>

    <JetDialogModal :show="update_modal_category" @close="update_modal_category = false" maxWidth="2xl">
      <template #title> Update category here!</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-10">
            <Input type="text" label="Enter product category name" :disabled="form_update_cat.name == null"
              v-model="form_update_cat.name" />
            <JetInputError :message="form_update_cat.errors.name" class="mt-2" />
          </div>
          <div class="col-span-2 my-auto">
            <SecondaryButton @click="save_selected_category" class="mr-2 hover:bg-green-300 mt-4">
              Save
            </SecondaryButton>
          </div>
        </div>
        <div class="p-2 overflow-auto h-[380px]">
          <template v-for="(category, key) in props.categories" :key="key">
            <div
              class="flex justify-between border-2 border-gray-200 p-2 rounded-lg shadow-sm hover:border-gray-200 mb-1">
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
        <SecondaryButton @click="update_modal_category = false" class="mr-2 hover:bg-red-300">
          Close
        </SecondaryButton>
      </template>
    </JetDialogModal>
    <JetDialogModal :show="addTaxModal" @close="addTaxModal = false" maxWidth="2xl">
      <template #title> Add new tax</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="number" label="Value added tax" v-model="form_tax.tax" />
            <JetInputError :message="form_tax.errors.tax" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="addTaxModal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form_tax.processing }" :disabled="form_tax.processing"
          class="bg-green-200 hover:bg-green-400" @click="create_tax">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>
    <JetDialogModal :show="updateTaxEditModal" @close="updateTaxEditModal = false" maxWidth="2xl">
      <template #title> Update tax</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="number" label="Value added tax" v-model="form_tax_update.tax" />
            <JetInputError :message="form_tax_update.errors.tax" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="updateTaxEditModal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form_tax.processing }" :disabled="form_tax.processing"
          class="bg-green-200 hover:bg-green-400" @click="update_tax">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>
    <JetDialogModal :show="addSpecialModal" @close="addSpecialModal = false" maxWidth="2xl">
      <template #title> Add new Special Discount</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="number" label="Special discount" v-model="form_special.discount" />
            <JetInputError :message="form_special.errors.discount" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="addSpecialModal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form_special.processing }" :disabled="form_special.processing"
          class="bg-green-200 hover:bg-green-400" @click="create_special">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>
    <JetDialogModal :show="updateSpecialModal" @close="updateSpecialModal = false" maxWidth="2xl">
      <template #title> Update Special Discount</template>
      <template #content>
        <div class="grid grid-cols-12 gap-1">
          <div class="col-span-12">
            <Input type="number" label="Special discount" v-model="form_special_update.discount" />
            <JetInputError :message="form_special_update.errors.discount" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="updateSpecialModal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form_special_update.processing }" :disabled="form_special_update.processing"
          class="bg-green-200 hover:bg-green-400" @click="update_special">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Submit
        </Button>
      </template>
    </JetDialogModal>
  </AppLayout>
</template>