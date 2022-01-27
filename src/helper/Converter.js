import * as Constants from "../constants/FilterBars.js";

export function convertFilters() {
    let request = []
    const filterBarRight = document.getElementById("lastScaleLine").getBoundingClientRect().right - document.getElementById("scale").getBoundingClientRect().left;
    const videoDuration = document.getElementById("videoSource").duration;

    Constants.filterBars.map(filterBar => {
        filterBar.filters.map(filter => {
            let startTime = filter.startTime
            let endTime = filter.startTime + filter.duration

            let startTimePercent = 100 / filterBarRight * startTime;
            let endTimePercent = 100 / filterBarRight * endTime;

            let relativeVideoStart = videoDuration / 100 * startTimePercent;
            let relativeVideoEnd = videoDuration / 100 * endTimePercent;
            relativeVideoEnd = Math.min(relativeVideoEnd, videoDuration)

            startTime = Math.round(relativeVideoStart);
            endTime = Math.round(relativeVideoEnd);

            console.log("filterId: " + filter.filterId + "startTime: " + startTime + " | endTime: " + endTime)

            switch (filter.filterId) {
                case 0:
                    request.push(`hue=s=0:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case 1:
                    request.push(`unsharp=7:7:-2:7:7:-2:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case 2:
                    request.push(`noise=alls=100:allf=t+u:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case 3:
                    request.push(`rgbashift=rh=15:bv=15:gh=-15:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case 4:
                    //can also make cold filter with colortemperature=9000:pl=1
                    request.push(`colortemperature=3000:pl=1:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case 5:
                    request.push(`geq=r='255-r(X,Y)':g='255-g(X,Y)':b='255-b(X,Y)':enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                default:
                    break;
            }
        })
    })

    console.log(request.join(","))
    return request.join(",")
}

