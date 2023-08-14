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

const specification = ref({});
const spec_name = ref("");
const spec_details = ref("");
const post_images = ref([]);

const form = useForm({
  name: "",
  description: {
    details: "",
    specification: {
      spec_title: "",
      spec_details: [],
    },
  },
  product_image: "",
  category: "",
  sale_discount: "",
  price: "",
  text_image: null,
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
      post_images.value = [];
    },
    onError: (error) => {
      alert("Error adding new product " + error);
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
      toast.error("Only 1 image can be selected");
      return;
    } else {
      for (const file of e.dataTransfer.files) {
        var objectURL = URL.createObjectURL(file);
        post_images.value.push(objectURL);
        form.text_image = file;
      }
    }
  } catch (error) {
    toast.error(error);
  }
};

const remove_image = (key) => {
  post_images.value.splice(key, 1);
  form.text_image = null;
};

const remove_spec = (key) => {
  form.description.specification.spec_details.splice(key, 1);
};

// const openFile = () => {
//     let hidden = document.getElementById("post_image");
//     hidden.click();
//     hidden.onchange = (e) => {
//         if (post_images.value.length + e.target.files.length > 1) {
//             toast.error("Only 1 image can be selected");
//             return;
//         } else {
//             for (let index = 0; index < e.target.files.length; index++) {
//                 post_images.value.push(
//                     window.URL.createObjectURL(e.target.files[index])
//                 );
//                 form.text_image = e.target.files[index];
//             }
//         }
//     };
// };

// const dragFile = (e) => {
//     e.preventDefault();
//     try {
//         if (e.dataTransfer.files.length > 1) {
//             toast.error("Only 1 image can be selected");
//             return;
//         }
//         else {
//             for (const file of e.dataTransfer.files) {

//                 var objectURL = URL.createObjectURL(file);
//                 post_images.value.push(objectURL);
//                 form.text_image = file;
//                 // post_images.value.push({fname:file.name, gsrc:objectURL,file:file})
//             }
//         }
//     } catch (error) {
//         toast.error(error);
//     }

// }
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

          <div class="grid grid-cols-3 gap-3">
            <button
              @click="open_modal_add"
              class="bg-yellow-400 text-sm font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
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
              class="bg-yellow-400 text-sm font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
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
              class="bg-yellow-400 text-sm font-bold mb-2 mt-5 rounded-lg p-2 hover:bg-yellow-500 flex gap-2 item-center justify-center"
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
            :categories="categories"
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
          <!-- <div class="col-span-12">
            <textarea
              class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Product description"
              v-model="form.description"
            >
            </textarea>
            <JetInputError :message="form.errors.description" class="mt-2" />
          </div> -->
          <!-- <div class="col-span-12">
            <Input type="text" label="Product remarks" v-model="form.remarks" />
            <JetInputError :message="form.errors.remarks" class="mt-2" />
          </div> -->
          <div class="col-span-12">
            <textarea
              class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Product description"
              v-model="form.description.details"
            >
            </textarea>
            <!-- <JetInputError
              :message="form.errors.description.details"
              class="mt-2"
            /> -->
          </div>
          <div class="col-span-12">
            <Input
              type="text"
              label="Specification title"
              v-model="form.description.specification.spec_title"
            />
            <!-- <JetInputError
              :message="form.errors.description.specification.spec_title"
              class="mt-2"
            /> -->
          </div>
          <div
            v-if="form.description.specification.spec_title != ''"
            class="col-span-3"
          >
            <Input
              type="text"
              label="Specification name"
              v-model="specification.spec_name"
            />
            <JetInputError :message="spec_name" class="mt-2" />
          </div>
          <div
            v-if="form.description.specification.spec_title != ''"
            class="col-span-6"
          >
            <Input
              type="text"
              label="Specification details"
              v-model="specification.spec_details"
            />
            <JetInputError :message="spec_details" class="mt-2" />
          </div>
          <div
            v-if="form.description.specification.spec_title != ''"
            class="col-span-3 flex flex-row  item-center"
          >
            <SecondaryButton
              @click="add_specification"
              class="bg-green-200  mt-2 hover:bg-green-400"
            >
              Add Specification
            </SecondaryButton>
          </div>
          <div
            v-if="
              form.description.specification.spec_details.length != 0 &&
              form.description.specification.spec_title != ''
            "
            class="col-span-12"
          >
            <div class="grid grid-cols-12 border p-2 gap-2">
              <template
                v-for="(spec, key) in form.description.specification
                  .spec_details"
                :key="key"
              >
                <div class="col-span-11 border-b-2">
                  <p>{{ key }}</p>
                  <p>{{ spec.spec_details }}</p>
                  <span>{{ spec.spec_name }}</span>
                </div>
                <div class="col-span-1">
                  <Button
                    class="bg-red-400 hover:bg-red-500 hover:text-white"
                    title="Remove spec"
                    @click="remove_spec"
                    >x</Button
                  >
                </div>
              </template>
            </div>
          </div>
          <div class="col-span-6">
            <Input type="number" label="Product price" v-model="form.price" />
            <JetInputError :message="form.errors.price" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input
              type="number"
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
          <div
            v-if="post_images == 0"
            class="col-span-12 flex items-center justify-center w-full mt-4"
            @dragover.prevent
            @drop.prevent
          >
            <label
              @drop="dragFile"
              @click="openFile"
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="post_image"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                class="hidden"
              />
            </label>
          </div>
          <div class="col-span-12 flex items-center justify-center mt-4">
            <template v-for="(image, key) in post_images" :key="key">
              <div class="w-auto mt-2 mx-auto lg:max-w-[20vmin] z-30">
                <div class="shadow-lg bg-white p-3">
                  <img
                    class="w-full max-h-[40vmin] object-cover"
                    :src="image"
                  />
                  <ul class="mt-3 flex justify-end flex-wrap">
                    <li>
                      <button
                        @click="remove_image(key)"
                        class="flex text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            class="text-red-500"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        <span class="text-red-500">Remove</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
          <!-- <div class="col-span-12">
            <Input type="text" label="Image" v-model="form.product_image" />
            <JetInputError :message="form.errors.product_image" class="mt-2" />
          </div> -->
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