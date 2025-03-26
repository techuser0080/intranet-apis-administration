export const Constants = Object.freeze({
    JWT_SECRET_SIGNATURE_NAME: process.env.JWT_SECRET_SIGNATURE_NAME,
    SECURITY_DATABASE_HOST: process.env.DATABASE_HOST,
    SECURITY_DATABASE_PORT: process.env.DATABASE_PORT,
    SECURITY_DATABASE_USER_NAME: process.env.DATABASE_USERNAME,
    SECURITY_DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    SECURITY_DATABASE_NAME: process.env.DATABASE_NAME,
    COOKIE_SECURITY_NAME: process.env.COOKIE_SECURITY_NAME,
    MESSAGE_STATUS_OK: 'Se ha realizado correctamente la transacción.',
    MESSAGE_STATUS_ERROR: 'Ha ocurrido un error.',
    MESSAGE_NO_RESULTS_FOUND: 'No se encontraron registros.',
    MESSAGE_LOGIN_INVALID_PASSWORD: 'El password es incorrecto.',
    STRING_EMPTY: '',
    NUMBER_ZERO: 0
})