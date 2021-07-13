//In this file, we are exporting twilio constants and its accountsid, apikey, apisecret as its members.

export const twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  apiKey: process.env.TWILIO_API_KEY,
  apiSecret: process.env.TWILIO_API_SECRET
};
