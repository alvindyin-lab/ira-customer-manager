
// CRUD (READ) - DATA PELANGGAN

const API_URL = 'https://script.google.com/macros/s/AKfycbzJmYeonwSAWTM1It3f36B9tn_U0pUXSkolXqebzow3u-FRs7m0LeC3hW5NJHVUbG89/exec';

let semuaPelanggan = [];

let filteredPelanggan = [];

let revenueChart = null;

let currentPage = 1;

const perPage = 12;

// =========================================================
// DATE RANGE PICKER — PERTUMBUHAN PELANGGAN
// =========================================================

let chartPickerMonth = new Date();

let chartPickerStart = '';

let chartPickerEnd = '';

let chartAppliedStart = '';

let chartAppliedEnd = '';

let chartDatePickerInitialized = false;

let chartYearPicker = null;


// =========================================================
// HELPER DATE RANGE
// =========================================================

function formatDateISO(date) {

  const tahun =
    date.getFullYear();

  const bulan =
    String(
      date.getMonth() + 1
    ).padStart(2, '0');

  const tanggal =
    String(
      date.getDate()
    ).padStart(2, '0');

  return (
    tahun +
    '-' +
    bulan +
    '-' +
    tanggal
  );

}


function formatDateRangeIndonesia(
  tanggalMulai,
  tanggalAkhir
) {

  if (
    !tanggalMulai ||
    !tanggalAkhir
  ) {

    return 'Pilih tanggal';

  }

  const mulai =
    new Date(
      tanggalMulai +
      'T00:00:00'
    );

  const akhir =
    new Date(
      tanggalAkhir +
      'T00:00:00'
    );

  const formatter =
    new Intl.DateTimeFormat(
      'id-ID',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  return (
    formatter.format(mulai) +
    ' — ' +
    formatter.format(akhir)
  );

}





// =========================================================
// DATE RANGE PICKER
// =========================================================

function initChartDateRangePicker() {

  if (
    chartDatePickerInitialized
  ) {

    return;

  }


  const button =
    document.getElementById(
      'chartDateRangeButton'
    );

  const picker =
    document.getElementById(
      'chartDatePicker'
    );

  const daysContainer =
    document.getElementById(
      'chartDateDays'
    );

  const monthLabel =
    document.getElementById(
      'chartDateMonth'
    );

  const prevButton =
    document.getElementById(
      'chartDatePrev'
    );

  const nextButton =
    document.getElementById(
      'chartDateNext'
    );

  const cancelButton =
    document.getElementById(
      'chartDateCancel'
    );

  const applyButton =
    document.getElementById(
      'chartDateApply'
    );

  const rangeText =
    document.getElementById(
      'chartDateRangeText'
    );

  const tanggalMulaiInput =
    document.getElementById(
      'tanggalMulaiGrafik'
    );

  const tanggalAkhirInput =
    document.getElementById(
      'tanggalAkhirGrafik'
    );


  if (
    !button ||
    !picker ||
    !daysContainer ||
    !monthLabel ||
    !prevButton ||
    !nextButton ||
    !cancelButton ||
    !applyButton ||
    !rangeText ||
    !tanggalMulaiInput ||
    !tanggalAkhirInput
  ) {

    console.warn(
      '⚠️ Elemen Date Range Picker belum lengkap.'
    );

    return;

  }


  chartYearPicker = document.createElement('div');
  chartYearPicker.className = 'chart-year-picker';
  chartYearPicker.style.display = 'none';

  monthLabel.parentElement.style.position = 'relative';
  monthLabel.parentElement.appendChild(chartYearPicker);


  // =======================================================
  // DEFAULT: BULAN BERJALAN
  // =======================================================

  const hariIni =
    new Date();

  const tanggalHariIni =
    formatDateISO(
      hariIni
    );

  const tanggalMulaiBulan =
    hariIni.getFullYear() +
    '-' +
    String(
      hariIni.getMonth() + 1
    ).padStart(2, '0') +
    '-01';


  if (
    !tanggalMulaiInput.value
  ) {

    tanggalMulaiInput.value =
      tanggalMulaiBulan;

  }


  if (
    !tanggalAkhirInput.value
  ) {

    tanggalAkhirInput.value =
      tanggalHariIni;

  }


  chartAppliedStart =
    tanggalMulaiInput.value;

  chartAppliedEnd =
    tanggalAkhirInput.value;

  chartPickerStart =
    chartAppliedStart;

  chartPickerEnd =
    chartAppliedEnd;


  chartPickerMonth =
    new Date(
      chartPickerStart +
      'T00:00:00'
    );


  rangeText.textContent =
    formatDateRangeIndonesia(
      chartAppliedStart,
      chartAppliedEnd
    );



  // =======================================================
  // RENDER KALENDER
  // =======================================================

  function renderCalendar() {

    const tahun =
      chartPickerMonth.getFullYear();

    const bulan =
      chartPickerMonth.getMonth();


    monthLabel.textContent =
      new Intl.DateTimeFormat(
        'id-ID',
        {
          month: 'long',
          year: 'numeric'
        }
      ).format(
        chartPickerMonth
      );


    // ===================================================
    // BATASI BULAN MAKSIMAL SAMPAI BULAN BERJALAN
    // ===================================================

    const bulanSekarang = new Date();

    const tahunBulanSekarang =
      bulanSekarang.getFullYear();

    const nomorBulanSekarang =
      bulanSekarang.getMonth();

    const tahunPicker =
      chartPickerMonth.getFullYear();

    const nomorBulanPicker =
      chartPickerMonth.getMonth();

    nextButton.disabled =
      tahunPicker > tahunBulanSekarang ||
      (
        tahunPicker === tahunBulanSekarang &&
        nomorBulanPicker >= nomorBulanSekarang
      );


    daysContainer.innerHTML =
      '';


    const hariPertama =
      new Date(
        tahun,
        bulan,
        1
      );


    const jumlahHari =
      new Date(
        tahun,
        bulan + 1,
        0
      ).getDate();


    // Senin = 0
    // Minggu = 6

    let posisiAwal =
      hariPertama.getDay() - 1;

    if (
      posisiAwal < 0
    ) {

      posisiAwal = 6;

    }


    // =====================================================
    // SEMUA TANGGAL BULAN
    // =====================================================

    for (
      let tanggal = 1;
      tanggal <= jumlahHari;
      tanggal++
    ) {

      const date =
        new Date(
          tahun,
          bulan,
          tanggal
        );


      const iso =
        formatDateISO(
          date
        );


      const day =
        document.createElement(
          'button'
        );

      day.type =
        'button';

      day.className =
        'chart-date-day';

      day.textContent =
        tanggal;


      // ===================================================
      // NONAKTIFKAN TANGGAL SETELAH HARI INI
      // ===================================================

      if (iso > tanggalHariIni) {

        day.disabled = true;

        day.classList.add(
          'disabled'
        );

      }


      // ===================================================
      // HARI INI
      // ===================================================

      if (
        iso === tanggalHariIni
      ) {

        day.classList.add(
          'today'
        );

      }


      // ===================================================
      // TANGGAL MULAI
      // ===================================================

      if (
        iso === chartPickerStart
      ) {

        day.classList.add(
          'selected',
          'range-start'
        );

      }


      // ===================================================
      // TANGGAL AKHIR
      // ===================================================

      if (
        iso === chartPickerEnd
      ) {

        day.classList.add(
          'selected',
          'range-end'
        );

      }


      // ===================================================
      // DALAM RANGE
      // ===================================================

      if (
        chartPickerStart &&
        chartPickerEnd &&
        iso > chartPickerStart &&
        iso < chartPickerEnd
      ) {

        day.classList.add(
          'in-range'
        );

      }


      // ===================================================
      // EVENT KLIK TANGGAL
      // ===================================================

      day.addEventListener(
        'click',
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          if (day.disabled) {
            return;
          }

          // ===============================================
          // KLIK PERTAMA = TANGGAL MULAI
          // ===============================================

          if (
            !chartPickerStart ||
            chartPickerEnd
          ) {

            chartPickerStart =
              iso;

            chartPickerEnd =
              '';

            applyButton.disabled =
              true;

            renderCalendar();

            return;

          }


          // ===============================================
          // KLIK KEDUA = TANGGAL AKHIR
          // ===============================================

          if (
            !chartPickerEnd
          ) {

            if (
              iso <
              chartPickerStart
            ) {

              chartPickerEnd =
                chartPickerStart;

              chartPickerStart =
                iso;

            } else {

              chartPickerEnd =
                iso;

            }

            applyButton.disabled =
              !(
                chartPickerStart &&
                chartPickerEnd
              );

            renderCalendar();

          }

        }
      );


      daysContainer.appendChild(
        day
      );

    }

  }


  function renderChartYearPicker() {

    chartYearPicker.innerHTML = '';

    const tahunSekarang =
      new Date().getFullYear();

    const tahunMulai =
      1990;

    const tahunDipilih =
      chartPickerMonth.getFullYear();

    for (
      let tahun = tahunSekarang;
      tahun >= tahunMulai;
      tahun--
    ) {

      const yearButton =
        document.createElement('button');

      yearButton.type =
        'button';

      yearButton.className =
        'chart-year-option';

      yearButton.textContent =
        tahun;

      if (
        tahun === tahunDipilih
      ) {

        yearButton.classList.add(
          'selected'
        );

      }

      yearButton.addEventListener(
        'click',
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          // =============================================
          // UBAH TAHUN KALENDER
          // =============================================

          chartPickerMonth.setFullYear(
            tahun
          );


          // =============================================
          // TUTUP YEAR PICKER
          // =============================================

          chartYearPicker.classList.remove(
            'active'
          );

          chartYearPicker.style.display =
            'none';


          // =============================================
          // UPDATE JUDUL BULAN + TAHUN
          // =============================================

          monthLabel.textContent =
            new Intl.DateTimeFormat(
              'id-ID',
              {
                month: 'long',
                year: 'numeric'
              }
            ).format(
              chartPickerMonth
            );


          // =============================================
          // RENDER ULANG KALENDER
          // =============================================

          renderCalendar();

        }
      );

      chartYearPicker.appendChild(
        yearButton
      );

    }

  }


  monthLabel.addEventListener(
    'click',
    function (event) {

      event.preventDefault();
      event.stopPropagation();


      const sedangTerbuka =
        chartYearPicker.classList.contains(
          'active'
        );


      // =============================================
      // JIKA SEDANG TERBUKA → TUTUP
      // =============================================

      if (sedangTerbuka) {

        chartYearPicker.classList.remove(
          'active'
        );

        chartYearPicker.style.display =
          'none';

        return;

      }


      // =============================================
      // BUKA YEAR PICKER
      // =============================================

      renderChartYearPicker();

      chartYearPicker.style.display =
        'block';

      chartYearPicker.classList.add(
        'active'
      );

    }
  );

  // =======================================================
  // BUKA PICKER
  // =======================================================

  button.addEventListener(
    'click',
    function (event) {

      event.stopPropagation();

      const sedangTerbuka =
        picker.classList.contains(
          'active'
        );


      if (
        sedangTerbuka
      ) {

        picker.classList.remove(
          'active'
        );

        return;

      }


      chartPickerStart =
        chartAppliedStart;

      chartPickerEnd =
        chartAppliedEnd;


      chartPickerMonth =
        new Date(
          chartPickerStart +
          'T00:00:00'
        );

      if (isNaN(chartPickerMonth.getTime())) {

        chartPickerMonth =
          new Date();

      }

      renderCalendar();

      applyButton.disabled =
        !(
          chartPickerStart &&
          chartPickerEnd
        );


      picker.classList.add(
        'active'
      );

    }
  );


  // =======================================================
  // BULAN SEBELUMNYA
  // =======================================================

  prevButton.addEventListener(
    'click',
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      chartPickerMonth.setMonth(
        chartPickerMonth.getMonth() - 1
      );

      renderCalendar();

    }
  );


  // =======================================================
  // BULAN BERIKUTNYA
  // =======================================================

  nextButton.addEventListener(
    'click',
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      if (nextButton.disabled) {
        return;
      }

      chartPickerMonth.setMonth(
        chartPickerMonth.getMonth() + 1
      );

      renderCalendar();

    }
  );


  // =======================================================
  // BATAL
  // =======================================================

  cancelButton.addEventListener(
    'click',
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      chartPickerStart =
        chartAppliedStart;

      chartPickerEnd =
        chartAppliedEnd;

      picker.classList.remove(
        'active'
      );

    }
  );


  // =======================================================
  // TERAPKAN
  // =======================================================

  applyButton.addEventListener(
    'click',
    function (event) {

      event.preventDefault();
      event.stopPropagation();

      if (
        !chartPickerStart ||
        !chartPickerEnd
      ) {

        return;

      }


      // ===============================================
      // SIMPAN RANGE YANG DIPILIH
      // ===============================================

      chartAppliedStart =
        chartPickerStart;

      chartAppliedEnd =
        chartPickerEnd;


      // ===============================================
      // SIMPAN KE INPUT INTERNAL
      // ===============================================

      tanggalMulaiInput.value =
        chartAppliedStart;

      tanggalAkhirInput.value =
        chartAppliedEnd;


      // ===============================================
      // UPDATE TAMPILAN TOMBOL
      // ===============================================

      rangeText.textContent =
        formatDateRangeIndonesia(
          chartAppliedStart,
          chartAppliedEnd
        );


      // ===============================================
      // TUTUP PICKER
      // ===============================================

      picker.classList.remove(
        'active'
      );


      // ===============================================
      // RENDER ULANG GRAFIK
      // ===============================================

      renderPertumbuhanPelanggan();

    }
  );


  // =======================================================
  // KLIK DI LUAR PICKER
  // =======================================================

  document.addEventListener('click', function (event) {
    if (!picker.contains(event.target) && !button.contains(event.target)) {
      picker.classList.remove('active');
      if (chartYearPicker) {
        chartYearPicker.classList.remove('active');
      }
    }
  });


  chartDatePickerInitialized =
    true;

  renderCalendar();

}


