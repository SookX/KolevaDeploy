const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const Image = require('../models/imageModel')
const AppError = require('../utils/appError');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Storage = require('../utils/storage');

const upload = multer({
    storage: Storage,

}).single('testImage')


exports.addImage = catchAsync(async(req, res, next) => {
   const image = new Image;
   if(req.file) {
        image.image = req.file.path
        image.save()
        if(image) {
             res.status(201).json({
                 status: "Success"
         })
        }
   }
    // if(req.body.image) {
    //     image.image = req.body.image
    //     image.save()
    //     if(image) {
    //         res.status(201).json({
    //             status: "Success"
    //     })
    //     }
    // }
   else {
    return next(new AppError('Invalid file format. Please upload a PNG, JPG, JPEG, or GIF image.', 400))
   }


})

exports.getImages = catchAsync(async(req, res, next) => {
    const images = await Image.find()
    res.status(200).json({
        status: "Success",
        data: {
            images: images
        }
    })
})

exports.deleteImage = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const image = await Image.findByIdAndDelete(id, {returnDocument: true});
    
    if(image) {

        const filePath = path.join(__dirname, '..', image.image); 


            fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting the file:', err);
                return next(new AppError('File could not be deleted', 500));
            }

        
            res.status(204).json({
                status: "Success"
            });
        });
    }
    else {
        return next(new AppError('There is no image with this id', 404));
    }
})