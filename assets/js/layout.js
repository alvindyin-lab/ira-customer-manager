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