/*
|--------------------------------------------------------------------------
| AMBIL DATA DARI APPS SCRIPT API
|--------------------------------------------------------------------------
*/

// function loadPelanggan() {

async function loadPelanggan() {

  console.log('🔥 LOAD PELANGGAN MASUK KE FUNGSI');

  const container =
    document.getElementById('customerGrid');


  if (!container) {

    console.error(
      'Element #customerGrid tidak ditemukan.'
    );

    return;

  }


  console.log(
    '🚀 Menjalankan fetch data pelanggan...'
  );


  return fetch(API_URL + '?action=getPelanggan')


    .then(function (response) {

      if (!response.ok) {

        throw new Error(
          'Server tidak dapat dihubungi.'
        );

      }

      return response.json();

    })


    .then(function (result) {

      console.log(
        'Response dari Apps Script:',
        result
      );


      // =========================================
      // CEK RESPONSE API
      // =========================================

      if (!result.success) {

        throw new Error(
          result.message ||
          'Gagal mengambil data pelanggan.'
        );

      }


      // =========================================
      // AMBIL DATA
      // =========================================

      const data =
        Array.isArray(result.data)
          ? result.data
          : [];


      console.log(
        'Data pelanggan berhasil diterima:',
        data
      );


      console.log(
        'Jumlah pelanggan:',
        data.length
      );


      // =========================================
      // SIMPAN DATA
      // =========================================

      semuaPelanggan =
        data;


      filteredPelanggan =
        [...semuaPelanggan];


      // Pertahankan halaman pagination yang sedang aktif
      if (currentPage > Math.ceil(filteredPelanggan.length / perPage)) {
        currentPage = Math.max(
          1,
          Math.ceil(filteredPelanggan.length / perPage)
        );
      }


      // =========================================
      // SORT & RENDER
      // =========================================

      initChartDateRangePicker();

      sortPelanggan();

      renderPertumbuhanPelanggan();

    })


    .catch(function (error) {

      console.error(
        'ERROR API APPS SCRIPT:',
        error
      );


      container.innerHTML = `

        <div class="error">

          <h3>
            Gagal mengambil data
          </h3>

          <p>
            ${escapeHTML(
        error.message ||
        'Terjadi kesalahan pada server.'
      )}
          </p>

        </div>

      `;

    });

}


