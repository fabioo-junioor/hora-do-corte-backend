const templateEmailReservation = (titleTable, nameClient, dateReservation, timeReservation, services, phoneClient, price, observation, nameProfessional, contactEstablishment, contactSuport) => {
    return `
    <!DOCTYPE html>
    <html>
        <body>
            <table border="1" width="100%" style="border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; border: 2px solid #675D50">
                <thead>
                    <tr>
                        <th scope="col" style="background-color: #675D50; color: white; padding: 10px;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 6px;">Nome do cliente: <strong>${nameClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Data: <strong>${dateReservation}</strong> / <strong>${timeReservation}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Serviços: <strong>${services}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Contato do cliente: <strong>${phoneClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Valor total: R$<strong>${price}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Observações: <strong>${observation == '' ? 'Sem observações' : observation}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Nome do profissional: <strong>${nameProfessional}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Contato estabelecimento: <strong>${contactEstablishment}</strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: 10px;">Suporte: <strong>${contactSuport}</strong></th>
                    </tr>
                </tfoot>
            </table>
        </body>
    </html>
`
};
const templateEmailBuyPlan = (titleTable, emailClient, namePlan, price, time, dateBuy, timeBuy, dateValidity, timeValidity, contactSuport) => {
    return `
    <!DOCTYPE html>
    <html>
        <body>
            <table border="1" width="100%" style="border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; border: 2px solid #675D50">
                <thead>
                    <tr>
                        <th scope="col" style="background-color: #675D50; color: white; padding: 10px;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 6px;">Email do cliente: <strong>${emailClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Nome plano: <strong>${namePlan}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Valor da compra: R$<strong>${price}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Duração do plano: <strong>${time}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Data da compra: <strong>${dateBuy}</strong> - <strong>${timeBuy}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: 6px;">Validade: <strong>${dateValidity} - <strong>${timeValidity}</strong></strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: 10px;">Suporte: <strong>${contactSuport}</strong></th>
                    </tr>
                </tfoot>
            </table>
        </body>
    </html>
`
};
const templateEmailRecoverPass = (titleTable, newPassword, contactSuport) => {
    return `
    <!DOCTYPE html>
    <html>
        <body>
            <table border="1" width="100%" style="border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; border: 2px solid #675D50">
                <thead>
                    <tr>
                        <th scope="col" style="background-color: #675D50; color: white; padding: 10px;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 6px;">Nova senha: <strong>${newPassword}</strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: 10px;">Suporte: <strong>${contactSuport}</strong></th>
                    </tr>
                </tfoot>
            </table>
        </body>
    </html>
`
};
const templateAlertDiscordUser = (title, timestamp, email) => {
    return `[${timestamp}] | [${title}] | [${email}]`;
};
const templateAlertDiscordPurchase = (title, timestamp, email, price) => {
    return `[${timestamp}] | [${title}] | [${email}] | [R$${price}]`;
};
const templateAlertDiscordReservation = (title, timestamp, email, phone, name, price) => {
    return `[${timestamp}] | [${title}] | [${email}] - [${phone}] | [${name}] | [R$${price}]`;
};

export {
    templateEmailRecoverPass,
    templateEmailReservation,
    templateEmailBuyPlan,
    templateAlertDiscordUser,
    templateAlertDiscordPurchase,
    templateAlertDiscordReservation

};