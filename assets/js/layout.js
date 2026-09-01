fetch('includes/sidebar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sidebar').innerHTML = html;
    });


fetch('includes/topbar.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('topbar').innerHTML = html;
    });

fetch('includes/page-dashboard.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('dashboard').innerHTML = html;
    });

fetch('includes/page-pelanggan.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('pelanggan').innerHTML = html;
    });

fetch('includes/page-tambah-pelanggan.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('add-pelanggan').innerHTML = html;
    });
