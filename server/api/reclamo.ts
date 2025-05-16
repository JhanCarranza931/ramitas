import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import { Buffer } from 'buffer';
import puppeteer from 'puppeteer';
import { isDate } from 'util/types';



const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const date = new Date(body.fecha);

    const htmlContent = `
   <!DOCTYPE html>
<html lang="es">
<head>
<title>Hoja de Reclamaciones</title>
    <style>
     
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.3;
            max-width: 210mm;
            margin: 0 auto;
            padding: 10mm;
            background-color: white;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
        }
        
        th, td {
            border: 1px solid black;
            padding: 5px;
            text-align: left;
            vertical-align: top;
            border-width:1px:
        }
        
        .title {
            text-align: center;
            table-layout: fixed;
  width: 100%;
            font-weight: normal;
            padding: 10px;
            border: none;
        }
        
        .header {
            background-color: #d9d9d9;
            font-weight: bold;
            text-align: center;
        }
        
        .section-header {
            background-color: #d9d9d9;
            font-weight: bold;
        }
        
        .right-align {
            text-align: right;
        }
        
        .center-align {
            text-align: center;
        }
        
        .no-border-top {
            border-top: none;
        }
        
        .no-border-bottom {
            border-bottom: none;
        }
        
        .no-border-left {
            border-left: none;
        }
        
        .no-border-right {
            border-right: none;
        }
        
        .tall-cell {
            height: 100px;
        }
        
        .very-tall-cell {
            height: 120px;
        }
        
        .signature-cell {
            vertical-align: bottom;
            text-align: center;
            height: 80px;
        }
        
        .footnote {
            font-size: 10px;
            vertical-align: top;
        }
        
        .superscript {
            vertical-align: super;
            font-size: smaller;
        }
        
        @media print {
            body {
                padding: 0;
                margin: 0;
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact;
            }
            table, th, td {
                border: 1 solid black;
                border-width: 0.5px;
            }
            
            @page {
                size: A4;
                margin: 10mm;
            }
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <td colspan="5" class="title">Hoja de Reclamaciones del Libro de Reclamaciones</td>
        </tr>
        <tr>
            <td colspan="4" class="header">LIBRO DE RECLAMACIONES</td>
            
            <td colspan="1" rowspan="2" class="center-align"><strong>HOJA DE RECLAMACIÓN<br>Nº 0002404-2025
            </strong>
            </td>
        </tr>
        <tr>
  <td colspan="1" style="width: 5%;">FECHA:</td>
    <td colspan="1" class="center-align" style="width: 10%;"><strong>${date.getDay().toString().padStart(2, "0")}</strong></td>
    <td colspan="1" class="center-align" style="width: 30%;"><strong>${(date.getMonth() + 1).toString().padStart(2, "0")}</strong></td>
    <td colspan="1" class="center-align" style="width: 10%;"><strong>${date.getFullYear()}</strong></td>

</tr>

        <tr>
             <td colspan="5">RAMITAS SELVATICAS E.I.R.L.<br>JR. INDEPENDENCIA NRO. C4 BAR. ZARAGOZA SAN MARTIN - MOYOBAMBA - MOYOBAMBA </td>
        </tr>
        <tr>
            <td colspan="5" class="section-header">1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE</td>
        </tr>
        <tr>
            <td colspan="5"><strong>NOMBRE:  </strong>${body.nombres.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="5"><strong>DOMICILIO: </strong> ${body.direccion.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="2"><strong>DNI / CE:  </strong>${body.numeroDocumento}</td>
            <td colspan="3"><strong>TELÉFONO / E-MAIL:  </strong>${body.correo.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="5"><strong>PADRE O MADRE: </strong></td>
        </tr>
        <tr>
            <td colspan="5" class="section-header">2. IDENTIFICACIÓN DEL BIEN CONTRATADO</td>
        </tr>
<tr>
    <td style="width: 15%;">PRODUCTO</td>
    <td colspan="4"><strong>MONTO RECLAMADO:  </strong>S/.${body.montoPagado} </td>
</tr>
<tr>
    <td style="width: 15%;">SERVICIO</td>
    <td colspan="4"><strong>DESCRIPCIÓN:  </strong>${body.descripcionProducto.toUpperCase()}</td>
</tr>

        <tr>
  <td colspan="5" style="padding: 0; margin: 0; border: none;">
    <table style="width: 100%; table-layout: fixed; border-collapse: collapse; border:none" border="0" cellpadding="0" cellspacing="0">
      <tr style="border:none">
        <td class="section-header" style="width: 60%; border-top: none; border-bottom: none;border-left:none">
          3. DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR
        </td>
        <td class="" style="width: 10%;border-top: none; border-bottom: none;">
         <strong> RECLAMO<span class="superscript">1</span></strong>
        </td>
        <td style="width: 10%;border-top: none; border-bottom: none;font-size:20px" class="center-align"></td>
        <td class="" style="width: 10%;border-top: none; border-bottom: none;">
          <strong> QUEJA<span class="superscript">1</span></strong>
        </td>
        <td style="width: 10%;border-top: none; border-bottom: none;border-right:none ;font-size:20px" class="center-align"></td>
      </tr>
    </table>
  </td>
</tr>


        <tr>
            <td colspan="5" class="very-tall-cell"><strong>DETALLE:  </strong>${body.detalleProblema.toUpperCase()}</td>
        </tr>
        <tr>
            <td colspan="4" class="very-tall-cell"><strong>PEDIDO:</strong>${body.pedidoConsumidor.toUpperCase()}</td>
            <td colspan="1" class="signature-cell">Información declarada como veraz, bajo juramento, por el usuario al completar el formulario en www.ramitasselvaticas.pe.<br><br><br> <strong>FIRMA DEL CONSUMIDOR</strong></td>
        </tr>
        <tr>
            <td colspan="5" class="section-header">4. OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR</td>
        </tr>
                <tr>
  <td colspan="5" style="padding: 0; margin: 0; border: none;">
    <table style="width: 100%; table-layout: fixed; border-collapse: collapse; border:none" border="0" cellpadding="0" cellspacing="0">
      <tr style="border:none">
        <td  style="width: 5px0%; border-top: none; border-bottom: none;border-left:none">
          <strong>FECHA DE COMUNICACIÓN DE LA RESPUESTA:</strong>
        </td>
        <td class="" style="width: 5%;border-top: none; border-bottom: none;">
        </td>
        <td style="width: 5%;border-top: none; border-bottom: none;"></td>
        <td class="" style="width: 5%;border-top: none; border-bottom: none;">
        </td>
        <td style="width: 33.5%;border-top: none; border-bottom: none;border-right:none; border-bottom: none;""></td>
      </tr>
    </table>
  </td>
</tr>

        <tr>
            <td colspan="4" class="very-tall-cell"></td>
            <td colspan="1" rowspan="" class="signature-cell" style="border-top:none"> <strong>FIRMA DEL PROVEEDOR </strong></td>
        </tr>
        <tr>
            <td colspan="3" class="footnote"><strong><span class="superscript">1</span> RECLAMO: </strong>Disconformidad relacionada a los productos o servicios.</td>
            <td colspan="2" class="footnote"><strong><span class="superscript">2</span> QUEJA: </strong>Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.</td>
        </tr>
        <tr>
            <td colspan="5" class="footnote center-align">Destinatario (consumidor, proveedor o INDECOPI según corresponda)</td>
        </tr>
        <tr>
            <td colspan="5" class="footnote">*La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI.<br>* El proveedor debe dar respuesta al reclamo o queja en un plazo no mayor a quince (15) días hábiles, el cual es improrrogable.</td>
        </tr>
    </table>
</body>
</html>`;


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
