import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export const generarReportePDF = async (arqueo) => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { color: #333; }
          .section { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <h1>Reporte de Arqueo</h1>
        <div class="section"><strong>Total Niños:</strong> ${arqueo.total_ninos}</div>
        <div class="section"><strong>Monto Total:</strong> S/. ${arqueo.total_sub}</div>
        <div class="section"><strong>Fecha Inicio:</strong> ${arqueo.fecha_inicio}</div>
        <div class="section"><strong>Tipo (Jóvenes):</strong> ${arqueo.total_jovenes}</div>
        <div class="section"><strong>Educación:</strong> ${arqueo.total_educacion }</div>

        <hr />
        <div class="section"><strong>Distribución estimada:</strong></div>
        <ul>
          <li>Iglesia (60%): S/. ${(arqueo.total_sub * 0.6).toFixed(2)}</li>
          <li>Asociación (40%): S/. ${(arqueo.total_sub * 0.4).toFixed(2)}</li>
        </ul>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
};
