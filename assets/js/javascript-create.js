<script>
  /* =========================================================
   DATA WILAYAH
   SILAKAN EDIT SENDIRI
========================================================= */

const DATA_WILAYAH = {

"Balongbendo": [
    "Balongbendo",
    "Bakalan Wringinpitu",
    "Bakungpringgodani",
    "Bakungtemenggungan",
    "Bogempinggir",
    "Gadungkepuhsari",
    "Jabaran",
    "Jeruklegi",
    "Kedungsukodani",
    "Kemangsen",
    "Penambangan",
    "Seduri",
    "Seketi",
    "Singkalang",
    "Sumokebangsri",
    "Suwaluh",
    "Waruberon",
    "Watesari",
    "Wonokarang",
    "Wonokupang"
],

"Buduran": [
    "Banjarkemantren",
    "Banjarsari",
    "Buduran",
    "Damarsi",
    "Dukuhtengah",
    "Entalsewu",
    "Pagerwojo",
    "Prasung",
    "Sawohan",
    "Sidokerto",
    "Sidomulyo",
    "Sidokepung",
    "Siwalanpanji",
    "Sukorejo",
    "Wadungasih"
],

"Candi": [
    "Balongdowo",
    "Balonggabus",
    "Bligo",
    "Candi",
    "Durungbanjar",
    "Durungbedug",
    "Gelam",
    "Jambangan",
    "Kalipecabean",
    "Karangtanjung",
    "Kebonsari",
    "Kedungkendo",
    "Kedungpeluk",
    "Kendalpecabean",
    "Klurak",
    "Larangan",
    "Ngampelsari",
    "Sepande",
    "Sidodadi",
    "Sugihwaras",
    "Sumokali",
    "Sumorame",
    "Tenggulunan",
    "Wedoroklurak"
],

"Gedangan": [
    "Bangah",
    "Ganting",
    "Gedangan",
    "Gemurung",
    "Karangbong",
    "Keboansikep",
    "Keboan Anom",
    "Ketajen",
    "Kragan",
    "Punggul",
    "Sawotratap",
    "Semambung",
    "Seruni",
    "Tebel",
    "Wedi"
],

"Jabon": [
    "Balongtani",
    "Dukuhsari",
    "Jemirahan",
    "Keboguyang",
    "Kedungcangkring",
    "Kedungpandan",
    "Kedungrejo",
    "Kupang",
    "Panggreh",
    "Permisan",
    "Semambung",
    "Tambakkalisogo",
    "Trompoasri"
],

"Krembung": [
    "Balonggarut",
    "Cangkring",
    "Gading",
    "Jenggot",
    "Kandangan",
    "Kedungrawan",
    "Kedungsumur",
    "Keper",
    "Keret",
    "Krembung",
    "Lemujut",
    "Mojoruntut",
    "Ploso",
    "Rejeni",
    "Tambakrejo",
    "Tanjegwagir",
    "Wangkal",
    "Wonomlati",
    "Waung"
],

"Krian": [
    "Barengkrajan",
    "Gamping",
    "Jatikalang",
    "Jerukgamping",
    "Junwangi",
    "Katerungan",
    "Keboharan",
    "Kraton",
    "Ponokawan",
    "Sedenganmijen",
    "Sidomojo",
    "Sidomulyo",
    "Sidorejo",
    "Tempel",
    "Terik",
    "Terungkulon",
    "Terungwetan",
    "Tropodo",
    "Watugolong",
    "Kemasan",
    "Krian",
    "Tambak Kemerakan"
],

"Prambon": [
    "Bendotretek",
    "Bulang",
    "Cangkringturi",
    "Gampang",
    "Gedangrowo",
    "Jatialunalun",
    "Jatikalang",
    "Jedongcangkring",
    "Kajartengguli",
    "Kedungkembar",
    "Kedungsugo",
    "Kedungwonokerto",
    "Pejangkungan",
    "Prambon",
    "Simogirang",
    "Simpang",
    "Temu",
    "Watutulis",
    "Wirobiting",
    "Wonoplintahan"
],


"Porong": [
    "Candipari",
    "Glagaharum",
    "Kebakalan",
    "Kebonagung",
    "Kedungboto",
    "Kedungsolo",
    "Kesambi",
    "Lajuk",
    "Pamotan",
    "Pesawahan",
    "Plumbon",
    "Wunut",
    "Gedang",
    "Juwetkenongo",
    "Porong"
],

"Sedati": [
    "Banjarkemuning",
    "Betro",
    "Buncitan",
    "Cemandi",
    "Gisikcemandi",
    "Kalanganyar",
    "Kwangsan",
    "Pabean",
    "Pepe",
    "Pranti",
    "Pulungan",
    "Sedatiagung",
    "Sedatigede",
    "Segorotambak",
    "Semampir",
    "Tambakcemandi"
],

"Sidoarjo": [
    "Banjarbendo",
    "Blurukidul",
    "Bulusidokare",
    "Celep",
    "Cemengbakalan",
    "Cemengkalan",
    "Gebang",
    "Jati",
    "Kemiri",
    "Lebo",
    "Lemahputro",
    "Magersari",
    "Pekauman",
    "Pucang",
    "Pucanganom",
    "Rangkahkidul",
    "Sarirogo",
    "Sekardangan",
    "Sidokare",
    "Sidoklumpuk",
    "Sidokumpul",
    "Suko",
    "Sumput",
    "Urangagung"
],

"Sukodono": [
    "Anggaswangi",
    "Bangsri",
    "Cangkringsari",
    "Jogosatru",
    "Jumputrejo",
    "Kebonagung",
    "Kloposepuluh",
    "Masangankulon",
    "Masanganwetan",
    "Ngaresrejo",
    "Pademonegoro",
    "Panjunan",
    "Pekarungan",
    "Plumbungan",
    "Sambungrejo",
    "Suko",
    "Sukodono",
    "Suruh",
    "Wilayut"
],

"Taman": [
    "Bebekan",
    "Bohar",
    "Bringinbendo",
    "Geluran",
    "Gilang",
    "Jemundo",
    "Kalijaten",
    "Kedungturi",
    "Ketegan",
    "Kletek",
    "Kramatjegu",
    "Krembangan",
    "Ngelom",
    "Pertapanmaduretno",
    "Sadang",
    "Sambibulu",
    "Sepanjang",
    "Sidodadi",
    "Taman",
    "Tanjungsari",
    "Tawangsari",
    "Trosobo",
    "Wage",
    "Wonocolo"
],

"Tanggulangin": [
    "Banjarasri",
    "Banjarpanji",
    "Boro",
    "Ganggang Panjang",
    "Gempolsari",
    "Kalidawir",
    "Kalisampurno",
    "Kalitengah",
    "Kedensari",
    "Kedungbanteng",
    "Ketapang",
    "Ketegan",
    "Kludan",
    "Ngaban",
    "Penatarsewu",
    "Putat",
    "Randegan",
    "Sentul"
],

"Tarik": [
    "Balongmacekan",
    "Banjarwungu",
    "Gampingrowo",
    "Gempolklutuk",
    "Janti",
    "Kalimati",
    "Kedungbocok",
    "Kedinding",
    "Kemuning",
    "Kendalsewu",
    "Klantingsari",
    "Kramattemenggung",
    "Mergobener",
    "Mergosari",
    "Mindugading",
    "Mliriprowo",
    "Sebani",
    "Segodobancang",
    "Singogalih",
    "Tarik"
],

"Tulangan": [
    "Gelang",
    "Grabagan",
    "Grinting",
    "Grogol",
    "Janti",
    "Jiken",
    "Kajeksan",
    "Kebaron",
    "Kedondong",
    "Kemantren",
    "Kenongo",
    "Kepatihan",
    "Kepadangan",
    "Kepuhkemiri",
    "Kepunten",
    "Medalem",
    "Modong",
    "Pangkemiri",
    "Singopadu",
    "Sudimoro",
    "Tlasih",
    "Tulangan"
],

"Waru": [
    "Berbek",
    "Bungurasih",
    "Janti",
    "Kedungrejo",
    "Kepuhkiriman",
    "Kureksari",
    "Medaeng",
    "Ngingas",
    "Pepelegi",
    "Tambakoso",
    "Tambakrejo",
    "Tambaksawah",
    "Tambaksumur",
    "Tropodo",
    "Wadungasri",
    "Waru",
    "Wedoro"
],

"Wonoayu": [
    "Becirongengor",
    "Candinegoro",
    "Jimbarankulon",
    "Jimbaranwetan",
    "Karangpuri",
    "Ketimang",
    "Lambangan",
    "Mojorangagung",
    "Mulyodadi",
    "Pagerngumbuk",
    "Pilang",
    "Plaosan",
    "Ploso",
    "Popoh",
    "Sawocangkring",
    "Semambung",
    "Simoanginangin",
    "Simoketawang",
    "Sumberejo",
    "Tanggul",
    "Wonoayu",
    "Wonokalang",
    "Wonokasian"
],

};


