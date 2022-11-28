const multer = require('multer')

const {
    S3Client,
    PutObjectCommand,
} = require ('@aws-sdk/client-s3')

const upload = multer({
    storage: multer.memoryStorage()
})

const bucketName = 'first-bucket'
const config = {
    regio: 'us-east-1',
    endpoint: process.env.BUCKET_ENDPOINT || 'http://localhost:9000/',
    forcePathStyle: true,
    sslEnabled: false,
    signatureVersion: 'v4',
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || 'user',
        secretAccessKey: process.env.BUCKET_SECRET_KEY || 'passw'
    }
}

const SEClient = new S3Client(config)
module.exports= [upload.single('file'), (req,res,next)=>{
    if (req.file) {
        const filename = `${res.user.profile.id}/${req.file.originalname}`
        return SEClient.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: filename,
            ContentType: req.file.mimetype,
            Body: req.file.buffer
        }))
        .then(()=>{
            req.body.image = true
            req.body.description = `${process.env.BUCKET_HOST||config.endpoint}${bucketName}/${filename}`
            return next()
        })
        .catch(next)
    } else{
        next()
    }
}]