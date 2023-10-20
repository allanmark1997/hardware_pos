<script setup>
import Button from "@/Components/Button.vue";
import { router, useForm } from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import Pagination2 from "@/Components/Pagination2.vue";
import TextInput from "@/Components/TextInput.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import ConfirmDialogModal from "@/Components/ConfirmationModal.vue";

import moment from "moment";
import { inject, onMounted, provide, ref } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const props = defineProps(["back_orders", "date_from", "date_to"]);

const date_from = ref(props.date_from);
const date_to = ref(props.date_to);
const ConfirmationModal = ref(false);

const form = useForm({
  backorder: "",
  password: "",
});

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

const date_time = (data) => {
  return moment(data).format("MM/DD/YYYY, h:mm:ss a");
};

const convert_money = (data) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });
  formatter.format(data);
  return formatter.format(data);
};

const function_filter_range = () => {
  router.get(
    route("back_orders.index", {
      date_from: date_from.value,
      date_to: date_to.value,
    })
  );
};

const function_filter_remove = () => {
  router.get(
    route("back_orders.index", {
      date_from: null,
      date_to: null,
    })
  );
};

const count_total_success = (data) => {
  let temp_data = 0;
  data.forEach((element) => {
    if (element.status == 1) {
      temp_data += element.quantity * element.price.price;
    }
  });
  return temp_data;
};

const count_total_unsuccess = (data) => {
  let temp_data = 0;
  data.forEach((element) => {
    if (element.status == 0) {
      temp_data += element.quantity * element.price.price;
    }
  });
  return temp_data;
};

const open_authorization = (data) => {
  form.backorder = data;
  ConfirmationModal.value = !ConfirmationModal.value;
};

const authorize = () => {
  form.post(route("authenticate_user.authenticate_user"), {
    preserveScroll: true,
    onSuccess: () => {
      form.put(route("back_orders.authorize", form.backorder), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Successfully authorized back order as settled", {
            autoClose: true,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          form.reset();
          ConfirmationModal.value = false;
        },
        onError: () => {
          toast.error(form.errors.message, {
            autoClose: true,
            transition: toast.TRANSITIONS.FLIP,
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          ConfirmationModal.value = false;
        },
      });
    },
    onError: () => {
      toast.error(form.errors.message, {
        autoClose: true,
        transition: toast.TRANSITIONS.FLIP,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    },
  });
};
</script>
<template>
  <div class="flex justify-between mt-2">
    <div class="flex gap-2">
      <div class="flex gap-2">
        <div class="flex">
          <span class="text-md mt-2 mr-2">From</span>
          <TextInput
            id="date_from"
            v-model="date_from"
            type="date"
            class="mt-1 block w-full"
          />
        </div>
        <div class="flex">
          <span class="text-md mt-2 mr-2">To</span>

          <TextInput
            id="date_to"
            v-model="date_to"
            type="date"
            class="mt-1 block w-full"
            @keyup.enter="function_filter_range"
          />
        </div>
        <button
          v-if="date_from || date_to"
          class="h-10 my-auto mt-5"
          @click="function_filter_remove"
        >
          <Icon icon="close_icon" size="sm" />
        </button>
      </div>
    </div>
    <a
      :href="
        route('back_orders.export', {
          date_from: date_from,
          date_to: date_to,
        })
      "
      class="bg-green-400 hover:bg-green-600 hover:text-white rounded-lg my-auto p-2"
      >Export Back-orders</a
    >
  </div>

  <section class="text-gray-600 bg-white rounded-lg py-5 px-3 mb-5 mt-2">
    <div class="container mx-auto">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-white uppercase bg-yellow-500">
            <tr>
              <th scope="col" class="px-6 py-3">Processed by</th>
              <th scope="col" class="px-6 py-3">Product name</th>
              <th scope="col" class="px-6 py-3">Price</th>
              <th scope="col" class="px-6 py-3">Discount</th>
              <th scope="col" class="px-6 py-3">Quantity</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Success Sub-total</th>
              <th scope="col" class="px-6 py-3">Inprogress Sub-total</th>
              <th scope="col" class="px-6 py-3">Remarks</th>
              <th scope="col" class="px-6 py-3">Created at</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(back_order, key) in back_orders.data" :key="key">
              <tr class="bg-white border-">
                <td class="px-6 py-4">
                  <img
                    class="h-8 w-8 rounded-full object-cover"
                    :src="back_order.user.profile_photo_url"
                    :alt="back_order.user.name"
                  />
                  {{ back_order.user.name }}
                </td>
                <td class="px-6 py-4">
                  {{ back_order.product.name }}
                </td>
                <td class="px-6 py-4">
                  {{ convert_money(back_order.price.price) }}
                </td>
                <td class="px-6 py-4">{{ back_order.discount.discount }}%</td>
                <td class="px-6 py-4">
                  {{ back_order.quantity }}
                </td>
                <td class="px-6 py-4">
                  <span
                    v-if="back_order.status == 1"
                    class="bg-green-400 rounded-md p-1 text-white flex"
                  >
                    <Icon icon="check" size="sm" />
                    Success
                  </span>
                  <span
                    v-else-if="back_order.status == 0"
                    class="bg-orange-400 rounded-md p-1 text-white flex gap-1"
                  >
                    <Icon icon="wrong" size="sm" />
                    Pending
                  </span>
                  <span
                    v-else
                    class="bg-red-400 rounded-md p-1 text-white flex gap-1"
                  >
                    <Icon icon="wrong" size="sm" />
                    Cancelled
                  </span>
                </td>

                <td class="px-6 py-4">
                  {{
                    convert_money(
                      back_order.status == 1
                        ? back_order.price.price * back_order.quantity
                        : 0
                    )
                  }}
                </td>
                <td class="px-6 py-4">
                  {{
                    convert_money(
                      back_order.status == 0
                        ? back_order.price.price * back_order.quantity
                        : 0
                    )
                  }}
                </td>
                <td class="px-6 py-4">
                  <p class="w-full text-sm text-gray-900 break-words">
                    {{ back_order.remarks }}
                  </p>
                </td>
                <td class="px-6 py-4 flex gap-2">
                  <Icon icon="calendar" size="sm" />
                  {{ date_time(back_order.created_at) }}
                </td>
                <td class="px-6 py-4 gap-2">
                  <Button
                    v-if="back_order.status == 0"
                    @click="open_authorization(back_order)"
                    >Authorize</Button
                  >
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="flex items-center justify-between">
        <Pagination2
          :links="props.back_orders.links"
          :date_from="date_from"
          :date_to="date_to"
        />
        <p class="mt-6 text-sm text-gray-500">
          Showing {{ back_orders.data.length }} Back-orders
        </p>
      </div>
    </div>
  </section>
  <ConfirmDialogModal
    :show="ConfirmationModal"
    @close="ConfirmationModal = false"
    maxWidth="2xl"
  >
    <template #title> Please input administrators pass code</template>
    <template #content>
      <p class="text-red-500">
        Once approved, this action can update the system and this is not
        reversible!
      </p>
      <Input
        type="password"
        label="Administrator's passcode"
        v-model="form.password"
      />
    </template>
    <template #footer>
      <SecondaryButton @click="ConfirmationModal = false" class="mr-2">
        nevermind
      </SecondaryButton>
      <Button
        :class="{ 'opacity-25': form.processing }"
        :disabled="form.processing"
        class="bg-green-200 hover:bg-green-400"
        @click="authorize"
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
        >&nbsp;Submit
      </Button>
    </template>
  </ConfirmDialogModal>
</template>