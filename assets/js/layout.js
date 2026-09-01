/* =========================================================
   LOAD LAYOUT
========================================================= */

async function loadLayout() {

    try {

        const files = [
            ['sidebar', 'includes/sidebar.html'],
            ['topbar', 'includes/topbar.html'],
            ['dashboard', 'includes/page-dashboard.html'],
            ['pelanggan', 'includes/page-pelanggan.html'],
            ['add-pelanggan', 'includes/page-tambah-pelanggan.html']
        ];

        for (const [elementId, filePath] of files) {

            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(
                    `Gagal memuat ${filePath}`
                );
            }

            document.getElementById(elementId).innerHTML =
                await response.text();
        }

        console.log('✅ Semua layout berhasil dimuat.');

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

loadLayout();
