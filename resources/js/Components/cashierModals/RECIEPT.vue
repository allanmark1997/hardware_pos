<script setup>
import { inject, onMounted, ref } from "vue";
import moment from "moment";
import { usePage } from "@inertiajs/vue3";

const props = defineProps([
  "printModal",
  // "products",
  "subtotal_excluding_vat",
  "cashierName",
  "cash__",
  "grand_total",
  "vat__",
  "vat_value",
  "spDiscount",
  "spDiscount_value",
  "subtotal__",
  "subtotal1__",
]);

const form = inject("cashier_form");

const date = ref(Date.now());

const emit = defineEmits(["checkout__", "close_modal"]);

const printReceipt = () => {
  // var divContents = document.getElementById("toPrint").outerHTML;
  //           var a = window.open('', '', 'height=500, width=400');
  //           a.document.write('<html>');
  //           a.document.write('<body><br>');
  //           a.document.write(divContents);
  //           a.document.write('</body></html>');
  //           a.print()
  // a.onload=function(){window.print(); window.close()}

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

  // var contentToPrint = document.getElementById("toPrint");
  // var newWin = window.open('', '_blank');

  // // Open a new window and write the content to be printed
  // // newWin.document.open();
  // newWin.document.write('<html><body>' + contentToPrint.innerHTML + '</body></html>');
  // document.getElementById("printButton").addEventListener("click", function () {
  //   window.print();
  // });

  form.print_status = true;
  form.print_show = false;
};
const closeModal = () => {
  // emit("close_modal");
  form.print_show = false;
};
const print_checkout = () => {
  printReceipt();
  // emit("checkout__");
};

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};
const customerChange = (total, cash) => {
  let res_cash = parseFloat(cash.replace(/[^\d.]/g, ""));
  let res_total = parseFloat(total.replace(/[^\d.]/g, ""));

  return res_cash - res_total;
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

const totalAmount_ = () => {
  let total = 0;
  for (let index = 0; index < props.products.length; index++) {
    const element = props.products[index];
    total =
      total +
      parseFloat(
        applyDiscount(
          element.current_price.price,
          element.current_discount.discount
        ).discountedPrice
      );
  }

  return total;
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
  <div
    id="defaultModal"
    v-if="form.print_show == true"
    tabindex="-1"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 backdrop-blur-sm z-50 flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)]"
  >
    <div class="text-justify overflow-auto p-3 relative">
      <div
        id="toPrint"
        class="text-justify overflow-auto p-3 relative border bg-white flex-wrap"
      >
        <!-- <p class="text-center"> -->
        <!-- <small class="text-center"
          ><strong
            >CRISBODS HARDWARE AND<br />&nbsp;&nbsp;&nbsp;&nbsp;CONSTRUCTION SUPPLY</strong
          ></small
        ><br />
        <small class="text-center mb-5"
          >&nbsp;&nbsp;&nbsp;Dologon, Busco, Quezon Rd., <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maramag, Bukidnon, 8714</small
        ><br />
        <small>TIN: 487-279-975-00001</small><br />
        <small>Date: {{ dateNow() }} <br />Time:{{ timeNow() }}</small
        >
        </p>
        <br /> -->
        <!-- <small>Cashier: {{ cashierName }}<br />**************************************************</small -->
        <!-- > -->
        <!-- <small>Customer Name:</small>
        <br /> -->
        <!-- <small>Address: <br />**************************************************</small> -->
        <table class="">
          <thead>
            <tr class="border mb-2">
              <th><small>CRISBODS HARDWARE AND CONSTRUCTION SUPPLY</small></th>
            </tr>
            <tr class="border mb-2">
              <th>
                <small style="font-size: 10px"
                  >Dologon, Busco, Quezon Rd., Maramag, Bukidnon, 8714</small
                >
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
                <small style="font-size: 10px"
                  >*************************************</small
                >
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
                <small style="font-size: 10px;">{{ form.customer_address }}</small>
              </td>
            </tr>
            <tr>
              <td>
                <small style="font-size: 10px"
                  >*************************************</small
                >
              </td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <tr class="border mb-2">
              <th><small>Retail</small></th>
              <!-- <th><small>UPRICE</small></th> -->
              <th><small>QTY</small></th>
              <th><small>TOTAL</small></th>
            </tr>
          </thead>
          <tbody class="border">
            <tr v-for="(items, key) in form.products" :key="key">
              <td>
                <small>{{ stringTruncateFromCenter(items.name, 18) }} </small>
              </td>
              <!-- <td>
                <small>
                  {{
                    convert_money(
                      applyDiscount(
                        items.current_price.price,
                        items.current_discount.discount
                      ).discountedPrice
                    )
                  }}
                </small>
              </td> -->
              <td style="width: 20px">
                <small style="font-size: 10px; word-break: break-all">{{
                  items.cashier_quantity
                }}</small>
              </td>
              <td style="width: 60px">
                <small
                  id="totalPrice"
                  style="font-size:10px!important; word-break: break-all"
                  >{{
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
          <!-- <tfoot class="border">
            <tr>
              <td>
                <small>{{ form.products.length }} </small>
              </td>
              <td><small> --- </small></td>
              <td><small>---</small></td>
              <td>
                <small>{{ props.grand_total }} </small>
              </td>
            </tr>
          </tfoot> -->
        </table>
        <table class="">
          <tbody class="border">
            <tr>
              <td>
                <small style="font-size: 10px"
                  >*************************************</small
                >
              </td>
            </tr>
            <tr>
              <td>
                <small
                  >Special Discount({{ props.spDiscount }}%):
                  {{ props.spDiscount_value }}</small
                >
              </td>
            </tr>
            <tr>
              <td>
                <small>VAT ({{ props.vat__ }}%): {{ props.vat_value }}</small>
              </td>
            </tr>
            <tr>
              <td>
                <small> Subtotal (Excluding VAT): {{ props.subtotal_excluding_vat }} </small>
              </td>
            </tr>
            <tr>
              <td>
                <small>Subtotal Amount: {{ props.subtotal__ }}</small>
              </td>
            </tr>
            <tr>
              <td>
                <small style="font-size: 10px"
                  >*************************************</small
                >
              </td>
            </tr>
          </tbody>
        </table>
        <table class="">
          <thead>
            <tr class="border mb-2">
              <td>
                <small>TOTAL AMOUNT: {{ convert_money(props.grand_total) }}</small>
              </td>
            </tr>
            <tr class="border mb-2">
              <td>
                <small>CASH: {{ convert_money(form.cash) }}</small>
              </td>
            </tr>
            <tr class="border mb-2">
              <td>
                <small
                  >CHANGE:
                  {{ convert_money(form.cash - props.grand_total ) }}
                </small>
              </td>
            </tr>
          </thead>
          <tbody class="border">
            <tr>
              <td>
                <small style="font-size: 10px"
                  >*************************************</small
                >
              </td>
            </tr>
            <tr>
              <td>
                <small> This serve as an OFFICIAL RECEIPT </small>
                <small>Thank You, Come Again</small>
              </td>
            </tr>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td>
                <small style="font-size: 10px"
                  >*************************************</small
                >
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <small>------------------------------------------------------</small
        ><br />
        <small>Subtotal (Excluding VAT): {{ props.subtotal__ }} </small><br />
        <small>Subtotal Amount: {{ props.subtotal1__ }}</small>
        <br />
        <small>VAT ({{ props.vat__ }}%):{{ props.vat__ }}%</small><br />
        <small>Special Discount({{ props.spDiscount }}%)</small><br />
        <small>------------------------------------------------------</small
        ><br />
        <small>TOTAL AMOUNT: {{ props.grand_total }}</small
        ><br />
        <small>CASH: {{ props.cash__ }}</small
        ><br />
        <small
          >CHANGE:
          {{
            convert_money(customerChange(props.grand_total, props.cash__))
          }}</small
        ><br />

        <small class="mt-5 text-center">This serve as an OFFICIAL RECEIPT</small
        ><br />
        <small class="text-center">Thank You, Come Again</small><br />
        <small>--------------------------------------------------</small> -->
      </div>
      <div class="flex justify-center mt-3">
        <button
          id="printButton"
          type="button"
          @click="print_checkout()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Print
        </button>
        <button
          type="button"
          @click="closeModal()"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  button {
    display: none;
  }
}
</style>