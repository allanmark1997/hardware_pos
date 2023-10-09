<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Welcome from "@/Components/Welcome.vue";
const year_sales = [
  {
    name: "Niknaks",
    data: {
      January: 1,
      February: 2,
      April: 8,
      May: 2,
      June: 4,
      July: 11,
      August: 12,
      September: 160,
      October: 128,
      November: 110,
      December: 10,
    },
  },
  {
    name: "Call parents",
    data: {
      January: 2,
      February: 4,
      April: 10,
      May: 20,
      June: 40,
      July: 110,
      August: 120,
      September: 160,
      October: 128,
      November: 110,
      December: 10,
    },
  },
];

const month_sales = [
  {
    name: "Niknaks",
    data: {
      January: 1,
      February: 2,
      April: 8,
      May: 2,
      June: 4,
      July: 11,
      August: 12,
      September: 160,
      October: 128,
      November: 110,
      December: 10,
    },
  },
  {
    name: "Call parents",
    data: {
      January: 2,
      February: 4,
      April: 10,
      May: 20,
      June: 40,
      July: 110,
      August: 120,
      September: 160,
      October: 128,
      November: 110,
      December: 10,
    },
  },
];

const top_ten = [
  { name: "sample", sale: "sample" },
  { name: "sample2", sale: "sample1" },
  { name: "sample3", sale: "sample2" },
  { name: "sample4", sale: "sample3" },
  { name: "sample5", sale: "sample4" },
  { name: "sample6", sale: "sample5" },
  { name: "sample7", sale: "sample6" },
  { name: "sample8", sale: "sample7" },
  { name: "sample9", sale: "sample8" },
  { name: "sample10", sale: "sample9" },
];
</script>

<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <!-- <Welcome /> -->
          <p class="p-2 text-xl font-bold">Year sales</p>
          <line-chart :data="year_sales" />
        </div>
        <div
          class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg mt-4 mb-2"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-4 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">This Month sales</p>
              <column-chart :data="year_sales" />
            </div>
            <div class="col-span-4 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">This Week sales</p>
              <area-chart :data="year_sales" />
            </div>
            <div class="col-span-4 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">Top 10 Products</p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template v-for="(top, key) in top_ten" :key="key">
                  <div class="col-span-6">
                    <p>{{ top.name }}</p>
                  </div>
                  <div class="col-span-6 text-right">
                    <p>{{ top.sale }}</p>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <p class="p-2 text-xl font-bold">Transactions</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
