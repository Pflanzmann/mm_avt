export let filterBars = [
    {
        filterId: 0,
        filters: [
            {
                filterId: 0,
                startTime: 3,
                duration: 8,
            }
        ]
    },
    {
        filterId: 1,
        filters: [
            {
                filterId: 1,
                startTime: 0,
                duration: 4,
            },
            {
                filterId: 1,
                startTime: 7,
                duration: 10,
            }
        ]
    },
]

export const setFilterBars = (newFilterBars) => {
    filterBars = newFilterBars;
}