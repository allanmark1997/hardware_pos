<script setup>
import { router } from "@inertiajs/vue3";
import { ref } from "vue";
const props = defineProps(["status", "id"]);

const position_ = ref(false);
const position_label = ref(props.status == 1 ? "Administrator" : "Cashier");
const open_modal_position = () => {
  position_.value = !position_.value;
};

const select_position = (data) => {
  if (data == 1) {
    position_label.value = "Administrator";
  } else {
    position_label.value = "Cashier";
  }
  router.put(route("users.update_user_position", { type: data, id: props.id }));

  position_.value = !position_.value;
};
</script>
<template>
  <div class="col-span-4 relative">
    <button
      @click="open_modal_position"
      class="text-gray-500 bg-white focus:ring-1 focus:outline-none focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center border border-gray-300  w-full"
      type="button"
    >
      {{ position_label }}
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
      v-if="position_"
      id="dropdown"
      class="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <a
            @click="select_position(1)"
            class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >Staff Administrator
          </a>
          <a
            @click="select_position(2)"
            class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >Cashier
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>