<script setup>
import Icon from "@/Components/Icon.vue";
import { Head, Link, router, useForm, usePage } from "@inertiajs/vue3";
import { ref } from "vue";

const props = defineProps(["domain"]);
const logout_data = useForm({
  data: null,
});
const logout = () => {
  logout_data.post(route("logout"));
};
const profile = () => {
  logout_data.get(route('profile.show'));
};
</script>

<template>
  <Head :title="'Welcome'" />
  <div
    :class="`relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-no-repeat bg-[url('${props.domain}/storage/logo/wrenches.jpg')] bg-gray-700 bg-blend-multiply`">
    <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10 gap-4">
      <Link @click="profile"
        class="font-semibold text-green-600 hover:text-green-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer flex">
      <Icon icon="user" size="sm" />
      Profile
      </Link>
      <Link @click="logout"
        class="font-semibold text-red-600 hover:text-red-400 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 cursor-pointer flex">
      <Icon icon="logout" size="md" />
      Logout
      </Link>

    </div>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <div class="flex justify-center">
        <img class="mx-auto py-auto" src="" alt="" />
      </div>

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
            <a :href="route('cashier.index_transaction')"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
              Get started
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
            <a :href="route('cashier.index_return')"
              class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300">
              Return Items
              <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>