const express = require('express')
const multer = require('multer')
const cors = require('cors')
const ffmpeg = require('fluent-ffmpeg')
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

//make paths variables instead of direct paths
ffmpeg.setFfmpegPath("C:/Users/ekrysenkova/Desktop/HTW/ffmpeg/bin/ffmpeg.exe")
ffmpeg.setFfprobePath("C:/Users/ekrysenkova/Desktop/HTW/ffmpeg/bin")

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('upload'))

let filename = "default_video.mp4";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        filename = file.originalname
        cb(null, filename)
    }
})

const upload = multer({storage}).single('file')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
})

app.post('/filter', (req, res) => {
    if (fs.existsSync(`upload/filtered.mp4`)) {
        fs.stat('upload/filtered.mp4', function (err, stats) {
            console.log(stats);
            if (err) {
                return console.error(err);
            }
            fs.unlink('upload/filtered.mp4', function (err) {
                if (err) return console.log(err);
            });
        });
    }
    if (fs.existsSync(`upload/${filename}`)) {
        ffmpeg(`upload/${filename}`)
            .videoFilters(req.body.filters)
            .output('upload/filtered.mp4')
            .on('end', function (err) {
                if (!err)
                    return res.status(200).send(req.file)
            })
            .on('error', function (err) {
                return res.status(500).json(err)
            }).run();
    }
});

app.post('/deleteUploaded', (req, res) => {
    if (filename !== "default_video.mp4") {
        fs.stat(`upload/${filename}`, function (err, stats) {
            console.log(stats);
            if (err) {
                return console.error(err);
            }
            fs.unlink(`upload/${filename}`, function (err) {
                if (err) return console.log(err);
            });
        });
    }
});

app.post('/deleteFiltered', (req, res) => {
    fs.stat('upload/filtered.mp4', function (err, stats) {
        console.log(stats);
        if (err) {
            return console.error(err);
        }
        fs.unlink('upload/filtered.mp4', function (err) {
            if (err) return console.log(err);
        });
    });
});


app.listen(5000, () => {
    console.log('App is running on port 5000')
})