/* =========================================================
   LOAD KECAMATAN
========================================================= */

function loadKecamatan() {

  const selectKecamatan =
    document.getElementById('inputKecamatan');


  if (!selectKecamatan) {
    return;
  }


  selectKecamatan.innerHTML = `

    <option value="">
      Pilih Kecamatan
    </option>

  `;


  Object.keys(DATA_WILAYAH)
    .forEach(function(kecamatan) {

      const option =
        document.createElement('option');

      option.value = kecamatan;

      option.textContent = kecamatan;

      selectKecamatan.appendChild(option);

    });

}


/* =========================================================
   KETIKA KECAMATAN DIPILIH
========================================================= */

function ubahKecamatan() {

  const kecamatan =
    document.getElementById(
      'inputKecamatan'
    ).value;


  const selectDesa =
    document.getElementById(
      'inputDesa'
    );


  selectDesa.innerHTML = `

    <option value="">
      Pilih Desa / Kelurahan
    </option>

  `;


  selectDesa.disabled = true;


  if (
    !kecamatan ||
    !DATA_WILAYAH[kecamatan]
  ) {

    return;

  }


  DATA_WILAYAH[kecamatan]
    .forEach(function(desa) {

      const option =
        document.createElement('option');

      option.value = desa;

      option.textContent = desa;

      selectDesa.appendChild(option);

    });


  selectDesa.disabled = false;

}


