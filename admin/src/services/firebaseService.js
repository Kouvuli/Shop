
import admin from 'firebase-admin'
import _ from 'lodash';
var serviceAccount = require("../../vvt-store-firebase-adminsdk-badbl-4640536671.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const storageRef = admin.storage().bucket(`gs://vvt-store.appspot.com`);

const uploadFile = async (path, filename) => {

    // Upload the File
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/hashnode/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: _.uniqueId(filename),
        }
    });


    return storage[0].metadata.mediaLink;
}

const firebaseService = {
    uploadFile
}

export default firebaseService