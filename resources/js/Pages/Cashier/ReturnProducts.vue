<script setup>
import Icon from "@/Components/Icon.vue";
import Input from "@/Components/Input.vue"
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import moment from "moment";
import Button from "@/Components/Button.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import JetInputError from "@/Components/InputError.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["search", "transaction"])

const confirmation_modal = ref(false);
const selected_products = ref([]);

const form = useForm({
  search: props.search ?? "",
  products: [],
  quantity: 0,
  remarks: ""
})

onMounted(() => {
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
    preserveState: true
  })
}

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
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
    if (detail.status == 1 || detail.status == 2) {
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


const function_open_modal_return = (product) => {
  form.product = product
  confirmation_modal.value = !confirmation_modal.value
}

const return_product = () => {
  if (form.quantity < form.product.quantity) {
    toast.error("You inputed quantity which is beyond in the transaction details. This is invalid", {
      autoClose: 2000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else if (form.quantity == null || form.quantity == 0 || form.remarks == null || form.remarks == "") {
    toast.error("Please fill-out all fields!", {
      autoClose: 2000,
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else {
    form.post(route("return.store", { transaction_detail: form.product }), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        toast.success("Success! Please wait for the administrator to approved this request or please notify the administrator that you have a request", {
          autoClose: 2000,
          transition: toast.TRANSITIONS.FLIP,
          position: toast.POSITION.TOP_RIGHT,
        });
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
}

const validate_input_qty = (id) => {
  let validate = selected_products.value.find(
    (product) => product.id == id
  );
  if (validate == undefined) {
    return true;
  }
  else {
    return false;
  }
}
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
              <div class="md:flex no-wrap md:-mx-2 ">
                <!-- Left Side -->
                <div class="w-full md:w-3/12 md:mx-2">
                  <!-- Profile Card -->
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
                  <!-- End of profile card -->
                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-100">
                  <!-- Profile tab -->
                  <!-- About Section -->
                  <div class="bg-white p-3 shadow-sm rounded-sm h-full">
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
                                {{ convert_money(detail.status == 1 || detail.status == 2 ?
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
                              {{ convert_money(detail.status == 1 || detail.status == 2 ?
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
                                  class="bg-red-500 py-1 px-1 rounded text-white text-xs">
                                  Return
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
                            <!-- <Button v-if="detail?.status == 1" size="sm" @click="function_open_modal_return(detail)">
                              Return
                            </Button> -->
                            <div class="items-center mb-4">
                              <input id="default-checkbox" type="checkbox" :value="detail" v-model="selected_products"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
                              <label for="default-checkbox" class="ml-2 text-xs font-medium text-gray-900">
                                Return
                              </label>
                              <Input type="number" label="Qty" :disabled="validate_input_qty(detail.id)" />
                            </div>

                          </div>
                          <hr class="col-span-12 w-full">

                        </template>

                      </div>
                    </div>
                  </div>
                  <!-- End of about section -->
                  <!-- End of profile tab -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmDialogModal :show="confirmation_modal" @close="confirmation_modal = false" maxWidth="2xl">
    <template #title>You are going to return a product ({{ form.product.product.name }}). <br> Please input returning
      quantity and reasons...</template>
    <template #content>
      <Input type="number" label="Quantity" size="md" v-model="form.quantity" />
      <JetInputError :message="form.errors.quantity" class="mt-2" />
      <Input type="text" label="Remarks" size="md" v-model="form.remarks" />
      <JetInputError :message="form.errors.remarks" class="mt-2" />
    </template>
    <template #footer>
      <SecondaryButton @click="confirmation_modal = false" class="mr-2">
        Cancel
      </SecondaryButton>
      <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400" @click="return_product">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>&nbsp;Proceed
      </Button>
    </template>
  </ConfirmDialogModal>
</template>