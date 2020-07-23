module LineConstants {
  export const ACCESS_TOKEN: string = PropertiesService.getScriptProperties().getProperty(
    "ACCESS_TOKEN"
  );
  export const HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LineConstants.ACCESS_TOKEN}`
  };
  export const PUSH_URL: string = "https://api.line.me/v2/bot/message/push";
  export const USER_ID = PropertiesService.getScriptProperties().getProperty(
    "USER_ID"
  );
}
