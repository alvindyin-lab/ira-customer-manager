<script>
  // CRUD (READ) - DATA PELANGGAN

let semuaPelanggan = [];

let filteredPelanggan = [];

let currentPage = 1;

const perPage = 12;

/*
|--------------------------------------------------------------------------
| AMBIL DATA DARI APPS SCRIPT
|--------------------------------------------------------------------------
*/

function loadPelanggan() {

  const container =
    document.getElementById('customerGrid');


  if (!container) {

    console.error(
      'Element #customerGrid tidak ditemukan.'
    );

    return;

  }

  google.script.run

    .withSuccessHandler(function(data) {

      console.log(
        'Data pelanggan berhasil diterima:',
        data
      );

      console.log(
        'Jumlah pelanggan:',
        data.length
      );



      semuaPelanggan =
        Array.isArray(data)
          ? data
          : [];


      filteredPelanggan =
        [...semuaPelanggan];


      currentPage = 1;

      sortPelanggan();

    })


    .withFailureHandler(function(error) {

      console.error(
        'ERROR GOOGLE SCRIPT:',
        error
      );


      container.innerHTML = `

        <div class="error">

          <h3>Gagal mengambil data</h3>

          <p>
            ${escapeHTML(
              error.message ||
              'Terjadi kesalahan pada server.'
            )}
          </p>

        </div>

      `;

    })


    .getDataPelanggan();

}


/*
|--------------------------------------------------------------------------
| FILTER
|--------------------------------------------------------------------------
*/

function filterPelanggan() {

  const keyword =
    document
      .getElementById('searchPelanggan')
      .value
      .toLowerCase();

  const status =
    document
      .getElementById('filterStatus')
      .value;


  filteredPelanggan = semuaPelanggan.filter(function(customer) {

    const searchable = `

      ${customer.customerId}
      ${customer.nama}
      ${customer.whatsapp}
      ${customer.nik}
      ${customer.kecamatan}
      ${customer.desa}
      ${customer.rtrw}
      ${customer.alamat}
      ${customer.koordinat}
      ${customer.status}
      ${customer.cpe}

    `.toLowerCase();


    const cocokKeyword =
      searchable.includes(keyword);


    const cocokStatus =
      status === '' ||
      customer.status === status;


    return cocokKeyword && cocokStatus;

  });


currentPage = 1;

sortPelanggan();

}



/*
|--------------------------------------------------------------------------
| RENDER CUSTOMER
|--------------------------------------------------------------------------
*/

function renderPelanggan() {

  const container =
    document.getElementById(
      'customerGrid'
    );


  container.innerHTML = '';


  const start =
    (currentPage - 1) * perPage;


  const end =
    start + perPage;


  const data =
    filteredPelanggan.slice(
      start,
      end
    );


  if (data.length === 0) {

    container.innerHTML = `

      <div class="empty">

        <h3>
          Tidak ada pelanggan
        </h3>

        <p>
          Data pelanggan tidak ditemukan.
        </p>

      </div>

    `;

    updatePagination();

    return;

  }


  data.forEach(function(customer) {

    const card =
      createCustomerCard(customer);


    container.appendChild(card);

  });


  updatePagination();

}

/*
|--------------------------------------------------------------------------
| CUSTOMER CARD
|--------------------------------------------------------------------------
*/

function createCustomerCard(customer) {

  const template =
    document.getElementById(
      'customerCardTemplate'
    );


  const card =
    template.content
      .cloneNode(true);


  // ==============================
  // HEADER
  // ==============================

  // Const Customer Initial

  // const initial =
  //   customer.nama
  //     ? customer.nama
  //         .charAt(0)
  //         .toUpperCase()
  //     : '?';


  // card
  //   .querySelector('.customer-initial')
  //   .textContent = initial;

  // ==============================


  card
    .querySelector('.customer-id')
    .textContent = customer.customerId;


  card
    .querySelector('.customer-full-name')
    .textContent = customer.nama;


  // ==============================
  // DATA
  // ==============================

  card
    .querySelector('.customer-whatsapp')
    .textContent = customer.whatsapp;


  card
    .querySelector('.customer-nik')
    .textContent = customer.nik;


  card
    .querySelector('.customer-wilayah')
    .textContent = `${customer.kecamatan}, ${customer.desa}, RT/RW ${customer.rtrw}`;;


  // ==============================
  // FOOTER
  // ==============================

  const status =
    card.querySelector(
      '.customer-status'
    );


  status.textContent =
    customer.status;


  if (customer.status === 'Aktif') {

    status.classList.add(
      'status-active'
    );

  }

  else if (
    customer.status === 'Pending'
  ) {

    status.classList.add(
      'status-pending'
    );

  }

  else {

    status.classList.add(
      'status-nonactive'
    );

  }

  card
    .querySelector('.customer-cpe')
    .textContent = customer.cpe;



  // ==============================================
  // TOMBOL DETAIL PELANGGAN
  // ==============================================

  const moreButton =
    card.querySelector(
      '.more-button'
    );


  if (moreButton) {

    moreButton.addEventListener(
      'click',
      function() {

        bukaModalDetailPelanggan(
          customer
        );

      }
    );

  }

  return card;
}












