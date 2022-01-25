export let checkBoxBooleans = 
    {
        lowpassChecked: false,
        bandpassChecked: false,
        highpassChecked: false,
        lowshelf: false,
        highshelf: false,
        peaking: false,
        notch: false,
    }

export const setCheckBoxBooleans = (newCheckBoxBooleans) => {
    checkBoxBooleans = newCheckBoxBooleans;
}
