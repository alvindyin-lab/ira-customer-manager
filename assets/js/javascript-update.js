/* =========================================================
   CRUD (UPDATE)
   EDIT / UPDATE DATA PELANGGAN
========================================================= */


/* =========================================================
   VARIABEL DATA EDIT
========================================================= */

window.dataPelangganEdit =
  null;


/* =========================================================
   BUKA MODAL EDIT DARI MODAL DETAIL
========================================================= */

function editPelangganDariModal() {

  console.log(
    '✏️ Membuka modal edit pelanggan...'
  );


  // =====================================================
  // AMBIL DATA PELANGGAN AKTIF
  // =====================================================

  const customer =
    window.pelangganDetailAktif;


  if (!customer) {

    console.error(
      '❌ Data pelanggan aktif tidak ditemukan.'
    );

    alert(
      'Data pelanggan tidak ditemukan.'
    );

    return;

  }


  console.log(
    'Data pelanggan yang akan diedit:',
    customer
  );


  // =====================================================
  // SIMPAN DATA ASLI
  // =====================================================

  window.dataPelangganEdit = {

    ...customer,

    idLama:
      customer.customerId || ''

  };

  // =====================================================
  // AMBIL ELEMENT MODAL EDIT
  // =====================================================

  const modalEdit =
    document.getElementById(
      'modalEditPelanggan'
    );


  if (!modalEdit) {

    console.error(
      '❌ #modalEditPelanggan tidak ditemukan.'
    );

    alert(
      'Modal edit belum tersedia di HTML.'
    );

    return;

  }


  // =====================================================
  // ISI DATA HEADER
  // =====================================================

  const editCustomerId =
    document.getElementById(
      'editCustomerId'
    );


  if (editCustomerId) {

    editCustomerId.value =
      customer.customerId || '';

  }


  // =====================================================
  // ISI FORM
  // =====================================================

  const editNama =
    document.getElementById(
      'editNama'
    );


  if (editNama) {

    editNama.value =
      customer.nama || '';

  }


  const editWhatsapp =
    document.getElementById(
      'editWhatsapp'
    );


  if (editWhatsapp) {

    editWhatsapp.value =
      customer.whatsapp || '';

  }

  const editNomorTerdaftar =
    document.getElementById(
      'editNomorTerdaftar'
    );

  if (editNomorTerdaftar) {
    editNomorTerdaftar.value =
      customer.noterdaftar || '';
  }


  const editSerialNumber =
    document.getElementById(
      'editSerialNumber'
    );


  if (editSerialNumber) {

    editSerialNumber.value =
      customer.serialnumber || '';

  }


  const editNik =
    document.getElementById(
      'editNik'
    );


  if (editNik) {

    editNik.value =
      customer.nik || '';

  }


  // =====================================================
  // KECAMATAN
  // =====================================================

  isiKecamatanEdit(
    customer.kecamatan || ''
  );


  // =====================================================
  // DESA / KELURAHAN
  // =====================================================

  isiDesaEdit(
    customer.kecamatan || '',
    customer.desa || ''
  );


  // =====================================================
  // RT / RW
  // =====================================================

  const editRTRW =
    document.getElementById(
      'editRTRW'
    );


  if (editRTRW) {

    editRTRW.value =
      customer.rtrw || '';

  }


  // =====================================================
  // ALAMAT
  // =====================================================

  const editAlamat =
    document.getElementById(
      'editAlamat'
    );


  if (editAlamat) {

    editAlamat.value =
      customer.alamat || '';

  }


  // =====================================================
  // KOORDINAT
  // =====================================================

  const editKoordinat =
    document.getElementById(
      'editKoordinat'
    );


  if (editKoordinat) {

    editKoordinat.value =
      customer.koordinat || '';

  }


  // =====================================================
  // JENIS CPE
  // =====================================================

  const editCpe =
    document.getElementById(
      'editCpe'
    );


  if (editCpe) {

    editCpe.value =
      customer.cpe || '';

  }


  // =====================================================
  // TUTUP MODAL DETAIL
  // =====================================================

  const modalDetail =
    document.getElementById(
      'modalDetailPelanggan'
    );


  if (modalDetail) {

    modalDetail.classList.remove(
      'show'
    );

  }


  // =====================================================
  // BUKA MODAL EDIT
  // =====================================================

  modalEdit.classList.add(
    'show'
  );


  console.log(
    '✅ Modal edit pelanggan berhasil dibuka.'
  );

}


