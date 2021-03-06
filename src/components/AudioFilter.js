import useAudioFilter from "../hooks/useAudioFilter";
import "../style/AudioFilter.css";
import "../style/App.css";

/**
 * React component for our audiofilter.
 * Creates a checkbox for each available audiofilter and sets the corresponding on click function.
 */
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
		<form className="audioFilters">
			<label for="lowpass" class="container"> lowpass  &nbsp;&nbsp;
				<input type="checkbox" id="lowpass" name="lowpass" value="lowpass" onClick={(e) => {
					setLowpass(e.target.checked);
				}}
				/>
			</label>
			<label for="bandpass" class="container"> bandpass&nbsp;
				<input type="checkbox" id="bandpass" name="bandpass" value="bandpass" onClick={(e) => {
					setBandpass(e.target.checked);
				}} />
			</label>
			<label for="highpass" class="container"> highpass &nbsp;
				<input type="checkbox" id="highpass" name="highpass" value="highpass" onClick={(e) => {
					setHighpass(e.target.checked);
				}} />
			</label>
			<label for="lowshelf" class="container"> lowshelf&nbsp;
				<input type="checkbox" id="lowshelf" name="lowshelf" value="lowshelf" onClick={(e) => {
					setLowshelf(e.target.checked);
				}} />
			</label>
			<label for="highshelf" class="container"> highshelf
			<input type="checkbox" id="highshelf" name="highshelf" value="highshelf" onClick={(e) => {
				setHighshelf(e.target.checked);
			}} />
			 </label>
			 <label for="peaking" class="container"> peaking &nbsp; &nbsp;
			<input type="checkbox" id="peaking" name="peaking" value="peaking" onClick={(e) => {
				setPeaking(e.target.checked);
			}} />
			</label>
			<label for="notch" class="container"> notch&nbsp; &nbsp; &nbsp; &nbsp;
			<input type="checkbox" id="notch" name="notch" value="notch" onClick={(e) => {
				setNotch(e.target.checked);
			}} />
			 </label>
		</form>
	);
};
