<script setup>
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["deliveries"]);

const notify = () => {
  toast("Default Notification !");

  toast.success("Success Notification !", {
    position: toast.POSITION.TOP_CENTER,
  });

  toast.error("Error Notification !", {
    position: toast.POSITION.TOP_LEFT,
  });

  toast.success("FLIP", {
    autoClose: false,
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
</script>
<template>
  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Supplier name</th>
              <th scope="col" class="px-6 py-3">Receive by</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Products</th>
              <th scope="col" class="px-6 py-3">Remarks</th>
              <th scope="col" class="px-6 py-3">Created at</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(delivery, key) in deliveries" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">{{ delivery.supplier.supplier_name }}</td>
                <td class="px-6 py-4">{{ delivery.user_receiver.name }}</td>
                <td class="px-6 py-4">
                  {{ delivery.status == 1 ? "Success" : "Unsuccessful" }}
                </td>

                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <template
                    v-for="(delivery_detail, key2) in delivery.details"
                    :key="key2"
                  >
                    <p>
                      {{
                        delivery_detail.status == 1 ? "Success" : "Unsuccessful"
                      }}
                    </p>
                    <p>
                      {{ delivery_detail.created_at }}
                    </p>
                    Apple MacBook Pro 17"
                  </template>
                </th>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4">$2999</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>