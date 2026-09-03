/* =========================================================
   ACTION → HAPUS DATA PELANGGAN
========================================================= */

// async function hapusPelangganDariAction() {

function hapusPelangganDariAction() {

    const menu =
        document.getElementById(
            'customerActionMenu'
        );

    if (menu) {
        menu.classList.remove('show');
    }


    const customer =
        window.pelangganDetailAktif;


    if (!customer) {

        alert(
            'Data pelanggan tidak ditemukan.'
        );

        return;

    }


    const customerId =
        String(
            customer.customerId || ''
        ).trim();


    if (!customerId) {

        alert(
            'Customer ID tidak ditemukan.'
        );

        return;

    }


    document.getElementById(
        'hapusNamaPelanggan'
    ).textContent =
        customer.nama || '-';


    document.getElementById(
        'hapusCustomerId'
    ).textContent =
        customerId;


    const modal =
        document.getElementById(
            'modalHapusPelanggan'
        );


    if (modal) {

        modal.classList.add('show');

    }
}




/* =========================================================
   KONFIRMASI → HAPUS DATA PELANGGAN
========================================================= */
async function konfirmasiHapusPelanggan() {

    const customer =
        window.pelangganDetailAktif;

    if (!customer) {
        alert('Data pelanggan tidak ditemukan.');
        return;
    }

    const customerId =
        String(
            customer.customerId || ''
        ).trim();

    if (!customerId) {
        alert('Customer ID tidak ditemukan.');
        return;
    }

    try {

        console.log(
            '🗑️ Menghapus pelanggan:',
            customerId
        );

        const response =
            await fetch(API_URL, {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'text/plain;charset=utf-8'
                },

                body: JSON.stringify({
                    action:
                        'hapusDataPelanggan',

                    data: {
                        customerId:
                            customerId
                    }
                })
            });

        const result =
            await response.json();

        console.log(
            'Response hapus:',
            result
        );

        if (!result.success) {
            throw new Error(
                result.message ||
                'Gagal menghapus data pelanggan.'
            );
        }

        /* TUTUP MODAL HAPUS */
        tutupModalHapusPelanggan();

        /* TUTUP MODAL DETAIL */
        tutupModalDetailPelanggan();

        window.pelangganDetailAktif = null;

        /* MUAT ULANG DATA PELANGGAN */
        await loadPelanggan();

        // alert(
        //     'Data pelanggan berhasil dihapus.'
        // );

    } catch (error) {

        console.error(
            '❌ ERROR HAPUS PELANGGAN:',
            error
        );

        alert(
            error.message ||
            'Terjadi kesalahan saat menghapus data pelanggan.'
        );
    }
}










/* =========================================================
   MODAL HAPUS → TUTUP
========================================================= */
function tutupModalHapusPelanggan() {

    const modal =
        document.getElementById(
            'modalHapusPelanggan'
        );

    if (modal) {
        modal.classList.remove('show');
    }
}

