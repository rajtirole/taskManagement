import multer from 'multer'
import path from 'path';
import express from 'express'

const upload = multer({ 
    
    
    dest: '../uploads/',
    limits:{fileSize:50 * 1024 * 1024},
    storage:multer.diskStorage({
        destination:"../uploads/",
        filename:(_req,file,cb)=>{
            // file.originalname.trim()
            cb(null,file.originalname)

        },
    }),
    
    fileFilter:(_req,file,cb)=>{
        let ext = path.extname(file.originalname)
        if(ext !== '.jpg'&&ext !== '.jpeg'&&ext !== '.png'&&ext !== '.webp'){
            cb(new Error('not supported'),false);
            return;
        }
        cb(null,true);
    }
 })


export default upload;