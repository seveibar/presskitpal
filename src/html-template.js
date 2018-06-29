export default ({ body, site }) =>
  `
<html>
  <head>
    <title> ${site.name} </title>
  </head>
  <body>
    ${body}
  </body>
</html>
`.trim()
