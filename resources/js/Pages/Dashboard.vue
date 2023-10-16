<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Welcome from "@/Components/Welcome.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps([
  // "sale_year",
  "top_10_prod_current_day",
  "day_with_quantity_price_total_data_pie",
  "day_with_quantity_price_total_data_column",
  "top_10_prod_current_week",
  "week_day_with_quantity_price_total_data_pie",
  "top_10_current_month_sale",
  "top_10_current_month_sale_money",
  "top_10_current_year_sale",
  "top_10_current_year_sale_money",
  // "full_year_top_10_sales",
  "current_year",
  "current_month",
  "current_week",
  "current_day",
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
                This Day({{ current_day }}) sales
              </p>
              <column-chart
                :data="props.day_with_quantity_price_total_data_column"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
            <div class="col-span-6 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                Top 10 sold products in this day({{ props.current_day }})
              </p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template
                  v-for="(top, key) in props.top_10_prod_current_day"
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
                Top 10 high value products in this Day({{ props.current_day }})
              </p>
              <pie-chart
                :data="props.day_with_quantity_price_total_data_pie"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
          </div>
        </div>
        <div
          class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg mb-2"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                This Week({{ current_week }}) sales
              </p>
              <line-chart
                :data="props.top_10_prod_current_week"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
            <div class="col-span-6 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                Top 10 sold products in this week({{ props.current_week }})
              </p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template
                  v-for="(top, key) in props.top_10_prod_current_week"
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
                Top 10 high value products in this week({{
                  props.current_week
                }})
              </p>
              <pie-chart
                :data="props.week_day_with_quantity_price_total_data_pie"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
          </div>
        </div>
        <div
          class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg mb-2"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                This Month({{ current_month }}) sales
              </p>
              <line-chart
                :data="props.top_10_current_month_sale"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
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
              <pie-chart
                :data="props.top_10_current_month_sale_money"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
          </div>
        </div>
        <div
          class="bg-transparent overflow-hidden shadow-xl sm:rounded-lg mb-2"
        >
          <div class="grid grid-cols-12 gap-2">
            <div class="col-span-12 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                This Year({{ current_year }}) sales
              </p>
              <line-chart
                :data="props.top_10_current_year_sale"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
            </div>
            <div class="col-span-6 border bg-white rounded-lg">
              <p class="p-2 text-xl font-bold">
                Top 10 sold products in this year({{ props.current_year }})
              </p>
              <div class="grid grid-cols-12 gap-2 p-4">
                <template
                  v-for="(top, key) in props.top_10_current_year_sale"
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
                Top 10 high value products in this year({{
                  props.current_year
                }})
              </p>
              <pie-chart
                :data="props.top_10_current_year_sale_money"
                :colors="[
                  '#713ABE',
                  '#071952',
                  '#FF3FA4',
                  '#016A70',
                  '#C70039',
                  '#F94C10',
                  '#FFCF96',
                  '#FD8D14',
                  '#F0DE36',
                  '#F86F03',
                ]"
              />
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
