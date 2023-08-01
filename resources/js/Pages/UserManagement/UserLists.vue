<script setup>
import Pagination2 from "@/Components/Pagination2.vue";
import Pagination from "@/Components/Pagination.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Dropdown from "@/Components/CustomDropdownPosition.vue";

import moment from "moment";
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
const props = defineProps(["users"]);
const condfirmationModal = ref(false);
const selected_user = ref("");

const form = useForm({
  status: null,
  type: true,
});

const function_open_modal_confirmation = (data, user) => {
  form.status = data;
  selected_user.value = user;
  condfirmationModal.value = !condfirmationModal.value;
};

const function_extract_date_time = (date) => {
  return moment(date).format("MMMM Do YYYY");
};

const function_update = () => {
  form.put(route("users.update_user", { user: selected_user.value }), {
    preserveScroll: true,
    onSuccess: () => {
      alert("success");
      condfirmationModal.value = !condfirmationModal.value;
      form.reset();
      selected_user.value.reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
</script>
<template>
  <ul class="max-w-full divide-y divide-gray-200 p-2">
    <li class="pb-3 hover:bg-blue-50" v-for="(user, index) in props.users.data" :key="index">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img class="w-8 h-8 rounded-full" :src="user.profile_photo_url" :alt="user.name" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user.name }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ user.email }}
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ user.sex == 0 ? "Female" : "Male" }}
          <p class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]">
            Sex
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ function_extract_date_time(user.bday) }}
          <p class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]">
            Birthday
          </p>
        </div>
        <div class="items-center text-sm text-gray-900 w-1/4 truncate text-center" :title="user.address">
          {{ user.address }}
          <p class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]">
            Hometown
          </p>
        </div>
        <div class="items-center text-sm text-gray-900">
          {{ user.contact_no }}
          <p class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]">
            Contact number
          </p>
        </div>
        <!-- <div class="items-center text-sm text-gray-900">
          {{ user.type == 0 || user.type == 1 ? "Administrator" : "Cashier" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Position
          </p>
        </div> -->
        <Dropdown v-if="user.type != 0" :status="user.type" :id="user.id" />
        <!-- <div class="items-center text-sm text-gray-900 p-2">
          {{ user.status == 1 ? "Active" : "Deactivated" }}
          <p
            class="text-center text-xs text-gray-500 bg-gray-200 rounded-sm p-[0.1vmin]"
          >
            Status
          </p>
        </div> -->
        <div class="items-center text-sm text-gray-900 p-2">
          <!-- <button class="p-2 bg-orange-400 rounded-lg mr-2 hover:bg-orange-600">
            Edit
          </button> -->
          <button @click="function_open_modal_confirmation(true, user)"
            class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2" v-if="user.status == 0 && user.type != 0">
            Activate
          </button>
          <button @click="function_open_modal_confirmation(false, user)"
            class="p-2 bg-red-400 rounded-lg hover:bg-red-600" v-else-if="user.status == 1 && user.type != 0">
            Deactivate
          </button>
        </div>
      </div>
    </li>
    <Pagination2 :links="props.users.links" />
    <!-- <Pagination :links="props.users.links" /> -->
  </ul>
  <section class="container px-4 mx-auto">
    <h2 class="text-lg font-medium text-gray-800 ">Customers</h2>

    <p class="mt-1 text-sm text-gray-500 ">These companies have purchased in the last 12 months.</p>

    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200 ">

            <table class="min-w-full divide-y divide-gray-200 ">
              <thead class="bg-yellow-500">
                <tr>
                  <th scope="col"
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-900 ">
                    <button class="flex items-center gap-x-3 focus:outline-none">
                      <span>User</span>

                      <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                          fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                        <path
                          d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                          fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                        <path
                          d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                          fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                      </svg>
                    </button>
                  </th>

                  <th scope="col"
                    class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900 ">
                    Sex
                  </th>

                  <th scope="col"
                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900 ">
                    Birthday
                  </th>

                  <th scope="col"
                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900 ">
                    Hometown</th>

                  <th scope="col"
                    class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-900 ">
                    Contact #</th>

                  <th scope="col" class="relative py-3.5 px-4">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200 ">
                <tr>
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                      <h2 class="font-medium text-gray-800 ">Catalog</h2>
                      <p class="text-sm font-normal text-gray-600 ">catalogapp.io</p>
                    </div>
                  </td>
                  <td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
                    <div
                      class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                      Customer
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                      <h4 class="text-gray-700 ">Content curating app</h4>
                      <p class="text-gray-500 ">Brings all your news into one place</p>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div class="flex items-center">
                      <img
                        class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full  shrink-0"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                        alt="">
                      <img
                        class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full  shrink-0"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                        alt="">
                      <img
                        class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full  shrink-0"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1256&q=80"
                        alt="">
                      <img
                        class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full  shrink-0"
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                        alt="">
                      <p
                        class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                        +4</p>
                    </div>
                  </td>

                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div class="w-48 h-1.5 bg-blue-200 overflow-hidden rounded-full">
                      <div class="bg-blue-500 w-2/3 h-1.5"></div>
                    </div>
                  </td>

                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <button
                      class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </button>
                  </td>
                </tr>

    

           
            </tbody>
          </table>

        </div>
      </div>
    </div>
  </div>

  <div class="flex items-center justify-between mt-6">
    <a href="#"
      class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-5 h-5 rtl:-scale-x-100">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
      </svg>

      <span>
        previous
      </span>
    </a>

  </div>
</section>
<JetDialogModal :show="condfirmationModal" @close="condfirmationModal = false" maxWidth="2xl">
  <template #title> Are you sure you want to update this user?</template>
  <template #content>
    <p class="text-red-500">
      Clicking can update the system and this is not reversible!
    </p>
  </template>
  <template #footer>
    <SecondaryButton @click="condfirmationModal = false" class="mr-2">
      nevermind
    </SecondaryButton>
    <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing"
      class="bg-green-200 hover:bg-green-400" @click="function_update">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>&nbsp;Submit
    </Button>
  </template>
</JetDialogModal></template>