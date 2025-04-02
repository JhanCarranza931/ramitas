import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const data = await resend.emails.send({
      from: 'Contacto web <noreply@updates.jhan.dev>',
      to: ['ytjhan5@gmail.com'],
      subject: `${body.asunto}`,
      html: `
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fff; color: #333;">
    <table align="center" width="600" style="background: #FBFBFB; padding: 20px; border-radius: 8px; text-align: center;">
        <tr>
            <td>
                <img src="../../assets/img/logo-ramitas.svg" alt="Logo" width="100" height="100" style="display: block; margin: 0 auto; object-fit:cover">
                <h2>Mensaje de contacto</h2>

            </td>
        </tr>
        <tr>
            <td align="left" style="padding: 0 200px;">
                <p><strong>Nombre:</strong> Jhan Carranza Cruz</p>
                <p><strong>Correo:</strong> jhan@example.com</p>
                <p><strong>Teléfono:</strong> +51 987 654 321</p>
                <p><strong>Asunto:</strong> Consulta</p>
                <p><strong>Mensaje:</strong> Este es un mensaje de prueba.</p>
                <hr style="width: 460px; height: 1px; background: black; border: none; margin-top: 40px; ">
            </td>
        </tr>
        <tr>
            <td>
                <p style="font-size: 12px;">Este mensaje fue enviado desde el formulario de contacto de su sitio web.</p>
            </td>
        </tr>
    </table>
</body>
      `,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