/* =========================================================
   MODAL DETAIL PELANGGAN
========================================================= */

function bukaModalDetailPelanggan(customer) {

  if (!customer) {

    console.error(
      'Data pelanggan tidak ditemukan.'
    );

    return;

  }


  // =====================================================
  // ISI DATA HEADER
  // =====================================================

  document.getElementById(
    'detailNama'
  ).textContent =
    customer.nama || '-';


  document.getElementById(
    'detailCustomerId'
  ).textContent =
    'ID: ' + (
      customer.customerId || '-'
    );


  // =====================================================
  // DATA KONTAK
  // =====================================================

  document.getElementById(
    'detailWhatsapp'
  ).textContent =
    customer.whatsapp || '-';


  document.getElementById(
    'detailNomorTerdaftar'
  ).textContent =
    customer.noterdaftar || '-';


  // =====================================================
  // DATA IDENTITAS
  // =====================================================

  document.getElementById(
    'detailSerialNumber'
  ).textContent =
    customer.serialnumber || '-';


  document.getElementById(
    'detailNik'
  ).textContent =
    customer.nik || '-';


  // =====================================================
  // DATA WILAYAH
  // =====================================================

  document.getElementById(
    'detailKecamatan'
  ).textContent =
    customer.kecamatan || '-';


  document.getElementById(
    'detailDesa'
  ).textContent =
    customer.desa || '-';


  document.getElementById(
    'detailRTRW'
  ).textContent =
    customer.rtrw || '-';


  // =====================================================
  // ALAMAT
  // =====================================================

  document.getElementById(
    'detailAlamat'
  ).textContent =
    customer.alamat || '-';


  // =====================================================
  // TANGGAL
  // =====================================================

  document.getElementById(
    'detailDibuatPada'
  ).textContent =
    customer.dibuatPada || '-';


  document.getElementById(
    'detailDiupdateTerakhir'
  ).textContent =
    customer.diupdateTerakhir || '-';


  // =====================================================
  // STATUS
  // =====================================================

  const statusElement =
    document.getElementById(
      'detailStatus'
    );


  statusElement.textContent =
    customer.status || '-';


  // Hapus class status sebelumnya

  statusElement.classList.remove(
    'status-active',
    'status-pending',
    'status-nonactive'
  );


  if (customer.status === 'Aktif') {

    statusElement.classList.add(
      'status-active'
    );

  }

  else if (
    customer.status === 'Pending'
  ) {

    statusElement.classList.add(
      'status-pending'
    );

  }

  else {

    statusElement.classList.add(
      'status-nonactive'
    );

  }


  // =====================================================
  // JENIS CPE
  // =====================================================

  document.getElementById(
    'detailCpe'
  ).textContent =
    customer.cpe || '-';


  // =====================================================
  // SIMPAN CUSTOMER YANG SEDANG DIBUKA
  // =====================================================

  window.pelangganDetailAktif =
    customer;


  // =====================================================
  // TAMPILKAN MODAL
  // =====================================================

  const modal =
    document.getElementById(
      'modalDetailPelanggan'
    );


  if (modal) {

    modal.classList.add(
      'show'
    );

  }

}/* =========================================================
   MODAL DETAIL PELANGGAN
========================================================= */

function bukaModalDetailPelanggan(customer) {

  if (!customer) {

    console.error(
      'Data pelanggan tidak ditemukan.'
    );

    return;

  }


  // =====================================================
  // ISI DATA HEADER
  // =====================================================

  document.getElementById(
    'detailNama'
  ).textContent =
    customer.nama || '-';


  document.getElementById(
    'detailCustomerId'
  ).textContent =
    'ID: ' + (
      customer.customerId || '-'
    );


  // =====================================================
  // DATA KONTAK
  // =====================================================

  document.getElementById(
    'detailWhatsapp'
  ).textContent =
    customer.whatsapp || '-';


  document.getElementById(
    'detailNomorTerdaftar'
  ).textContent =
    customer.noterdaftar || '-';


  // =====================================================
  // DATA IDENTITAS
  // =====================================================

  document.getElementById(
    'detailSerialNumber'
  ).textContent =
    customer.serialnumber || '-';


  document.getElementById(
    'detailNik'
  ).textContent =
    customer.nik || '-';


  // =====================================================
  // DATA WILAYAH
  // =====================================================

  document.getElementById(
    'detailKecamatan'
  ).textContent =
    customer.kecamatan || '-';


  document.getElementById(
    'detailDesa'
  ).textContent =
    customer.desa || '-';


  document.getElementById(
    'detailRTRW'
  ).textContent =
    customer.rtrw || '-';


  // =====================================================
  // ALAMAT
  // =====================================================

  document.getElementById(
    'detailAlamat'
  ).textContent =
    customer.alamat || '-';

  // =====================================================
  // KOORDINAT
  // =====================================================

  document.getElementById(
    'detailKoordinat'
  ).textContent =
    customer.koordinat || '-';

  // =====================================================
  // TANGGAL
  // =====================================================

  document.getElementById(
    'detailDibuatPada'
  ).textContent =
    customer.dibuatPada || '-';


  document.getElementById(
    'detailDiupdateTerakhir'
  ).textContent =
    customer.diupdateTerakhir || '-';


  // =====================================================
  // STATUS
  // =====================================================

  const statusElement =
    document.getElementById(
      'detailStatus'
    );


  statusElement.textContent =
    customer.status || '-';


  // Hapus class status sebelumnya

  statusElement.classList.remove(
    'status-active',
    'status-pending',
    'status-nonactive'
  );


  if (customer.status === 'Aktif') {

    statusElement.classList.add(
      'status-active'
    );

  }

  else if (
    customer.status === 'Pending'
  ) {

    statusElement.classList.add(
      'status-pending'
    );

  }

  else {

    statusElement.classList.add(
      'status-nonactive'
    );

  }


  // =====================================================
  // JENIS CPE
  // =====================================================

  document.getElementById(
    'detailCpe'
  ).textContent =
    customer.cpe || '-';


  // =====================================================
  // SIMPAN CUSTOMER YANG SEDANG DIBUKA
  // =====================================================

  window.pelangganDetailAktif =
    customer;


  // =====================================================
  // TAMPILKAN MODAL
  // =====================================================

  const modal =
    document.getElementById(
      'modalDetailPelanggan'
    );


  if (modal) {

    modal.classList.add(
      'show'
    );

  }

}

