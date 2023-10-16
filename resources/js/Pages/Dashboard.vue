<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import Welcome from "@/Components/Welcome.vue";
import Icon from "@/Components/Icon.vue";
import moment from "moment";

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
  "current_transaction",
]);

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};
const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};
const calculate_grand_total = (data, discount, vat, type) => {
  let temp_data_total = 0;
  let temp_data_sub_total = 0;
  let temp_data_grand_total = 0;
  let temp_discounted_total = 0;
  let temp_vat_total = 0;
  let temp_special_discounted = discount / 100;
  let temp_vat = vat / 100;
  data.forEach((element) => {
    let temp_data_result = 0;
    let temp_data_discounted = 0;
    let convert_discount = element.sale_discount.discount / 100;
    if (element.status == 1) {
      for (let index = 0; index < element.quantity; index++) {
        temp_data_discounted = element.price.price * convert_discount;
        temp_data_result += element.price.price - temp_data_discounted;
      }
    }
    temp_data_total += temp_data_result;
  });
  temp_discounted_total = temp_data_total * temp_special_discounted;
  temp_data_sub_total = temp_data_total - temp_discounted_total;
  temp_vat_total = temp_data_sub_total * temp_vat;
  temp_data_grand_total = temp_data_sub_total + temp_vat_total;
  if (type == 0) {
    return temp_data_grand_total;
  } else if (type == 1) {
    return temp_vat_total;
  } else if (type == 2) {
    return temp_discounted_total;
  }
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

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-4">
          <p class="p-2 text-xl font-bold">Top 10 recent transactions</p>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-white uppercase bg-yellow-500">
                <tr>
                  <th scope="col" class="px-6 py-3">#</th>
                  <th scope="col" class="px-6 py-3">Transaction</th>
                  <th scope="col" class="px-6 py-3">Date & Time</th>
                  <th scope="col" class="px-6 py-3">Amount</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <template
                  v-for="(transaction, key) in props.current_transaction"
                  :key="key"
                >
                  <tr class="bg-white border-b">
                    <td class="px-6 py-4">
                      {{ key + 1 }}
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-yellow-900 whitespace-nowrap"
                    >
                      Processed by {{ transaction.accommodate_by.name }}
                    </th>
                    <td class="px-6 py-4">
                      {{ date_time(transaction.created_at) }}
                    </td>
                    <td class="px-6 py-4">
                      {{
                        convert_money(
                          calculate_grand_total(
                            transaction.transaction_details,
                            transaction.special_discount?.discount ?? 0,
                            transaction.tax?.tax ?? 0,
                            0
                          )
                        )
                      }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        v-if="transaction.status == 1"
                        class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                      >
                        <span
                          class="w-2 h-2 mr-1 bg-green-500 rounded-full"
                        ></span>
                        Success
                      </span>
                      <span
                        v-else
                        class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full"
                      >
                        <span
                          class="w-2 h-2 mr-1 bg-red-500 rounded-full"
                        ></span>
                        Cancelled
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
