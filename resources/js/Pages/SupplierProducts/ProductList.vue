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

const props = defineProps(["products", "search", "category", "categories"]);
const condfirmationModal = ref(false);
const post_images = ref([]);
const specification = ref({});
const spec_name = ref("");
const spec_details = ref("");
const detailModal = ref(false);

const detailModalData = ref({
  ProdTitle: "",
  ProdSpec: "",
  ProdDetail: "",
  ProdIMG: "",
});

const form = useForm({
  product: false,
});
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
</template>