<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import UserLists from "./UserLists.vue";
import Input from "@/Components/Input.vue";
import JetDialogModal from "@/Components/DialogModal.vue";
import { ref } from "vue";
import { useForm, usePage } from "@inertiajs/vue3";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Button from "@/Components/Button.vue";
import Input2 from "@/Components/InputCustom.vue";

const props = defineProps(["users"]);
const addModal = ref(false);
const sex_ = ref(false);
const status_ = ref(false);
const type_ = ref(false);
const form = useForm({
  name: "",
  fname: "",
  mname: "",
  lname: "",
  sex: false,
  birthday: "",
  address: "",
  contact_no: "",
  status: true,
  type: null,
  email: "",
  password: "password",
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
const add_user = () => {};
</script>

<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        User Management
      </h2>
    </template>

    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <Input
            class="rounded-lg mb-2 w-[30vmin]"
            type="text"
            label="Search users"
          />
          <button
            @click="open_modal_add"
            class="bg-green-300 p-2 mb-2 mt-5 rounded-lg w-[15vmin] hover:bg-green-500"
          >
            Add user
          </button>
        </div>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <UserLists :users="props.users" />
        </div>
      </div>
    </div>
    <JetDialogModal :show="addModal" @close="addModal = false" maxWidth="2xl">
      <template #title> Add User </template>
      <template #content>
        <div class="flex-shrink-0">
          <img
            class="w-10 h-10 rounded-full"
            :src="usePage().props.auth.user.profile_photo_url"
            :alt="usePage().props.auth.user.name"
          />
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
          <div class="col-span-4">
            <Input
              label="First name"
              type="text"
              class="mt-1 block w-full"
              v-model="form.fname"
              autofocus
            />
            <JetInputError :message="form.errors.fname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input
              label="Middle Name"
              type="text"
              class="block w-full"
              v-model="form.mname"
              autofocus
            />
            <JetInputError :message="form.errors.mname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input
              label="Last Name"
              type="text"
              class="block w-full"
              v-model="form.lname"
              autofocus
            />
            <JetInputError :message="form.errors.lname" class="mt-2" />
          </div>
          <div class="col-span-4">
            <!-- <select name="" id="" v-model="form.sex">
              <option value="0">Female</option>
              <option value="1">Male</option>
            </select> -->
            <button
              @click="open_selection_sex"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button"
            >
              Select Sex
              <svg
                class="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              v-if="sex_"
              id="dropdown"
              class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Female
                  </a>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Male
                  </a>
                </li>
              </ul>
            </div>
            <JetInputError :message="form.errors.sex" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input
              label="Birthday"
              type="date"
              class="block w-full"
              v-model="form.birthday"
              autofocus
            />
            <JetInputError :message="form.errors.birthday" class="mt-2" />
          </div>
          <div class="col-span-4">
            <Input
              label="Contact No"
              type="text"
              class="block w-full"
              v-model="form.contact_no"
              autofocus
            />
            <JetInputError :message="form.errors.contact_no" class="mt-2" />
          </div>
          <div class="col-span-12">
            <Input
              label="Permanent Address"
              type="text"
              class="block w-full"
              v-model="form.address"
              autofocus
            />
            <JetInputError :message="form.errors.address" class="mt-2" />
          </div>
          <div class="col-span-6">
            <!-- <select name="" id="" v-model="form.status">
              <option value="0">Activate</option>
              <option value="1">Deactivate</option>
            </select> -->
            <button
              @click="open_selection_status"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button"
            >
              Select Status
              <svg
                class="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              v-if="status_"
              id="dropdown"
              class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Active
                  </a>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Inactive
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
            <button
              @click="open_selection_type"
              class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300 mt-5 w-full"
              type="button"
            >
              Select Type
              <svg
                class="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <div
              v-if="type_"
              id="dropdown"
              class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
            >
              <ul class="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Administrator
                  </a>
                  <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                    >Cashier
                  </a>
                </li>
              </ul>
            </div>
            <JetInputError :message="form.errors.type" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input
              label="Email"
              type="text"
              class="block w-full"
              v-model="form.email"
              autofocus
              placeholder="Ex:Johndoe@gmail.com"
            />
            <JetInputError :message="form.errors.email" class="mt-2" />
          </div>
          <div class="col-span-6">
            <Input
              label="Password"
              type="text"
              class="block w-full"
              v-model="form.password"
              autofocus
            />
            <JetInputError :message="form.errors.password" class="mt-2" />
          </div>
        </div>
      </template>
      <template #footer>
        <SecondaryButton @click="addModal = false" class="mr-2">
          nevermind
        </SecondaryButton>
        <Button
          :class="{ 'opacity-25': form.processing }"
          :disabled="form.processing"
          @click="add_user"
          class="bg-green-200 hover:bg-green-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            /></svg
          >&nbsp;Save
        </Button>
      </template>
    </JetDialogModal>
  </AppLayout>
</template>