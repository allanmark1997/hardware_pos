<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Icon from "@/Components/Icon.vue";
import { onMounted, provide, ref, watch } from "vue";
import { Head, Link, router, useForm, usePage } from "@inertiajs/vue3";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import DialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Input from "@/Components/Input.vue";
import Button from "@/Components/Button.vue";
import Switch from "@/Components/Switch.vue";

import Barcode from "@/Pages/Cashier/Barcode.vue";
import moment from "moment";

import deleteAll from "@/Components/cashierModals/deleteAll.vue";
import SKU from "@/Components/cashierModals/SKU.vue";
import RECIEPT from "@/Components/cashierModals/RECIEPT.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const props = defineProps([
  "product",
  "cashier_status",
  "cashier_stat_id",
  "tax",
  "special_discount",
  "code"
]);

const totalCart = ref(0);
const sampleData = ref(5);
const samplePurchaseData = ref(2);
const eventListenerStorage = ref();
const status = ref();

const logoutlModal = ref(false);
const deleteAllModal = ref(false);
const cash_input_modal = ref(false);
const spDiscount = ref(false);
const SKULookup = ref(false);
const prodScan = ref("");
// const scannedProducts = ref([]);
const scannedProductIMG = ref("");
const quantity = ref(1);
const item_count = ref(0);
const item_grand_total = ref(0);

const print_show = ref(false);

let temp_grand_total = ref(0);

const __cash = ref(0);

const printModal = ref(false);

const walk_in = ref(false);

const secretout = ref({
  exe: false,
  pass: 0,
});
// const scannedCode = "323423465756";

const form = useForm({
  products: [],
  search: "",
  tax_id: props.tax.id,
  special_discount_id:
    spDiscount.value == true ? props.special_discount.id : null,
  cash: null,
  print_show: false,
  print_status: false,
  customer_name: "",
  customer_address: "",
  code_generator: "",
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
      } else if (
        e.ctrlKey &&
        e.keyCode == 66 &&
        router.page.component == "Cashier/Cashier"
      ) {
        setFocusToTextBox();
      } else if (
        e.ctrlKey &&
        e.keyCode == 38 &&
        router.page.component == "Cashier/Cashier"
      ) {
        addQuantitytoPurchase(true, false);
      } else if (
        e.ctrlKey &&
        e.keyCode == 40 &&
        router.page.component == "Cashier/Cashier"
      ) {
        addQuantitytoPurchase(false, true);
      } else if (
        e.ctrlKey &&
        e.keyCode == 13 &&
        router.page.component == "Cashier/Cashier"
      ) {
        addtoCart();
      }
      // else if (
      //   e.ctrlKey &&
      //   e.keyCode == 35 &&
      //   router.page.component == "Cashier/Cashier"
      // ) {
      //   log_out();
      // }
      //  else if (
      //   logoutlModal.value == true &&
      //   e.ctrlKey &&
      //   e.keyCode == 89 &&
      //   router.page.component == "Cashier/Cashier"
      // ) {
      //   logout_confirm();
      // }
      else if (
        logoutlModal.value == true &&
        e.ctrlKey &&
        e.keyCode == 78 &&
        router.page.component == "Cashier/Cashier"
      ) {
        logoutlModal.value = !logoutlModal.value;
      } else if (
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 80 &&
        router.page.component == "Cashier/Cashier"
      ) {
        unsetFocusToTextBox();
        // setFocusToTextBoxCash()
        cash_input_modal.value = !cash_input_modal.value;
      } else if (
        cash_input_modal.value == true &&
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 70 &&
        router.page.component == "Cashier/Cashier"
      ) {
        // alert("hell")
        setFocusToTextBoxCash();
      } else if (
        cash_input_modal.value == true &&
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 89 &&
        router.page.component == "Cashier/Cashier"
      ) {
        check_out();
        // partialCheckout();
      } else if (
        cash_input_modal.value == true &&
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 78 &&
        router.page.component == "Cashier/Cashier"
      ) {
        cash_input_modal.value = !cash_input_modal.value;
      } else if (
        deleteAllModal.value == true &&
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 89 &&
        router.page.component == "Cashier/Cashier"
      ) {
        form.products = [];
        scannedProductIMG.value = "";
        deleteAllModal.value = false;
      } else if (
        deleteAllModal.value == true &&
        e.ctrlKey &&
        e.altKey &&
        e.keyCode == 78 &&
        router.page.component == "Cashier/Cashier"
      ) {
        deleteAllModal.value = false;
      }
    });
  }
  function_activate_status();
};