function updatePertumbuhanPelanggan() {

  const growthValue =
    document.getElementById('growthValue');

  const growthIcon =
    document.getElementById('growthIcon');

  if (!growthValue || !growthIcon) {
    return;
  }


  // =====================================================
  // BERSIHKAN STATUS ICON SEBELUM UPDATE
  // =====================================================

  const iconElement = growthIcon.querySelector('i');

  if (!iconElement) {
    return;
  }




  // =====================================================
  // TENTUKAN BULAN YANG SEDANG DITAMPILKAN
  // =====================================================

  const tanggalAkhirInput =
    document.getElementById(
      'tanggalAkhirGrafik'
    );

  if (!tanggalAkhirInput || !tanggalAkhirInput.value) {
    return;
  }


  const tanggalAkhir =
    new Date(
      tanggalAkhirInput.value +
      'T00:00:00'
    );


  const tahunSekarang =
    tanggalAkhir.getFullYear();

  const bulanSekarang =
    tanggalAkhir.getMonth();


  // =====================================================
  // BULAN BERJALAN
  // =====================================================

  const bulanSekarangKey =
    tahunSekarang +
    '-' +
    String(
      bulanSekarang + 1
    ).padStart(2, '0');


  // =====================================================
  // BULAN SEBELUMNYA
  // =====================================================

  const tanggalBulanSebelumnya =
    new Date(
      tahunSekarang,
      bulanSekarang - 1,
      1
    );


  const tahunSebelumnya =
    tanggalBulanSebelumnya.getFullYear();

  const bulanSebelumnya =
    tanggalBulanSebelumnya.getMonth();


  const bulanSebelumnyaKey =
    tahunSebelumnya +
    '-' +
    String(
      bulanSebelumnya + 1
    ).padStart(2, '0');


  // =====================================================
  // HITUNG JUMLAH PELANGGAN PER BULAN
  // =====================================================

  let pelangganBulanSekarang = 0;

  let pelangganBulanSebelumnya = 0;


  semuaPelanggan.forEach(
    function (pelanggan) {

      const tanggal =
        pelanggan.dibuatPadaISO;

      if (!tanggal) {
        return;
      }


      const bulan =
        tanggal.substring(0, 7);


      if (bulan === bulanSekarangKey) {

        pelangganBulanSekarang++;

      }


      if (bulan === bulanSebelumnyaKey) {

        pelangganBulanSebelumnya++;

      }

    }
  );


  // =====================================================
  // HITUNG PERSENTASE PERTUMBUHAN
  // =====================================================

  // Jika bulan sebelumnya 0
  if (pelangganBulanSebelumnya === 0) {

    if (pelangganBulanSekarang > 0) {

      growthValue.textContent = 'Baru';

      iconElement.className = 'fa-solid fa-arrow-trend-up';

      growthIcon.classList.remove('growth-down', 'growth-neutral');

      growthValue.classList.remove(
        'growth-down',
        'growth-neutral'
      );

    } else {

      growthValue.textContent = '0%';

      iconElement.className = 'fa-solid fa-minus';

      growthIcon.classList.add('growth-neutral');

      growthIcon.classList.remove('growth-down');

      growthValue.classList.add('growth-neutral');

      growthValue.classList.remove('growth-down');

    }

    return;
  }


  const pertumbuhan =
    (
      (
        pelangganBulanSekarang -
        pelangganBulanSebelumnya
      ) /
      pelangganBulanSebelumnya
    ) * 100;


  const persen =
    Math.abs(
      pertumbuhan
    ).toFixed(1);


  // =====================================================
  // NAIK
  // =====================================================

  if (pertumbuhan > 0) {

    growthValue.textContent =
      '+' + persen + '%';


    iconElement.className = 'fa-solid fa-arrow-trend-up';


    growthIcon.classList.remove(
      'growth-down',
      'growth-neutral'
    );


    growthValue.classList.remove(
      'growth-down',
      'growth-neutral'
    );

  }


  // =====================================================
  // TURUN
  // =====================================================

  else if (pertumbuhan < 0) {

    growthValue.textContent =
      '-' + persen + '%';


    iconElement.className = 'fa-solid fa-arrow-trend-down';


    growthIcon.classList.add(
      'growth-down'
    );


    growthIcon.classList.remove(
      'growth-neutral'
    );


    growthValue.classList.add(
      'growth-down'
    );


    growthValue.classList.remove(
      'growth-neutral'
    );

  }


  // =====================================================
  // TETAP
  // =====================================================

  else {

    growthValue.textContent =
      '0%';


    iconElement.className = 'fa-solid fa-minus';


    growthIcon.classList.add(
      'growth-neutral'
    );


    growthIcon.classList.remove(
      'growth-down'
    );


    growthValue.classList.add(
      'growth-neutral'
    );


    growthValue.classList.remove(
      'growth-down'
    );

  }

}


