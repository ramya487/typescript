import { Request, Response } from "express";
import generateResponse from "../../../utils/ResponseGenerator";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../../config/supabase";
import User from "../../../models/userModel";
import { v4 as uuidv4 } from 'uuid';

const UploadImageHandler = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return generateResponse(500, "Failed", "Error Image Update", res);
  }
  try {
    const fileBase64 = decode(file.buffer.toString("base64")); 

    const { data, error } = await supabase.storage
      .from("profile_images")
      .upload(file.originalname+uuidv4(), fileBase64, {
        contentType: "image/png",
      });

    if (error) {
      throw error;
    }

    const { data: image } = supabase.storage
      .from("profile_images")
      .getPublicUrl(data.path);

    var response;
    try {
      const updatedChat = await User.findByIdAndUpdate(
        req.session.id,
        {
          pic: image.publicUrl,
        },
        {
          new: true,
        }
      );
      response = {
        id: updatedChat?._id,
        username: updatedChat?.name,
        email: updatedChat?.email,
        pic: updatedChat?.pic
      }
    } catch (error) {
      return generateResponse(500, "Failed", "Error Writing to Database", res);
    }

    return generateResponse(201, "Success", "Profile Updated Successfully", res, response)
  } catch (error: any) {
    return generateResponse(500, "Failed", "Error Image Update", res);
  }
};

export default UploadImageHandler;
