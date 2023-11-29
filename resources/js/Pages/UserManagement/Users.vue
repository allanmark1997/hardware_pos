<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import UserLists from "./UserLists.vue";
import Input from "@/Components/Input.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import { ref } from "vue";
import { router, useForm, usePage } from "@inertiajs/vue3";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Input2 from "@/Components/InputCustom.vue";
import JetInputError from "@/Components/InputError.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["users", "search"]);
const addModal = ref(false);
const sex_ = ref(false);
const status_ = ref(false);
const type_ = ref(false);
const sex_label = ref("Select Sex");
const status_label = ref("Select Status");
const type_label = ref("Select Type");
const post_image = ref([]);
const search = ref(props.search);
const form = useForm({
  fname: "",
  mname: "",
  lname: "",
  sex: null,
  birthday: null,
  address: "",
  contact_no: "",
  status: null,
  type: null,
  email: "",
  password: "password",
  image: [],
});

const open_modal_add = () => {
  addModal.value = !addModal.value;
};

const open_selection_sex = () => {
  sex_.value = !sex_.value;
};

const open_selection_status = () => {
  status_.value = !status_.value;
};

const open_selection_type = () => {
  type_.value = !type_.value;
};

const select_sex = (data) => {
  form.sex = data;
  if (data == false) {
    sex_label.value = "Female";
  } else {
    sex_label.value = "Male";
  }
  sex_.value = !sex_.value;
};

const select_status = (data) => {
  form.status = data;
  if (data == false) {
    status_label.value = "Inactive";
  } else {
    status_label.value = "Active";
  }
  status_.value = !status_.value;
};

const select_type = (data) => {
  form.type = data;
  if (data == 1) {
    type_label.value = "Administrator";
  } else {
    type_label.value = "Cashier";
  }
  type_.value = !type_.value;
};

const add_user = () => {
  form.post(route("users.add_user"), {
    preserveScroll: true,
    onSuccess: () => {
      toast.success("User successfully added!", {
        autoClose: 1000,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.TOP_RIGHT,
      });
      addModal.value = !addModal.value;
      form.reset();
      sex_label.value.reset();
      status_label.value.reset();
      type_label.value.reset();
    },
    onError: (error) => {
      // toast.error("Something went wrong! " + error, {
      //   autoClose: 1000,
      //   transition: toast.TRANSITIONS.FLIP,
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    },
  });
};
const search_ = () => {
  router.get(route("users.index", { search: search.value }));
};
const search_remove = () => {
  search.value = "";
  router.get(route("users.index", { search: search.value }));
};

const openFile = () => {
  let hidden = document.getElementById("profile_photo");
  hidden.click();
  hidden.onchange = (e) => {
    post_image.value.push(window.URL.createObjectURL(e.target.files[0]));
    form.image = e.target.files[0];
  };
};

const dragFile = (e) => {
  e.preventDefault();
  for (const file of e.dataTransfer.files) {
    var objectURL = URL.createObjectURL(file);
    post_image.value.push(objectURL);
    form.image = file;
  }
};

