import Course from "../model/course.js";
import AppError from "../utils/error.utils.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";
import { response } from "express";
import { title } from "process";
const getCourses = async (req, res, next) => {
  console.log("getCourses");
  try {
    const course = await Course.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getLectures = async (req, res, next) => {
  // console.log("getCoursfsdfasdfes");
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("not found course", 400));
    }
    res.status(200).json({
      success: true,
      message: "lecture successfully",
      course: course.lectures,
    });
  } catch (error) {
    return next(new AppError("not found lectures", 400));
  }
};
const createCourse = async (req, res, next) => {
  // console.log("create course dklajslfj");
  console.log(req.file);
  // console.log(req.body);
  const { title, description, category, create } = req.body;
  console.log(title, description, category, create, req.file);
  try {
    // const course= await Course.create()
    const course = await Course.create({
      title,
      description,
      category,
      create,
    });
    // console.log(course);
    if (!course) {
      return next(new AppError("unable to create course", 400));
    }
    // console.log(course);

    if (req.file) {
      // try {
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: "250",
          height: "250",
          gravity: "faces",
          crop: "fill",
        });
        console.log(result);
        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
        }
      }
      fs.unlink(req.file.path, (err) => {
        if (err) {
          throw err;
        }

        console.log("File is deleted.");
      });

      // } catch (error) {
      //   return next(new AppError('file not found', 400))

      // }
    }

    await course.save();
  } catch (error) {
    return next(new AppError("unable to create", 400));
  }
  console.log(req.file);

  res.status(200).json({ success: true, message: "course created" });
};
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, { $set: req.body });
    if (!course) return next(new AppError("course not found", 400));
    res.status(200).json({
      success: true,
      message: "course update succesful",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) return next(new AppError("course not found", 400));
    res.status(200).json({
      success: true,
      message: "course delete succesful",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const createLecture = async (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.file);
  try {
    if (!title || !description) {
      return next(new AppError("please give lectutre", 400));
    }
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course not found", 400));
    }
    const lecturedata = {
      title,
      description,
      lecture: {},
    };

    // if (req.file) {
    //   // try {
    //   if (req.file) {
    //     const result = await cloudinary.v2.uploader.upload(req.file.path, {
    //       folder: "lms",
    //       width: "250",
    //       height: "250",
    //       gravity: "faces",
    //       crop: "fill",
    //     });
    //     console.log(result);
    //     if (result) {
    //       lecturedata.lecture.public_id = result.public_id;
    //       lecturedata.lecture.secure_url = result.secure_url;
    //     }
    //   }
    //   fs.unlink(req.file.path, (err) => {
    //     if (err) {
    //       throw err;
    //     }

    //     console.log("File is deleted.");
    //   });

    //   // } catch (error) {
    //   //   return next(new AppError('file not found', 400))

    //   // }
    // }
    course.lectures.push(lecturedata);
    await course.save();
    res
      .status(200)
      .json({ success: true, message: "course lecture successfully" });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const updateLecture = async (req,res,next) => {
  try {
    const { id } = req.params;
  const { title, description } = req.body;

    const course = await Course.findById(id);
    // const course = await Course.findById(id,(err,coursee)=>{
    //   if(err) {return next(new AppError(err.message, 400));}

    //   course.lectures.push()
    // })
    console.log(id,title,description);
    const lecturedata = {
      title,
      description,
      lecture: {},
    };
    
    // console.log(course.lectures.push(lecturedata));
    // console.log(course.lectures);
    const courseeee=await Course.find({id,"lectures.description":"description2..........."})
    console.log();
const result = await Course.findByIdAndUpdate(id,{$push:{"lectures[0].description":"description4fddasdfajdslkfj..........."}}, {new : true})
  //   Course.findOneAndUpdate(
  //     {id},
  //     { $push: { "title": "firstfasdf lecturejfklsdkfsdf"} },
  //     // { $push: { "lectures.$[outer]": { "title": "firstfasdf lecturejfklsdkfsdf" } } },
  //     { "arrayFilters": [{"outer._id":"652e46b81cbea9c8d64142bd"}]}
      
  // );
//  const result =Course.updateOne({id:id},{$push:lecturedata},{"arrayFilters": [{_id:"652e46b81cbea9c8d64142bd"}]})
// const result = Course.findByIdAndUpdate( id,
//   { $push: { lectures: { _id: req.body.arr } } },
//   { safe: true, upsert: true }
// );
// const result=Course.findByIdAndUpdate(id,{$push:{"lectures.0.title":"lectures jkaljdf updafkklsdjfkj"}},{new : true})

//  console.log(result);
  await course.save();
  // await result.save();
    res
      .status(200)
      .json({ success: true, message: "course lecture cngfejlfj successfully" });
  } catch (error) {
    return next(new AppError(error.message, 400));
    
  }
 
};
const deleteLecture = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { arr } = req.body;
    const course = await Course.findById(id);
    console.log(id);
    console.log(req.body.arr);
    const result = await Course.findByIdAndUpdate(
      id,
      { $pull: { lectures: { _id: req.body.arr } } },
      { safe: true, upsert: true }
    );
    if (!course) return next(new AppError("lecture not found", 400));
    await course.save();
    res.status(200).json({
      success: true,
      message: "lecture delete succesful",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
  // const idd=req.body
  // const idd=`_${id}`
  // const course = await Course.findByIdAndUpdate(id,{ $set: { "lectures.$.title": 'web development' } })
  // const result=await course.updateOne(
  //   { },
  //   { $pull: { lectures: { title: 'first lecturejfklsdkfsdf' } } }
  // )
  // const result= await course.lectures.findIndex(value:true,{title: 'first lecturejfklsdkfsdf'})
  // console.log(course);
  // const course=Course.updateOne(
  //   { id ,"lecutures.title": "first lecturejfklsdkfsdf"},
  //   { $set: { "lectures.$.title": 'web development' } }
  // )
  // const result=course.update(
  //   { },
  //   { $pull: { lectures: { _id: '652d53c257f7a58046b0d634' } } }
  //   )
  // const { iddd }=req.body
  // console.log(iddd);
  // const result=await Course.findOneAndUpdate(id, { $pull: { lectures: { _id: "652d53c757f7a58046b0d646" } } }, { new: true });
  // console.log('result',result);

  // console.log(course);
  // Course.deleteOne(course.lectures[0])
  // Course.findByIdAndUpdate({'_id': `${id}`}, {$set: {'lectures[0]': ""}})
  // console.log(Course.deleteOne(course.lectures[0]));
  // const lecturess=await course.lectures.indexOf(title)
  // const lecturess=course.lectures.find()
  // console.log(lecturess);
};
export {
  getCourses,
  getLectures,
  createCourse,
  updateCourse,
  deleteCourse,
  createLecture,
  updateLecture,
  deleteLecture,
};
