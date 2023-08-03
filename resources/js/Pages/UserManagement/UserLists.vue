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
const props = defineProps(["users", "search"]);
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
  <section class="container px-4 mx-auto">
    <div class="flex flex-col mt-6">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden border border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-yellow-400">
                <tr>
                  <th scope="col" class="py-3.5 px-4 text-sm font-bold text-left rtl:text-right text-gray-900">
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

                  <th scope="col" class="px-12 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    Sex
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    Birthday
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    Hometown
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    Contact #
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    User Type
                  </th>

                  <th scope="col" class="px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-gray-900">
                    Actions
                  </th>

                </tr>
              </thead>
              
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(user, index) in props.users.data" :key="index">
                  <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
                    <div>
                      <h2 class="font-medium text-gray-800"> {{ user.name }}</h2>
                      <p class="text-sm font-normal text-gray-600">
                        {{ user.email }}
                      </p>
                    </div>
                  </td>
                  <td class="px-12 py-4 text-sm font-medium whitespace-nowrap" :class="user.sex == 0 ? 'text-pink-600' : 'text-blue-600' ">
                    {{ user.sex == 0 ? "Female" : "Male" }}
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap">
                    <div>
                      <h4 class="text-gray-700"> {{ function_extract_date_time(user.bday) }}</h4>

                    </div>
                  </td>

                  <td class="px-4 py-4 text-sm whitespace-nowrap  ">
                    <div class="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                      {{ user.address }}
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm whitespace-nowrap  ">
                    <div class="flex gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {{ user.contact_no }}
                    </div>
                  </td>

                  <td  v-if="user.type != 0" class=" text-sm whitespace-nowrap">
                    <Dropdown :status="user.type" :id="user.id" />
                  </td>
                  <td  v-if="user.type != 0" class=" text-sm whitespace-nowrap">
                    <button @click="function_open_modal_confirmation(true, user)"
                      class="p-2 bg-green-400 rounded-lg hover:bg-green-600 mr-2" v-if="user.status == 0 && user.type != 0">
                      Activate
                    </button>
                    <button @click="function_open_modal_confirmation(false, user)"
                      class="p-2 bg-red-400 rounded-lg hover:bg-red-600" v-else-if="user.status == 1 && user.type != 0">
                      Deactivate
                    </button>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between my-6">
      <Pagination2 :links="props.users.links" :search="props.search" />
      <p class="mt-6 text-sm text-gray-500">
      Showing {{ props.users.data.length }} Users
    </p>
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