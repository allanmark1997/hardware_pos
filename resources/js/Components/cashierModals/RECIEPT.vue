<script setup>

import { onMounted, ref } from "vue";
import moment from "moment";
const props = defineProps(['printModal', 'products', 'cashierName', 'cash__','grand_total','vat__','spDiscount','subtotal__','subtotal1__'])
const date = ref(Date.now())

const printReceipt = () =>{
  var divContents = document.getElementById("toPrint").innerHTML; 
            var a = window.open('', '', 'height=500, width=500'); 
            a.document.write('<html>'); 
            a.document.write('<body><br>'); 
            a.document.write(divContents); 
            a.document.write('</body></html>'); 
            a.document.close(); 
            a.print(); 
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


</script>




<template>
  <div id="defaultModal" v-if="printModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 backdrop-blur-sm  z-50  flex justify-center item-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] ">
    <div class="text-justify overflow-auto  p-3 relative ">
      <div id="toPrint" class="text-justify overflow-auto  p-3 relative border bg-white">
        <p class="text-center"><strong>CRISBODS HARDWARE AND CONSTRUCTION SUPPLY</strong></p>
        <p class="text-center mb-5">Dologon, Busco, Quezon Rd., Maramag, Bukidnon, 8714</p>
        <p>TIN: 487-279-975-00001</p>
        <p>Date: {{ dateNow() }} Time:{{ timeNow() }}</p>
        <p>Cashier: {{ cashierName }}</p>
        <p>-----------------------------------------------------</p>
        <p>Customer Name:</p>
        <p>Address:</p>
        <p>-----------------------------------------------------</p>
        <table class="">
          <thead>
            <tr class="border mb-2">
              <th>Retail</th>
              <th>UPRICE</th>
              <th>QTY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody class="border">
            <tr>
              <td>20</td>
              <td>24</td>
              <td>1961</td>
              <td>1961</td>
            </tr>
          </tbody>
          <tfoot class="border">
            <tr>
              <td>8 Item(s)</td>
              <td>Total</td>
              <td>9</td>
              <td>6,209</td>
            </tr>
          </tfoot>
        </table>
        <p>------------------------------------------------------</p>
        <p>Subtotal (Excluding VAT): {{ props.subtotal__ }} </p>
        <p>Subtotal Amount: {{ props.subtotal1__ }}</p>
        <p>VAT ({{ props.vat__ }}%):{{ props.vat__ }}%</p>
        <p>Special Discount({{ props.spDiscount }}%)</p>
        <p>------------------------------------------------------</p>
        <p>TOTAL AMOUNT: {{ props.grand_total }}</p>
        <p>CASH: {{props.cash__}}</p>
        <p>CHANGE: {{convert_money(customerChange(props.grand_total, props.cash__ ))}}</p>


        <p class="mt-5 text-center">This serve as an OFFICIAL RECEIPT</p>
        <p class="text-center">Thank You, Come Again</p>
      </div>
      <div class="flex justify-center mt-3">
        <button type="button" @click="printReceipt()"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Print</button>
          <button type="button" @click="$emit('close_modal')"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Close</button>
      </div>
    </div>
  </div>
</template>