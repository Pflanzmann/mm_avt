import useAudioFilter from "../hooks/useAudioFilter";

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
			<input type="checkbox" id="lowpass" name="lowpass" value="lowpass" onClick={(e) => {
					setLowpass(e.target.checked);
				}}
			/>
			<label for="lowpass"> lowpass</label>
			<input type="checkbox" id="bandpass" name="bandpass" value="bandpass" onClick={(e) => {
					setBandpass(e.target.checked);
				}} />
			<label for="bandpass"> bandpass</label>
			<input type="checkbox" id="highpass" name="highpass" value="highpass" onClick={(e) => {
					setHighpass(e.target.checked);
				}} />
			<label for="highpass"> highpass </label>
			<input type="checkbox" id="lowshelf" name="lowshelf" value="lowshelf" onClick={(e) => {
					setLowshelf(e.target.checked);
				}} />
			<label for="lowshelf"> lowshelf </label>
			<input type="checkbox" id="highshelf" name="highshelf" value="highshelf" onClick={(e) => {
					setHighshelf(e.target.checked);
				}}/>
			<label for="highshelf"> highshelf </label>
			<input type="checkbox" id="peaking" name="peaking" value="peaking" onClick={(e) => {
					setPeaking(e.target.checked);
				}} />
			<label for="peaking"> peaking </label>
			<input type="checkbox" id="notch" name="notch" value="notch" onClick={(e) => {
					setNotch(e.target.checked);
				}} />
			<label for="notch"> notch </label>
		</form>
	);
};
