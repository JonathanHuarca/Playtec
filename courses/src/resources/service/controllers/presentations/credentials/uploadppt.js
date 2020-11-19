const fs = require('fs')
const readline = require("readline");
const { google } = require("googleapis");
const {presentation} = require("../presentation/presentation.model");

const SCOPES = [
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/presentations.readonly"
];

const TOKEN_PATH = "./src/resources/v1/googleApis/token_Myran.json";

const main = (name_file,type_file,path_file,id_lesson,req,res,us) => {
  fs.readFile("./src/resources/v1/googleApis/credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      console.log("adentro d main");
      authorize(
        JSON.parse(content),
        UploadFiles,
        name_file,
        type_file,
        path_file,
        id_lesson,
        req,
        res,
        us
      );
    }
  );
};

const update = (name_file,type_file,path_file,id_lesson,req,res,presentation) => {
  fs.readFile("./src/resources/v1/googleApis/credentials.json",(err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    console.log("adentro d main");
    authorize3(
      JSON.parse(content),
      updatePPT,
      name_file,
      type_file,
      path_file,
      id_lesson,
      req,
      res,
      presentation
      );
    }
  );
};

const  authorize3 = (credentials, callback, name_file,type_file,path_file,id_lesson,req,res,presentation) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,name_file,type_file,path_file,id_lesson,req,res,presentation);
  });
}
const authorize = (
  credentials,
  callback,
  name_file,
  type_file,
  path_file,
  id_lesson,
  req,
  res,
  us
) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(
      oAuth2Client,
      name_file,
      type_file,
      path_file,
      id_lesson,
      req,
      res,
      us
    );
  });
}

const getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) return console.error(err);
        //console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