/* =========================================================
   SUBMIT FORM
========================================================= */

function submitFormPelanggan(event) {

  event.preventDefault();


  const nama =
    document.getElementById(
      'inputNama'
    ).value.trim();

  const id =
    document.getElementById(
      'inputId'
    ).value.trim();


  const whatsapp =
    document.getElementById(
      'inputWhatsapp'
    ).value.trim();


  const serialnumber =
    document.getElementById(
      'inputSerialNumber'
    ).value.trim();


  const nik =
    document.getElementById(
      'inputNik'
    ).value.trim();


  const kecamatan =
    document.getElementById(
      'inputKecamatan'
    ).value;


  const desa =
    document.getElementById(
      'inputDesa'
    ).value;


  const rtrw =
    document.getElementById(
      'inputRTRW'
    ).value.trim();


  const alamat =
    document.getElementById(
      'inputAlamat'
    ).value.trim();


  const koordinat =
    document.getElementById(
      'inputKoordinat'
    ).value.trim();


  const cpe =
    document.getElementById(
      'inputCpe'
    ).value;


  // ================================================
  // VALIDASI FRONTEND
  // ================================================

  if (!nama) {

    alert('Nama Lengkap wajib diisi.');

    return;

  }


  if (!whatsapp) {

    alert('Nomor WhatsApp wajib diisi.');

    return;

  }


  if (!nik) {

    alert('NIK wajib diisi.');

    return;

  }


  if (!/^\d{16}$/.test(nik)) {

    alert('NIK harus terdiri dari 16 digit.');

    return;

  }


  if (!kecamatan) {

    alert('Silakan pilih Kecamatan.');

    return;

  }


  if (!desa) {

    alert('Silakan pilih Desa/Kelurahan.');

    return;

  }


  if (!/^\d{2}\/\d{2}$/.test(rtrw)) {

    alert(
      'RT/RW harus menggunakan format 00/00.'
    );

    return;

  }


  if (!alamat) {

    alert('Alamat Lengkap wajib diisi.');

    return;

  }


  // ================================================
  // ISI DATA KE MODAL
  // ================================================

  document.getElementById(
    'validasiNama'
  ).textContent = nama;


  document.getElementById(
    'validasiWhatsapp'
  ).textContent = whatsapp;


  document.getElementById(
    'validasiNik'
  ).textContent = nik;


  document.getElementById(
    'validasiWilayah'
  ).textContent =
    `${desa}, ${kecamatan}`;


  // ================================================
  // SIMPAN DATA SEMENTARA
  // ================================================

window.dataPelangganSementara = {

  id: id,

  nama: nama,

  whatsapp: whatsapp,

  serialnumber: serialnumber,

  nik: nik,

  kecamatan: kecamatan,

  desa: desa,

  rtrw: rtrw,

  alamat: alamat,

  koordinat: koordinat,

  cpe: cpe

};


  // ================================================
  // TAMPILKAN MODAL
  // ================================================

  document
    .getElementById(
      'modalValidasiPelanggan'
    )
    .classList.add('show');

}


