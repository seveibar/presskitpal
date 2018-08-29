export default ({ body, css, site }) => {
  return `
  <html>
    <head>
      <title> ${(site || {}).name || 'PressKitPal'} </title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
    </head>
    <body>
      ${body}
      <style>${css}</style>
      <script>
        var menuOpen = false;
        var menuButton = document.getElementById('menu-button');
        menuButton.addEventListener('click', function() {
          menuOpen = !menuOpen;
          document.getElementById('small-header').classList.remove(menuOpen ? 'menu-closed' : 'menu-open');
          document.getElementById('small-header').classList.add(menuOpen ? 'menu-open' : 'menu-closed');
        });
      </script>
    </body>
  </html>
`.trim()
}
