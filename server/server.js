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
//FILTERS
//Filter1: with pink dots - filtered2
//  .videoFilters('noise=alls=100:allf=t+u')
//Filter2: black and white
// .videoFilters('hue=s=0') - filtered3
//Filter3: Set the hue to 90 degrees and the saturation to 1.0
//.videoFilters('hue=h=90:s=1') - filtered4
//Filter4: rgb colors
//.videoFilters('rgbashift=rh=15:bv=15:gh=-15') - filtered5
//Filter5: blur
//.videoFilters('boxblur=4:1:cr=0:ar=0') - filtered1
//oder  .videoFilters('unsharp=7:7:-2:7:7:-2') - filtered10
//Filter6: smth like sepia
// .videoFilters('colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131') - filtered7
//Filter7: edgedetect - filtered8
//.videoFilters('edgedetect=low=0.1:high=0.4')
//Filter8: negate - filtere9
//   .videoFilters('negate')
//Filter to think:
//  .videoFilters('colorbalance=rs=.3') - change color balance - filtered
// .videoFilters('colorlevels=romin=0.5:gomin=0.5:bomin=0.5') - change brightness(play with numbers!!!!) - filtered6
//.videoFilters('fade=in:0:100') - fade effect for first frames
//!!!IMPORTANT .videoFilters('eq=contrast=250.0:enable=\'between(t,5,10)\'') time for effect
// case "mixer":
//  red becomes blue, green becomes red, blue becomes green
// request.push(`colorchannelmixer=0:1:0:0:0:0:1:0:1:0:0:0:enable=\'between(t,${startTime},${endTime})\'`)
// break;
// case "blueShift":
//request.push(`shuffleplanes=2:0:1:enable=\'between(t,${startTime},${endTime})\'`)
//break;
app.post('/filter', (req, res) => {
    console.log(req.body.filters)
    if (fs.existsSync(`upload/${filename}`)) {
        ffmpeg(`upload/${filename}`) //Input Video
            .videoFilters(req.body.filters)
            .output('upload/filtered.mp4') // Output File
            .on('end', function (err) {
                if (!err)
                    // res.send("Successfull");
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
        console.log(stats);//here we got all information of file in stats variable
        if (err) {
            return console.error(err);
        }
        fs.unlink(`upload/${filename}`, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });
    fs.stat('upload/filtered.mp4', function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable
        if (err) {
            return console.error(err);
        }
        fs.unlink('upload/filtered.mp4', function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    });

});

app.listen(5000, () => {
    console.log('App is running on port 5000')
})
