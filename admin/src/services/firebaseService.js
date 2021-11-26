
import admin from 'firebase-admin'
import _ from 'lodash';
var serviceAccount = require("../../vvt-store-firebase-adminsdk-badbl-4640536671.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const storageRef = admin.storage().bucket(`gs://vvt-store.appspot.com`);

const uploadFile = async (file) => {
    try {
        const storage = await storageRef.upload(file.path, {
            public: true,
            destination: `/uploads/${file.filename}`,
            metadata: {
                firebaseStorageDownloadTokens: _.uniqueId(file),
            }
        });

        return storage[0].metadata.mediaLink;
    }
    catch (error) {
        throw error
    }
}

const firebaseService = {
    uploadFile
}

export default firebaseService