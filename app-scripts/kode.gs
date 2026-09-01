/* GOOGLE APPS SCRIPT - BACKEND
========================================================= */

const SPREADSHEET_ID = '1Lmi3kxiRWXTNnIvVeqwVJh5IfQr4acJyL-3cyqakqIE'; // <-- kalau kosong, script akan mencoba SpreadsheetApp.getActive()
const SHEET_NAME = 'Data Pelanggan';

function _getSS() {
  try {
    if (SPREADSHEET_ID && SPREADSHEET_ID.trim()) {
      return SpreadsheetApp.openById(SPREADSHEET_ID.trim());
    }
    return SpreadsheetApp.getActive() || SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    Logger.log("Error membuka spreadsheet: " + e);
    throw new Error("Gagal membuka spreadsheet. Pastikan SPREADSHEET_ID benar atau script ter-attach pada Spreadsheet.");
  }
}

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('IRA Customer Manager')
    .setFaviconUrl('https://www.google.com/favicon.ico')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// function doGet(e) {

//   // ==========================================
//   // DEVICE PREVIEW
//   // ==========================================

//   if (
//     e &&
//     e.parameter &&
//     e.parameter.preview === '1'
//   ) {

//     return HtmlService
//       .createTemplateFromFile('dev-preview')
//       .evaluate()
//       .setTitle('IRA Customer Manager - Device Preview')
//       .setXFrameOptionsMode(
//         HtmlService.XFrameOptionsMode.ALLOWALL
//       );

//   }


//   // ==========================================
//   // APLIKASI NORMAL
//   // ==========================================

//   return HtmlService
//     .createTemplateFromFile('index')
//     .evaluate()
//     .setTitle('IRA Customer Manager')
//     .setFaviconUrl(
//       'https://www.google.com/favicon.ico'
//     )
//     .setXFrameOptionsMode(
//       HtmlService.XFrameOptionsMode.ALLOWALL
//     );

// }

function include(filename) {
  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();
}

// MENGAMBIL DATA DARI SPREADSHEET

function getDataPelanggan() {

  try {

    const spreadsheet =
      SpreadsheetApp.openById(SPREADSHEET_ID);

    const sheet =
      spreadsheet.getSheetByName(SHEET_NAME);


    if (!sheet) {

      throw new Error(
        'Sheet "' + SHEET_NAME + '" tidak ditemukan.'
      );

    }


    const data =
      sheet.getDataRange().getValues();


    if (data.length <= 1) {

      return [];

    }


    // Hapus baris header
    data.shift();


    return data

      // Customer ID berada di kolom L = index 11
      .filter(function (row) {

        return String(row[3]).trim() !== '';

      })


      .map(function (row) {

        return {

          customerId: String(row[0] || '').trim(),

          dibuatPada: formatTanggalIndonesia(row[1]),

          nama: String(row[3] || '').trim(),

          whatsapp: String(row[4] || '').trim(),

          noterdaftar: String(row[5] || '').trim(),

          serialnumber: String(row[6] || '').trim(),

          nik: String(row[7] || '').trim(),

          kecamatan: String(row[8] || '').trim(),

          desa: String(row[9] || '').trim(),

          rtrw: String(row[10] || '').trim(),

          alamat: String(row[11] || '').trim(),

          koordinat: String(row[12] || '').trim(),

          cpe: String(row[14] || '').trim(),

          status: String(row[15] || '').trim()

        };

      });


  } catch (error) {

    console.error(
      'getDataPelanggan Error:',
      error
    );

    throw new Error(
      'Gagal mengambil data pelanggan: ' +
      error.message
    );

  }

}



function formatTanggalIndonesia(value) {

  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return String(value);
  }

  const bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];

  const tanggal =
    date.getDate();

  const namaBulan =
    bulan[date.getMonth()];

  const tahun =
    date.getFullYear();

  const jam =
    String(date.getHours()).padStart(2, '0');

  const menit =
    String(date.getMinutes()).padStart(2, '0');

  return (tanggal + ' ' + namaBulan + ' ' + tahun + '\n' + ' • ' + jam + ':' + menit);

}






