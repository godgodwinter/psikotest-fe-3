<script setup>
import Api from "@/axios/axios";
import { ref, watch, computed } from "vue";
import BreadCrumb from "@/components/atoms/BreadCrumb.vue";
import BreadCrumbSpace from "@/components/atoms/BreadCrumbSpace.vue";
import ButtonEdit from "@/components/atoms/ButtonEdit.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreAdminBar } from "@/stores/adminBar";
import Toast from "@/components/lib/Toast.js";
const storeAdminBar = useStoreAdminBar();
storeAdminBar.setsubMenuActive("siswa");

const router = useRouter();
const route = useRoute();

const id = route.params.id;
const kelas_id = ref(route.params.kelas_id ? route.params.kelas_id : 0);
const dataAsli = ref([]);
const data = ref([]);
const dataKelas = ref([]);


// get Kelas
const getDataKelas = async () => {
  try {
    const response = await Api.get(`yayasan/datasekolah/${id}/kelas`);
    // console.log(response);
    dataKelas.value = response.data;
    if (dataKelas.value.length > 0) {
      // console.log(dataKelas.value[0].id);
      if (kelas_id.value == 0) {
        kelas_id.value = dataKelas.value[0].id;
      }
      dataKelas.value.forEach((item) => {
        pilihKelas.value.push({
          label: item.nama,
          id: item.id,
        });
      });
      // console.log(kelas_id.value);
      getData(kelas_id.value);
    }
    return response;
  } catch (error) {
    Toast.danger("Warning", "Data Gagal dimuat");
    console.error(error);
  }
};
getDataKelas();
// console.log(kelas_id.value);
const inputCariKelas = ref();

let pilihKelas = ref([
  // {
  //   label: "Belum masuk Kelas",
  //   id: "Belum masuk Kelas",
  // },
]);

const doPilihKelas = () => {
  // console.log(inputCariKelas.value.id);
  router.push({
    name: "AdminSekolahDetailSiswa",
    params: {
      id: id,
      kelas_id: inputCariKelas.value.id,
    },
  });
  getData(inputCariKelas.value.id);
};


const getData = async (kelas_id) => {
  try {
    dataAsli.value = [];
    data.value = [];
    const response = await Api.get(
      `admin/datasekolah/${id}/datasiswa/${kelas_id}`
    );
    dataAsli.value = response.data;

    data.value = response.data;

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const columns = [
  {
    label: "Nama Siswa",
    field: "nama",
    type: "String",
  },
  {
    label: "Kelas",
    field: "kelas_nama",
    type: "String",
  },
  // {
  //   label: "Username",
  //   field: "username",
  //   type: "String",
  // },
  // {
  //   label: "Password Default",
  //   field: "passworddefault",
  //   type: "String",
  // },
  // {
  //   label: "Username Ortu",
  //   field: "ortu_username",
  //   type: "String",
  // },
  // {
  //   label: "Password Default Ortu",
  //   field: "ortu_passworddefault",
  //   type: "String",
  // },
];
</script>
<template>
  <div class="pt-4 px-10 md:flex justify-between">
    <div>
      <span class="text-2xl sm:text-3xl leading-none font-bold text-base-content shadow-sm">Siswa</span>
    </div>
    <div class="md:py-0 py-4 space-x-2 space-y-2">
      <!-- <button
        class="btn btn-sm btn-warning text-base-content"
        @click="doGenerateAkun()"
      >
        Generate Akun Baru
      </button> -->
      <!-- <button
        class="btn btn-sm btn-error text-base-content"
        @click="doGenerateAkunAll()"
      >
        Generate Semua Akun
      </button> -->
      <!-- <router-link :to="{ name: 'AdminSekolah' }">
        <button class="btn btn-sm btn-info text-base-content">
          Tambah
        </button></router-link
      > -->
    </div>
  </div>
  <div class="w-full bg-base-200 shadow py-4 px-4">
    <div class="flex justify-center">
      <v-select class="py-2 px-3 w-72 mx-auto md:mx-0" :options="pilihKelas" v-model="inputCariKelas"
        v-bind:class="{ disabled: false }"></v-select>
      <div class="py-2">
        <button class="btn btn-sm btn-info p-2" @click="doPilihKelas()">
          Cari
        </button>
      </div>
    </div>
  </div>
  <div class="md:py-2 px-4 lg:flex flex-wrap gap-4">
    <div class="w-full lg:w-full">
      <div class="bg-base-200 shadow rounded-lg px-4 py-4">
        <div v-if="data">
          <vue-good-table :line-numbers="true" :columns="columns" :rows="data" :search-options="{
            enabled: true,
          }" :pagination-options="{
  enabled: true,
  perPageDropdown: [10, 20, 50],
}" styleClass="vgt-table striped bordered condensed" class="py-0">
            <template #table-row="props">
              <span v-if="props.column.field == 'actions'">
                <div class="text-sm font-medium text-center flex justify-center space-x-0">
                  <!-- <router-link
                    :to="{
                      name: 'AdminYayasanDetail',
                      params: { id: props.row.id },
                    }"
                  >
                    <button
                      class="btn btn-sm btn-primary tooltip"
                      data-tip="Detail"
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
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg></button
                  ></router-link> -->
                </div>
              </span>

              <span v-else-if="props.column.field == 'jml_sekolah'">
                <div class="text-left">{{ props.row.jml_sekolah }} Sekolah</div>
              </span>

              <span v-else-if="props.column.field == 'username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.username }}</div>
                  <span v-if="props.row.username" @click="doCopyClipboard(props.row.username)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.passworddefault }}</div>
                  <span v-if="props.row.passworddefault" @click="doCopyClipboard(props.row.passworddefault)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_username'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">{{ props.row.ortu_username }}</div>
                  <span v-if="props.row.ortu_username" @click="doCopyClipboard(props.row.ortu_username)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>
              <span v-else-if="props.column.field == 'ortu_passworddefault'">
                <div class="flex justify-center gap-2">
                  <div class="text-center">
                    {{ props.row.ortu_passworddefault }}
                  </div>
                  <span v-if="props.row.ortu_passworddefault" @click="doCopyClipboard(props.row.ortu_passworddefault)"
                    class="hover:text-primary cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                </div>
              </span>

              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
