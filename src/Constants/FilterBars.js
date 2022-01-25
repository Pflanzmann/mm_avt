export let filterBars = [
    {
        filterId: 0,
        filters: [
            {
                filterId: 0,
                startTime: 20,
                duration: 50,
            }
        ]
    },

]

export const setFilterBars = (newFilterBars) => {
    filterBars = newFilterBars;
}