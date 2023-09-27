<template>
  <div
    class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"
  >
    <div class="border-b-2 border-neutral-100 px-6 py-3">
      <table class="w-full text-xs text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" class="px-1 py-1">Product</th>
            <th scope="col" class="px-1 py-1">Unit Price</th>
            <th scope="col" class="px-1 py-1">Quantity</th>
            <th scope="col" class="px-1 py-1">Total Price</th>
            <th scope="col" class="px-1 py-1">Actions</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <div
    class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-2"
  >
    <div class="border-b-2 border-neutral-100 px-6 py-3 text-left">
      <p>Sample shit</p>
    </div>
    <div class="p-6">
      <table class="w-full text-xs text-left text-gray-500">
        <tbody>
          <template v-for="(sample, key) in 2" :key="key">
            <tr class="bg-white border-">
              <td class="px-1 py-1 flex">
                <Icon icon="shopping_cart" size="xs" />

                Bitok
              </td>
              <td class="px-1 py-1">100</td>
              <td class="px-1 py-1">100</td>
              <td class="px-1 py-1">100</td>
              <td class="px-1 py-1">100</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="border-t-2 border-neutral-100 px-6 py-3">2 days ago</div>
  </div>
</template>