/* =========================================================
   ISI DROPDOWN KECAMATAN EDIT
========================================================= */

function isiKecamatanEdit(
  kecamatanAktif
) {

  const selectKecamatan =
    document.getElementById(
      'editKecamatan'
    );


  if (!selectKecamatan) {

    console.error(
      '❌ #editKecamatan tidak ditemukan.'
    );

    return;

  }


  selectKecamatan.innerHTML = `

    <option value="">
      Pilih Kecamatan
    </option>

  `;


  // DATA_WILAYAH berasal dari javascript-create.js
  // sehingga tidak perlu dibuat ulang di sini.

  if (
    typeof DATA_WILAYAH === 'undefined'
  ) {

    console.error(
      '❌ DATA_WILAYAH tidak ditemukan.'
    );

    return;

  }


  Object.keys(
    DATA_WILAYAH
  ).forEach(
    function (kecamatan) {

      const option =
        document.createElement(
          'option'
        );


      option.value =
        kecamatan;


      option.textContent =
        kecamatan;


      if (
        kecamatan ===
        kecamatanAktif
      ) {

        option.selected =
          true;

      }


      selectKecamatan.appendChild(
        option
      );

    }
  );

}


/* =========================================================
   ISI DROPDOWN DESA / KELURAHAN EDIT
========================================================= */

function isiDesaEdit(
  kecamatan,
  desaAktif
) {

  const selectDesa =
    document.getElementById(
      'editDesa'
    );


  if (!selectDesa) {

    console.error(
      '❌ #editDesa tidak ditemukan.'
    );

    return;

  }


  selectDesa.innerHTML = `

    <option value="">
      Pilih Desa / Kelurahan
    </option>

  `;


  selectDesa.disabled =
    true;


  if (
    typeof DATA_WILAYAH === 'undefined'
  ) {

    console.error(
      '❌ DATA_WILAYAH tidak ditemukan.'
    );

    return;

  }


  if (
    !kecamatan ||
    !DATA_WILAYAH[kecamatan]
  ) {

    return;

  }


  DATA_WILAYAH[kecamatan]
    .forEach(
      function (desa) {

        const option =
          document.createElement(
            'option'
          );


        option.value =
          desa;


        option.textContent =
          desa;


        if (
          desa ===
          desaAktif
        ) {

          option.selected =
            true;

        }


        selectDesa.appendChild(
          option
        );

      }
    );


  selectDesa.disabled =
    false;

}


/* =========================================================
   KETIKA KECAMATAN EDIT BERUBAH
========================================================= */

function ubahKecamatanEdit() {

  const selectKecamatan =
    document.getElementById(
      'editKecamatan'
    );


  const selectDesa =
    document.getElementById(
      'editDesa'
    );


  if (
    !selectKecamatan ||
    !selectDesa
  ) {

    console.error(
      '❌ Element Kecamatan / Desa edit tidak ditemukan.'
    );

    return;

  }


  const kecamatan =
    selectKecamatan.value;


  isiDesaEdit(
    kecamatan,
    ''
  );

}


/* =========================================================
   AMBIL DATA DARI FORM EDIT
========================================================= */

function ambilDataFormEdit() {

  const customer =
    window.dataPelangganEdit;


  if (!customer) {

    console.error(
      '❌ Data pelanggan edit tidak tersedia.'
    );

    return null;

  }


  const nama =
    document.getElementById(
      'editNama'
    ).value.trim();


  const whatsapp =
    document.getElementById(
      'editWhatsapp'
    ).value.trim();

  const noterdaftar =
    document.getElementById(
      'editNomorTerdaftar'
    ).value.trim();


  const serialnumber =
    document.getElementById(
      'editSerialNumber'
    ).value.trim();


  const nik =
    document.getElementById(
      'editNik'
    ).value.trim();


  const kecamatan =
    document.getElementById(
      'editKecamatan'
    ).value;


  const desa =
    document.getElementById(
      'editDesa'
    ).value;


  const rtrw =
    document.getElementById(
      'editRTRW'
    ).value.trim();


  const alamat =
    document.getElementById(
      'editAlamat'
    ).value.trim();


  const koordinat =
    document.getElementById(
      'editKoordinat'
    ).value.trim();


  const cpe =
    document.getElementById(
      'editCpe'
    ).value;


  return {

    idLama:
      String(
        window.dataPelangganEdit.customerId || ''
      ).trim(),

    idBaru:
      document
        .getElementById('editCustomerId')
        .value
        .trim(),

    nama:
      nama,

    whatsapp:
      whatsapp,

    noterdaftar:
      noterdaftar,

    serialnumber:
      serialnumber,

    nik:
      nik,

    kecamatan:
      kecamatan,

    desa:
      desa,

    rtrw:
      rtrw,

    alamat:
      alamat,

    koordinat:
      koordinat,

    cpe:
      cpe

  };

}


