<script setup>
import Icon from "@/Components/Icon.vue";
import Input from "@/Components/Input.vue"
import { Head, Link, useForm, usePage } from "@inertiajs/vue3";
import { onMounted } from "vue";
import moment from "moment";
const props = defineProps(["search", "transaction"])

const form = useForm({
  search: props.search ?? "",
})

onMounted(() => {
});

const search_transaction = () => {
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true
  })
}
const search_remove = () => {
  form.search = ''
  form.get(route("cashier.index_return"), {
    preserveScroll: true,
    preserveState: true
  })
}

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};
</script>
<template>
  <Head :title="'Return'" />
  <div class="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-700">
    <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right z-10">
      <Link :href="route('cashier.index')"
        class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
      Dashboard
      </Link>
    </div>
    <div class="max-w-7xl mx-auto p-6 lg:p-8">
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
            <Input label="Transaction Code" class="rounded-lg w-full mb-2" type="text" v-model="form.search"
              @keyup.enter="search_transaction" />
            <button v-if="search" class="my-auto mx-auto" @click="search_remove">
              <Icon icon="close_icon" size="sm" />
            </button>
          </div>
          <div>
            <p class="text-2xl text-white" v-if="props.transaction == null">
              No Results
            </p>
            <div v-else class="container mx-auto my-5 p-5">
              <div class="md:flex no-wrap md:-mx-2 ">
                <!-- Left Side -->
                <div class="w-full md:w-3/12 md:mx-2">
                  <!-- Profile Card -->
                  <div class="bg-white p-3 border-t-4 border-green-400">
                    <p class="text-left text-xs text-gray-700 font-bold">
                      #{{ transaction?.id }}
                    </p>
                    <p class="text-left text-xs text-gray-700 font-bold">
                      {{ transaction?.code }}
                    </p>
                    <div class="image overflow-hidden">
                      <img class="h-auto w-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt="">
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ transaction?.name }}</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">{{ transaction?.address }}</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span class="flex gap-2">
                        Cashier:
                        <img class="rounded-full w-10 h-10" :src="transaction?.accommodate_by.profile_photo_url" alt="">
                        {{ transaction?.accommodate_by.name }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Payment Method: {{ transaction?.payment_method }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        VAT({{ transaction?.tax.tax }}%): {{ convert_money(1000) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Special Discount({{ transaction?.special_discount?.discount ?? 0 }}%): {{ convert_money(1000) }}
                      </span>
                    </p>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6 text-left">
                      <span>
                        Cash Rendered: {{ convert_money(transaction?.cash) }}
                      </span>
                    </p>
                    <ul
                      class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li class="flex items-center py-3">
                        <span>Status</span>
                        <span class="ml-auto">
                          <span v-if="transaction?.status == 1" class="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            Active
                          </span>
                          <span v-else class="bg-red-500 py-1 px-2 rounded text-white text-sm">
                            Cancelled
                          </span>
                        </span>
                      </li>
                      <li class="flex items-center py-3">
                        <span>Transaction Date</span>
                        <span class="ml-auto overflow-hidden text-sm">
                          {{ moment(transaction?.created_at).format("MMMM D, YYYY")
                          }}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <!-- End of profile card -->
                </div>
                <!-- Right Side -->
                <div class="w-full md:w-9/12 mx-2 h-64">
                  <!-- Profile tab -->
                  <!-- About Section -->
                  <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span class="tracking-wide">About</span>
                    </div>
                    <div class="text-gray-700">
                      <div class="grid md:grid-cols-2 text-sm">
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">First Name</div>
                          <div class="px-4 py-2">Jane</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Last Name</div>
                          <div class="px-4 py-2">Doe</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Gender</div>
                          <div class="px-4 py-2">Female</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Contact No.</div>
                          <div class="px-4 py-2">+11 998001001</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Current Address</div>
                          <div class="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Permanant Address</div>
                          <div class="px-4 py-2">Arlington Heights, IL, Illinois</div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Email.</div>
                          <div class="px-4 py-2">
                            <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                          </div>
                        </div>
                        <div class="grid grid-cols-2">
                          <div class="px-4 py-2 font-semibold">Birthday</div>
                          <div class="px-4 py-2">Feb 06, 1998</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- End of about section -->
                  <!-- End of profile tab -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>