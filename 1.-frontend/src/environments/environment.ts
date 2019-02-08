// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
export const APILOCAL = {
    url: 'http://api.lvh.me:5000'
};


export const AWSKEYS = {
    accessKeyId: 'AKIAJEYX66PCBH6V4VHQ',
    secretAccessKey: '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',
    region: 'us-east-1'
}

export const OPENPAYKEYS = {
    MERCHANT_ID: 'mzbzo4aoqvcld7vl9f9s',
    PUBLIC_API_KEY: 'pk_074daca01ac741b78dc7495217f47650',
    URL : 'https://sandbox-api.openpay.mx/v1/'
}
