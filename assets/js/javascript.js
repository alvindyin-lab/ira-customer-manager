<script>

// ===== WAKTU REAL TIME =======

function tampilkanWaktu() {

    const sekarang = new Date();

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

    const namaHari = hari[sekarang.getDay()];
    const tanggal = sekarang.getDate();
    const namaBulan = bulan[sekarang.getMonth()];
    const tahun = sekarang.getFullYear();

    const jam = String(sekarang.getHours()).padStart(2, "0");
    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    const detik = String(sekarang.getSeconds()).padStart(2, "0");

    document.getElementById("dateNow").innerHTML =
        `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;

    document.getElementById("timeNow").innerHTML =
        `${jam}:${menit}:${detik}`;
}

tampilkanWaktu();

setInterval(tampilkanWaktu, 1000);


// ===== PENGATURAN HALAMAN =======

document.addEventListener("DOMContentLoaded", function () {

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");


    navItems.forEach(function (navItem) {

        navItem.addEventListener("click", function () {

            const targetPage = this.dataset.page;


            // ==========================
            // HAPUS ACTIVE NAV
            // ==========================

            navItems.forEach(function (item) {

                item.classList.remove("active");

            });


            // ==========================
            // TAMBAHKAN ACTIVE NAV
            // ==========================

            this.classList.add("active");


            // ==========================
            // SEMBUNYIKAN SEMUA PAGE
            // ==========================

            pages.forEach(function (page) {

                page.classList.remove("active");

            });


            // ==========================
            // TAMPILKAN PAGE TUJUAN
            // ==========================

            const page = document.getElementById(targetPage);

            if (page) {

                page.classList.add("active");

            }

        });

    });

});

// document.addEventListener('DOMContentLoaded', function () {

//   alert(
//     'Viewport width: ' +
//     window.innerWidth +
//     'px'
//   );

// });


</script>
