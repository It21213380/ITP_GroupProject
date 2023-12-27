const Space = require('../model/space.model');
const cloudinary = require('cloudinary').v2
const uuid = require('uuid').v4

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//Create new space pack 
const createSpace = async (req, res) => {

    async function uploadToCloudinary(fileList) {
        if (!fileList) return

        if (Array.isArray(fileList)) {
            const imgIdArray = await Promise.all(
                fileList.map(file => {
                    return new Promise((resolve, reject) => {
                        const randId = uuid()
                        cloudinary.uploader.upload(file, { public_id: randId })
                            .then(dat => {
                                console.log('uploaded', randId)
                                resolve(dat.public_id)
                            })
                            .catch(e => { reject(e) })
                    })
                })
            )
            return imgIdArray
        }
        else {
            try {
                const randId = uuid()
                const imgId = await cloudinary.uploader.upload(fileList, { public_id: randId })
                console.log('uploaded', randId)
                return [...imgId.public_id]
            } catch (e) {
                console.log('e', e)
            }
        }
    }

    //catching data from front end to these attributes
    if (!req.body) return
    const { name, description, location, peopleCount, rate, images } = req.body;
    console.log('req.body?.images?.length', req?.body?.images?.length)

    let CloudImgArr
    try {
        CloudImgArr = await uploadToCloudinary(images)
    } catch (error) {
        console.log('error', error)
    }

    console.log('CloudImgArr', CloudImgArr)
    console.log('done')

    //create a object to store saved data to save in the mongo db database
    const space = new Space({
        name,
        description,
        location,
        peopleCount,
        rate,
        images: CloudImgArr
    });
    console.log(space)

    //sending created space pack object to the database
    space.save()
        .then(() => res.json('Space has been created.'))
        .catch(err => res.status(400).json('Error : ' + err));
};

//Delete space pack by id
const deleteSpace = async (req, res) => {
    console.log("DEL func: " + req.params.id);
    Space.findByIdAndDelete(req.params.id)
        .then(() => res.json('space profile has been Deleted'))
        .catch(err => res.status(400).json('Error : ' + err));
}

//get space info by id
const getSpaceById = async (req, res) => {
    try {
        const space = await Space.findById(req.params.id);
        if (space)
            res.json(space)
        else {
            res.json("No space record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get space info by id
const getSpaceByUser = async (req, res) => {
    try {
        const space = await Space.find({});
        if (space)
            res.json(space)
        else {
            res.json("No space record in the database!");
        }
    } catch (error) {
        res.status(500).send("Server Error" + error);
    }
};

//get all space records
const getSpace = async (req, res) => {
    try {
        const space = await Space.find();
        res.json(space)
    } catch (error) {
        res.status(500).send("Server Error : " + error);
        await fetch()
    }
}

//Update Exsisting Ticket record
const updateSpace = async (req, res) => {
    Space.findByIdAndUpdate(req.params.id).
        then((exsistingSpace) => {
            exsistingSpace.name = req.body.name;
            exsistingSpace.description = req.body.description;
            exsistingSpace.location = req.body.location;
            exsistingSpace.peopleCount = req.body.peopleCount;
            exsistingSpace.rate = req.body.rate;
            exsistingSpace.imgsBase64 = req.body.imgsBase64;

            exsistingSpace.save()
                .then((updatedSpace) => res.json(updatedSpace))
                .catch((error) => res.status(400).json("Error: " + error));
        })
        .catch((error) => res.status(400).json("Error (update) : " + error));
};

//export 
module.exports = {
    createSpace,
    deleteSpace,
    getSpaceById,
    getSpace,
    getSpaceByUser,
    updateSpace
};