/* =========================================================
   TUTUP MODAL DETAIL PELANGGAN
========================================================= */

function tutupModalDetailPelanggan() {

  const modal =
    document.getElementById(
      'modalDetailPelanggan'
    );


  if (modal) {

    modal.classList.remove(
      'show'
    );

  }


  window.pelangganDetailAktif =
    null;

}

/* =========================================================
   KLIK AREA LUAR MODAL
========================================================= */

document.addEventListener(
  'click',
  function(event) {

    const modal =
      document.getElementById(
        'modalDetailPelanggan'
      );


    if (!modal) {

      return;

    }


    if (
      event.target === modal
    ) {

      tutupModalDetailPelanggan();

    }

  }
);

/* =========================================================
   TUTUP DENGAN ESC
========================================================= */

document.addEventListener(
  'keydown',
  function(event) {

    if (
      event.key === 'Escape'
    ) {

      tutupModalDetailPelanggan();

    }

  }
);















// =====================================================
// START DATA PELANGGAN
// =====================================================

if (document.readyState === 'loading') {

  document.addEventListener(
    'DOMContentLoaded',
    loadPelanggan
  );

} else {

  loadPelanggan();

}

// =====================================================
// UPDATE PAGINATION
// =====================================================

function updatePagination() {

  const total =
    filteredPelanggan.length;


  const totalPages =
    Math.ceil(total / perPage);


  document.getElementById('pageNumber')
    .textContent =
      `${currentPage} / ${totalPages || 1}`;


  const start =
    total === 0
      ? 0
      : ((currentPage - 1) * perPage) + 1;


  const end =
    Math.min(
      currentPage * perPage,
      total
    );


  document.getElementById('dataInfo')
    .innerHTML =
      `Menampilkan <strong>${start}</strong> - <strong>${end}</strong> dari <strong>${total}</strong> data`;

}

// =====================================================
// PREVIOUS PAGE
// =====================================================

function previousPage() {

  if (currentPage <= 1) {
    return;
  }

  currentPage--;

  renderPelanggan();

}

// =====================================================
// NEXT PAGE
// =====================================================

function nextPage() {

  const total =
    filteredPelanggan.length;


  const totalPages =
    Math.max(
      1,
      Math.ceil(total / perPage)
    );


  if (currentPage >= totalPages) {
    return;
  }


  currentPage++;

  renderPelanggan();

}

/* =========================================================
   SORTING DATA PELANGGAN
========================================================= */

function sortPelanggan() {

  const sortType =
    document.getElementById('sortPelanggan').value;

  const direction =
    document.getElementById('sortDirection').value;

  filteredPelanggan.sort(function(a, b) {

    let result = 0;

    // =========================================
    // TERBARU
    // =========================================
    if (sortType === 'terbaru') {

      /*
       * Data dari Spreadsheet dibaca
       * berdasarkan posisi data.
       *
       * Data paling baru = posisi terakhir.
       */

      const indexA =
        semuaPelanggan.indexOf(a);

      const indexB =
        semuaPelanggan.indexOf(b);

      result = indexB - indexA;
    }

    // =========================================
    // A - Z
    // =========================================
    else if (sortType === 'az') {

      result =
        String(a.nama || '').localeCompare(
          String(b.nama || ''),
          'id',
          {
            sensitivity: 'base'
          }
        );
    }

    // =========================================
    // ARAH URUTAN
    // =========================================
    if (direction === 'desc') {
      result = result * -1;
    }

    return result;

  });

  currentPage = 1;

  renderPelanggan();
}

</script>
