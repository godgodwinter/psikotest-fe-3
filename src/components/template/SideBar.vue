<script setup>
import Api from "@/axios/axios";
import { computed } from "vue";
import { useStoreAdminBar } from "@/stores/adminBar";
import { useStoreAuth } from "@/stores/auth";
import { useStoreGuruBk } from "@/stores/guruBk";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const storeAdminBar = useStoreAdminBar();
const isSideBarActive = computed(() => storeAdminBar.getIsSidebarActive);
const pagesActive = computed(() => storeAdminBar.getPagesActive);
async function goLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("isLogin");
  router.go();
}
const storeAuth = useStoreAuth();
const storeGuruBk = useStoreGuruBk();
const getIsLogin = computed(() => storeAuth.getIsLogin);

const getIdentitas = computed(() => storeGuruBk.getIdentitas);
// const getToken = computed(() => storeAuth.getToken);
if (getIsLogin.value == false) {
  //logout
  router.push({ name: "LandingLogin" });
}
const pagesActiveClass = ref(
  "border border-info rounded-lg bg-info text-info-content"
);
</script>
<template>
  <aside
    :class="{ hidden: !isSideBarActive }"
    id="sidebar"
    class="fixed z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 lg:w-72 transition-width duration-75 bg-base-200"
    aria-label="Sidebar"
  >
    <div class="relative flex-1 flex flex-col min-h-0 pt-6 md:pt-4">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 space-y-1">
          <!-- divide-y  -->
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-2 justify-center"
          >
            <li class="lg:w-full">
              <div class="flex gap-2 items-center justify-center">
                <!-- <img
                  src="@/assets/img/avatar/baemon-ava-2.jpg"
                  alt=""
                  class="rounded-full w-20 h-20 object-cover"
                /> -->
                <!-- <div class="avatar">
                  <div class="w-24 mask mask-squircle">
                    <img src="@/assets/img/avatar/baemon-ava-2.jpg" />
                  </div>
                </div> -->
                <div class="avatar online" v-if="getIdentitas.photo">
                  <div
                    class="w-24 rounded-full border border-sky-200 hover:border-sky-400 shadow hover:shadow-lg"
                  >
                    <img
                      v-if="getIdentitas.photo.user"
                      :src="getIdentitas.photo.user"
                    />
                    <img v-else src="@/assets/img/avatar/user.png" />
                  </div>
                </div>
              </div>
              <div>
                <div class="flex justify-center gap-2">
                  <p
                    class="text-base-content text-md font-semibold text-center py-2 capitalize"
                  >
                    {{ getIdentitas.nama }}
                  </p>
                  <router-link :to="{ name: 'AdminSettingsProfile' }">
                    <span
                      class="py-2 hover:scale-125 tooltip"
                      data-tip="Update Profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clip-rule="evenodd"
                        /></svg></span
                  ></router-link>
                </div>
                <p
                  class="text-base-content text-sm font-medium text-center link link-primary"
                >
                  Akun Yayasan
                </p>
              </div>
            </li>
            <li class="lg:w-full flex justify-center">
              <button
                @click="goLogout()"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group border border-primary hover:border-primary-content hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3 text-sm">Logout </span>
              </button>
            </li>
          </ul>
          <ul
            class="space-y-2 pb-2 lg:flex flex-wrap px-2 gap-0 justify-between"
          >
            <li
              class="lg:w-full py-2"
              :class="[pagesActive == 'dashboard' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminDashboard' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                  />
                </svg>
                <span class="ml-3">Dashboard </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'profile' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSettingsProfile' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Profile </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'sekolah' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminSekolah' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Sekolah </span>
              </router-link>
            </li>

            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'klasifikasi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminKlasifikasi' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="ml-3">Klasifikasi Akademis dan Profesi </span>
              </router-link>
            </li>

            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'referensistudi' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminReferensiStudi' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <span class="ml-3">Referensi Studi & Kerja </span>
              </router-link>
            </li>
            <li
              class="lg:w-full py-0"
              :class="[pagesActive == 'buletin' ? pagesActiveClass : '']"
            >
              <router-link
                :to="{ name: 'AdminBuletin' }"
                class="text-base-content font-normal rounded-lg flex items-center p-2 group hover:link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span class="ml-3">Buletin Psikologi </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
