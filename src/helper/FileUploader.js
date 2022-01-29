import axios from "axios";

/**
 * Helper for uploading video
 * @param onSuccess passes video file when it's uploaded to VideoPlayer.js for video to be displayed
 * @param visibility boolean value to set upload form visible/invisible
 * @returns {JSX.Element} form with input for video
 */
export const FileUploader = ({onSuccess, visibility}) => {
    /**
     * Observes input field. Starts uploading of the video as soon as the video was chosen in the input field
     * @param event video chosen
     */
    const onInputChange = (event) => {
        if (event.target.files[0].type === "video/mp4")
            uploadVideo(event, event.target.files[0]);
    }

    /**
     * Calls api to upload the chosen video
     * @param video video to upload
     */
    const uploadVideo = (video) => {
        const data = new FormData();

        data.append('file', video);
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
