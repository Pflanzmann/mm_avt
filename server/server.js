const express = require('express')
const multer = require('multer')
const cors = require('cors')
const ffmpeg = require('fluent-ffmpeg')
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

//make paths variables instead of direct paths
ffmpeg.setFfmpegPath("C:/Users/Paula/Desktop/HTW_WiSe21-22/AVT/ffmpeg/bin/ffmpeg.exe")
ffmpeg.setFfprobePath("C:/Users/Paula/Desktop/HTW_WiSe21-22/AVT/ffmpeg/bin")

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('upload'))

let filename = "bla";

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
        console.log(req.file)
        return res.status(200).send(req.file)
    })
})

app.post('/filter', (req, res) => {
    console.log(req.body.filters)
    if (fs.existsSync(`upload/${filename}`)) {
        ffmpeg(`upload/${filename}`)
            .videoFilters(req.body.filters)
            .output('upload/filtered.mp4')
            .on('end', function (err) {
                if (!err)
                    return res.status(200).send(req.file)
            })
            .on('error', function (err) {
                console.log('error: ' + err);
                return res.status(500).json(err)
            }).run();
    }
});

app.post('/delete', (req, res) => {
    fs.stat(`upload/${filename}`, function (err, stats) {
        console.log(stats);
        if (err) {
            return console.error(err);
        }
        fs.unlink(`upload/${filename}`, function (err) {
            if (err) return console.log(err);
        });
    });
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
