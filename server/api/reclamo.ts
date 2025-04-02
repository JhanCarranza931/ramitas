import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import puppeteer from 'puppeteer';



const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const htmlContent = `
    <html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Libro de Reclamaciones</title>
    <style>
    @media print {
    body {
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
        }
    }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            vertical-align: top;
        }
        
        th {
            background-color: #b3b3b3;
            font-weight: bold;
        }
        
        .header-row {
            background-color: #b3b3b3;
            font-weight: bold;
            text-align: center;
        }
        
        .section-header {
            background-color: #b3b3b3;
            font-weight: bold;
        }
        
        .date-cell {
            width: 33%;
            text-align: center;
        }
        
        .small-cell {
            width: 20%;
        }
        
        .large-cell {
            height: 100px;
        }
        
        .very-large-cell {
            height: 150px;
        }
        
        .right-align {
            text-align: right;
        }
        
        .center-align {
            text-align: center;
        }
        
        .signature-cell {
            height: 80px;
            vertical-align: bottom;
            text-align: center;
        }
        
        .checkbox-cell {
            text-align: center;
            width: 10%;
        }
         p{
      font-size: 14px;    
        }
       
    </style>
</head>
<body>
    <table>
        <tr>
            <th colspan="4" class="center-align">LIBRO DE RECLAMACIONES</th>
        </tr>
        <tr>
            <td rowspan="1">FECHA:</td>
            <td class="date-cell">22</td>
            <td class="date-cell">Octubre</td>
            <td class="date-cell">2025</td>
        </tr>
        <tr>
            <td colspan="4">RAMITAS SELVATICAS E.I.R.L <br>JR. INDEPENDENCIA</td>
        </tr>
        
        <tr>
            <td colspan="4" class="section-header">1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE</td>
        </tr>
        <tr>
            <td colspan="4">NOMBRE: ${body.nombres.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="4">DOMICILIO: ${body.direccion.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="2">DNI / CE: ${body.numeroDocumento}</td>
            <td colspan="2">TELÉFONO / E-MAIL:${body.correo.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="4" class="section-header">2. IDENTIFICACIÓN DEL BIEN CONTRATADO</td>
        </tr>
        <tr>
            <td>PRODUCTO</td>
            <td></td>
            <td colspan="2">MONTO RECLAMADO: ${body.montoPagado}</td>
        </tr>
        <tr>
            <td>SERVICIO</td>
            <td></td>
            <td colspan="2">DESCRIPCIÓN: ${body.descripcionProducto.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="2" class="section-header">3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR</td>
            <td colspan="4">RECLAMO</td>
        </tr>
        <tr>
            <td colspan="4">DETALLE:</td>
        </tr>
        <tr>
            <td colspan="4" class="very-large-cell">${body.detalleProblema.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="4">PEDIDO:</td>
            
        </tr>
        <tr>
            <td colspan="4" class="very-large-cell">${body.pedidoConsumidor.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="4" class="signature-cell">FIRMA DEL CONSUMIDOR</td>
        </tr>
    </table>
    <p>*La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.</p>
    <p>* El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles, el cual es improrrogable.</p>
</body>
</html>
  `;

  // 🖨️ Convertimos el HTML a PDF con Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
  await browser.close();

    const data = await resend.emails.send({
      from: 'Libro de Reclamaciones <reply@updates.jhan.dev>',
      to: ['ytjhan5@gmail.com'],
      subject: `${body.tipo}`,
      html: `<strong>Nombre: ${body.nombres} </strong>`,
      attachments:[
        {
            filename: 'libro_reclamos.pdf',
            content: pdfBase64,
            contentType: 'application/pdf'
        }
      ]
    });

    return data;
  } catch (error) {
    return { error };
  }
});
