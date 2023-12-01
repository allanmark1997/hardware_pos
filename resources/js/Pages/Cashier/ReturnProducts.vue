<script setup>
import Icon from "@/Components/Icon.vue";
import Input from "@/Components/Input.vue"
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import { onMounted, provide, ref } from "vue";
import moment from "moment";
import Button from "@/Components/Button.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import JetInputError from "@/Components/InputError.vue";
import ReturnItem from "@/Pages/Cashier/ReturnItem.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { list } from "postcss";
import BarcodeReturn from "./BarcodeReturn.vue";

const props = defineProps(["search", "transaction"])

const lists = ref(true);
const confirmation_modal = ref(false);
const confirmation_modal_return = ref(false);
const product_object = ref({});

// const selected_products = ref([]);

const form = useForm({
  search: props.search ?? "",
  products: [],
})

onMounted(() => {
  document.onkeydown = (e) => {
    if (e.key == "F12" || e.key == 123) {
      e.preventDefault();
    }
    if (e.key == "F5" || e.key == 116) {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "I") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "C") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == "J") {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == "U") {
      e.preventDefault();
    }
  };
  document.addEventListener('contextmenu', event => event.preventDefault());
});

const search_transaction = () => {
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true
  })
}
const search_remove = () => {
  form.search = ''
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      form.reset()
      form.search = ''
      lists.value = true
    }
  })

}

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

const calculate_discounted_total = (price, discount, quantity) => {
  let discount_val = discount / 100;
  let total = (price * discount_val) * quantity;
  return total;
}

const calculate_subtotal = (price, discount, quantity) => {
  let discounted_total = calculate_discounted_total(price, discount, quantity);
  let total = (price - discounted_total) * quantity;
  return total;
}

const calculate_overall_sub_total_success = () => {
  let subtotal = 0;
  let overall_subtotal = 0;
  let discount_val = 0;
  let price_discount = 0;

  props.transaction?.transaction_details.forEach(detail => {
    if (detail.status == 1 || detail.status == 2 || detail.status == 3) {
      discount_val = detail.sale_discount.discount / 100;
      price_discount = (detail.price.price * discount_val) * detail.quantity;
      subtotal = detail.price.price - price_discount;
      overall_subtotal += subtotal * detail.quantity;
    }

  });

  return overall_subtotal;
}

const calculate_overall_sub_total_unsuccess = () => {
  let overall_subtotal = 0;

  props.transaction?.transaction_details.forEach(detail => {
    if (detail.status == 0) {
      overall_subtotal += detail.price.price * detail.quantity;
    }
  });

  return overall_subtotal;
}

const calculate_special_discount = () => {
  let special_discount = (props.transaction?.special_discount?.discount ?? 0) / 100;
  let special_discount_amount = 0;

  special_discount_amount = calculate_overall_sub_total_success() * special_discount;

  return special_discount_amount;
}

const calculate_vat = () => {
  let vat = (props.transaction?.tax?.tax ?? 0) / 100;
  let vat_amount = 0;
  vat_amount = calculate_grandtotal() * vat;
  return vat_amount;
}

const calculate_grandtotal = () => {
  let grandTotal = 0;

  grandTotal = calculate_overall_sub_total_success() - calculate_special_discount();

  return grandTotal;
}

const calculate_grandtotal_with_vat = () => {
  let grandTotal = 0;

  grandTotal = calculate_grandtotal() + calculate_vat();

  return grandTotal;
}

const calculate_customer_change = () => {
  let customerChange = 0;
  customerChange = props.transaction?.cash - calculate_grandtotal_with_vat();
  return customerChange;
}

const calculate_overall_sub_total_return = () => {
  let subtotal = 0;
  let overall_subtotal = 0;
  let discount_val = 0;
  let price_discount = 0;

  form.products.forEach(detail => {
    discount_val = detail.product.sale_discount.discount / 100;
    price_discount = (detail.product.price.price * discount_val) * detail.quantity;
    subtotal = detail.product.price.price - price_discount;
    overall_subtotal += subtotal * detail.quantity;
  });

  return overall_subtotal;
}

const count_item = (data) => {
  let total = 0
  form.products.forEach(detail => {
    total += detail.quantity;
  });
  return total
}


