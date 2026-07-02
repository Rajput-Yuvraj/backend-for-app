import {asyncHandler} from "../utils/asynchandler.js"
import { ApiError } from "../utils/apierror.js";
import {user} from "../models/user.model.js";
import {uploadOnClaudinary} from "../utils/claudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";

const registerUser=asyncHandler( async (req,res)=> {
    //get user details from frontend
    //validation-not empty
    //check if user exists via both username and email
    //check for images, check for avatar
    //upload them to claudinary,avatar
    //create userobject-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    // return res


    const {fullname,email,username,password} = req.body
    console.log("email :",email);

    if(
        [fullname,email,username,password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"all fields are required")
    }

    const existedUser=user.findOne({
        $or: [{username},{email}]
    })

    if(existedUser) {
        throw new ApiError(409, "user with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400,"Avatar file is empty")
    }

    const avatar = await uploadOnClaudinary(avatarLocalPath)
    const coverImage = await uploadOnClaudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400,"Avatar file is empty") 
    }

    const user =  await user.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await user.findById(user._id).select(
        "-password -refreshtoken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser,"user refistered successfully")
    )
    
})


export {registerUser}