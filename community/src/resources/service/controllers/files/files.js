const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3({
    accessKeyId:"AKIAJLBSNZXK3CNZQHAQ",
    secretAccessKey:"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"
});

//LISTAR TODOS LOS BUCKETS

// s3.listBuckets({}, (err, data)=> {
//     if(err) throw err;
//     console.log(data);
// });

// LISTAR ELEMTOS DE UN BUCKET

var parametros ={
    Bucket: 'playtecacademy'
}

s3.listObjectsV2(parametros,(err, data)=>{
    if(err) throw err;

    console.log(data);
      })
      

//

//----------------BUSCANDO LA POSICION DE UNA PALABRA--------

// esta es la cadena donde buscaremos
// let cadena = "https://playtecacademy.s3.us-east-2.amazonaws.com/files/a72828f6-14d2-427c-9e20-7922362e371d.files.png";
// // esta es la palabra a buscar
// let termino = "files";
// // para buscar la palabra hacemos
// let posicion = cadena.indexOf(termino);


// if (posicion !== -1)
//     console.log("La palabra está en la posición " + posicion);
// else
//     console.log("No encontré lo que estás buscando");




//ELIMINAR UN ARCHIVO

const deleteFile = {
    Bucket:'playtecacademy',
    Key: 'files/f4d58fa8-42bf-4c94-9ff3-dbca791c61ad.Back-trabajando.jpeg'
};

s3.deleteObject( deleteFile ).promise()


// let cadena = "parzibyte.me";
// let extraida = cadena.substring(10, 12);

// console.log("Extraída: ", extraida);

//Obtener un elemento del Bucket

// var parametros ={
//     Bucket: 'playtecacademy',
//     Key:'files/3513de10-af56-44a8-aeed-5e838210d8cb.imagen3.jpg'
// }

// s3.getObject(parametros, (err, data)=> {
//     if(err) throw err;
//     console.log(data)
// })


// DESCARGAR UN ELEMENTO DE BUCKET

// var parametrosGetObject = {
//     Bucket: 'playtecacademy',
//     Key:'img_certified//4.jpg'
// }

// s3.getObject(parametrosGetObject,(err, data) =>{
//     if(err) throw err;
//     console.log(data);
//     fs.writeFile("imagen_de_s3.png", data.Body, 'binary', (err) =>{
//         if(err) throw err;
//         console.log("Imagen grabada al disco");
//     })
// })

// fs.readFile("informacion.txt", (err, data)=>{
//     if(err) throw err;
//     var parametrosPutObject = {
//         Bucket: 'playtecacademy',
//         Key:'informaciòn.txt',
//         Body: data
//     }
//     s3.putObject(parametrosPutObject, (err, data)=> {
//         if (err) throw err;
//         console.log(data);
//     })
// })

// let filename = 'informaciòn.';
// function getFileExtension1(filename) {
//     console.log(filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2));
// }
// getFileExtension1(filename);

//ACTUALIZAR UN ARCHIVO

