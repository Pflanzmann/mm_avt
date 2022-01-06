import {useState} from "react";
import axios from "axios";

export const FileUploader = ({onSuccess, visibility}) => {
    const [uploadedVideo, setUploadedVideo] = useState()
    const onInputChange = (event) => {
        console.log(event.target.files[0])
        if (event.target.files[0].type === "video/mp4")
            setUploadedVideo(event.target.files[0])

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();

        data.append('file', uploadedVideo);
        console.log(data)
        axios.post('//localhost:5000/upload', data)
            .then((res) => {
                console.log('Success')
                onSuccess(res.data)
                document.getElementById("#").className = "hidden"
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    return (
        <form method="post" action="#" id="#" onSubmit={handleSubmit} className={visibility}>
            <div className="form-group files">
                <label>Upload your video</label>
                <input type="file" onChange={onInputChange} className="form-control"/>
            </div>
            <button>Upload</button>
        </form>
    )
}