const remove_image = (key) => {
  post_image.value.splice(key, 1);
  form.image = null;
  toast.warn("Image remove", {
    autoClose: 1000,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
};
</script>

<template>
  <AppLayout title="User management">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        User Management
      </h2>
    </template>

    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <div class="flex">
            <Input v-model="search" class="rounded-lg mb-2 w-[30vmin]" type="text" label="Search users"
              @keyup.enter="search_" />
            <button class="p-2 h-10 my-auto mt-5" v-if="search" @click="search_remove">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          <button @click="open_modal_add" class="bg-yellow-400 p-2 mb-2 mt-5 rounded-lg w-[15vmin] hover:bg-yellow-500">
            Add user
          </button>
        </div>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <UserLists :users="props.users" :search="search" />
        </div>
      </div>
    </div>
    <JetDialogModal :show="addModal" @close="addModal = false" maxWidth="2xl">
      <template #title> Add User </template>
      <template #content>
        <div class="flex-shrink-0">
          <img class="w-10 h-10 rounded-full" :src="usePage().props.auth.user.profile_photo_url"
            :alt="usePage().props.auth.user.name" />
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ usePage().props.auth.user.name }}
          </p>
          <p class="text-sm text-gray-500 truncate">
            {{ usePage().props.auth.user.email }}
          </p>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div v-if="post_image.length != 0" class="col-span-12 mx-auto">
            <template v-for="(image, key) in post_image" :key="key">
              <div class="flex-shrink-0">
                <img class="w-16 h-16 rounded-full" :src="image" />
                <button @click="remove_image(key)" class="flex text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path class="text-red-500" stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  <span class="text-red-500">Remove</span>
                </button>
              </div>
            </template>
          </div>
          <div v-if="post_image.length != 1" class="col-span-12" @dragover.prevent @drop.prevent>
            <label @drop="dragFile" @click="openFile" for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-8 h-8 mb-1 text-gray-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or JPEG (MAX.1024kb)
                </p>
              </div>
              <input id="profile_photo" type="file" accept="image/png, image/gif, image/jpeg" class="hidden" />
            </label>
            <JetInputError :message="form.errors.image" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input label="First name" type="text" class="mt-1 block w-full" v-model="form.fname" autofocus />
            <JetInputError :message="form.errors.fname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input label="Middle Name" type="text" class="block w-full" v-model="form.mname" autofocus />
            <JetInputError :message="form.errors.mname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input label="Last Name" type="text" class="block w-full" v-model="form.lname" autofocus />
            <JetInputError :message="form.errors.lname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <button @click="open_selection_sex"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button">
              {{ sex_label }}
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-if="sex_" id="dropdown" class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a @click="select_sex(false)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Female
                  </a>
                  <a @click="select_sex(true)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Male
                  </a>
                </li>
              </ul>
            </div>
            <JetInputError :message="form.errors.sex" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input label="Birthday" type="date" class="block w-full" v-model="form.birthday" autofocus />
            <JetInputError :message="form.errors.birthday" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input label="Contact No" type="text" class="block w-full" v-model="form.contact_no" autofocus />
            <JetInputError :message="form.errors.contact_no" class="mt-2" />
          </div>
          <div class="col-span-12">
            <Input label="Permanent Address" type="text" class="block w-full" v-model="form.address" autofocus />
            <JetInputError :message="form.errors.address" class="mt-2" />
          </div>
          <div class="col-span-6">
            <!-- <select name="" id="" v-model="form.status">
              <option value="0">Activate</option>
              <option value="1">Deactivate</option>
            </select> -->
            <button @click="open_selection_status"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button">
              {{ status_label }}
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-if="status_" id="dropdown"
              class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a @click="select_status(true)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Active
                  </a>
                  <a @click="select_status(false)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Inactive
                  </a>
                </li>
              </ul>
            </div>
            <JetInputError :message="form.errors.status" class="mt-2" />
          </div>
          <div class="col-span-6">
            <!-- <select name="" id="" v-model="form.type">
              <option value="0">Administrator</option>
              <option value="1">Cashier</option>
            </select> -->
            <button @click="open_selection_type"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button">
              {{ type_label }}
              <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div v-if="type_" id="dropdown"
              class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute">
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a @click="select_type(1)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Administrator
                  </a>
                  <a @click="select_type(3)" class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">Cashier
                  </a>
                </li>
              </ul>
            </div>
            <JetInputError :message="form.errors.type" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input label="Email" type="text" class="block w-full" v-model="form.email" autofocus
              placeholder="Ex:Johndoe@gmail.com" />
            <JetInputError :message="form.errors.email" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input label="Password" type="password" class="block w-full" v-model="form.password" autofocus />
            <JetInputError :message="form.errors.password" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="addModal = false" class="mr-2">
          Cancel
        </SecondaryButton>
        <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing" @click="add_user"
          class="bg-yellow-200 hover:bg-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>&nbsp;Save
        </Button>
      </template>
    </JetDialogModal>
  </AppLayout>
</template>