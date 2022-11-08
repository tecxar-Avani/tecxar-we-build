/** @type {import('next').NextConfig} */



const moduleExports = {
  reactStrictMode: true,
  compress: false,
  env: {
    apiUrl: '/api/',
    pageSizeDefault : 10,
    pageSizeOptions: ['5', '10', '20', '30', '50', '100']
   
  }
};