/* =========================================================
   TAMBAH DATA PELANGGAN
========================================================= */

function simpanDataPelanggan(data) {

  try {

    const spreadsheet =
      SpreadsheetApp.openById(SPREADSHEET_ID);

    const sheet =
      spreadsheet.getSheetByName(SHEET_NAME);


    if (!sheet) {

      throw new Error(
        'Sheet "' + SHEET_NAME + '" tidak ditemukan.'
      );

    }


    // ================================================
    // VALIDASI DATA
    // ================================================

    if (!data) {
      throw new Error('Data pelanggan tidak ditemukan.');
    }

    const customerId =
      String(data.id || '').trim();


    // const serialnumber =
    //   String(data.serialnumber || '').trim();


    // const koordinat =
    //   String(data.koordinat || '').trim();


    // const cpe =
    //   String(data.cpe || '').trim();


    if (!data.nama || !data.nama.trim()) {
      throw new Error('Nama Lengkap wajib diisi.');
    }

    // if (!data.customerId || !data.customerId.trim()) {
    //   throw new Error('Silahkan isi Customer ID');
    // }


    if (!data.whatsapp || !data.whatsapp.trim()) {
      throw new Error('Nomor WhatsApp wajib diisi.');
    }

    if (!data.serialnumber || !data.serialnumber.trim()) {
      throw new Error('Silahkan isi Serial Number');
    }

    if (!data.nik || !data.nik.trim()) {
      throw new Error('NIK wajib diisi.');
    }


    if (!data.kecamatan || !data.kecamatan.trim()) {
      throw new Error('Kecamatan wajib dipilih.');
    }


    if (!data.desa || !data.desa.trim()) {
      throw new Error('Desa/Kelurahan wajib dipilih.');
    }


    if (!data.rtrw || !data.rtrw.trim()) {
      throw new Error('RT/RW wajib diisi.');
    }


    if (!data.alamat || !data.alamat.trim()) {
      throw new Error('Alamat Lengkap wajib diisi.');
    }

    if (!data.koordinat || !data.koordinat.trim()) {
      throw new Error('Silahkan isi Koordinat');
    }

    if (!data.cpe || !data.cpe.trim()) {
      throw new Error('Pilih jenis CPE');
    }


    // ================================================
    // VALIDASI NIK
    // ================================================

    const nik =
      String(data.nik).replace(/\D/g, '');


    if (nik.length !== 16) {

      throw new Error(
        'NIK harus terdiri dari 16 digit.'
      );

    }


    // ================================================
    // SUSUN DATA SESUAI STRUKTUR SPREADSHEET
    // ================================================

    const newRow = [

      customerId,                 // A - Customer ID

      '',                         // B - Tanggal dibuat

      '',                         // C

      data.nama.trim(),           // D - Nama

      data.whatsapp.trim(),       // E - WhatsApp

      data.whatsapp.trim(),       // F - No. Terdaftar

      serialnumber,               // G - Serial Number

      nik,                        // H - NIK

      data.kecamatan.trim(),      // I - Kecamatan

      data.desa.trim(),           // J - Desa

      data.rtrw.trim(),           // K - RT/RW

      data.alamat.trim(),         // L - Alamat

      koordinat,                  // M - Koordinat

      '',                         // N

      cpe,                        // O - Jenis CPE

      ''                          // P - Status

    ];

    sheet.appendRow(newRow);


    return {

      success: true,

      message:
        'Data pelanggan berhasil disimpan.'

    };


  } catch (error) {

    console.error(
      'simpanDataPelanggan Error:',
      error
    );


    throw new Error(
      error.message ||
      'Gagal menyimpan data pelanggan.'
    );

  }

}
