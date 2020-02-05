var MAIN_URL = 'http://54.234.87.202';
var MAIN_URL_PORT = '3001'; 
var SOCKET_URL_PORT = '3002'; 

export const config = {
  	API_URL : MAIN_URL+':'+MAIN_URL_PORT,
  	ENC_SALT: 'gd58_N9!ysS',
  	BASE_URL: MAIN_URL+'/',
  	IMAGES_URL: MAIN_URL+':'+MAIN_URL_PORT+'/nite_owl/images',
  	IMAGE_EXTENSIONS: ['image/png','image/jpg','image/jpeg','image/gif','image/bmp','image/webp'],
    IS_MOBILE_APP: 'false' 
};

export const social_config = {
    FACEBOOK_ID: '440387989955093',
    GOOLGLE_CLIENT_ID: '608339143855-msuu5n847treif8htdsju9kia98nr4ms.apps.googleusercontent.com'
};

export const socket_config = {
    SOCKET_URL: MAIN_URL+':'+SOCKET_URL_PORT,
};