const SaveIntoDatabase = async (id, length, title, id_lesson, req, res,iframeUrl,us) => {
  console.log("SaveIntoDatabase");
  try {
    console.log(iframeUrl)
    const pres = new presentation({
      _id: id,
      name: title,
      desc: "",
      length: length,
      id_class: id_lesson,
      date_creat: Date.now(),
      thumbnail: "",
      type: "origin",
      iframe : iframeUrl
    });
    await pres.save();
    await us.save()
  // res.json({ save: "siii" });
    console.log({
      message: "Presentation created",
      id_present: pres._id,
      name: pres.name
    });
    
    res.status(200).json({
      message: "Archivo subido correctamente al drive",
      message_2: "Clase Guardada en bd"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server ERROR" });
  }
}
const getPresentationData = (auth, id, id_lesson, req, res,name_file,update,presentation,iframeUrl,us) => {
  try {      
  const slides = google.slides({ version: "v1", auth });
  //console.log(iframeUrl)
  slides.presentations.get(
    {
      presentationId: id
    },
   async (err, res1) => {
      if (err) return console.log("The API returned an error: " + err);
      console.log("Get presentation data");
      console.log(res1);
      const slide1 = res1.data;
      const length = res1.data.slides.length;
      const title = name_file;
      if (update==true){
        try{
          console.log('update true')
          const pres = await presentation.findOne({id_class:id_lesson})
          pres.iframe =iframeUrl
          pres.name = title
  
          pres.save()
          console.log(pres)
          res.status(200).json({
            message:'presentación actualizada',
            status:'success',
            title: title
          })
        }catch(e){
          console.log(e)
          res.status(500).json({
            message:'presentación actualizada',
            status:'error',
          })
        }
      }else{
        SaveIntoDatabase(id, length, title, id_lesson, req, res,iframeUrl,us);
      }
    }
  );
  } catch (error) {
    res.status(500).json({message:"ERROR XD"})
    console.log(error);
  }
}

const UploadFiles = (auth, name_file, type_file, path_file, id_lesson, req, res, us) => {
  var folderId = '19Fk-NzfJSXJBGBkIuyrwHGNR70QngFU2'
  google.slides({ version: "v1", auth });
  const fileMetadata = {
    name: "UNPUBLISH "+ us._id,
    description : name_file,
    mimeType: "application/vnd.google-apps.presentation",
    parents: [folderId]
  };
  // fs.createReadStream(path_file)

  // upload.pipe(r);

  
  var media = {
    mimeType: type_file, 
    body: fs.createReadStream(path_file)
  };
  const drive = google.drive({ version: "v3", auth });

  drive.files.create({
    resource: fileMetadata,
    media: media
    },(err, file) => {
      if (err) {
        res.status(500).json({ message: "ERROR EN LA SUBIDA" });
        console.error(err);
      }
      drive.revisions.update({
        fileId: file.data.id,
        revisionId: 1,
        resource: {
          published: true,
          publishAuto: true,
          publishedOutsideDomain: true
        }
      },(err, file1) => {
        if (err) console.log(err)

        drive.revisions.get({
          fileId: file.data.id,
          revisionId: 1,
          fields: "published"
        },async (err, file2) => {
          if (err) console.log(err);
          console.log("Archivo subido correctamente, id del archivo : ", file.data.id);
          try {
            const up = false
            const pres = ""

            const urlSlides = `https://docs.google.com/presentation/d/${file.data.id}/pub?start=false&loop=false&delayms=3000`  

            getPresentationData(
              auth,
              file.data.id,
              id_lesson,
              req,
              res,
              name_file,
              up,
              pres,
              urlSlides,
              us
            );

              // BotGetIframes(file.data.id).then((iframeUrl)=>{
              // console.log('iframeUrl: ', iframeUrl)
              // getPresentationData(
              //   auth,
              //   file.data.id,
              //   id_lesson,
              //   req,
              //   res,
              //   name_file,
              //   up,
              //   pres,
              //   iframeUrl,
              //   us
              // );
              //us.save();
              // }).catch((err)=>{console.log("err en per1") 
              //   res.status(500).json({message:"Error"})})
                
          } catch (error) {
            console.log(error)
            res.status(500).json({message:"xd"})
          }                       
        });
      });
    });
}

const updatePPT = (
  auth,
  name_file,
  type_file,
  path_file,
  id_lesson,
  req,
  res,
  presentation,
  us

) => {
  const update = true
  var folderId = '19Fk-NzfJSXJBGBkIuyrwHGNR70QngFU2'
  const slides = google.slides({ version: "v1", auth });
  var fileMetadata = {
    name: "UNPUBLISH "+id_lesson,
    description : name_file,
    mimeType: "application/vnd.google-apps.presentation",
    parents: [folderId]
  };
  const stream = fs.createReadStream(path_file)
  console.log(stream)
  var media = {
    mimeType: type_file, //'application/vnd.openxmlformats-officedocument.presentationml.presentationº',
    body: fs.createReadStream(path_file)
  };
  console.log("adentro de upload");
  //console.log(media)
  const drive = google.drive({ version: "v3", auth });
  drive.files.create(
    {
      resource: fileMetadata,
      media: media
    },
    function(err, file) {
      if (err) {
        // Handle error
        res.status(500).json({ message: "ERROR EN LA SUBIDA" });
        console.error(err);
      } else {
        //console.log(file)
        
        drive.revisions.update(
          {
            fileId: file.data.id,
            revisionId: 1,
            resource: {
              published: true,
              publishAuto: true,
              publishedOutsideDomain: true
            }
          },
          function(err, file1) {
            if (err) {
              console.log(err);
            } else {
              console.log(file1);
              drive.revisions.get(
                {
                  fileId: file.data.id,
                  revisionId: 1,
                  fields: "published"
                },
                function(err, file2) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("revisions-get");
                    console.log(file2);
                    //us.save();
                    console.log(
                      "Archivo subido correctamente, id del archivo : ",
                      file.data.id
                    );
                    
                    try {
                      console.log('capturando urlSlide')
                      const urlSlides = `https://docs.google.com/presentation/d/${file.data.id}/pub?start=false&loop=false&delayms=3000`  

                        getPresentationData(
                          auth,
                          file.data.id,
                          id_lesson,
                          req,
                          res,
                          name_file,
                          update,
                          presentation,
                          urlSlides,
                          ''
                        );
                      // BotGetIframes(file.data.id)
                      // .then((iframeUrl)=>{
                        // getPresentationData(
                          // auth,
                          // file.data.id,
                          // id_lesson,
                          // req,
                          // res,
                          // name_file,
                          // update,
                          // presentation,
                          // iframeUrl
                        // );                        
                      // }).catch((err)=>{
                        // console.log("err en per1") 
                        // res.status(500).json({
                          // message:"Error"
                        // })})  
                    } catch (error) {
                      console.log(error)
                      console.log("err en prese")
                      res.status(500).json({message:"xd"})
                    }
                  }
                }
              );
            }
          }
        );
      }
    }
  );
}
//main()
const googleApis = {main:main,update:update}
module.exports = googleApis
