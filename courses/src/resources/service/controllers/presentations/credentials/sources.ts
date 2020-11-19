import path from 'path';

const SCOPES = [
    "https://www.googleapis.com/auth/drive.metadata.readonly",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/presentations.readonly"
];
  
const TOKEN_PATH = path.join( __dirname, './token_Miryan.json' )

export { 
    SCOPES,
    TOKEN_PATH
}