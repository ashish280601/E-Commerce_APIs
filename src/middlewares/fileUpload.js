/*
Step to create a multer
--> 1. Import multer
    2. use multer inbuilt funtion diskstorage
    3. diskstorage take object with two key destination and filename
    4. destionation and filename take callback with three argument (req, file and cb).
    5 last configure this diskstorge in multer.
*/

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const uploads = multer({
    storage: storage
});

export default uploads;