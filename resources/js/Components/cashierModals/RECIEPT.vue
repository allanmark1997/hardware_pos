<script setup>

import { onMounted, ref } from "vue";
import moment from "moment";
const props = defineProps(['printModal', 'products', 'cashierName', 'cash__','grand_total','vat__','spDiscount','subtotal__','subtotal1__'])
const date = ref(Date.now())

const emit = defineEmits(['checkout__', 'close_modal'])

const printReceipt = () =>{
  var divContents = document.getElementById("toPrint").outerHTML; 
            var a = window.open('', '', 'height=500, width=200'); 
            a.document.write('<html>'); 
            a.document.write('<body><br>'); 
            a.document.write(divContents); 
            a.document.write('</body></html>'); 
            a.document.close(); 
            a.print(); 
}
const closeModal = () =>{
  emit('close_modal')
}
const print_checkout = () =>{
  printReceipt()
  emit('checkout__')
}

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};
const customerChange = (total,cash) => {
  
let res_cash = parseFloat(cash.replace(/[^\d.]/g, ''));
let res_total = parseFloat(total.replace(/[^\d.]/g, ''));

return res_cash - res_total
}
const dateNow = () => {
  return moment(date).format("MM/DD/YYYY");
}


const timeNow = () => {
  return moment(date).format("h:mm:ss a");
}

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

const totalAmount_ = () =>{
  let total = 0
  for (let index = 0; index < props.products.length; index++) {
    const element = props.products[index];
    total = total + parseFloat(applyDiscount(element.current_price.price, element.current_discount.discount).discountedPrice)
    
  }

  return total
}
const stringTruncateFromCenter =(str, maxLength) => {
    const midChar = "…";      // character to insert into the center of the result
    var left, right;

    if (str.length <= maxLength) return str;

    // length of beginning part      
    left = Math.ceil(maxLength / 2);

    // start index of ending part   
    right = str.length - Math.floor(maxLength / 2) + 1;   

    return str.substr(0, left) + midChar + str.substring(right);
}

</script>




<template>
  <div id="defaultModal" v-if="printModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 backdrop-blur-sm  z-50  flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] ">
    <div class="text-justify overflow-auto  p-3 relative ">
      <div id="toPrint" class="text-justify overflow-auto  p-3 relative border bg-white flex-wrap">
        <small class="text-center"><strong>CRISBODS HARDWARE AND CONSTRUCTION SUPPLY</strong></small><br>
        <small class="text-center mb-5">Dologon, Busco, Quezon Rd., Maramag, Bukidnon, 8714</small><br>
        <small>TIN: 487-279-975-00001</small><br>
        <small>Date: {{ dateNow() }} Time:{{ timeNow() }}</small><br>
        <small>Cashier: {{ cashierName }}</small><br>
        <small>-----------------------------------------------------</small><br>
        <small>Customer Name:</small><br>
        <small>Address:</small><br>
        <small>-----------------------------------------------------</small><br>
        <table class="">
          <thead>
            <tr class="border mb-2">
              <th><small>Retail </small></th>
              <th><small>UPRICE </small></th>
              <th><small>QTY </small></th>
              <th><small>TOTAL </small></th>
            </tr>
          </thead>
          <tbody class="border">
            <tr v-for="items in props.products">
              <td><small>{{ stringTruncateFromCenter(items.name, 18) }} </small></td>
              <td><small> {{ convert_money(applyDiscount(items.current_price.price, items.current_discount.discount).discountedPrice) }} </small></td>
              <td><small>{{items.cashier_quantity}}</small></td>
              <td><small id="totalPrice">{{convert_money(applyDiscount(items.current_price.price, items.current_discount.discount).discountedPrice * items.cashier_quantity)}} </small></td>
             
            </tr>
          </tbody>
          <tfoot class="border">
            <tr>
              <td><small>{{ props.products.length }} </small></td>
              <td><small> --- </small></td>
              <td><small>---</small></td>
              <td><small>{{convert_money(totalAmount_())}} </small></td>
            </tr>
          </tfoot>
        </table>
        <small>------------------------------------------------------</small><br>
        <small>Subtotal (Excluding VAT): {{ props.subtotal__ }} </small><br>
        <small>Subtotal Amount: {{ props.subtotal1__ }}</small><br>
        <small>VAT ({{ props.vat__ }}%):{{ props.vat__ }}%</small><br>
        <small>Special Discount({{ props.spDiscount }}%)</small><br>
        <small>------------------------------------------------------</small><br>
        <small>TOTAL AMOUNT: {{ props.grand_total }}</small><br>
        <small>CASH: {{props.cash__}}</small><br>
        <small>CHANGE: {{convert_money(customerChange(props.grand_total, props.cash__ ))}}</small><br>


        <small class="mt-5 text-center">This serve as an OFFICIAL RECEIPT</small><br>
        <small class="text-center">Thank You, Come Again</small><br>
      </div>
      <div class="flex justify-center mt-3">
        <button type="button" @click="print_checkout()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Print</button>
          <button type="button" @click="closeModal()"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Close</button>
      </div>
    </div>
  </div>
</template>