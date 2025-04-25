import * as dotenv from 'dotenv';

dotenv.config();
const urlWebhookUser = process.env.WEBHOOK_USER_DISCORD;
const urlWebhookPurchase = process.env.WEBHOOK_PURCHASE_DISCORD;
const urlWebhookReservation = process.env.WEBHOOK_RESERVATION_DISCORD;

const sendAlertUser = async (content) => {
    try {
        await fetch(urlWebhookUser, {
            headers: { "Content-Type" : "application/json" },
            method: 'POST',
            body: JSON.stringify({
                content: content
            })
        })
    } catch (error) {
        return null;

    };
};
const sendAlertPurchase = async (content) => {
    try {
        await fetch(urlWebhookPurchase, {
            headers: { "Content-Type" : "application/json" },
            method: 'POST',
            body: JSON.stringify({
                content: content
            })
        })
    } catch (error) {
        return null;

    };
};
const sendAlertReservation = async (content) => {
    try {
        await fetch(urlWebhookReservation, {
            headers: { "Content-Type" : "application/json" },
            method: 'POST',
            body: JSON.stringify({
                content: content
            })
        })
    } catch (error) {
        return null;

    };
};

export {
    sendAlertUser,
    sendAlertPurchase,
    sendAlertReservation

};