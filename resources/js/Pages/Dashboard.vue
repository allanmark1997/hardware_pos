<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Welcome from "@/Components/Welcome.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps([
  "sale_year",
  "top_10_current_month_sale",
  "top_10_current_month_sale_money",
  "full_year_top_10_sales",
  "current_year",
  "current_month",
]);

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
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        Dashboard
      </h2>
    </template>

    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div
          class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg mb-2"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                This Month({{ current_month }}) sales
              </p>
              <line-chart :data="props.top_10_current_month_sale" />
            </div>
            <!-- <div class="col-span-4 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">This Week sales</p>
              <area-chart :data="props.full_year_top_10_sales" />
            </div> -->
            <div class="col-span-6 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                Top 10 sold products in this month({{ props.current_month }})
              </p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template
                  v-for="(top, key) in props.top_10_current_month_sale"
                  :key="key"
                >
                  <div class="col-span-6 text-sm flex">
                    <Icon v-if="key + 1 == 1" icon="gold_medal" size="sm" />
                    <Icon v-if="key + 1 == 2" icon="silver_medal" size="sm" />
                    <Icon v-if="key + 1 == 3" icon="bronze_medal" size="sm" />
                    <p>{{ top.name }}</p>
                  </div>
                  <div class="col-span-3 text-right text-xs break-words">
                    <p>x{{ top.total_quantity }}</p>
                  </div>
                  <div class="col-span-3 text-center text-xs break-words">
                    <p class="bg-green-600 rounded-lg text-white pl-1 pr-1">
                      {{ convert_money(top.grand_total_sale) }}
                    </p>
                  </div>
                </template>
              </div>
            </div>
            <div class="col-span-6 border bg-white rounded-lg p-2">
              <p class="text-xl font-bold">
                Top 10 high value products in this month({{
                  props.current_month
                }})
              </p>
              <pie-chart :data="props.top_10_current_month_sale_money" />
            </div>
          </div>
        </div>
        <div class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg">
          <!-- <Welcome /> -->
          <div class="grid grid-cols-12 gap-2 p-4">
            <div class="col-span-12 col-span-12 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                This year({{ props.current_year }}) sales
              </p>
              <line-chart :data="props.top_10_current_month_sale" />
            </div>

            <div class="col-span-6 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                Top 10 Products in this year({{ props.current_year }})
              </p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template
                  v-for="(top, key) in props.top_10_current_month_sale"
                  :key="key"
                >
                  <div class="col-span-6 text-sm flex">
                    <Icon v-if="key + 1 == 1" icon="gold_medal" size="sm" />
                    <Icon v-if="key + 1 == 2" icon="silver_medal" size="sm" />
                    <Icon v-if="key + 1 == 3" icon="bronze_medal" size="sm" />
                    <p>{{ top.name }}</p>
                  </div>
                  <div class="col-span-3 text-right text-xs break-words">
                    <p>x{{ top.quantity }}</p>
                  </div>
                  <div class="col-span-3 text-center text-xs break-words">
                    <p class="bg-green-600 rounded-lg text-white pl-1 pr-1">
                      {{ convert_money(top.total_sale) }}
                    </p>
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
