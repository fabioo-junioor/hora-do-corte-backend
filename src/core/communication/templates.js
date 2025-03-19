const templateEmailReservation = (titleTable, nameClient, dateReservation, timeReservation, services, phoneClient, price, observation, nameProfessional, contactEstablishment, contactSuport) => {
    return `
    <!DOCTYPE html>
    <html>
        <body>
            <table border="1" width="100%" style="border-collapse: collapse; font-family: Arial, Helvetica, sans-serif; border: 2px solid #675D50">
                <thead>
                    <tr>
                        <th scope="col" style="background-color: #675D50; color: white; padding: .5rem;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: .4rem;">Nome do cliente: <strong>${nameClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Data: <strong>${dateReservation}</strong> / <strong>${timeReservation}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Serviços: <strong>${services}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Telefone do cliente: <strong>${phoneClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Valor total: R$<strong>${price}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Observações: <strong>${observation == '' ? 'Sem observações' : observation}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Nome do profissional: <strong>${nameProfessional}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Contato estabelecimento: <strong>${contactEstablishment}</strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: .5rem;">Suporte: <strong>${contactSuport}</strong></th>
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
                        <th scope="col" style="background-color: #675D50; color: white; padding: .5rem;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: .4rem;">Email do cliente: <strong>${emailClient}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Nome plano: <strong>${namePlan}</strong> / <strong>${timeReservation}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Valor da compra: R$<strong>${price}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Duração do plano: <strong>${time}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Data da compra: <strong>${dateBuy}</strong> - <strong>${timeBuy}</strong></td>
                    </tr>
                    <tr>
                        <td style="padding: .4rem;">Validade: <strong>${dateValidity} - <strong>${timeValidity}</strong></strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: .5rem;">Suporte: <strong>${contactSuport}</strong></th>
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
                        <th scope="col" style="background-color: #675D50; color: white; padding: .5rem;">${titleTable}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: .4rem;">Nova senha: <strong>${newPassword}</strong></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="row" style="padding: .5rem;">Suporte: <strong>${contactSuport}</strong></th>
                    </tr>
                </tfoot>
            </table>
        </body>
    </html>
`

};

export {
    templateEmailRecoverPass,
    templateEmailReservation,
    templateEmailBuyPlan

};