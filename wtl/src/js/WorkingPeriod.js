var startingDate = null;
var endingDate = null;
var segmentsFLevel = null;
var segmentsSLevel = null;
var segmentsTLevel = null;
var accumulator = 0;
var isNextDay = true;
var currentDate = null;

export default function FindWorkingPeriod(validatyRange, InnerSegments) {
    // Filling variables
    startingDate = new Date(validatyRange[0])
    currentDate = new Date(validatyRange[0])
    endingDate = new Date(validatyRange[1])
    segmentsFLevel = InnerSegments.filter(el => el.segmentLevel == 1 && el.status).sort((a,b) => b.timeCategory - a.timeCategory)
    segmentsSLevel = InnerSegments.filter(el => el.segmentLevel == 2 && el.status).sort((a,b) => b.timeCategory - a.timeCategory)
    segmentsTLevel = InnerSegments.filter(el => el.segmentLevel == 3 && el.status).sort((a,b) => b.timeCategory - a.timeCategory)
    //Counting time of each day and accumulating the result

    for (let index = 0; index <= (endingDate - startingDate) / (1000 * 3600 * 24); index++) {
        calcDayTime()
    }
}

function calcDayTime() {
    // Filling variables
    var IsExtraDay = false
    var FunctionCurrentDate = {rests: []}

    var segmentsFLevelCopyTimeCategory1 = JSON.parse(JSON.stringify(segmentsFLevel.filter(el => el.timeCategory == 1)))
    var segmentsFLevelCopyTimeCategory2 = JSON.parse(JSON.stringify(segmentsFLevel.filter(el => el.timeCategory == 0)))

    var segmentsSLevelCopyTimeCategory1 = JSON.parse(JSON.stringify(segmentsSLevel.filter(el => el.timeCategory == 1)))
    var segmentsSLevelCopyTimeCategory2 = JSON.parse(JSON.stringify(segmentsSLevel.filter(el => el.timeCategory == 0)))

    var segmentsTLevelCopy = JSON.parse(JSON.stringify(segmentsTLevel.filter(el => el.timeCategory == 0)))

    var FunctionDayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long'}).format(currentDate)

    //First level segment iteration

    segmentsFLevelCopyTimeCategory1.forEach(element => {
        if(CheckFLevelDay(element, FunctionDayOfWeek)) {
            FunctionCurrentDate.dayStartTimeOffset = element.segmentStartTimeOffset
            FunctionCurrentDate.dayEndTimeOffset = element.segmentEndTimeOffset
            IsExtraDay = true
        }
    });
    if(IsExtraDay) {
        segmentsFLevelCopyTimeCategory2.forEach(element => {
            if(CheckFLevelDay(element, FunctionDayOfWeek)) {
                FunctionCurrentDate.rests.push([element.segmentStartTimeOffset, element.segmentEndTimeOffset])
            }
        });
    } else {
        FunctionCurrentDate.rests = [0, 86400]
    }

    IsExtraDay = false
    //Second level segment iteration

    segmentsSLevelCopyTimeCategory1.forEach(element => {
        if(CheckSLevelDay(element)) {
            FunctionCurrentDate.dayStartTimeOffset = element.segmentStartTimeOffset
            FunctionCurrentDate.dayEndTimeOffset = element.segmentEndTimeOffset
            IsExtraDay = true
        }
    });
    if(IsExtraDay) {
        FunctionCurrentDate.rests = []
        segmentsSLevelCopyTimeCategory2.forEach(element => {
            if(CheckSLevelDay(element)) {
                FunctionCurrentDate.rests.push([element.segmentStartTimeOffset, element.segmentEndTimeOffset])
            }
        });
        if(FunctionCurrentDate.rests.length == 0) FunctionCurrentDate.rests = [0, 86400]
    }

    //Third level segment iteration

    segmentsTLevelCopy.forEach(element => {
        if(CheckSLevelDay(element)) {
            FunctionCurrentDate = {}
            FunctionCurrentDate.rests = [0, 86400]
        }
    });

    if(FunctionCurrentDate.rests.length > 1) {
        var Sort = FunctionCurrentDate.rests.sort((a,b) => a[0] - b[0])
        for (let restIndex = 0; restIndex < Sort.length - 1; restIndex++) {
            if(Sort[restIndex + 1][0] < Sort[restIndex][1]) {
                Sort[restIndex + 1] = [Sort[restIndex][0],Sort[restIndex+1][1]]
                Sort.shift()
            }
    
        }
    }

    console.log(currentDate, FunctionCurrentDate);
    currentDate.setDate(currentDate.getDate() + 1)
}

function CheckFLevelDay(element, FunctionDayOfWeek) {
    if( element['flag'+FunctionDayOfWeek]
        && element.status
        && new Date(element.validityStartDate) < currentDate
        && new Date(element.validityEndDate) > currentDate)
    return true
    return false
}

function CheckSLevelDay(element) {
    if( element.status && isValidatyDayFrom(element))
    return true
    return false
}

function isValidatyDayFrom(element){
    return element.segmentValidatyDays.findIndex(el => {return new Date(el).toISOString() == currentDate.toISOString()}) != -1
}