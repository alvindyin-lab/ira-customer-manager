// =========================================================
// WAKTU REAL TIME
// =========================================================

function tampilkanWaktu() {

    const dateElement =
        document.getElementById("dateNow");

    const timeElement =
        document.getElementById("timeNow");


    // Jika topbar belum tersedia
    if (!dateElement || !timeElement) {
        return;
    }


    const sekarang =
        new Date();


    const hari = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];


    const bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];


    const namaHari =
        hari[sekarang.getDay()];

    const tanggal =
        sekarang.getDate();

    const namaBulan =
        bulan[sekarang.getMonth()];

    const tahun =
        sekarang.getFullYear();


    const jam =
        String(
            sekarang.getHours()
        ).padStart(2, "0");


    const menit =
        String(
            sekarang.getMinutes()
        ).padStart(2, "0");


    const detik =
        String(
            sekarang.getSeconds()
        ).padStart(2, "0");


    dateElement.innerHTML =
        `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;


    timeElement.innerHTML =
        `${jam}:${menit}:${detik}`;
}


// =========================================================
// PENGATURAN HALAMAN
// =========================================================

function inisialisasiNavigasi() {

    const navItems =
        document.querySelectorAll(".nav-item");


    const pages =
        document.querySelectorAll(".page");


    navItems.forEach(function(navItem) {

        navItem.addEventListener(
            "click",
            function() {

                const targetPage =
                    this.dataset.page;


                // Hapus active navigation
                navItems.forEach(function(item) {

                    item.classList.remove(
                        "active"
                    );

                });


                // Tambahkan active navigation
                this.classList.add(
                    "active"
                );


                // Sembunyikan semua page
                pages.forEach(function(page) {

                    page.classList.remove(
                        "active"
                    );

                });


                // Tampilkan page tujuan
                const page =
                    document.getElementById(
                        targetPage
                    );


                if (page) {

                    page.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


// =========================================================
// JALANKAN SETELAH SEMUA HTML SELESAI DIMUAT
// =========================================================

document.addEventListener(
    "layoutLoaded",
    function() {

        console.log(
            "✅ javascript.js siap."
        );


        // Jalankan jam
        tampilkanWaktu();


        // Update setiap detik
        setInterval(
            tampilkanWaktu,
            1000
        );


        // Aktifkan navigasi
        inisialisasiNavigasi();

    }
);
