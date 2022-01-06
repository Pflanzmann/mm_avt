export function convertFilters(filters) {
    let activeFilters = []
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].isActive) {
            activeFilters.push(filters[i])
        }
    }
    if (activeFilters != null) {
        console.log(activeFilters)
       let request = []
        for(let i = 0; i < activeFilters.length; i++){
            let startTime = activeFilters[i].startTime
            let endTime = activeFilters[i].endTime
            switch(activeFilters[i].type) {
                case "blur":
                    request.push(`unsharp=7:7:-2:7:7:-2:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case "b&w":
                    request.push(`hue=s=0:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case "rgbshift":
                    request.push(`rgbashift=rh=15:bv=15:gh=-15:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case "negation":
                    request.push(`geq=r='255-r(X,Y)':g='255-g(X,Y)':b='255-b(X,Y)':enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case "noise":
                    request.push(`noise=alls=100:allf=t+u:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                case "warm":
                    //can also make cold filter with colortemperature=9000:pl=1
                    request.push(`colortemperature=3000:pl=1:enable=\'between(t,${startTime},${endTime})\'`)
                    break;
                default:
                    break;
            }
        }
        console.log(request.join(","))
        return request.join(",")
    }
}

