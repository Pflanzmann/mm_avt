import useAudioFilter from "../hooks/useAudioFilter";
import "../style/AudioFilter.css";
import "../style/App.css";



export default () => {
	const {
		setLowpass,
		setBandpass,
		setHighpass,
		setLowshelf,
		setHighshelf,
		setPeaking,
		setNotch,
	} = useAudioFilter();

	return (
		<form>
			<label for="lowpass" class="container"> lowpass
				<input type="checkbox" id="lowpass" name="lowpass" value="lowpass" onClick={(e) => {
					setLowpass(e.target.checked);
				}}
				/>
			</label>
			<label for="bandpass" class="container"> bandpass
				<input type="checkbox" id="bandpass" name="bandpass" value="bandpass" onClick={(e) => {
					setBandpass(e.target.checked);
				}} />
			</label>
			<label for="highpass" class="container"> highpass
				<input type="checkbox" id="highpass" name="highpass" value="highpass" onClick={(e) => {
					setHighpass(e.target.checked);
				}} />
			</label>
			<label for="lowshelf" class="container"> lowshelf
				<input type="checkbox" id="lowshelf" name="lowshelf" value="lowshelf" onClick={(e) => {
					setLowshelf(e.target.checked);
				}} />
			</label>
			<label for="highshelf" class="container"> highshelf
			<input type="checkbox" id="highshelf" name="highshelf" value="highshelf" onClick={(e) => {
				setHighshelf(e.target.checked);
			}} />
			 </label>
			 <label for="peaking" class="container"> peaking 
			<input type="checkbox" id="peaking" name="peaking" value="peaking" onClick={(e) => {
				setPeaking(e.target.checked);
			}} />
			</label>
			<label for="notch" class="container"> notch
			<input type="checkbox" id="notch" name="notch" value="notch" onClick={(e) => {
				setNotch(e.target.checked);
			}} />
			 </label>
		</form>
	);
};
