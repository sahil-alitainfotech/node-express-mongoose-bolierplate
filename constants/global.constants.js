module.exports = {
  TRUE: true,
  FALSE: false,
  NULL: null,
  AUTH_USER_DETAILS: "x-auth-user-details",
  AUTH_BRAND_DETAILS: "x-auth-brands-details",

  RESPONSE_STATUS_CODE_OK: 200,
  RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR: 500,
  RESPONSE_STATUS_CODE_VALIDATION_ERROR: 417,
  RESPONSE_STATUS_CODE_NOT_FOUND: 404,
  RESPONSE_STATUS_CODE_AUTHORIZATION_ERROR: 401,
  RESPONSE_STATUS_CODE_FORBIDDEN_ERROR: 403,

  RESPONSE_PAYLOAD_STATUS_SUCCESS: 1,
  RESPONSE_PAYLOAD_STATUS_ERROR: 0,
  RESPONSE_PAYLOAD_STATUS_WARNING: 2,
  RESPONSE_PAYLOAD_STATUS_SET_PASSWORD: 3,
  RESPONSE_PAYLOAD_STATUS_INVITE_SENT: 4,

  RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR: "Internal server error!",
  RESPONSE_STATUS_MESSAGE_NOT_FOUND: "Resource not found!",
  RESPONSE_STATUS_MESSAGE_AUTHORIZATION_ERROR: "User Not Authorized!",
};
