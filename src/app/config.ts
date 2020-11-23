var MAIN_URL = 'https://www.noctuq.com';
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

export const socket_config = {
  	SOCKET_URL: MAIN_URL+':'+SOCKET_URL_PORT,
};

