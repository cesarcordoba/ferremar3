import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { AWSKEYS, APILOCAL } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as axios from 'axios'

@Injectable()
export class AWSService {

    private FOLDER: string;
    private bucketName: string;
    private bucket = new S3({
        accessKeyId: AWSKEYS.accessKeyId,
        secretAccessKey: AWSKEYS.secretAccessKey,
        region: AWSKEYS.region
    });

    private linkUpload: Observable<Array<string>  | boolean>;
    private borradoArchivo: Observable< boolean>;

    constructor(){
        this.FOLDER = 'imagenes/';
        this.bucketName = 'bull-imagenes';
    }

    /**
     *
     * @param archivo Archhivo del tipo File
     * @param bucket Nombre del bucket, del tipo string: sintaxis: 'bucket-name'
     * @param folder Nombre de la carpeta, del tipo string: sintaxis: 'imagenes/'
     */
    subirArchivo(archivo: File | Buffer, bucket: string, folder: string, nombre?): Observable<Array<string> | boolean>{

        if(archivo instanceof File){
            nombre? nombre : nombre = archivo.name;
        }


        const params: S3.PutObjectRequest = {
            Bucket: bucket,
            Key: folder + nombre,
            Body: archivo,
            ACL: 'public-read'
        }

        return new Observable(observar => {
            this.bucket.upload(params, (err, data) => {
                // if (err) {
                //     console.log('There was an error uploading your file: ', err);
                //     observar.next(false)
                //     return false;
                //   }
                observar.next([data.Location, data.Key])
                  // return true;
            })
        })
    }

    /**
     *
     * @param nombreArvhi key del archivo, del tipo string
     * @param bucket Nombre del bucket, del tipo string: sintaxis: 'bucket-name'
     * @param folder Nombre de la carpeta, del tipo string: sintaxis: 'imagenes/'
     */

    borrarArchivo(key: string, bucket: string, folder: string): Observable< boolean>{
        const params: S3.PutObjectRequest = {
            Bucket: bucket,
            Key: folder + key
        }

        this.borradoArchivo = new Observable(observar => {
            this.bucket.deleteObject(params, (err, data)=> {
                if(err){
                    console.log('There was an error deleting your file: ', err);
                    observar.next(false)
                    return false;
                }
                console.log(data)
                observar.next(true)

            })
        })

        return this.borradoArchivo;
    }

    froala() {
        return axios.default.get(APILOCAL.url + '/froalahash').then(response => response.data);
    }

}
