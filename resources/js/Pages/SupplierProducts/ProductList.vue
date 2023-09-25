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

const props = defineProps(["products", "search", "category", "categories","product_lists",
  "suppliers",]);
const condfirmationModal = ref(false);
const post_images = ref([]);
const specification = ref({});
const spec_name = ref("");
const spec_details = ref("");
const detailModal = ref(false);

const update_modal = ref(false)

const search_results_products_to_add = ref(false);
const search_results_suppliers_to_add = ref(false);

const detailModalData = ref({
  ProdTitle: "",
  ProdSpec: "",
  ProdDetail: "",
  ProdIMG: "",
});

const form = useForm({
  product: false,
  product_id: "",
  product_name: "",
  supplier_id: "",
  supplier_name: "",
  category: "",
  price: "",
});

const update_open_product = (product) => {
  form.product = product
  form.product_id = product.product.id
  form.product_name = product.product.name
  form.supplier_id = product.supplier_id
  form.supplier_name = product.supplier.supplier_name
  form.category = product.supplier_category_id
  form.price = product.price.price
  update_modal.value =! update_modal.value
}

const update_product = () => {
  if(form.product_id == 0 || form.product_id == "" || form.product_id == null){
    toast.error("Looks like there's no product selected, please select first", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
  }
  else if(form.supplier_id == 0 || form.supplier_id == "" || form.supplier_id == null){
    toast.error("Looks like there's no supplier selected, please select first", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
  }
  else{
    form.put(route("supplier_products.update", {product:form.product}), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Product successfully amended!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      update_modal.value = false;
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
  }
  
};

const openDetails = (detail, title, specs, img) => {
  detailModal.value = !detailModal.value;
  detailModalData.value.ProdTitle = title;
  detailModalData.value.ProdDetail = detail;
  detailModalData.value.ProdSpec = specs;
  detailModalData.value.ProdIMG = img;
};

const function_open_modal_confirmation = (product) => {
  form.product = product;
  condfirmationModal.value = !condfirmationModal.value;
};

const remove_product = () => {
  form.post(route("supplier_products.remove", form.product), {
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
const date_time_now = (data) => {
  return moment(data).fromNow();
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
          <div
            v-else
            class="p-4 md:w-1/4"
            v-for="(product, index) in products.data"
            :key="index"
          >
            <div
              class="h-full border-2 border-gray-100 shadow-md rounded-lg overflow-hidden group"
            >
              <div class="relative">
                <img
                  v-if="product.product.product_image"
                  class="lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100"
                  :src="product.product.product_image"
                  :alt="product.product.name"
                />
                <img
                  v-if="!product.product.product_image"
                  class="lg:h-36 md:h-36 w-full object-scale-down object-center bg-gray-100"
                  src="https://dummyimage.com/720x400"
                  :alt="product.product.name"
                />
                <div
                  class="absolute hidden group-hover:block top-0 right-0 text-white p-2 rounded"
                >
                  <button
                    @click="function_open_modal_confirmation(product)"
                    class="p-2 bg-orange-400 rounded-lg hover:bg-orange-600 w-auto mt-2 mr-2"
                    title="Send to order list"
                  >
                    <Icon icon="shopping_bag" size="sm" />
                  </button>
                  <button
                    @click="
                      openDetails(
                        product.product.description.details,
                        product.product.name,
                        product.product.description.specification,
                        product.product.product_image
                      )
                    "
                    class="p-2 bg-gray-400 rounded-lg hover:bg-gray-600 mr-2 w-auto"
                  >
                    <Icon icon="docs" />
                  </button>
                  <button
                    @click="update_open_product(product)"
                    class="p-2 bg-orange-400 rounded-lg hover:bg-orange-600 w-auto mt-2 mr-2"
                    title="Update product"
                  >
                    <Icon icon="pencil" size="sm" />
                  </button>
                  <button
                    @click="function_open_modal_confirmation(product)"
                    class="p-2 bg-red-400 rounded-lg hover:bg-red-600 w-auto mt-2"
                  >
                    <Icon icon="trash" size="sm" />
                  </button>
                </div>
              </div>

              <div class="flex justify-between -mt-5 relative">
                <!-- <h2
                  class="tracking-widest text-sm title-font font-bold bg-yellow-500 bg-white rounded-lg p-1"
                >
                  Stocks: {{ product.product.quantity }}
                </h2> -->
                <!-- <h2
                  class="tracking-widest text-sm title-font font-bold bg-red-500 rounded-lg p-1"
                >
                  <span class="text-white"
                    >Discount:
                    {{ product.product.current_discount.discount }}%</span
                  >
                </h2> -->
              </div>
              <div class="p-4">
                <h1
                  class="title-font text-lg capitalize font-bold text-gray-900 mt-2"
                >
                  {{ product.product.name }}
                  <span
                    v-if="product.product.quantity == 0"
                    class="italic text-xs text-red-500"
                    >- (Out of stocks)</span
                  >
                </h1>
                <h2
                  class="tracking-widest text-lg title-font font-bold text-gray-500"
                >
                  {{ convert_money(product.price.price) }}
                </h2>

                <svg
                  class="barcode w-[20vmin] h-[10vmin] mx-auto"
                  jsbarcode-format="CODE128"
                  :jsbarcode-value="product.product.barcode"
                  jsbarcode-textmargin="0"
                  jsbarcode-fontoptions="bold"
                ></svg>
                <div class="flex gap-2">
                  <Icon icon="store" size="md" />
                  <p class="leading-relaxed text-xs flex gap-2 mb-2">
                    <img
                      class="w-10 h-10 rounded-full"
                      :src="product.supplier.image"
                      :alt="product.supplier.supplier_name"
                    />
                    {{ product.supplier.supplier_name }}
                  </p>
                </div>
                <p class="leading-relaxed text-xs flex gap-2 mb-2">
                  <Icon icon="administrator" size="md" />
                  <img
                    class="w-8 h-8 rounded-full"
                    :src="product.product.user.profile_photo_url"
                    :alt="product.product.user.name"
                  />
                  {{ product.product.user.name }}
                </p>
                <div class="gap-1">
                  <p
                    class="flex leading-relaxed text-xs break-words"
                    :title="date_time_now(product.updated_at)"
                  >
                    <Icon class="mr-1" icon="clock" size="sm" />
                    <time class="ml-1">{{
                      date_time_now(product.updated_at)
                    }}</time>
                  </p>
                  <p
                    class="flex leading-relaxed mt-2 mb-1 text-xs break-words"
                    :title="date_time(product.created_at)"
                  >
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
          <Pagination2
            :links="props.products.links"
            :search="props.search"
            :category="category"
          />
          <p class="mt-6 text-sm text-gray-500">
            Showing {{ products.data.length }} Products
          </p>
        </div>
      </div>
    </section>
  </div>
  <ConfirmDialogModal
    :show="condfirmationModal"
    @close="condfirmationModal = false"
    maxWidth="2xl"
  >
    <template #title>
      Are you sure you want to remove this product({{
        form.product.product.name
      }})?</template
    >
    <template #content>
      <p class="text-red-500">
        This action can update the system and this is not reversible!
      </p>
    </template>
    <template #footer>
      <SecondaryButton @click="condfirmationModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400"
        @click="remove_product"
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
  </ConfirmDialogModal>

  <JetDialogModal
    :show="detailModal"
    @close="detailModal = false"
    maxWidth="2xl"
  >
    <template #title>{{ detailModalData.ProdTitle }}</template>
    <template #content>
      <div class="grid grid-cols-5">
        <div
          id="imageContent"
          class="border-r border-yellow-500 col-span-2 p-2"
        >
          <img class="rounded-lg max-w-sx" :src="detailModalData.ProdIMG" />
          <p
            class="text-gray-900 font-bold uppercase text-yellow-700 mt-5 mb-1"
          >
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

  <JetDialogModal :show="update_modal" @close="update_modal = false" maxWidth="2xl">
      <template #title> Update product here!</template>
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
              @click="search_results_products_to_add = true"
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
          @click="(update_modal = false), (form.reset())"
          class="mr-2 hover:bg-red-500"
        >
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          class="bg-green-200 hover:bg-green-400"
          @click="update_product"
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
</template>