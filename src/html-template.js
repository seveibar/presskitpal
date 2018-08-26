export default ({ body, css, site }) => {
  return `
  <html>
    <head>
      <title> ${site.name} </title>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
    </head>
    <body>
      ${body}
      <style>${css}</style>
    </body>
  </html>
`.trim()
}