/* =========================================================
   VALIDASI DATA EDIT -
   YANG MEMBUAT WAJIB ATAU TIDAKNYA ISIAN FORM
========================================================= */

function validasiDataEdit(data) {

  if (!data) {

    return false;

  }


  if (!data.nama) {

    alert(
      'Nama Lengkap wajib diisi.'
    );

    return false;

  }


  if (!data.whatsapp) {

    alert(
      'Nomor WhatsApp wajib diisi.'
    );

    return false;

  }


  // if (!data.nik) {

  //   alert(
  //     'NIK wajib diisi.'
  //   );

  //   return false;

  // }


  // if (
  //   !/^\d{16}$/.test(
  //     data.nik
  //   )
  // ) {

  //   alert(
  //     'NIK harus terdiri dari 16 digit.'
  //   );

  //   return false;

  // }


  if (!data.kecamatan) {

    alert(
      'Silakan pilih Kecamatan.'
    );

    return false;

  }


  if (!data.desa) {

    alert(
      'Silakan pilih Desa/Kelurahan.'
    );

    return false;

  }


  // if (
  //   !/^\d{2}\/\d{2}$/.test(
  //     data.rtrw
  //   )
  // ) {

  //   alert(
  //     'RT/RW harus menggunakan format 00/00.'
  //   );

  //   return false;

  // }


  // if (!data.alamat) {

  //   alert(
  //     'Alamat Lengkap wajib diisi.'
  //   );

  //   return false;

  // }


  return true;

}


/* =========================================================
   BATAL EDIT
========================================================= */

function batalEditPelanggan() {

  console.log(
    '↩️ Membatalkan edit pelanggan.'
  );


  const modalEdit =
    document.getElementById(
      'modalEditPelanggan'
    );


  const modalDetail =
    document.getElementById(
      'modalDetailPelanggan'
    );


  // Tutup edit

  if (modalEdit) {

    modalEdit.classList.remove(
      'show'
    );

  }


  // Tampilkan kembali detail

  if (
    modalDetail &&
    window.pelangganDetailAktif
  ) {

    bukaModalDetailPelanggan(
      window.pelangganDetailAktif
    );

  }


  console.log(
    '✅ Kembali ke modal detail.'
  );

}


/* =========================================================
   SIMPAN PERUBAHAN PELANGGAN
========================================================= */