const function_open_modal_return = (product) => {
  product_object.value = {
    product: {},
    quantity: 1,
    remarks: "",
    type: ""
  }
  product_object.value.product = product
  confirmation_modal.value = !confirmation_modal.value
}

const add_return_product = () => {
  let find_product = form.products.find(
    (products) => products.product.id == product_object.value.product.id
  );
  console.log(find_product)
  if (find_product == undefined) {
    if (product_object.value.quantity > product_object.value.product.quantity) {
      toast.error("You're inputed quantity which is beyond in the transaction details. This is invalid", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (product_object.value.quantity <= 0) {
      toast.error("Looks like the inputed quantity is equal to zero or below zero, this is invalid!", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else if (product_object.value.quantity == null || product_object.value.quantity == 0 || product_object.value.remarks == null || product_object.value.remarks == "" || product_object.value.type == null || product_object.value.type == "") {
      toast.error("Please fill-out all fields!", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else {
      form.products.push(product_object.value)
      confirmation_modal.value = !confirmation_modal.value
      toast.success("Success! Added in the list", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  else {
    toast.error("This item(" + find_product.product.product.name + ") is already in the list, please update the quantity in the list.", {
      autoClose: 2000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  }


}

const open_confirm_modal = () => {
  if (form.products.length == 0) {
    toast.error("There's no item/s in the list", {
      autoClose: 2000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else {
    confirmation_modal_return.value = !confirmation_modal_return.value

  }
}

const return_product = () => {
  form.post(route("return.store"), {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      toast.success("Success!", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      printReceipt();
      form.reset()
      confirmation_modal_return.value = false
      lists.value = true
    },
    onError: () => {
      toast.error(form.errors.transaction_validation, {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  });
}

const remove_return_item = (index) => {
  if (index > -1) { // only splice array when item is found
    form.products.splice(index, 1); // 2nd parameter means remove one item only
  }
}

const add_quantity = (index) => {
  let total = 0
  if (index > -1) {
    console.log(form.products[index].quantity)
    total = form.products[index].quantity + 1
    if (total > form.products[index].product.quantity) {
      toast.error("Looks like you are adding beyond transaction detail, this is invalid.", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else {
      form.products[index].quantity = total

    }
  }
}

const deduct_quantity = (index) => {
  let total = 0
  if (index > -1) {
    console.log(form.products[index].quantity)
    total = form.products[index].quantity - 1
    if (total <= 0) {
      toast.error("Looks like you are deducting below or zero transaction detail, this is invalid.", {
        autoClose: 2000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    else {
      form.products[index].quantity = total

    }
  }
}

provide("form_return", form)

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

const print_checkout = () => {
  return_product()
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
  <Head :title="'Return'" />
  <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-700">
    <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
      <Link :href="route('cashier.index')"
        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
      Dashboard
      </Link>
    </div>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <div class="mt-16">
        <div class="text-center">
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Welcome back {{ usePage().props.auth.user.name }}!
          </h1>
          <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            "The nice thing about teamwork is that you always have others on
            your side." <br />- Margaret Carty
          </p>
          <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Input label="Transaction Code" class="rounded-lg w-full mb-2" type="text" v-model="form.search"
              @keyup.enter="search_transaction" />
            <button v-if="search" class="my-auto mx-auto" @click="search_remove">
              <Icon icon="close_icon" size="sm" />
            </button>
          </div>
          <div>
            <p class="text-2xl text-white" v-if="props.transaction == null">
              No Results
            </p>
            <div v-else class="container mx-auto my-5 p-5">
              <div class="text-right p-2">
                <button
                  class="mr-2 bg-green-500 text-white p-2 pl-6 pr-6 rounded-lg hover:bg-green-400 hover:text-gray-200"
                  @click="lists = true">Result</button>

                <button
                  class="mr-2 bg-orange-500 text-white p-2 pl-6 pr-6 rounded-lg hover:bg-orange-400 hover:text-gray-200"
                  @click="lists = false">Lists</button>
                <button v-if="lists == false"
                  class="mr-2 bg-red-500 text-white p-2 pl-6 pr-6 rounded-lg hover:bg-orange-400 hover:text-gray-200"
                  @click="open_confirm_modal">Confirm</button>
              </div>

              <div class="md:flex no-wrap md:-mx-2 ">
                <div class="w-full md:w-3/12 md:mx-2">
                  <div class="bg-white p-3 border-t-4 border-green-400">
                    <p class="text-left text-xs text-gray-700 font-bold">
                      #{{ transaction?.id }}
                    </p>
                    <p class="text-left text-xs text-gray-700 font-bold">
                      {{ transaction?.code }}
                    </p>
                    <div class="image overflow-hidden">
                      <img class="h-auto w-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt="">
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ transaction?.name }}</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">{{ transaction?.address }}</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="flex gap-2">
                        Cashier:
                        <img class="rounded-full w-10 h-10" :src="transaction?.accommodate_by?.profile_photo_url" alt="">
                        {{ transaction?.accommodate_by?.name }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Payment Method: {{ transaction?.payment_method == 0 ? "Cash" : "Others" }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        VAT({{ transaction?.tax.tax }}%): {{ convert_money(calculate_vat()) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Special Discount({{ transaction?.special_discount?.discount ?? 0 }}%): {{
                          convert_money(calculate_special_discount()) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Cash Rendered: {{ convert_money(transaction?.cash) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="font-bold">
                        Customer Change: {{ convert_money(calculate_customer_change()) }}
                      </span>
                    </p>

                    <ul
                      class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-10 divide-y rounded shadow-sm">
                      <li class="flex items-center py-3">
                        <span>Status</span>
                        <span class="ml-auto">
                          <span v-if="transaction?.status == 1" class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            Success
                          </span>
                          <span v-else class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                            Cancelled
                          </span>
                        </span>
                      </li>
                      <li class="flex items-center py-3">
                        <span>Transaction Date</span>
                        <span class="ml-auto overflow-hidden text-sm">
                          {{ moment(transaction?.created_at).format("MMMM D, YYYY")
                          }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="w-full md:w-9/12 mx-2 h-100">
                  <div class="bg-white p-3 shadow-sm rounded-sm h-full" v-if="lists == false">
                    <div class="bg-gray-100 ">
                      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <span class="tracking-wide">Lists</span>
                      </div>
                      <div class="grid grid-cols-12 gap-2">
                        <p class="col-span-6 text-lg text-green-500 hover:text-gray-600 leading-6 w-full">
                          <span class="font-bold break-words">
                            Return Total with Sale Discount: {{
                              convert_money(calculate_overall_sub_total_return())
                            }}
                          </span>
                        </p>
                        <p class="col-span-6">
                          <span class="font-bold break-words">
                            Item/s:
                            {{ count_item() }}
                          </span>
                        </p>

                      </div>

                    </div>

                    <div class="text-gray-700 p-2 h-[60vmin] lg:h-[38vmin] sm:h-[145vmin] overflow-x-auto">
                      <div class="grid grid-cols-12 text-sm gap-2 break-words">
                        <template v-for="(product, key) in form.products" :key="key">
                          <div class="col-span-1 flex mx-auto ">
                            <Icon icon="cart" size="sm" class="mx-auto" />
                            <div class="text-xs">
                              <p class="font-semibold text-left">
                                {{ product.product?.product?.name }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Product Name
                              </span>
                            </div>
                          </div>
                          <div class="col-span-1 text-xs">
                            <div>
                              <p class="font-semibold">
                                {{ product.product.sale_discount.discount }}%
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Discount
                              </span>
                            </div>
                          </div>
                          <div class="col-span-2 text-xs">
                            <div>
                              <p class="font-semibold">
                                {{ convert_money(product.product.price.price) }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                                Price
                              </span>
                            </div>
                            <hr>
                            <div>
                              <p class="font-semibold">
                                {{ convert_money(product.product.status == 1 || product.product.status == 2 ||
                                  product.product.status == 3 ?
                                  calculate_discounted_total(product.product.price.price,
                                    product.product.sale_discount.discount,
                                    product.quantity) : 0) }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                                Discounted Total
                              </span>
                            </div>
                          </div>
                          <div class="col-span-2 text-xs">
                            <p class="font-semibold">
                              {{ convert_money(product.product.status == 1 || product.product.status == 2 ||
                                product.product.status == 3 ?
                                calculate_subtotal(product.product.price.price,
                                  product.product.sale_discount.discount,
                                  product.quantity) : product.product.price.price * product.quantity) }}
                            </p>
                            <span
                              class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                              Subtotal
                            </span>
                          </div>

                          <div class="col-span-2 text-xs">
                            <p
                              class="font-normal lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] break-words">
                              {{ product.remarks }}
                            </p>
                            <span
                              class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                              Reason
                            </span>
                          </div>

                          <div class="col-span-1 text-xs">
                            <p
                              class="font-normal lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] break-words">
                              {{ product.type == false ? 'Inventory' : 'Damage' }}
                            </p>
                            <span
                              class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                              Type
                            </span>
                          </div>

                          <div class="col-span-2 text-xs">
                            <div>
                              <div class="flex item-center text-center ">
                                <button class="p-1 bg-red-500 text-white rounded-l-lg mr-2 mx-auto"
                                  @click="deduct_quantity(key)">-</button>
                                <p class="font-semibold">
                                  {{ product.quantity }}
                                </p>
                                <button class="p-1 bg-green-500 text-white rounded-r-lg ml-2 mx-auto"
                                  @click="add_quantity(key)">+</button>
                              </div>

                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Qty
                              </span>
                            </div>

                          </div>
                          <div class="col-span-1 text-xs">
                            <div>
                              <button @click="remove_return_item(key)"
                                class="p-1 bg-red-500 text-white rounded-lg mx-auto">
                                <Icon icon="trash" size="xs" />
                              </button>
                            </div>
                          </div>
                          <hr class="col-span-12 w-full">

                        </template>

                      </div>
                    </div>
                  </div>
                  <div class="bg-white p-3 shadow-sm rounded-sm h-full" v-if="lists == true">
                    <div class="bg-gray-100 ">
                      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <span class="tracking-wide">About</span>
                      </div>
                      <div class="grid grid-cols-12 gap-2">
                        <p class="col-span-6 text-lg text-green-500 hover:text-gray-600 leading-6 w-full">
                          <span class="font-bold break-words">
                            Success Grand Total: {{
                              convert_money(calculate_grandtotal_with_vat())
                            }}
                          </span>
                        </p>
                        <p class="col-span-6 text-lg text-red-500 hover:text-gray-600 leading-6 w-full">
                          <span class="font-bold break-words">
                            Cancelled Grand Total: {{ convert_money(calculate_overall_sub_total_unsuccess()) }}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div class="text-gray-700 p-2 h-[60vmin] lg:h-[38vmin] sm:h-[145vmin] overflow-x-auto">
                      <div class="grid grid-cols-12 text-sm gap-2 break-words">
                        <template v-for="(detail, key) in transaction?.transaction_details " :key="key">
                          <div class="col-span-2 flex mx-auto ">
                            <Icon icon="cart" size="sm" class="mx-auto" />
                            <div class="text-xs">
                              <p class="font-semibold text-left">
                                {{ detail.product?.name }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Product Name
                              </span>
                            </div>
                          </div>
                          <div class="col-span-1 text-xs">
                            <div>
                              <p class="font-semibold">
                                {{ detail.quantity }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Qty
                              </span>
                            </div>
                            <hr>
                            <div>
                              <p class="font-semibold">
                                {{ detail.sale_discount.discount }}%
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                                Discount
                              </span>
                            </div>
                          </div>
                          <div class="col-span-2 text-xs">
                            <div>
                              <p class="font-semibold">
                                {{ convert_money(detail.price.price) }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                                Price
                              </span>
                            </div>
                            <hr>
                            <div>
                              <p class="font-semibold">
                                {{ convert_money(detail.status == 1 || detail.status == 2 || detail.status == 3 ?
                                  calculate_discounted_total(detail.price.price,
                                    detail.sale_discount.discount,
                                    detail.quantity) : 0) }}
                              </p>
                              <span
                                class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                                Discounted Total
                              </span>
                            </div>
                          </div>
                          <div class="col-span-3 text-xs">
                            <p class="font-semibold">
                              {{ convert_money(detail.status == 1 || detail.status == 2 || detail.status == 3 ?
                                calculate_subtotal(detail.price.price,
                                  detail.sale_discount.discount,
                                  detail.quantity) : detail.price.price * detail.quantity) }}
                            </p>
                            <span
                              class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin]  font-normal w-full">
                              Subtotal
                            </span>
                          </div>
                          <div class="col-span-2 text-xs">
                            <p class="font-semibold">
                              <span class="ml-auto">
                                <span v-if="detail?.status == 1"
                                  class="bg-green-500 py-1 px-1 rounded text-white text-xs">
                                  Success
                                </span>
                                <span v-else-if="detail?.status == 2"
                                  class="bg-orange-500 py-1 px-1 rounded text-white text-xs">
                                  Pending return
                                </span>
                                <span v-else-if="detail?.status == 3"
                                  class="bg-orange-500 py-1 px-1 rounded text-white text-xs">
                                  Replaced
                                </span>
                                <span v-else class="bg-red-500 py-1 px-1 rounded text-white text-xs">
                                  Cancelled
                                </span>
                              </span>
                            </p>
                            <span
                              class="lg:text-[1vmin] md:text-[2.5vmin] sm:text-[1vmin] xs:text-[2vmin] font-normal w-full">
                              Status
                            </span>
                          </div>
                          <div class="col-span-2 text-xs">
                            <Button v-if="detail?.status == 1" size="sm" @click="function_open_modal_return(detail)">
                              Return
                            </Button>
                          </div>
                          <hr class="col-span-12 w-full">

                        </template>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialogModal :show="confirmation_modal" @close="confirmation_modal = false" maxWidth="2xl">
    <template #title>You are going to return a product ({{ product_object.product.product.name }}). <br> Please input
      returning
      quantity and reasons...</template>
    <template #content>
      <div class="">
        <Input type="number" label="Quantity" size="md" v-model="product_object.quantity" />
        <Input type="text" label="Remarks" size="md" v-model="product_object.remarks" />
        <select v-model="product_object.type"
          class="block px-2 w-full text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-600 peer mt-4"
          label="Return type">
          <option value="" selected disabled>Select Type</option>
          <option :value="1">Return Damage</option>
          <option :value="2">Return Inventory</option>
        </select>
      </div>
    </template>
    <template #footer>
      <SecondaryButton @click="confirmation_modal = false" class="mr-2">
        Cancel
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="add_return_product">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Proceed
      </Button>
    </template>
  </ConfirmDialogModal>
  <ConfirmDialogModal :show="confirmation_modal_return" @close="confirmation_modal_return = false" maxWidth="2xl">
    <template #title>You are going to return ({{ form.products.length }}) product/s in the list, please review it first
      before confirming. <br>
      <span class="text-xs text-red-400"> Confirmation this action is not reversible.</span>
    </template>
    <template #content>
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
                <small>{{ transaction.name }}</small>
              </td>
            </tr>
            <tr>
              <td>
                <small>Customer Address:</small>
                <small style="font-size: 10px">{{
                  transaction.address
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
              <!-- <th><small>TOTAL</small></th> -->
            </tr>
          </thead>
          <tbody class="border">
            <tr v-for="(items, key) in form.products" :key="key">
              <td>
                <small>{{ stringTruncateFromCenter(items.product.product.name, 18) }}
                </small>
              </td>
              <td style="width: 20px">
                <small style="font-size: 10px; word-break: break-all">{{
                  items.quantity
                }}</small>
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
          </tbody>
        </table>
        <table class="">
          <thead>
            <tr class="border mb-2">
              <td>
                <small>TOTAL AMOUNT:
                  {{ convert_money(
                    calculate_overall_sub_total_return()
                  ) }}</small>
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
                <small> This serve as an OFFICIAL RECEIPT for returning</small>
                <br>
                <small>Thank You, Come Again</small>
                <!-- <svg class="barcode w-[20vmin] h-[10vmin] mx-auto" jsbarcode-format="CODE128" :jsbarcode-value="'12345'"
                    jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg> -->

              </td>
            </tr>
            <tr>
              <td>
                <BarcodeReturn :code="transaction.code" style="width:60vmin; height: 35vmin;" />
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
    </template>
    <template #footer>
      <SecondaryButton @click="confirmation_modal_return = false" class="mr-2">
        Cancel
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="print_checkout">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Proceed
      </Button>
    </template>
  </ConfirmDialogModal>
</template>