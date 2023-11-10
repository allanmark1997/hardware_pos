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

import { ref, onMounted } from "vue";
import { router, useForm } from "@inertiajs/vue3";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps([
  "products",
  "search",
  "category",
  "categories",
  "tax",
  "special_discount",
]);
const condfirmationModal = ref(false);
const condfirmationBackOrderModal = ref(false);
const post_images = ref([]);
const specification = ref({});
const spec_name = ref("");
const spec_details = ref("");
const detailModal = ref(false);
const updateModal = ref(false);

const detailModalData = ref({
  ProdTitle: "",
  ProdSpec: "",
  ProdDetail: "",
  ProdIMG: "",
});

const form = useForm({
  product: false,
});

const form_back_order = useForm({
  product: false,
  quantity: 0,
  remarks: "",
});

const openDetails = (detail, title, specs, img) => {
  detailModal.value = !detailModal.value;
  detailModalData.value.ProdTitle = title;
  detailModalData.value.ProdDetail = detail;
  detailModalData.value.ProdSpec = specs;
  detailModalData.value.ProdIMG = img;
};

const form_update = useForm({
  product: false,
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

const function_open_modal_confirmation = (product) => {
  form.product = product;
  condfirmationModal.value = !condfirmationModal.value;
};

const function_open_modal_back_order = (product) => {
  form_back_order.product = product;
  condfirmationBackOrderModal.value = !condfirmationBackOrderModal.value;
};

const function_open_modal_update = (product) => {
  post_images.value = [];
  post_images.value.push(product.product_image);
  form_update.product = product;
  form_update.name = product.name;
  form_update.barcode = product.barcode;
  form_update.description = product.description;
  form_update.category = product.category_id;
  form_update.sale_discount = product.current_discount.discount;
  form_update.price = product.current_price.price;
  updateModal.value = !updateModal.value;
};

const remove_product = () => {
  form.put(route("products.remove", form.product), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Product successfully removed!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      condfirmationModal.value = false;
      form.reset();
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

const back_order = () => {
  if (
    form_back_order.product.quantity < form_back_order.quantity ||
    form_back_order.product.quantity == 0
  ) {
    toast.error(
      "Can't allow request, since the quantity inputed is above products stocks",
      {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  } else if (form_back_order.quantity <= 0) {
    toast.error(
      "Can't allow request, quantity is zero or negative",
      {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  }
  else {
    form_back_order.post(
      route("products.back_order", form_back_order.product),
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Product successfully send to back orders", {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
          condfirmationBackOrderModal.value = false;
          form_back_order.reset();
        },
        onError: (error) => {
          // toast.error("Something went wrong " + error, {
          //   autoClose: 1000,
          //   transition: toast.TRANSITIONS.FLIP,
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        },
      }
    );
  }
};

const update_product = () => {
  form_update.post(route("products.update", form_update.product), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Product successfully updated!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      updateModal.value = false;
      form_update.reset();
      // location.reload();
    },
    onError: (error) => {
      toast.error("Something went wrong!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
};

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

const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};
const date_time_now = (data) => {
  return moment(data).fromNow();
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
    form_update.description.specification.spec_details.push(
      specification.value
    );
    specification.value = {};
  }
};

const openFile = () => {
  let hidden = document.getElementById("post_image");
  hidden.click();
  hidden.onchange = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      post_images.value.push(window.URL.createObjectURL(e.target.files[index]));
      form_update.text_image = e.target.files[index];
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
        form_update.text_image = file;
      }
    }
  } catch (error) {
    // toast.error(error);
  }
};

const remove_image = (key) => {
  post_images.value.splice(key, 1);
  form_update.text_image = null;
  toast.success("Image removed.", {
    autoClose: 1000,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const remove_spec = (key) => {
  form_update.description.specification.spec_details.splice(key, 1);
  toast.success("Removed specification details.", {
    autoClose: 1000,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
};

const key_spec = ref(null);
const open_close_input_spec_update = ref(false);
const update_spec = (name, description, key) => {
  key_spec.value = key;
  specification.value.spec_name = name;
  specification.value.spec_details = description;
  open_close_input_spec_update.value = !open_close_input_spec_update.value;
};

const update_specification = () => {
  form_update.description.specification.spec_details[key_spec.value] =
    specification.value;
  specification.value = {};
  open_close_input_spec_update.value = !open_close_input_spec_update.value;
};
onMounted(() => {
  JsBarcode(".barcode").init();
});
</script>
<template>
  <div>
    <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5">
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
                  <button @click="
                    openDetails(
                      product.description.details,
                      product.name,
                      product.description.specification,
                      product.product_image
                    )
                    " class="p-2 bg-gray-400 rounded-lg hover:bg-gray-600 mr-2 w-auto">
                    <Icon icon="docs" />
                  </button>
                  <button @click="function_open_modal_update(product)"
                    class="p-2 bg-yellow-400 rounded-lg hover:bg-yellow-600 mr-2 w-auto">
                    <Icon icon="pencil" size="sm" />
                  </button>
                  <button @click="function_open_modal_back_order(product)"
                    class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mr-2 mt-2" title="Send to back orders">
                    <Icon icon="back_order" size="sm" />
                  </button>
                  <button @click="function_open_modal_confirmation(product)"
                    class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mt-2">
                    <Icon icon="trash" size="sm" />
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
                <h2 class="tracking-widest text-lg title-font font-bold text-gray-500">
                  {{
                    convert_money(
                      product.current_price.price -
                      product.current_price.price *
                      (product.current_discount.discount / 100)
                    )
                  }}<span v-if="product.current_price.price -
    (product.current_price.price -
      product.current_price.price *
      (product.current_discount.discount / 100)) !=
    0
    " class="text-xs text-red-400">({{
      convert_money(
        product.current_price.price -
        (product.current_price.price -
          product.current_price.price *
          (product.current_discount.discount / 100))
      )
    }}
                    less)</span>
                </h2>
                <h2 v-if="product.current_price.price -
                    product.current_price.price *
                    (product.current_discount.discount / 100) !=
                    product.current_price.price
                    "
                  class="tracking-widest text-sm title-font font-bold text-gray-500 mb-2 -mt-2 line-through decoration-red-700 decoration-double">
                  {{ convert_money(product.current_price.price) }}
                </h2>
                <!-- <svg
                  class="barcode w-[20vmin] h-[10vmin] mx-auto"
                  jsbarcode-format="CODE128"
                  :jsbarcode-value="product.barcode"
                  jsbarcode-textmargin="0"
                  jsbarcode-fontoptions="bold"
                ></svg> -->
                <p class="leading-relaxed text-xs flex gap-2 mb-2">
                  <img class="w-6 h-6 rounded-full" :src="product.user.profile_photo_url" :alt="product.user.name" />
                  {{ product.user.name }}
                </p>
                <div class="flex gap-1">
                  <p class="flex leading-relaxed text-xs break-words" :title="date_time_now(product.updated_at)">
                    <!--<span class="font-bold text-xs">Updated at: </span>-->
                    <Icon class="mr-1" icon="clock" size="sm" />
                    <time class="ml-1">{{
                      date_time_now(product.updated_at)
                    }}</time>
                  </p>
                  <p class="flex leading-relaxed mb-1 text-xs break-words" :title="date_time(product.created_at)">
                    <!-- <span class="font-bold text-xs">Created at: </span> -->
                    <Icon class="mr-1" icon="calendar_plus" size="xs" />
                    <time class="ml-1">{{
                      date_time(product.created_at)
                    }}</time>
                  </p>
                </div>
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
    <template #title>
      Are you sure you want to remove this product({{
        form.product.name
      }})?</template>
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

  <ConfirmDialogModal :show="condfirmationBackOrderModal" @close="condfirmationBackOrderModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to sent this product?</template>
    <template #content>
      <p class="text-red-500">
        This action can update the system and this is not reversible!
      </p>
      <Input type="number" label="Enter product quantity" v-model="form_back_order.quantity" />
      <JetInputError :message="form_back_order.errors.quantity" class="mt-2" />
      <Input type="text" label="Enter your remarks" v-model="form_back_order.remarks" />
      <JetInputError :message="form_back_order.errors.remarks" class="mt-2" />
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationBackOrderModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form_back_order.processing }" :disabled="form_back_order.processing"
        class="bg-green-200 hover:bg-green-400" @click="back_order">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Submit
      </Button>
    </template>
  </ConfirmDialogModal>

  <JetDialogModal :show="detailModal" @close="detailModal = false" maxWidth="2xl">
    <template #title>{{ detailModalData.ProdTitle }}</template>
    <template #content>
      <div class="grid grid-cols-5">
        <div id="imageContent" class="border-r border-yellow-500 col-span-2 p-2">
          <img class="rounded-lg max-w-sx" :src="detailModalData.ProdIMG" />
          <p class="text-gray-900 font-bold uppercase text-yellow-700 mt-5 mb-1">
            {{ detailModalData.ProdSpec.spec_title }}:
          </p>
          <div v-for="spec in detailModalData.ProdSpec.spec_details">
            <span class="font-bold"> {{ spec.spec_name }}: </span>
            <span>{{ spec.spec_details }}</span>
          </div>
        </div>
        <div id="textContent" class="col-span-3 p-2">
          <span class="font-bold mb-5 uppercase text-yellow-700">
            Details:<br />
          </span>
          <p class="text-gray-900 overflow-auto max-h-80">
            {{ detailModalData.ProdDetail }}
          </p>
        </div>
      </div>
    </template>
    <template #footer>
      <SecondaryButton @click="detailModal = false" class="mr-2">
        close
      </SecondaryButton>
    </template>
  </JetDialogModal>
  <JetDialogModal :show="updateModal" @close="updateModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to update this product?</template>
    <template #content>
      <div class="grid grid-cols-12 gap-1">
        <div class="col-span-12">
          <Input type="text" label="Enter product name" v-model="form_update.name" />
          <JetInputError :message="form_update.errors.name" class="mt-2" />
        </div>
        <div class="col-span-12">
          <Input type="text" label="Enter product barcode" v-model="form_update.barcode" />
          <JetInputError :message="form_update.errors.barcode" class="mt-2" />
        </div>
        <div class="col-span-12">
          <textarea
            class="w-full rounded-lg border-1 border-gray-300 h-[100px] focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="Product description" v-model="form_update.description.details">
          </textarea>
          <!-- <JetInputError
            :message="form_update.errors.description"
            class="mt-2"
          /> -->
        </div>
        <div class="col-span-12">
          <Input type="text" label="Product Specification title"
            v-model="form_update.description.specification.spec_title" />
          <!-- <JetInputError :message="form_update.errors.remarks" class="mt-2" /> -->
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == false
          " class="col-span-3">
          <Input type="text" label="Specification name" v-model="specification.spec_name" />
          <JetInputError :message="spec_name" class="mt-2" />
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == false
          " class="col-span-6">
          <Input type="text" label="Specification details" v-model="specification.spec_details" />
          <JetInputError :message="spec_details" class="mt-2" />
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == false
          " class="col-span-3 mx-auto mt-3">
          <SecondaryButton @click="add_specification" class="bg-green-200 hover:bg-green-400">
            Add Specification
          </SecondaryButton>
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == true
          " class="col-span-3">
          <Input type="text" label="Specification name" v-model="specification.spec_name" />
          <JetInputError :message="spec_name" class="mt-2" />
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == true
          " class="col-span-6">
          <Input type="text" label="Specification details" v-model="specification.spec_details" />
          <JetInputError :message="spec_details" class="mt-2" />
        </div>
        <div v-if="form_update.description.specification.spec_title != '' &&
          open_close_input_spec_update == true
          " class="col-span-3 mx-auto mt-3">
          <SecondaryButton @click="update_specification" class="bg-green-200 hover:bg-green-400">
            Update Specification
          </SecondaryButton>
        </div>
        <div v-if="form_update.description.specification.spec_details?.length != 0 &&
          form_update.description.specification?.spec_title != ''
          " class="col-span-12">
          <div class="grid grid-cols-12 border p-2 gap-2">
            <template v-for="(spec, key) in form_update.description.specification
              .spec_details" :key="key">
              <div class="col-span-10 border-b-2">
                <p>{{ spec.spec_details }}</p>
                <span>{{ spec.spec_name }}</span>
              </div>
              <div class="col-span-1">
                <Button class="bg-orange-400 hover:bg-orange-500 hover:text-white" title="Update spec"
                  @click="update_spec(spec.spec_name, spec.spec_details, key)">
                  <Icon icon="pencil" size="sm" />
                </Button>
              </div>
              <div class="col-span-1">
                <Button class="bg-red-400 hover:bg-red-500 hover:text-white ml-2" title="Remove spec"
                  @click="remove_spec(key)">x</Button>
              </div>
            </template>
          </div>
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path class="text-red-500" stroke-linecap="round" stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      <span class="text-red-500">Remove</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
        <JetInputError :message="form_update.errors.text_image" class="mt-2 col-span-12" />
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