async function simpanPerubahanPelanggan() {

  console.log(
    '💾 Menyimpan perubahan pelanggan...'
  );


  const data =
    ambilDataFormEdit();

  console.log(
    '📌 DATA UPDATE YANG DIKIRIM:',
    data
  );

  console.log(
    '📌 ID LAMA:',
    data?.idLama
  );

  console.log(
    '📌 ID BARU:',
    data?.idBaru
  );


  if (
    !validasiDataEdit(
      data
    )
  ) {

    return;

  }


  const button =
    document.querySelector(
      '.customer-edit-save'
    );


  if (button) {

    button.disabled =
      true;

    button.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Menyimpan...';

  }


  try {

    const response =
      await fetch(
        API_URL,
        {

          method:
            'POST',

          headers: {

            'Content-Type':
              'text/plain;charset=utf-8'

          },

          body:
            JSON.stringify({

              action:
                'updateDataPelanggan',

              data:
                data

            })

        }
      );


    if (!response.ok) {

      throw new Error(
        'Server tidak dapat dihubungi.'
      );

    }


    const result =
      await response.json();


    console.log(
      'Response update:',
      result
    );


    if (!result.success) {

      throw new Error(
        result.message ||
        'Gagal memperbarui data pelanggan.'
      );

    }

    // 🔄 Ambil data terbaru dari Spreadsheet
    await loadPelanggan();

    // ===================================================
    // AMBIL DATA TERBARU DARI SPREADSHEET
    // ===================================================

    const pelangganTerbaru =
      semuaPelanggan.find(function (pelanggan) {

        return String(pelanggan.customerId).trim() ===
          String(data.idBaru).trim();

      });


    if (!pelangganTerbaru) {

      throw new Error(
        'Data pelanggan terbaru tidak ditemukan setelah update.'
      );

    }


    // ===================================================
    // UPDATE DATA AKTIF DI BROWSER
    // ===================================================

    window.pelangganDetailAktif =
      pelangganTerbaru;


    // window.pelangganDetailAktif = {

    //   ...window.pelangganDetailAktif,

    //   customerId: data.idBaru,

    //   nama:
    //     data.nama,

    //   whatsapp:
    //     data.whatsapp,

    //   noterdaftar:
    //     data.noterdaftar,

    //   serialnumber:
    //     data.serialnumber,

    //   nik:
    //     data.nik,

    //   kecamatan:
    //     data.kecamatan,

    //   desa:
    //     data.desa,

    //   rtrw:
    //     data.rtrw,

    //   alamat:
    //     data.alamat,

    //   koordinat:
    //     data.koordinat,

    //   diupdateTerakhir:
    //     data.diupdateTerakhir,

    //   cpe:
    //     data.cpe

    // };


    // ===================================================
    // TUTUP MODAL EDIT
    // ===================================================

    const modalEdit =
      document.getElementById(
        'modalEditPelanggan'
      );


    if (modalEdit) {

      modalEdit.classList.remove(
        'show'
      );

    }


    // ===================================================
    // TAMPILKAN DATA TERBARU DI MODAL DETAIL
    // ===================================================

    bukaModalDetailPelanggan(
      window.pelangganDetailAktif
    );


    // ===================================================
    // LOAD ULANG DATA DARI SPREADSHEET
    // ===================================================

    loadPelanggan();


    // alert(
    //   result.message ||
    //   'Data pelanggan berhasil diperbarui.'
    // );


    console.log(
      '✅ Data pelanggan berhasil diperbarui.'
    );

  }

  catch (error) {

    console.error(
      '❌ ERROR UPDATE PELANGGAN:',
      error
    );


    alert(
      error.message ||
      'Gagal memperbarui data pelanggan.'
    );

  }

  finally {

    if (button) {

      button.disabled =
        false;

      button.innerHTML =
        '<i class="fa-solid fa-check"></i> Selesai';

    }

  }

}


/* =========================================================
   TUTUP MODAL EDIT
========================================================= */

function tutupModalEditPelanggan() {

  const modal =
    document.getElementById(
      'modalEditPelanggan'
    );


  if (modal) {

    modal.classList.remove(
      'show'
    );

  }

}


/* =========================================================
   KLIK AREA LUAR MODAL EDIT
========================================================= */

document.addEventListener(
  'click',
  function (event) {

    const modal =
      document.getElementById(
        'modalEditPelanggan'
      );


    if (!modal) {

      return;

    }


    if (
      event.target === modal
    ) {

      batalEditPelanggan();

    }

  }
);


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
  'keydown',
  function (event) {

    if (
      event.key !== 'Escape'
    ) {

      return;

    }


    const modalEdit =
      document.getElementById(
        'modalEditPelanggan'
      );


    if (
      modalEdit &&
      modalEdit.classList.contains(
        'show'
      )
    ) {

      batalEditPelanggan();

    }

  }
);















/* =========================================================
   CUSTOMER ACTION MENU
========================================================= */

function toggleCustomerAction(event) {

  event.stopPropagation();

  const menu =
    document.getElementById(
      'customerActionMenu'
    );

  if (!menu) {
    return;
  }

  menu.classList.toggle('show');

}


/* =========================================================
   TUTUP ACTION MENU
========================================================= */

document.addEventListener(
  'click',
  function (event) {

    const menu =
      document.getElementById(
        'customerActionMenu'
      );

    if (!menu) {
      return;
    }

    const actionContainer =
      document.querySelector(
        '.customer-detail-action'
      );

    if (
      actionContainer &&
      !actionContainer.contains(event.target)
    ) {

      menu.classList.remove('show');

    }

  }
);


/* =========================================================
   ACTION → EDIT
========================================================= */

function editPelangganDariAction() {

  const menu =
    document.getElementById(
      'customerActionMenu'
    );

  if (menu) {
    menu.classList.remove('show');
  }

  editPelangganDariModal();

}
