import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export const generarReportePDF = async (arqueo, recibos,egresos) => {
  // Calcular totales
  let totalDiezmo = 0;
  let totalPrimicia = 0;

  const filasRecibosHTML = recibos.map(recibo => {
    const diezmo = recibo.diezmo;
    const primicia = recibo.primicia;
    const pobres = recibo.pobres;
    const agradedimiento = recibo.agradecimiento;
    const esc_sabatica = recibo.esc_sabatica;
    const jovenes = recibo.jovenes;
    const adolescentes = recibo.adolescentes;
    const ninos = recibo.ninos
    const educacion = recibo.educacion;
    const salud = recibo.salud;
    const obra_mis = recibo.obra_mis;
    const musica = recibo.musica;
    const renuevatv = recibo.renuevatv;
    const primer_sabado = recibo.primer_sabado;
    const sem_oracion = recibo.sem_oracion;
    const mis_extranj= recibo.mis_extranj;
    const construccion = recibo.construccion;
    const diversos = recibo.diversos;
    const totalrcb = recibo.totalrcb;

    totalDiezmo += diezmo;
    totalPrimicia += primicia;

    return `
      <tr>
        <td class="clave">${recibo.nombre}</td>
        <td class="clave">${recibo.fecha}</td>
        <td class="valor">${primicia > 0 ? primicia.toFixed(2) : ''}</td>
        <td class="valor">${diezmo > 0 ? diezmo.toFixed(2) : ''}</td>
        <td class="valor">${pobres > 0 ? recibo.pobres.toFixed(2) : ''}</td>
        <td class="valor">${agradedimiento > 0 ? agradedimiento.toFixed(2) : ''}</td>
        <td class="valor">${esc_sabatica > 0 ? esc_sabatica.toFixed(2) : ''}</td>
        <td class="valor">${jovenes > 0 ? jovenes.toFixed(2) : ''}</td>
        <td class="valor">${adolescentes > 0 ? adolescentes.toFixed(2) : ''}</td>
        <td class="valor">${ninos > 0 ? ninos.toFixed(2) : ''}</td>
        <td class="valor">${educacion > 0 ? educacion.toFixed(2) : ''}</td>
        <td class="valor">${salud > 0 ? salud.toFixed(2) : ''}</td>
        <td class="valor">${obra_mis > 0 ? obra_mis.toFixed(2) : ''}</td>
        <td class="valor">${musica > 0 ? musica.toFixed(2) : ''}</td>
        <td class="valor">${renuevatv > 0 ? renuevatv.toFixed(2) : ''}</td>
        <td class="valor">${primer_sabado > 0 ? primer_sabado.toFixed(2) : ''}</td>
        <td class="valor">${sem_oracion > 0 ? sem_oracion.toFixed(2) : ''}</td>
        <td class="valor">${mis_extranj > 0 ? mis_extranj.toFixed(2) : ''}</td>
        <td class="valor">${construccion > 0 ? construccion.toFixed(2) : ''}</td>
        <td class="valor">${diversos > 0 ? diversos.toFixed(2) : ''}</td>
        <td class="clave">${totalrcb > 0 ? totalrcb.toFixed(2) : ''}</td>
        <td class="clave"></td>
      </tr>
    `;
  }).join('');

  const filasEgresosHTML = egresos.map(egreso => {

    return `
      <tr>
        <td class="clave">${egreso.nombre}</td>
        <td class="clave" >${egreso.fecha}</td>
        <td colspan="18" style="text-align: center;">--</td>
        <td class="clave"></td>
        <td class="clave">${egreso.totalrcb > 0 ? egreso.totalrcb.toFixed(2) : ''}</td>
      </tr>
    `;
  }).join("");

  // Combinar ambas secciones
  const filasHTML = filasRecibosHTML + filasEgresosHTML;

  const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial;
            padding: 20px;
          }

          h1 {
            color: #333;
          }

          .section {
            margin-bottom: 10px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            table-layout: fixed;
          }

          thead th, tfoot td {
            border: 1px solid #999;
            padding: 4px;
            background-color: #f0f0f0;
            font-size: 10px;
          }
          thead th {
            word-wrap: break-word; /* Asegura el salto de línea */
            white-space: normal;   /* Permite líneas múltiples */
            text-align: center;    /* Centra el texto */
          }

          tbody td {
            padding: 1px;
            text-align: left;
            font-size: 10px;
          }

          /* Solo columnas clave con bordes verticales */
          tbody td.clave {
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
          }

          tbody tr:not(:last-child) td.clave {
            border-bottom: 1px dashed #ccc;
          }

          /* Las demás columnas no tienen bordes */
          tbody td.valor:empty {
            color: transparent;
          }

          th:nth-child(1), td:nth-child(1) {
            width: 9%; /* Nombre */
          }

          th:not(:nth-child(1)), td:not(:nth-child(1)) {
            width: calc(91% / 21);
          }

          tfoot td {
            font-weight: bold;
            background-color: #f9f9f9;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>Iglesia</th>
              <th>fecha inicio</th>
              <th>fecha fin</th>
              <th>tesorero</th>
            </tr>
          </thead>
          <tbody>
            <tr>
             <td>Puno</td>
             <td>${arqueo.fecha_inicio}</td>
             <td>${arqueo.fecha_fin}</td>
             <td>Paul Charaja</td>
            </tr>
          </tbody>
        <hr />
        <div class="section"><strong>Detalle por persona:</strong></div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>primicia</th>
              <th>Diezmo</th>
              <th>Pobres</th>
              <th>Agradecimiento</th>
              <th>Esc Sabatica</th>
              <th>jovenes</th>
              <th>Adolescentes</th>
              <th>Niños</th>
              <th>Educacion</th>
              <th>Salud</th>
              <th>Obra Mis</th>
              <th>Musica</th>
              <th>RenuevaTv</th>
              <th>1er Sabado</th>
              <th>Sem de Orac</th>
              <th>Mis Extranjera</th>
              <th>Construccion</th>
              <th>Diversos</th>
              <th>Ingresos</th>
              <th>Egresos</th>
            </tr>
          </thead>
          <tbody>
            ${filasHTML}
          </tbody>
          <tfoot>
            <tr>
              <td>Totales</td>
              <td></td>
              <td>${arqueo.total_primicia > 0 ? arqueo.total_primicia.toFixed(2) : ''}</td>
              <td>${arqueo.total_diezmo > 0 ? arqueo.total_diezmo.toFixed(2) : ''}</td>
              <td>${arqueo.total_pobres > 0 ? arqueo.total_pobres.toFixed(2) : ''}</td>
              <td>${arqueo.total_agradecimiento > 0 ? arqueo.total_agradecimiento.toFixed(2) : ''}</td>
              <td>${arqueo.total_escsab > 0 ? arqueo.total_escsab.toFixed(2) : ''}</td>
              <td>${arqueo.total_jovenes > 0 ? arqueo.total_jovenes.toFixed(2) : ''}</td>
              <td>${arqueo.total_adolescentes > 0 ? arqueo.total_adolescentes.toFixed(2) : ''}</td>
              <td>${arqueo.total_ninos > 0 ? arqueo.total_ninos.toFixed(2) : ''}</td>
              <td>${arqueo.total_educacion > 0 ? arqueo.total_educacion.toFixed(2) : ''}</td>
              <td>${arqueo.total_salud > 0 ? arqueo.total_salud.toFixed(2) : ''}</td>
              <td>${arqueo.total_obramis > 0 ? arqueo.total_obramis.toFixed(2) : ''}</td>
              <td>${arqueo.total_musica > 0 ? arqueo.total_musica.toFixed(2) : ''}</td>
              <td>${arqueo.total_renuevatv > 0 ? arqueo.total_renuevatv.toFixed(2) : ''}</td>
              <td>${arqueo.total_primersab > 0 ? arqueo.total_primersab.toFixed(2) : ''}</td>
              <td>${arqueo.total_semorac > 0 ? arqueo.total_semorac.toFixed(2) : ''}</td>
              <td>${arqueo.total_misextranj > 0 ? arqueo.total_misextranj.toFixed(2) : ''}</td>
              <td>${arqueo.total_construccion > 0 ? arqueo.total_construccion.toFixed(2) : ''}</td>
              <td>${arqueo.total_diversos > 0 ? arqueo.total_diversos.toFixed(2) : ''}</td>
              <td>${arqueo.total_sub > 0 ? arqueo.total_sub.toFixed(2) : ''}</td>
            </tr>
            <tr>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
             <td>0.00</td>
            </tr>
          </tfoot>
        </table>

        <hr />
        <div class="section"><strong>Distribución estimada:</strong></div>
        <ul>
          <li>Iglesia (60%): ${(arqueo.total_sub * 0.6).toFixed(2)}</li>
          <li>Asociación (40%): ${(arqueo.total_sub * 0.4).toFixed(2)}</li>
        </ul>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({
    html,
    width: 842,  // A4 landscape
    height: 595,
    base64: false
  });

  await Sharing.shareAsync(uri);

};