watch(
  () => form.products,
  (products, old_product) => {
    deep: true;
    let temp_quantity = 0;
    let temp_grand_total = 0;
    let temp_sub_total = 0;
    products.forEach((product__) => {
      item_grand_total.value = 0;
      item_count.value = 0;
      temp_sub_total = 0;
      temp_quantity = temp_quantity + product__.cashier_quantity;
      temp_sub_total =
        applyDiscount(
          product__.current_price.price,
          product__.current_discount.discount
        ).discountedPrice * product__.cashier_quantity;
      temp_grand_total = temp_grand_total + temp_sub_total;
    });
    item_count.value = temp_quantity;
    item_grand_total.value = temp_grand_total;
  },
  { deep: true }
);

watch(
  () => walk_in.value,
  (walk_in) => {
    deep: true;
    if (walk_in == true) {
      form.customer_name = "Walk-in Customer";
      form.customer_address = "Walk-in Customer";
    }
  },
  { deep: true }
);

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
    onSuccess: () => { },
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

const applyTax = (subtotal) => {
  let result_grandtotal = 0;
  let temp_result = 0;
  let converted_tax = props.tax.tax / 100;
  temp_result = parseFloat(subtotal) * converted_tax;
  result_grandtotal = parseFloat(subtotal) + temp_result;
  return result_grandtotal;
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
    } else {
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
  let grand_payable = applyTax(
    applyDiscount(
      item_grand_total.value,
      spDiscount.value == true ? props.special_discount.discount : 0
    ).discountedPrice
  );
  // alert(grand_payable)
  if (parseFloat(form.cash) < parseFloat(grand_payable)) {
    toast.error("Inputed cash is insuficient", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else if (
    parseFloat(form.cash) == 0 ||
    form.cash == "" ||
    form.cash == null
  ) {
    toast.error("Please input cash first to proceed!", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else if (form.products.length <= 0) {
    toast.error(
      "Opps looks like there's no products in the cart, please add them first!",
      {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      }
    );
  } else if (form.customer_name == "" || form.customer_name == null) {
    toast.error("Please input customer's name before can proceed", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else if (form.customer_address == "" || form.customer_address == null) {
    toast.error("Please input customer's address before can proceed", {
      autoClose: 1000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    cash_input_modal.value = false;
    // printModal.value = true;
    print_show.value = true;
    if (form.print_status == true) {
      form.post(route("cashier.store"), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Print print", {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
          walk_in.value = false
          form.reset();
          form.products = [];

          // printModal.value = false;
          print_show.value = false
          scannedProductIMG.value = "";
          cash_input_modal.value = false;

        },
        onError: () => {
          toast.error(form.errors.transaction_validation, {
            autoClose: 1000,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.TOP_RIGHT,
          });
        },
      });
    }
  }
};

const partialCheckout = () => {
  cash_input_modal.value = false;
  printModal.value = true;
  __cash.value = form.cash;
};

// const log_out = () => {
//   logoutlModal.value = !logoutlModal.value;
// };

// const logout_confirm = () => {
//   form.post(route("logout"));
// };

const setFocusToTextBox = () => {
  document.querySelector("#prodBarcodeInput").focus();
  toast.success("Scanner is ready!", {
    autoClose: 1000,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
  prodScan.value = "";
};

const unsetFocusToTextBox = () => {
  document.querySelector("#prodBarcodeInput").blur();
  toast.success("Scanner is disconnected!", {
    autoClose: 1000,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
  prodScan.value = "";
};

const setFocusToTextBoxCash = () => {
  document.querySelector("#prodBarcodeInput").blur();
  document.querySelector("#inputCash").focus();
};

const addQuantitytoPurchase = (add, subtract) => {
  if (add) {
    quantity.value++;
  } else if (subtract) {
    if (quantity.value != 1) {
      quantity.value--;
    }
  }
};

provide("barcode", form);

const printReceipt = () => {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  document.body.appendChild(iframe);

  // Clone the content of the specified div
  var content = document.getElementById("toPrint").cloneNode(true);

  // Set the content of the iframe
  var iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.appendChild(content);
  iframeDocument.close();

  // Print the iframe content
  iframe.contentWindow.print();

  // Remove the iframe
  document.body.removeChild(iframe);
};
const closeModal = () => {
  form.print_show = false;
};
const print_checkout = () => {
  printReceipt();
  form.print_status = true;
  form.print_show = false;
  check_out()
};
const stringTruncateFromCenter = (str, maxLength) => {
  const midChar = "…"; // character to insert into the center of the result
  var left, right;

  if (str.length <= maxLength) return str;

  // length of beginning part
  left = Math.ceil(maxLength / 2);

  // start index of ending part
  right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substr(0, left) + midChar + str.substring(right);
};
</script>
<template>
  <Head :title="'Cashier'" />

  <!-- <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">Cashier</h2>
    </template>
     -->
  <div class="py-5">
    <div class="fixed m-[50%] z-[-1000]">
      <input id="prodBarcodeInput" v-model="prodScan" @change="addtoCart" />
      <input type="number" class="border-0 bg-transparent w-11" v-model="quantity" />
    </div>

    <!-- <button type="button" @click="addtoCart()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 ml-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
        <span class="sr-only">Icon description</span>
      </button> -->
    <!-- <input type="text" v-model="form.search" /> -->
    <!-- <button @click="search_()" class="bg-red-200">scan</button> -->

    <div class="flex max-w-7xl mx-auto justify-end">
      <!-- <button
        @click="log_out"
        type="button"
        class="focus:outline-none text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex"
      >
        <Icon icon="logout" size="sm" />
        Log out
      </button> -->
      <div class="sm:fixed sm:top-0 sm:left-0 p-6 text-right z-10">
        <Link :href="route('cashier.index')"
          class="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
        Dashboard
        </Link>
      </div>
    </div>
    <div class="flex max-w-7xl mx-auto justify-end mt-6">
      <kbd class="px-2 py-1.5 text-2xl font-semibold text-white bg-yellow-700 border rounded-lg">Purchase Quantity: {{
        quantity }}</kbd>
    </div>
    <div class="flex max-w-7xl mx-auto justify-start">
      <p class="text-4xl text-gray-800">
        <span class="font-bold">Grand Total:</span>
        <span class="text-5xl font-bold">
          {{
            form.products.length == 0
            ? convert_money(0)
            : convert_money(
              applyTax(
                applyDiscount(
                  item_grand_total,
                  spDiscount == true ? special_discount.discount : 0
                ).discountedPrice
              )
            )
          }}
        </span>
      </p>
    </div>
    <div class="max-w-7xl mx-auto bg-white rounded mt-5 px-1">
      <div class="grid grid-cols-12 gap-2">
        <div class="col-span-7 p-5">
          <div class="product_list bg-gray-50 p-1 rounded-lg mt-3 min-h-[60vmin] overflow-auto">
            <div class="mt-24 flex max-w-lg mx-auto max-h-lg justify-center">
              <img v-if="scannedProductIMG" class="object-contain h-48 w-96" :src="scannedProductIMG" />
            </div>
          </div>
        </div>
        <div class="col-span-5">
          <div class="bg-white rounded-b-xl shadow-md p-5 flex justify-between max-h-[63vmin]">
            <div class="flex">
              <Icon icon="shopping_cart" size="sm"></Icon>
              <span class="font-bold">Cart</span>
              <span v-if="spDiscount"><small class="italic ml-1 text-white flex bg-red-600 p-1 rounded-lg">
                  <Icon class="text-white" size="xs" icon="wheelchair" />
                  (Special Discount)
                </small></span>
            </div>

            <div>
              <span class="font-bold"> Items: </span>
              <span class="bg-red-500 ml-1 px-2 text-white rounded-xl w-10 text-center">
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
          <!-- <form class="flex mt-5 mx-5 items-center">
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
          </form> -->
          <div class="relative mt-5 px-2 overflow-x-auto min-h-[45vmin] shadow-md">
            <table class="w-full text-sm text-left text-gray-500">
              <tbody>
                <tr v-for="data in totalCart" class="bg-white border-b">
                  <td class="px-6 py-4 font-semibold text-gray-900">Wrench</td>
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-3">
                      <div>
                        <div class="flex items-center space-x-3">
                          <button
                            class="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h16" />
                            </svg>
                          </button>
                          <div>
                            <input type="number" id="first_product"
                              class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="1" required />
                          </div>
                          <button
                            class="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button">
                            <span class="sr-only">Quantity button</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                              viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 1v16M1 9h16" />
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
            <div v-if="form.products.length === 0" class="mx-auto text-center text-xs">
              Scan a product
            </div>

            <div v-else class="w-full">
              <div class="flow-root max-h-[50vmin] overflow-auto p-2" id="addedCartScrll">
                <ul role="addedlist" v-for="items in form.products" class="divide-y divide-gray-200">
                  <li class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img class="w-8 h-8 rounded-full" :src="items.product_image" alt="Neil image" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">
                          {{ items.name }}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900">
                        {{ convert_money(items.current_price.price) }}
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900">
                        <small>x{{ items.cashier_quantity }}</small>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900">
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
          <div class="item-center p-5">
            <div>
              <p>
                <span class="font-bold">VAT({{ tax.tax }}%): </span>
                {{
                  form.products.length == 0
                  ? convert_money(0)
                  : convert_money(
                    applyTax(
                      applyDiscount(
                        item_grand_total,
                        spDiscount == true ? special_discount.discount : 0
                      ).discountedPrice
                    ) -
                    applyDiscount(
                      item_grand_total,
                      spDiscount == true ? special_discount.discount : 0
                    ).discountedPrice
                  )
                }}
              </p>
              <p>
                <span class="font-bold">Special Discount({{
                  spDiscount == true ? special_discount.discount : 0
                }}%):
                </span>
                {{
                  form.products.length == 0
                  ? convert_money(0)
                  : convert_money(
                    item_grand_total -
                    applyDiscount(
                      item_grand_total,
                      spDiscount == true ? special_discount.discount : 0
                    ).discountedPrice
                  )
                }}
              </p>
              <p>
                <span class="font-bold">Sub-Total (Excluding VAT):</span>
                {{
                  form.products.length == 0
                  ? convert_money(0)
                  : convert_money(item_grand_total)
                }}
              </p>
              <p>
                <span class="font-bold">Sub-Total:</span>
                {{
                  form.products.length == 0
                  ? convert_money(0)
                  : convert_money(
                    applyDiscount(
                      item_grand_total,
                      spDiscount == true ? special_discount.discount : 0
                    ).discountedPrice
                  )
                }}
              </p>

              <div class="justify-end flex">
                <button @click="cash_input_modal = true" type="button"
                  class="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL FOR DATA -->
  <!-- <deleteAll :modalDelete="deleteAllModal" /> -->
  <div v-if="deleteAllModal" id="defaultModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-52 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t">
          <h3 class="text-xl font-semibold text-gray-900">Delete All?</h3>
          <button @click="deleteAllModal = false" type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="defaultModal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500">
            Are you sure you want to delete all transactions?
          </p>
        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button @click="
            (form.products = []),
            (scannedProductIMG = ''),
            (deleteAllModal = false)
            " data-modal-hide="defaultModal" type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Delete All (CTRL + ALT + Y)
          </button>
          <button @click="deleteAllModal = false" data-modal-hide="defaultModal" type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
            Decline (CTRL + ALT + N)
          </button>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialogModal :show="cash_input_modal" @close="cash_input_modal = false" maxWidth="2xl">
    <template #title>
      You are going to check out this trasaction, please input Amount cash.
      Payable amount is
      {{
        convert_money(
          applyTax(
            applyDiscount(
              item_grand_total,
              spDiscount == true ? special_discount.discount : 0
            ).discountedPrice
          )
        )
      }}</template>
    <template #content>
      <Switch v-model:checked="walk_in">Walk-in</Switch>
      <Input id="inputCustomerName" class="rounded-lg w-full mb-2" type="text" v-model="form.customer_name" autofocus
        label="Customer's Name" :disabled="walk_in == true" />
      <Input id="inputCustomerAddress" class="rounded-lg w-full mb-2" type="text" label="Customer's Address"
        v-model="form.customer_address" :disabled="walk_in == true" />
      <input id="inputCash" class="rounded-lg w-full mb-2" type="number" v-model="form.cash" @keyup.enter="check_out" />
    </template>
    <template #footer>
      <SecondaryButton @click="cash_input_modal = false" class="mr-2">
        Cancel (CTRL + ALT + N)
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="check_out">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        &nbsp; Proceed (CTRL + ALT + Y)
      </Button>
    </template>
  </ConfirmDialogModal>
  <SKU :SKULookup="SKULookup" :products="props.product" />

  <!-- <RECIEPT
    :cash__="convert_money(form.cash)"
    :subtotal_excluding_vat="
      form.products.length == 0
        ? convert_money(0)
        : convert_money(item_grand_total)
    "
    :subtotal1__="
      convert_money(
        applyDiscount(
          item_grand_total,
          spDiscount == true ? special_discount.discount : 0
        ).discountedPrice
      )
    "
    :subtotal__="
      form.products.length == 0
        ? convert_money(0)
        : convert_money(
            applyDiscount(
              item_grand_total,
              spDiscount == true ? special_discount.discount : 0
            ).discountedPrice
          )
    "
    :spDiscount="spDiscount == true ? special_discount.discount : 0"
    :spDiscount_value="
      form.products.length == 0
        ? convert_money(0)
        : convert_money(
            item_grand_total -
              applyDiscount(
                item_grand_total,
                spDiscount == true ? special_discount.discount : 0
              ).discountedPrice
          )
    "
    :vat__="tax.tax"
    :vat_value="
      form.products.length == 0
        ? convert_money(0)
        : convert_money(
            applyTax(
              applyDiscount(
                item_grand_total,
                spDiscount == true ? special_discount.discount : 0
              ).discountedPrice
            ) -
              applyDiscount(
                item_grand_total,
                spDiscount == true ? special_discount.discount : 0
              ).discountedPrice
          )
    "
    :grand_total="
      applyTax(
        applyDiscount(
          item_grand_total,
          spDiscount == true ? special_discount.discount : 0
        ).discountedPrice
      )
    "
    @close_modal="printModal = false"
    @checkout__="check_out()"
  /> -->

  <ConfirmDialogModal :show="logoutlModal" @close="logoutlModal = false" maxWidth="2xl">
    <template #title> Are you sure you want to log-out?</template>
    <template #content> </template>
    <template #footer>
      <SecondaryButton @click="logoutlModal = false" class="mr-2">
        Cancel (CTRL + ALT + N)
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="logout_confirm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Proceed (CTRL + ALT + Y)
      </Button>
    </template>
  </ConfirmDialogModal>


  <DialogModal :show="print_show == true" @close="print_show = false" maxWidth="2xl">
    <!-- <template #title> Are you sure you want to log-out?</template> -->
    <template #content>
      <div class="text-justify overflow-auto p-3 relative">
        <div id="toPrint" class="text-justify overflow-auto p-3 relative border bg-white flex-wrap hidden">
          <table class="">
            <thead>
              <tr class="border mb-2">
                <th>
                  <small>CRISBODS HARDWARE AND CONSTRUCTION SUPPLY</small>
                </th>
              </tr>
              <tr class="border mb-2">
                <th>
                  <small style="font-size: 10px">Dologon, Busco, Quezon Rd., Maramag, Bukidnon,
                    8714</small>
                </th>
              </tr>
            </thead>
            <tbody class="border">
              <tr>
                <td>
                  <small>TIN: 487-279-975-00001</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Date: {{ moment().format("MMMM Do YYYY") }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Time: {{ moment().format("h:mm:ss a") }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Cashier: {{ usePage().props.auth.user.name }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Customer Name:</small>
                  <small>{{ form.customer_name }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Customer Address:</small>
                  <small style="font-size: 10px">{{
                    form.customer_address
                  }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="">
            <thead>
              <tr class="border mb-2">
                <th><small>Retail</small></th>
                <th><small>QTY</small></th>
                <th><small>TOTAL</small></th>
              </tr>
            </thead>
            <tbody class="border">
              <tr v-for="(items, key) in form.products" :key="key">
                <td>
                  <small>{{ stringTruncateFromCenter(items.name, 18) }}
                  </small>
                </td>
                <td style="width: 20px">
                  <small style="font-size: 10px; word-break: break-all">{{
                    items.cashier_quantity
                  }}</small>
                </td>
                <td style="width: 60px">
                  <small id="totalPrice" style="font-size: 10px !important; word-break: break-all">{{
                    convert_money(
                      applyDiscount(
                        items.current_price.price,
                        items.current_discount.discount
                      ).discountedPrice * items.cashier_quantity
                    )
                  }}
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="">
            <tbody class="border">
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Special Discount({{ props.special_discount.discount }}%):
                    {{ form.products.length == 0
                      ? convert_money(0)
                      : convert_money(
                        item_grand_total -
                        applyDiscount(
                          item_grand_total,
                          spDiscount == true ? props.special_discount.discount : 0
                        ).discountedPrice
                      ) }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>VAT ({{ props.tax.tax }}%): {{
                    form.products.length == 0
                    ? convert_money(0)
                    : convert_money(
                      applyTax(
                        applyDiscount(
                          item_grand_total,
                          spDiscount == true ? special_discount.discount : 0
                        ).discountedPrice
                      ) -
                      applyDiscount(
                        item_grand_total,
                        spDiscount == true ? special_discount.discount : 0
                      ).discountedPrice
                    )
                  }}
                  </small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>
                    Subtotal (Excluding VAT):
                    {{ form.products.length == 0
                      ? convert_money(0)
                      : convert_money(item_grand_total) }}
                  </small>
                </td>
              </tr>
              <tr>
                <td>
                  <small>Subtotal Amount: {{ form.products.length == 0
                    ? convert_money(0)
                    : convert_money(
                      applyDiscount(
                        item_grand_total,
                        spDiscount == true ? special_discount.discount : 0
                      ).discountedPrice
                    ) }}</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="">
            <thead>
              <tr class="border mb-2">
                <td>
                  <small>TOTAL AMOUNT:
                    {{ form.products.length == 0
                      ? convert_money(0)
                      : convert_money(
                        applyTax(
                          applyDiscount(
                            item_grand_total,
                            spDiscount == true ? special_discount.discount : 0
                          ).discountedPrice
                        )
                      ) }}</small>
                </td>
              </tr>
              <tr class="border mb-2">
                <td>
                  <small>CASH: {{ convert_money(form.cash) }}</small>
                </td>
              </tr>
              <tr class="border mb-2">
                <td>
                  <small>CHANGE:
                    {{ convert_money(form.cash - (form.products.length == 0
                      ? 0
                      :
                      applyTax(
                        applyDiscount(
                          item_grand_total,
                          spDiscount == true ? special_discount.discount : 0
                        ).discountedPrice
                      )
                    )) }}
                  </small>
                </td>
              </tr>
            </thead>
            <tbody class="border">
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
              <tr>
                <td>
                  <small> This serve as an OFFICIAL RECEIPT </small>
                  <small>Thank You, Come Again</small>
                  <!-- <svg class="barcode w-[20vmin] h-[10vmin] mx-auto" jsbarcode-format="CODE128" :jsbarcode-value="'12345'"
                    jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg> -->

                </td>
              </tr>
              <tr>
                <td>
                  <Barcode :code="props.code" style="width:50px; height: 20px;" />
                </td>
              </tr>
              <tr>
                <td>
                  <small style="font-size: 10px">*************************************</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-full">
            <p class="text-2xl">Money Rendered: <span class="text-4xl font-bold">{{ convert_money(form.cash) }}</span>
            </p>
          </div>
          <div class="col-span-full">
            <p class="text-2xl">Change: <span class="text-4xl font-bold">{{ convert_money(form.cash -
              (form.products.length == 0
                ? 0
                :
                applyTax(
                  applyDiscount(
                    item_grand_total,
                    spDiscount == true ? special_discount.discount : 0
                  ).discountedPrice
                )
              )) }}</span>
            </p>
          </div>
          <div class="col-span-full">
            <p class="text-sm">Customer name: <span class="font-bold">{{ form.customer_name }}</span>
            </p>
          </div>
          <div class="col-span-full">
            <p class="text-sm">Customer Address: <span class="font-bold">{{ form.customer_address
            }}</span>
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <SecondaryButton @click="print_show = false" class="mr-2">
        Cancel (CTRL + ALT + N)
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="print_checkout()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Proceed (CTRL + ALT + Y)
      </Button>
    </template>
  </DialogModal>
</template>