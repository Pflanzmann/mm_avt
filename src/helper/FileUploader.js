import axios from "axios";

export const FileUploader = ({onSuccess, visibility}) => {
    const onInputChange = (event) => {
        console.log(event.target.files[0])
        if (event.target.files[0].type === "video/mp4")
            uploadVideo(event, event.target.files[0]);
    }

    const uploadVideo = (event, video) => {
        event.preventDefault();

        const data = new FormData();

        data.append('file', video);
        console.log(data)
        axios.post('//localhost:5000/upload', data)
            .then((res) => {
                onSuccess(res.data)
                document.getElementById("#").className = "hidden"
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    return (
        <form method="post" action="#" id="#" className={visibility}>
            <div className="form-group files">
                <label>Upload your video</label>
                <input type="file" onChange={onInputChange} className="form-control"/>
            </div>
        </form>
    )
}