/* =========================================================
   TUTUP MODAL
========================================================= */

function tutupModalValidasi() {

  document
    .getElementById(
      'modalValidasiPelanggan'
    )
    .classList.remove('show');

}


/* =========================================================
   KONFIRMASI SIMPAN
========================================================= */

function konfirmasiSimpanPelanggan() {

  const data =
    window.dataPelangganSementara;


  if (!data) {

    return;

  }


  const button =
    document.querySelector(
      '.modal-btn-oke'
    );


  button.disabled = true;

  button.textContent =
    'MENYIMPAN...';


  google.script.run

    .withSuccessHandler(function(response) {

      button.disabled = false;

      button.textContent =
        'OKE';


      tutupModalValidasi();


      resetFormPelanggan();


      // =========================================
      // PINDAH KE PAGE PELANGGAN
      // =========================================

      pindahKePagePelanggan();


      // =========================================
      // REFRESH DATA PELANGGAN
      // =========================================

      loadPelanggan();


    })


    .withFailureHandler(function(error) {

      button.disabled = false;

      button.textContent =
        'OKE';


      alert(
        error.message ||
        'Gagal menyimpan data pelanggan.'
      );

    })


    .simpanDataPelanggan(data);

}


/* =========================================================
   PINDAH KE PAGE PELANGGAN
========================================================= */

function pindahKePagePelanggan() {

  const navItems =
    document.querySelectorAll(
      '.nav-item'
    );


  const pages =
    document.querySelectorAll(
      '.page'
    );


  navItems.forEach(function(item) {

    item.classList.remove(
      'active'
    );

  });


  pages.forEach(function(page) {

    page.classList.remove(
      'active'
    );

  });


  const navPelanggan =
    document.querySelector(
      '[data-page="pelanggan"]'
    );


  const pagePelanggan =
    document.getElementById(
      'pelanggan'
    );


  if (navPelanggan) {

    navPelanggan.classList.add(
      'active'
    );

  }


  if (pagePelanggan) {

    pagePelanggan.classList.add(
      'active'
    );

  }

}


/* =========================================================
   RESET FORM
========================================================= */

function resetFormPelanggan() {

  const form =
    document.getElementById(
      'formTambahPelanggan'
    );


  if (form) {

    form.reset();

  }


  const desa =
    document.getElementById(
      'inputDesa'
    );


  if (desa) {

    desa.innerHTML = `

      <option value="">
        Pilih Desa / Kelurahan
      </option>

    `;

    desa.disabled = true;

  }


  window.dataPelangganSementara =
    null;

}


/* =========================================================
   LOAD SAAT DOM SIAP
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  function() {

    loadKecamatan();

  }
);







/* =========================================================
   FORMAT OTOMATIS RT/RW
   FORMAT: 00/00
========================================================= */

function formatRTRW(input) {

  // Ambil hanya angka
  let value =
    input.value.replace(/\D/g, '');

  // Maksimal 4 digit
  value =
    value.substring(0, 4);

  // Tambahkan "/" setelah 2 digit
  if (value.length > 2) {

    value =
      value.substring(0, 2) +
      '/' +
      value.substring(2);

  }

  input.value = value;

}




function updateSelectPlaceholder(select) {

  if (select.value === '') {
    select.classList.add('is-placeholder');
  } else {
    select.classList.remove('is-placeholder');
  }

}

</script>
