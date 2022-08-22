import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// layouts
import LandingLayout from "../layouts/LandingLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
// pages
import NotFound from "../views/NotFound.vue";
import Locked from "../views/Locked.vue";
import Maintenance from "../views/Maintenance.vue";
import LandingIndex from "../views/landing/LandingIndex.vue";
import LandingLogin from "../views/landing/LandingLogin.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Landing",
      component: LandingLayout,
      redirect: "/",
      children: [
        {
          path: "/",
          name: "LandingIndex",
          component: LandingLogin,
        },
        {
          path: "/login",
          name: "LandingLogin",
          component: LandingLogin,
        },
        {
          path: "/404",
          name: "NotFound",
          component: NotFound,
        },
        {
          path: "/locked",
          name: "Locked",
          component: Locked,
        },
        {
          path: "/maintenance",
          name: "Maintenance",
          component: Maintenance,
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    },

    {
      path: "/pages/",
      name: "LandingAdmin",
      component: AdminLayout,
      redirect: "/pages/admin",
      children: [
        {
          path: "/pages/admin",
          name: "AdminDashboard",
          component: () => import("@/views/admin/DashBoard.vue"),
        },
        {
          path: "/pages/settings/profile",
          name: "AdminSettingsProfile",
          component: () => import("@/views/admin/settings/MyProfile.vue"),
        },
        {
          path: "/pages/sekolah",
          component: () => import("@/views/admin/sekolah/Index.vue"),
          name: "AdminSekolah",
        },
        {
          path: "/pages/sekolah/:id",
          component: () => import("@/views/admin/sekolah/Edit.vue"),
          name: "AdminSekolahEdit",
        },
        {
          path: "/pages/data/catatan/klasifikasi",
          name: "AdminKlasifikasi",
          component: () => import("@/views/admin/data/Klasifikasi.vue"),
        },
        {
          path: "/pages/data/catatan/klasifikasi/:id",
          name: "AdminKlasifikasiDetail",
          component: () => import("@/views/admin/data/KlasifikasiDetail.vue"),
        },
        {
          path: "/pages/data/catatan/referensistudi",
          name: "AdminReferensiStudi",
          component: () => import("@/views/admin/data/ReferensiStudi.vue"),
        },
        {
          path: "/pages/data/catatan/referensistudi/:id",
          name: "AdminReferensiStudiDetail",
          component: () =>
            import("@/views/admin/data/ReferensiStudiDetail.vue"),
        },
        {
          path: "/pages/data/catatan/buletin",
          name: "AdminBuletin",
          component: () => import("@/views/admin/data/Buletin.vue"),
        },
        {
          path: "/pages/data/catatan/buletin/:id",
          name: "AdminBuletinDetail",
          component: () => import("@/views/admin/data/BuletinDetail.vue"),
        },
        {
          path: "/pages/sekolah/:id/detail",
          component: () => import("@/views/admin/sekolah/Detail.vue"),
          name: "AdminSekolahDetail",
          redirect: "pages/admin/sekolahdetail/:id/dashboard",
          children: [
            {
              path: "/pages/admin/sekolahdetail/:id/dashboard",
              component: () =>
                import("@/views/admin/sekolah/submenu/SekolahDashboard.vue"),
              name: "AdminSekolahDetailDashboard",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/siswa/:kelas_id?",
              component: () =>
                import("@/views/admin/sekolah/submenu/siswa/Index.vue"),
              name: "AdminSekolahDetailSiswa",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/kelas",
              component: () =>
                import("@/views/admin/sekolah/submenu/kelas/Index.vue"),
              name: "AdminSekolahDetailKelas",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/kelas/:id2/edit",
              component: () =>
                import("@/views/admin/sekolah/submenu/kelas/Edit.vue"),
              name: "AdminSekolahDetailKelasEdit",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/bk",
              component: () =>
                import("@/views/admin/sekolah/submenu/bk/Index.vue"),
              name: "AdminSekolahDetailBk",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/walikelas",
              component: () =>
                import("@/views/admin/sekolah/submenu/walikelas/Index.vue"),
              name: "AdminSekolahDetailWalikelas",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/walikelas/:id2/edit",
              component: () =>
                import("@/views/admin/sekolah/submenu/walikelas/Edit.vue"),
              name: "AdminSekolahDetailWalikelasEdit",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/pengguna",
              component: () =>
                import("@/views/admin/sekolah/submenu/pengguna/Index.vue"),
              name: "AdminSekolahDetailPengguna",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/pengguna/:id/edit",
              component: () =>
                import("@/views/admin/sekolah/submenu/pengguna/Edit.vue"),
              name: "AdminSekolahDetailPenggunaEdit",
            },
            // hasil psikologi
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:kelas_id?",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Index.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologi",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Index.vue"
                ),
              name: "AdminHasilPsikologi",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/deteksi",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Deteksi.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologiDeteksi",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/penanganan",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Penanganan.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologiPenanganan",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/sertifikat",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Sertifikat.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologiSertifikat",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/kecerdasanmajemuk",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/KecerdasanMajemuk.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologiKecerdasanMajemuk",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/terapis",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/hasilpsikologi/Terapis.vue"
                ),
              name: "AdminSekolahDetailHasilpsikologiTerapis",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/nilaipsikolgisiswa/:kelas_id?",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/nilaipsikolgisiswa/Index.vue"
                ),
              name: "AdminSekolahDetailNilaipsikolgiSiswa",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/minatbakat/:kelas_id?",
              component: () =>
                import("@/views/admin/sekolah/submenu/minatbakat/Index.vue"),
              name: "AdminSekolahDetailMinatbakat",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/penjurusan/:kelas_id?",
              component: () =>
                import("@/views/admin/sekolah/submenu/penjurusan/Index.vue"),
              name: "AdminSekolahDetailPenjurusan",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/kasus",
              component: () =>
                import("@/views/admin/sekolah/submenu/kasus/Index.vue"),
              name: "AdminSekolahDetailKasus",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/pengembangandiri",
              component: () =>
                import(
                  "@/views/admin/sekolah/submenu/pengembangandiri/Index.vue"
                ),
              name: "AdminSekolahDetailPengembangandiri",
            },
            {
              path: "/pages/admin/sekolahdetail/:id/prestasi",
              component: () =>
                import("@/views/admin/sekolah/submenu/prestasi/Index.vue"),
              name: "AdminSekolahDetailPrestasi",
            },
          ],
        },
      ],
    },
  ],
});

export default router;