/*
|--------------------------------------------------------------------------
| GRAFIK PERTUMBUHAN PELANGGAN
|--------------------------------------------------------------------------
*/


function renderPertumbuhanPelanggan() {

  // =========================================
  // FILTER TANGGAL GRAFIK
  // =========================================

  const tanggalMulaiInput =
    document.getElementById(
      'tanggalMulaiGrafik'
    );

  const tanggalAkhirInput =
    document.getElementById(
      'tanggalAkhirGrafik'
    );


  if (
    !tanggalMulaiInput ||
    !tanggalAkhirInput
  ) {

    console.warn(
      '⚠️ Input tanggal grafik tidak ditemukan.'
    );

    return;

  }



  // =========================================
  // DEFAULT: BULAN BERJALAN
  // =========================================

  const hariIni =
    new Date();


  const tahun =
    hariIni.getFullYear();


  const bulan =
    String(
      hariIni.getMonth() + 1
    ).padStart(2, '0');


  const tanggal =
    String(
      hariIni.getDate()
    ).padStart(2, '0');


  const tanggalHariIni =
    tahun +
    '-' +
    bulan +
    '-' +
    tanggal;


  const tanggalMulaiBulan =
    tahun +
    '-' +
    bulan +
    '-01';


  if (!tanggalMulaiInput.value) {

    tanggalMulaiInput.value =
      tanggalMulaiBulan;

  }


  if (!tanggalAkhirInput.value) {

    tanggalAkhirInput.value =
      tanggalHariIni;

  }


  // =====================================================
  // GUNAKAN RANGE YANG SUDAH DITERAPKAN
  // =====================================================

  if (
    chartAppliedStart &&
    chartAppliedEnd
  ) {

    tanggalMulaiInput.value =
      chartAppliedStart;

    tanggalAkhirInput.value =
      chartAppliedEnd;

  }


  const jumlahPerTanggal = {};

  semuaPelanggan.forEach(function (pelanggan) {

    console.log(
      '📅 DATA TANGGAL:',
      pelanggan.customerId,
      pelanggan.dibuatPadaISO
    );

    const tanggal =
      pelanggan.dibuatPadaISO;


    if (!tanggal) {

      return;

    }


    // Hanya data dalam rentang filter
    if (
      tanggal <
      tanggalMulaiInput.value ||
      tanggal >
      tanggalAkhirInput.value
    ) {

      return;

    }


    if (!jumlahPerTanggal[tanggal]) {

      jumlahPerTanggal[tanggal] = 0;

    }


    jumlahPerTanggal[tanggal]++;

  });


  // =========================================
  // RENTANG TANGGAL SESUAI FILTER
  // =========================================

  const tanggalAwal =
    new Date(
      tanggalMulaiInput.value +
      'T00:00:00'
    );


  const tanggalAkhir =
    new Date(
      tanggalAkhirInput.value +
      'T00:00:00'
    );


  if (
    tanggalAwal >
    tanggalAkhir
  ) {

    console.warn(
      '⚠️ Tanggal mulai lebih besar dari tanggal akhir.'
    );

    return;

  }


  // =========================================
  // BUAT SEMUA TANGGAL DALAM RENTANG
  // =========================================

  const labels = [];
  const values = [];

  const tanggalBerjalan =
    new Date(tanggalAwal);


  while (
    tanggalBerjalan <= tanggalAkhir
  ) {

    const tahun =
      tanggalBerjalan.getFullYear();

    const bulan =
      String(
        tanggalBerjalan.getMonth() + 1
      ).padStart(2, '0');

    const tanggal =
      String(
        tanggalBerjalan.getDate()
      ).padStart(2, '0');


    const tanggalISO =
      tahun + '-' +
      bulan + '-' +
      tanggal;


    labels.push(
      new Intl.DateTimeFormat(
        'id-ID',
        {
          day: '2-digit',
          month: 'short'
        }
      ).format(
        new Date(
          tanggalISO + 'T00:00:00'
        )
      )
    );


    values.push(
      jumlahPerTanggal[tanggalISO] || 0
    );


    tanggalBerjalan.setDate(
      tanggalBerjalan.getDate() + 1
    );

  }


  console.log(
    '📊 Labels grafik:',
    labels
  );

  console.log(
    '📊 Values grafik:',
    values
  );

  // =========================================
  // TOTAL PELANGGAN DALAM PERIODE
  // =========================================

  const totalPelanggan =
    values.reduce(
      function (total, jumlah) {

        return total + jumlah;

      },
      0
    );


  /* =========================================================
   HITUNG PENDAPATAN BERDASARKAN BULAN
   TARIF RESET SETIAP BULAN
========================================================= */

  const jumlahPerBulan = {};

  semuaPelanggan.forEach(function (pelanggan) {

    const tanggal =
      pelanggan.dibuatPadaISO;

    if (!tanggal) {
      return;
    }

    if (
      tanggal < tanggalMulaiInput.value ||
      tanggal > tanggalAkhirInput.value
    ) {
      return;
    }

    const bulan =
      tanggal.substring(0, 7);

    if (!jumlahPerBulan[bulan]) {
      jumlahPerBulan[bulan] = 0;
    }

    jumlahPerBulan[bulan]++;

  });


  // =============================================================================
  // PENDAPATAN
  // =============================================================================

  let totalPendapatan = 0;

  Object.keys(jumlahPerBulan)
    .forEach(function (bulan) {

      const jumlah =
        jumlahPerBulan[bulan];

      let tarif =
        30000;

      if (
        jumlah >= 50 &&
        jumlah <= 100
      ) {

        tarif = 40000;

      }

      else if (
        jumlah > 100
      ) {

        tarif = 50000;

      }

      totalPendapatan +=
        jumlah * tarif;

    });


  const pendapatanElement =
    document.getElementById(
      'pendapatanGrafik'
    );

  if (pendapatanElement) {

    pendapatanElement.textContent =
      'Rp' +
      totalPendapatan.toLocaleString(
        'id-ID'
      );

  }


  const totalElement =
    document.getElementById(
      'totalPelangganGrafik'
    );


  if (totalElement) {

    totalElement.textContent =
      totalPelanggan.toLocaleString(
        'id-ID'
      );

  }

  updatePertumbuhanPelanggan();


  // =========================================
  // RENDER LINE CHART
  // =========================================

  const canvas =
    document.getElementById('revenueChart');

  if (!canvas) {

    console.warn(
      '⚠️ Canvas #revenueChart tidak ditemukan.'
    );

    return;

  }


  // Hapus chart sebelumnya jika ada
  if (revenueChart) {

    revenueChart.destroy();

  }


  revenueChart =
    new Chart(canvas, {

      type: 'line',

      data: {

        labels: labels,

        datasets: [

          {

            label: 'Pelanggan Baru',

            data: values,

            tension: 0.4,

            fill: true,

            borderWidth: 2,

            pointRadius: 0,

            pointHoverRadius: 5,

            backgroundColor:
              function (context) {

                const chart =
                  context.chart;

                const {
                  ctx,
                  chartArea
                } = chart;


                if (!chartArea) {

                  return 'rgba(220, 44, 44, 0.08)';

                }


                const gradient =
                  ctx.createLinearGradient(
                    0,
                    chartArea.top,
                    0,
                    chartArea.bottom
                  );


                gradient.addColorStop(
                  0,
                  'rgba(220, 44, 44, 0.18)'
                );

                gradient.addColorStop(
                  1,
                  'rgba(220, 44, 44, 0)'
                );


                return gradient;

              },

            borderColor: '#dc2c2c',

            pointBackgroundColor: '#dc2c2c',

            pointBorderColor: '#ffffff',

            pointBorderWidth: 2

          }

        ]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        animation: {

          duration: 700,

          easing: 'easeOutQuart'

        },

        interaction: {

          intersect: false,

          mode: 'index'

        },

        plugins: {

          legend: {

            display: false

          },


          tooltip: {

            padding: 10,

            cornerRadius: 8,

            displayColors: false,

            callbacks: {

              title: function (tooltipItems) {

                return tooltipItems[0].label;

              },

              label: function (context) {

                return (
                  'Pelanggan Baru: ' +
                  context.parsed.y
                );

              }

            }

          }

        },

        scales: {

          x: {

            grid: {

              display: false

            },

            border: {

              display: false

            },

            ticks: {

              autoSkip: true,

              maxTicksLimit: 7,

              maxRotation: 0,

              minRotation: 0,

              padding: 8

            }

          },


          y: {

            beginAtZero: true,

            border: {

              display: false

            },

            grid: {

              color:
                'rgba(0, 0, 0, 0.05)',

              drawTicks: false

            },

            ticks: {

              precision: 0,

              stepSize: 1,

              padding: 8

            }

          }

        }

      }

    });

}


/* =========================================================
   RANGE DATE PICKER GRAFIK PELANGGAN
========================================================= */





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


  filteredPelanggan = semuaPelanggan.filter(function (customer) {

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


  data.forEach(function (customer) {

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
    .querySelector('.customer-serialnumber')
    .textContent = customer.serialnumber;


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
      function () {

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
  function (event) {

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
  function (event) {

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

document.addEventListener(
  'layoutLoaded',
  function () {

    console.log(
      '✅ javascript-read.js siap.'
    );

    console.log(
      '🔎 CEK customerGrid:',
      document.getElementById('customerGrid')
    );

    console.log(
      '🔎 CEK modalDetailPelanggan:',
      document.getElementById('modalDetailPelanggan')
    );

    console.log(
      '🔎 Menjalankan loadPelanggan()...'
    );

    loadPelanggan();

  }
);

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

  filteredPelanggan.sort(function (a, b) {

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

  // currentPage = 1;

  renderPelanggan();
}
