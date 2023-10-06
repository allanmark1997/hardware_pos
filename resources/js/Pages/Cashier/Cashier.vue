<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Icon from "@/Components/Icon.vue";
import { onMounted, ref, watch } from "vue";
import { router, useForm } from "@inertiajs/vue3";

import deleteAll from "@/Components/cashierModals/deleteAll.vue";
import SKU from "@/Components/cashierModals/SKU.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const props = defineProps([
  "product",
  "cashier_status",
  "cashier_stat_id",
  "tax",
  "special_discount",
]);

const totalCart = ref(0);
const sampleData = ref(5);
const samplePurchaseData = ref(2);
const eventListenerStorage = ref();
const status = ref();

const deleteAllModal = ref(false);
const spDiscount = ref(false);
const SKULookup = ref(false);
const prodScan = ref("");
// const scannedProducts = ref([]);
const scannedProductIMG = ref("");
const quantity = ref(1);
const item_count = ref(0);
// const scannedCode = "323423465756";

const form = useForm({
  products: [],
  search: "",
  machine: false,
});

onMounted(() => {
  keydownHandler();
});

const keydownHandler = (event) => {
  if (props.cashier_status == "false") {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 112 && router.page.component == "Cashier/Cashier") {
        console.log("Start transaction.");
        e.preventDefault();
      } else if (
        e.keyCode == 113 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Discount");
        spDiscount.value = !spDiscount.value;
        if (spDiscount.value) {
          toast.success("Special discount has been applied!", {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error("Special discount has been removed!", {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        e.preventDefault();
      } else if (
        e.keyCode == 114 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Transaction .");
        e.preventDefault();
      } else if (
        e.keyCode == 115 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Change Quantity.");
        e.preventDefault();
      } else if (
        e.keyCode == 116 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Change Tax");
        e.preventDefault();
      } else if (
        e.keyCode == 117 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Description.");
        e.preventDefault();
      } else if (
        e.keyCode == 118 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Delete Item ");
        e.preventDefault();
      } else if (
        e.keyCode == 119 &&
        router.page.component == "Cashier/Cashier"
      ) {
        if (!SKULookup.value) {
          deleteAllModal.value = !deleteAllModal.value;
        }
        e.preventDefault();
      } else if (
        e.keyCode == 120 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("SKU Look up");
        if (!deleteAllModal.value) {
          SKULookup.value = !SKULookup.value;
        }
        e.preventDefault();
      } else if (
        e.keyCode == 121 &&
        router.page.component == "Cashier/Cashier"
      ) {
        console.log("Sales Return.");
        e.preventDefault();
      }
    });
  }
  function_activate_status();
};

const domChecker = () => {
  let result = "";
  if ("keydown" in window) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

const firstDigit = (num) => {
  // 1: get first digit using regex pattern
  const matches = String(num).match(/\d/);
  // 2: convert matched item to integer
  const digit = Number(matches[0]);
  // 3: add sign back as needed
  return num < 0 ? -digit : digit;
};

const nFormatter = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
};

const search_ = () => {
  form.get(route("cashier.index"), {
    preserveScroll: true,
    onSuccess: () => {},
  });
};
const create_transaction = (active) => {
  console.log("active cashier");
};

const applyDiscount = (product, discountPercentage) => {
  if (discountPercentage < 0 || discountPercentage > 100) {
    return product;
  }

  const discountedPrice = product - product * (discountPercentage / 100);

  const discountedProduct = {
    ...product,
    discountedPrice: discountedPrice.toFixed(2),
    // discountApplied: discountPercentage.toFixed(2) + "%",
  };

  return discountedProduct;
};

const addtoCart = () => {
  let scan_product = props.product.find(
    (product) => product.barcode == prodScan.value
  );
  if (scan_product == undefined) {
    toast.error("Product not available!", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
    prodScan.value = "";
    quantity.value = 1;


  } else if (scan_product != undefined) {
    if (scan_product.quantity <= 0) {
      toast.error("Product is out of stock!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      prodScan.value = "";
      quantity.value = 1;
    }
    else{
    let duplicate_auth = form.products.find(
      (product) => product.barcode == scan_product.barcode
    );
    let duplicate_index_auth = form.products.findIndex(
      (product) => product.barcode == scan_product.barcode
    );
    if (duplicate_auth == undefined) {
      scan_product.cashier_quantity = quantity.value;
      form.products.push(scan_product);
      scannedProductIMG.value = scan_product.product_image;
      toast.success("Product added to cart!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      prodScan.value = "";
      quantity.value = 1;

    } else {
      let quantity_add =
        form.products[duplicate_index_auth].cashier_quantity + quantity.value;
      form.products[duplicate_index_auth].cashier_quantity = quantity_add;
      scannedProductIMG.value = scan_product.product_image;
      scannedProductIMG.value = scan_product.product_image;
      toast.success("Product added to cart!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      prodScan.value = "";
      quantity.value = 1;
    }
  }
  }
  // for (let index = 0; index < props.product.length; index++) {
  //   const prod = props.product[index];
  //   if (prodScan.value === prod.barcode) {
  //     form.products.value.push(prod);
  //     scannedProductIMG.value = prod.product_image;
  //     toast.success("Product added to cart!", {
  //       autoClose: 1000,
  //       transition: toast.TRANSITIONS.FLIP,
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     break;
  //   } else {
  //     if (props.product.length == index + 1) {
  //       toast.error("Product not available!", {
  //         autoClose: 1000,
  //         transition: toast.TRANSITIONS.FLIP,
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   }
  // }
};

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const function_activate_status = () => {
  router.put(route("cashier_stat.update_status", props.cashier_stat_id));
};

const check_out = () => {
  form.post(route("cashier.store"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("Print print", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: () => {
      toast.error(form.errors.transaction_validation, {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });
};

watch(form.products, (products)=>{
  let temp_quantity = 0
  products.forEach(product => {
    temp_quantity =+ product.cashier_quantity
  });
  item_count.value = temp_quantity;
})

</script>
<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">Cashier</h2>
    </template>
    <div class="py-5">
      <input v-model="prodScan" @change="addtoCart" />
      <input type="number" v-model="quantity" />
      <button
        type="button"
        @click="addtoCart()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 ml-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span class="sr-only">Icon description</span>
      </button>
      <!-- <input type="text" v-model="form.search" /> -->
      <!-- <button @click="search_()" class="bg-red-200">scan</button> -->
      <div class="max-w-7xl mx-auto bg-white rounded mt-5 px-1">
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-7 p-5">
            <div
              class="product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[60vmin] overflow-auto"
            >
              <div class="mt-24 flex justify-center">
                <img :src="scannedProductIMG" />
              </div>
            </div>
          </div>
          <div class="col-span-5">
            <div
              class="bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]"
            >
              <div class="flex">
                <Icon icon="shopping_cart" size="sm"></Icon>
                <span class="font-bold">Cart</span>
                <span v-if="spDiscount"
                  ><small
                    class="italic ml-1 text-white flex bg-red-600 p-1 rounded-lg"
                  >
                    <Icon class="text-white" size="xs" icon="wheelchair" />
                    (Special Discount)
                  </small></span
                >
              </div>
              <div>
                <span class="font-bold"> Items: </span>
                <span
                  class="bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center"
                >
                <small>{{ item_count }}</small>
                  <!-- <small v-if="totalCart >= 1000">{{
                    nFormatter(totalCart)
                  }}</small>
                  <small v-else-if="totalCart >= 100">{{
                    nFormatter(totalCart)
                  }}</small>
                  <small v-else>{{ totalCart }}</small> -->
                </span>
              </div>
            </div>
            <form class="flex mt-5 mx-5 items-center">
              <label for="Search products" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <Icon class="mr-1" icon="shopping_bag" size="xs" />
                </div>
                <input
                  type="text"
                  id="Search products"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5"
                  placeholder="Search products"
                />
              </div>
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-yellow-700 rounded-lg border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <Icon class="mr-5" icon="search_icon" size="xs" />
              </button>
            </form>
            <div
              class="relative mt-5 px-2 overflow-x-auto min-h-[45vmin] shadow-md"
            >
              <table class="w-full text-sm text-left text-gray-500">
                <tbody>
                  <tr v-for="data in totalCart" class="bg-white border-b">
                    <td class="px-6 py-4 font-semibold text-gray-900">
                      Wrench
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-3">
                        <div>
                          <div class="flex items-center space-x-3">
                            <button
                              class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span class="sr-only">Quantity button</span>
                              <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <input
                                type="number"
                                id="first_product"
                                class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="1"
                                required
                              />
                            </div>
                            <button
                              class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span class="sr-only">Quantity button</span>
                              <svg
                                class="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900"></td>
                    <td class="px-6 py-4 font-semibold text-gray-900">
                      <button>
                        <Icon icon="close_icon" size="sm" class="text-red" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="form.products.length === 0"
                class="mx-auto text-center text-xs"
              >
                Scan a product
              </div>

              <div v-else class="w-full">
                <div
                  class="flow-root max-h-[50vmin] overflow-auto p-2"
                  id="addedCartScrll"
                >
                  <ul
                    role="addedlist"
                    v-for="items in form.products"
                    class="divide-y divide-gray-200"
                  >
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            :src="items.product_image"
                            alt="Neil image"
                          />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ items.name }}
                          </p>
                        </div>
                        <div
                          class="inline-flex items-center text-base font-semibold text-gray-900"
                        >
                        {{
                            convert_money(
                                items.current_price.price
                            )
                          }} 
                        </div>
                        <div
                          class="inline-flex items-center text-base font-semibold text-gray-900"
                        >
                        <small>x{{ items.cashier_quantity }}</small>
                        </div>
                        <div
                          class="inline-flex items-center text-base font-semibold text-gray-900"
                        > 
                          {{
                            convert_money(
                              applyDiscount(
                                items.current_price.price,
                                items.current_discount.discount
                              ).discountedPrice * items.cashier_quantity
                            )
                          }}
                        </div>
                       
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bg-white flex justify-between item-center p-5">
              <p><span class="font-bold">Total:</span> 0</p>
              <button
                @click="check_out"
                type="button"
                class="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Charge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL FOR DATA -->
    <deleteAll :modalDelete="deleteAllModal" />
    <SKU :SKULookup="SKULookup" :products="props.product" />
  </AppLayout>
</template>