<script setup>
import { Head, Link, usePage } from "@inertiajs/vue3";
import { onMounted } from "vue";
onMounted(() => {
  JsBarcode(".barcode").init();
});
</script>
<template>
  <Head :title="'Return'" />
  <div
    class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-700"
  >
    <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
      <Link
        :href="route('cashier.index')"
        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
      >
        Dashboard
      </Link>
    </div>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
      <div class="mt-16">
        <div class="text-center">
          <h1
            class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
          >
            Welcome back {{ usePage().props.auth.user.name }}!
          </h1>
          <p
            class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
          >
            "The nice thing about teamwork is that you always have others on
            your side." <br />- Margaret Carty
          </p>
          <div
            class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
          >
            <svg
              class="barcode w-[20vmin] h-[10vmin] mx-auto"
              jsbarcode-format="CODE128"
              :jsbarcode-value="'12345'"
              jsbarcode-textmargin="0"
              jsbarcode-fontoptions="bold"
            ></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>