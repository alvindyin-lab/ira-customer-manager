/* =========================================================
   LOAD LAYOUT
========================================================= */

async function loadLayout() {

    try {

        // ================================================
        // SIDEBAR
        // ================================================

        const sidebar =
            await fetch('includes/sidebar.html');

        if (!sidebar.ok) {
            throw new Error(
                'Gagal memuat sidebar.html'
            );
        }

        document.getElementById('sidebar').innerHTML =
            await sidebar.text();


        // ================================================
        // TOPBAR
        // ================================================

        const topbar =
            await fetch('includes/topbar.html');

        if (!topbar.ok) {
            throw new Error(
                'Gagal memuat topbar.html'
            );
        }

        document.getElementById('topbar').innerHTML =
            await topbar.text();


        // ================================================
        // DASHBOARD
        // ================================================

        const dashboard =
            await fetch('includes/page-dashboard.html');

        if (!dashboard.ok) {
            throw new Error(
                'Gagal memuat page-dashboard.html'
            );
        }

        document.getElementById('dashboard').innerHTML =
            await dashboard.text();


        // ================================================
        // PELANGGAN
        // ================================================

        const pelanggan =
            await fetch('includes/page-pelanggan.html');

        if (!pelanggan.ok) {
            throw new Error(
                'Gagal memuat page-pelanggan.html'
            );
        }

        document.getElementById('pelanggan').innerHTML =
            await pelanggan.text();


        // ================================================
        // TAMBAH PELANGGAN
        // ================================================

        const addPelanggan =
            await fetch('includes/page-tambah-pelanggan.html');

        if (!addPelanggan.ok) {
            throw new Error(
                'Gagal memuat page-tambah-pelanggan.html'
            );
        }

        document.getElementById('add-pelanggan').innerHTML =
            await addPelanggan.text();


        // ================================================
        // SEMUA LAYOUT SELESAI
        // ================================================

        console.log(
            '✅ Semua layout berhasil dimuat.'
        );

        document.dispatchEvent(
            new Event('layoutLoaded')
        );

    } catch (error) {

        console.error(
            '❌ Gagal memuat layout:',
            error
        );

    }

}


// Jalankan loader
loadLayout();
