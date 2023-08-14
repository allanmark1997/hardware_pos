<script setup>
import { computed } from "vue";

const props = defineProps(["icon", "size"]);
const size_default = props.size ?? "sm";
const icon_default = props.icon ?? "sm";
const icons = {
  cart: "cart",
  user: "user",
  calendar: "calendar",
  location: "location",
  mobile: "mobile",
  phone: "phone",
  sex: "sex",
  birthday: "birthday",
  calendar_minus: "calendar_minus",
  calendar_plus: "calendar_plus",
  shopping_bag : "shopping_bag",
  search_icon: "search_icon"
};

const size = computed(() => {
  return {
    md: "h-8 w-8",
    sm: "h-5 w-5",
    xs: "h-4 w-4",
  }[size_default];
});
</script>
<template>
  <svg
    v-if="icon_default === icons.cart"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
  <svg
    v-if="icon_default === icons.user"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    :class="size"
  >
    <path
      d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
    />
  </svg>
  <svg
    v-if="icon_default === icons.calendar"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 15.315 15.315"
    xml:space="preserve"
    :class="size"
  >
    <path
      style="fill: #b2adb5"
      d="M3.669,3.71h0.696c0.256,0,0.464-0.165,0.464-0.367V0.367C4.829,0.164,4.621,0,4.365,0H3.669
                        C3.414,0,3.206,0.164,3.206,0.367v2.976C3.205,3.545,3.413,3.71,3.669,3.71z"
    />
    <path
      style="fill: #c5c3c6"
      d="M10.95,3.71h0.696c0.256,0,0.464-0.165,0.464-0.367V0.367C12.11,0.164,11.902,0,11.646,0H10.95
                        c-0.256,0-0.463,0.164-0.463,0.367v2.976C10.487,3.545,10.694,3.71,10.95,3.71z"
    />
    <path
      style="fill: #5e5a60"
      d="M14.512,1.42h-1.846v2.278c0,0.509-0.458,0.923-1.021,0.923h-0.696
                        c-0.563,0-1.021-0.414-1.021-0.923V1.42H5.384v2.278c0,0.509-0.458,0.923-1.021,0.923H3.669c-0.562,0-1.02-0.414-1.02-0.923V1.42
                        H0.803c-0.307,0-0.557,0.25-0.557,0.557V14.76c0,0.307,0.25,0.555,0.557,0.555h13.709c0.308,0,0.557-0.248,0.557-0.555V1.977
                        C15.069,1.67,14.82,1.42,14.512,1.42z M14.316,9.49v4.349c0,0.096-0.078,0.176-0.175,0.176H7.457H1.174
                        c-0.097,0-0.175-0.08-0.175-0.176V10.31V5.961c0-0.096,0.078-0.176,0.175-0.176h6.683h6.284l0,0c0.097,0,0.175,0.08,0.175,0.176
                        V9.49z"
    />
    <rect
      x="2.327"
      y="8.93"
      style="fill: #434244"
      width="1.735"
      height="1.736"
    />
    <rect
      x="5.28"
      y="8.93"
      style="fill: #434244"
      width="1.735"
      height="1.736"
    />
    <rect
      x="8.204"
      y="8.93"
      style="fill: #434244"
      width="1.734"
      height="1.736"
    />
    <rect
      x="11.156"
      y="8.93"
      style="fill: #434244"
      width="1.736"
      height="1.736"
    />
    <rect
      x="2.363"
      y="11.432"
      style="fill: #434244"
      width="1.736"
      height="1.736"
    />
    <rect
      x="5.317"
      y="11.432"
      style="fill: #434244"
      width="1.735"
      height="1.736"
    />
    <rect
      x="8.241"
      y="11.432"
      style="fill: #434244"
      width="1.734"
      height="1.736"
    />
    <rect
      x="11.194"
      y="11.432"
      style="fill: #434244"
      width="1.735"
      height="1.736"
    />
    <rect
      x="8.215"
      y="6.47"
      style="fill: #434244"
      width="1.735"
      height="1.735"
    />
    <rect
      x="11.17"
      y="6.47"
      style="fill: #434244"
      width="1.734"
      height="1.735"
    />
  </svg>
  <svg
    v-if="icon_default === icons.location"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
  <svg
    v-if="icon_default === icons.mobile"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
  <svg
    v-if="icon_default === icons.phone"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    :class="size"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
  <img
    v-if="icon_default === icons.sex"
    src="./images/gender.png"
    :class="size"
  />

  <img
    v-if="icon_default === icons.administrator"
    src="./images/administrator.png"
    :class="size"
  />

  <img
    v-if="icon_default === icons.birthday"
    src="./images/birthday.png"
    :class="size"
  />

  <img
    v-if="icon_default === icons.calendar_plus"
    src="./images/calendar_plus.png"
    :class="size"
  />

  <img
    v-if="icon_default === icons.calendar_minus"
    src="./images/calendar_minus.png"
    :class="size"
  />

  <svg v-if="icon_default === icons.shopping_bag" fill="none" :class="size" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
</svg>

<svg fill="none" g v-if="icon_default === icons.search_icon" :class="size" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
</svg>
</template>