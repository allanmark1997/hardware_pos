<script setup>

import { onMounted, ref } from "vue";
const props = defineProps(['SKULookup', 'products'])

const search = ref('')
const productTemp = ref([
  {
    name: 'AF1',
    imgSrc: 'https://th.bing.com/th/id/OIP.gskj3fuAc3TMy9_NLV4-swHaJ4?pid=ImgDet&rs=1',
    price: 2000
  },
  {
    name: 'kobe IV',
    imgSrc: 'https://th.bing.com/th/id/R.c0b464ee5bf466b0774fd958cd49d671?rik=4BKsxct35mNq%2fg&riu=http%3a%2f%2fcontents.spin.ph%2fimage%2fresize%2fimage%2f2019%2f02%2f23%2fnike-kobe-iv-protro-1550916244.webp&ehk=HWW%2b6sYFBuz%2fZMO%2b2yAwK5n%2fujbgm5fG%2fEBuFgcVPyU%3d&risl=&pid=ImgRaw&r=0',
    price: 3000
  },
  {
    name: 'SB freedy',
    imgSrc: 'https://th.bing.com/th/id/OIP.PpVn4AnJf178qD-1dZGs5AHaEc?pid=ImgDet&rs=1',
    price: 2300
  },
  {
    name: 'J1 blacktoe',
    imgSrc: 'https://sneakernews.com/wp-content/uploads/2019/02/air-jordan-1-low-black-toe-553558-116-2.jpg',
    price: 2023
  }
])



const shownProd = ref({
  name: '',
  imgSrc: '',
  price: null
})


const showProduct = (value) => {
  shownProd.value = value
  console.log(shownProd.value)
}

onMounted(() => {
  shownProd.value = ""
})
</script>


<template>
  <div v-if="props.SKULookup" id="defaultModal" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 backdrop-blur-sm z-50 pt-30 flex justify-center  item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-3xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow ">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t ">
          <h3 class="text-xl font-semibold text-gray-900 ">
            Look Up
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <input type="text" v-model="search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="SKU Lookup">
          <div class="max-h-md ">

            <div v-if="!search" role="status"
              class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
              <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
                <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" viewBox="0 0 20 18">
                  <path
                    d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div class="w-full">
                <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
              </div>
              <span class="sr-only">Loading...</span>
            </div>

            <div v-else role="status" class="space-y-1  md:space-y-0 md:space-x-1 md:flex md:items-center">
              <div v-for="items in props.products">
                <button type="button" v-if="items.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())"
                  @click="showProduct(items)"
                  class="inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 overflow-hidden">
                  <img :src="items.product_image" class="max-w-2xl w-10 rounded-lg  mr-2 object-contain max-h-auto h-10">
                  {{ items.name }}<br>₱ {{ items.current_price.price }}
                </button>
              </div>
            </div>

          </div>

        </div>
        <!-- Modal footer -->
        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">

          <div v-if="!shownProd.name " role="status"
            class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
            <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 ">
              <svg class="w-10 h-10 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 18">
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div class="w-full">
              <div class="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
              <div class="h-2 bg-gray-200 rounded-full  max-w-[480px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full  max-w-[440px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full  max-w-[460px] mb-2.5"></div>
              <div class="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
          <!-- component -->
          <div v-else class="flex flex-col justify-center ">
            <div v-if="search != ''"
              class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
              <div class="w-full md:w-1/3 bg-white grid place-items-center">
                <img :src="shownProd.product_image" alt="tailwind logo" class="rounded-xl" />
              </div>
              <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                <div class="flex justify-between item-center">
                  <p class="text-gray-500 font-medium hidden md:block">Stocks: {{ shownProd.quantity }}</p>
                  <div class="flex gap-1">
                    <div class="bg-red-500 px-3 py-1 rounded-full text-xs font-medium text-white  ">
                      {{ shownProd.current_discount.discount }}% Discount</div>

                  </div>

                </div>
                <h3 class="font-black  text-gray-800 md:text-3xl text-xl">{{ shownProd.name }}</h3>
                <p class="md:text-lg text-gray-500 text-base"><strong>Barcode:{{ shownProd.barcode }}</strong></p>
                <p class="md:text-lg text-gray-500 text-base"><strong>Details:</strong></p>
                <p class="md:text-lg text-gray-500 text-base">{{ shownProd.description.details }}</p>
                <p class="md:text-lg text-orange-800 text-base">
                  <strong>{{ shownProd.description.specification.spec_title }}</strong></p>

                <p v-for="specs in shownProd.description.specification.spec_details"><strong>{{ specs.spec_name }}:
                  </strong> {{ specs.spec_details }}</p>




                <div class="text-xl flex justify-end font-black text-gray-800">
                  ₱ {{ shownProd.current_price.price }}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>