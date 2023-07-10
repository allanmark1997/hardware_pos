<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import UserLists from "./UserLists.vue";
import Input from "@/Components/Input.vue";

const props = defineProps(["users"]);
</script>

<template>
  <AppLayout title="Dashboard">
    <template #header>
      <h2 class="font-semibold text-lg text-gray-800 leading-tight">
        User Management
      </h2>
    </template>

    <div class="py-">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="flex justify-between">
          <Input
            class="rounded-lg mb-2 w-[30vmin]"
            type="text"
            label="Search users"
          />
          <button
            class="bg-green-300 p-2 mb-2 mt-5 rounded-lg w-[15vmin] hover:bg-green-500"
          >
            Add user
          </button>
        </div>

        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <UserLists :users="props.users" />
        </div>
      </div>
    </div>
  </AppLayout>
</template>