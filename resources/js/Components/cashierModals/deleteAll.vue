<script setup>
const props = defineProps(['modalDelete'])

</script>


<template>
  <div  v-if="props.modalDelete" id="defaultModal" tabindex="-1" aria-hidden="true"
      class="fixed top-0 left-0 right-0 backdrop-blur-sm  z-50 pt-52 flex justify-center  item-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow ">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 class="text-xl font-semibold text-gray-900 ">
              Delete All?
            </h3>
            <button type="button"  
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center "
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
            <p class="text-base leading-relaxed text-gray-500 ">
              Are you sure you want to delete all transactions?
            </p>
          
          </div>
          <!-- Modal footer -->
          <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
            <button data-modal-hide="defaultModal" type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">I
            accept</button>
          <button data-modal-hide="defaultModal" type="button"  
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Decline</button>
        </div>
      </div>
    </div>
  </div>

</template>