export let filterBars = [
    {
        filterId: 0,
        filters: [
            {
                filterId: 0,
                startTime: 20,
                duration: 30,
            }
        ]
    },
    {
        filterId: 1,
        filters: [
            {
                filterId: 1,
                startTime: 0,
                duration: 40,
            },
            {
                filterId: 1,
                startTime: 100,
                duration: 100,
            }
        ]
    },
]

export const setFilterBars = (newFilterBars) => {
    filterBars = newFilterBars;
}