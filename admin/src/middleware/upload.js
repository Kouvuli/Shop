import multer from 'multer'
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    filename: function (req, file, cb) {
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        const name = (file.fieldname + '-' + Date.now() + '.' + extension)

        cb(null, name)
    }
})

const upload = multer({ storage: storage })
export default upload