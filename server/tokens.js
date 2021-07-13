//creating variable for accessing token of twilio jwt API
var AccessToken = require('twilio').jwt.AccessToken;
const { VideoGrant } = AccessToken;

//generating the videotoken by our twilio secret keys, such as accountsid, apikey, apisecret
const generateToken = (config) => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};
/*the variable videotoken is accessing permission which can be explained as when the room id is undefined means when
 the room id is not already Available, then it will make a new room id and allocate to the user */ 
const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  return token;
};
/* Exporting videotoken to other files*/
export default { videoToken };
