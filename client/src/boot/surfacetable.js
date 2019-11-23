class SurfaceTable {

    static padi = [
        [0, 180],
        [0, 47, 48, 228],
        [0, 21, 22, 69, 70, 250],
        [0, 8, 9, 30, 31, 78, 79, 259],
        [0, 7, 8, 16, 17, 38, 39, 87, 88, 268],
        [0, 7, 8, 15, 16, 24, 25, 46, 47, 94, 95, 275],
        [0, 6, 7, 13, 14, 22, 23, 31, 32, 53, 54, 101, 102, 282],
        [0, 5, 12, 13, 20, 21, 28, 29, 37, 38, 59, 60, 107, 108, 288],
        [0, 5, 6, 11, 12, 18, 19, 26, 27, 34, 35, 43, 44, 65, 66, 113, 114, 294],
        [0, 5, 6, 11, 12, 17, 18, 24, 25, 31, 32, 40, 41, 49, 50, 71, 72, 119, 120, 300],
        [0, 4, 5, 10, 11, 16, 17, 22, 23, 29, 30, 37, 38, 45, 46, 54, 55, 76, 77, 124, 125, 305],
        [0, 4, 5, 9, 10, 15, 16, 21, 22, 27, 28, 34, 35, 42, 43, 50, 51, 59, 60, 81, 82, 129, 130, 310],
        [0, 4, 5, 9, 10, 14, 15, 19, 20, 25, 26, 32, 33, 39, 40, 46, 47, 55, 56, 64, 65, 85, 86, 134, 135, 315],
        [0, 3, 4, 8, 9, 13, 14, 18, 19, 24, 25, 30, 31, 36, 37, 43, 44, 51, 52, 59, 60, 68, 69, 90, 91, 138, 139, 319],
        [0, 3, 4, 8, 9, 12, 13, 17, 18, 23, 24, 28, 29, 34, 35, 41, 42, 47, 48, 55, 56, 63, 64, 72, 73, 94, 95, 143, 144, 324],
        [0, 3, 4, 7, 8, 12, 13, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 45, 46, 51, 52, 59, 60, 67, 68, 76, 77, 98, 99, 147, 148, 328],
        [0, 3, 4, 7, 8, 11, 12, 16, 17, 20, 21, 25, 26, 30, 31, 36, 37, 42, 43, 48, 49, 55, 56, 63, 64, 71, 72, 80, 81, 102, 103, 150, 151, 331],
        [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 24, 25, 29, 30, 34, 35, 40, 41, 46, 47, 52, 53, 59, 60, 67, 68, 75, 76, 84, 85, 106, 107, 154, 155, 335],
        [0, 3, 4, 6, 7, 10, 11, 14, 15, 18, 19, 23, 24, 27, 28, 32, 33, 38, 39, 43, 44, 49, 50, 56, 57, 63, 64, 70, 71, 78, 79, 87, 88, 109, 110, 158, 159, 339],
        [0, 2, 3, 6, 7, 10, 11, 13, 14, 17, 18, 22, 23, 26, 27, 31, 32, 36, 37, 41, 42, 47, 48, 53, 54, 59, 60, 66, 67, 73, 74, 82, 83, 91, 92, 113, 1114, 161, 162, 342],
        [0, 2, 3, 6, 7, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 34, 35, 39, 40, 44, 45, 50, 51, 56, 57, 62, 63, 69, 70, 77, 78, 85, 86, 94, 95, 116, 117, 164, 165, 345],
        [0, 2, 3, 5, 6, 910, 12, 13, 16, 17, 20, 21, 24, 25, 28, 29, 33, 34, 37, 38, 42, 43, 47, 48, 53, 54, 59, 60, 65, 66, 72, 73, 80, 81, 88, 89, 97, 98, 119, 120, 167, 168, 348],
        [0, 2, 3, 5, 6, 8, 9, 12, 13, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 36, 37, 40, 41, 45, 46, 50, 51, 56, 57, 62, 63, 68, 69, 75, 76, 83, 84, 91, 92, 100, 101, 122, 123, 170, 171, 351],
        [0, 2, 3, 5, 6, 8, 9, 11, 12, 15, 16, 18, 19, 22, 23, 26, 27, 30, 31, 34, 35, 39, 40, 43, 44, 48, 49, 53, 54, 59, 60, 65, 66, 71, 72, 78, 79, 86, 87, 94, 95, 103, 104, 125, 126, 173, 174, 354],
        [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 18, 19, 21, 22, 25, 26, 29, 30, 33, 34, 37, 38, 41, 42, 46, 47, 51, 52, 56, 57, 62, 63, 68, 69, 74, 75, 81, 82, 89, 90, 97, 98, 106, 107, 128, 129, 176, 177, 357],
        [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20, 21, 24, 25, 28, 29, 31, 32, 35, 36, 40, 41, 44, 45, 49, 50, 54, 55, 59, 60, 65, 66, 71, 72, 77, 78, 84, 85, 91, 92, 100, 101, 109, 110, 131, 132, 179, 180, 360]
    ];


    static getEndingPressureGroup(startingPressureGroup, surfaceIntervalTime) {
        let endingPressureGroup = 'a';
        let startPg = startingPressureGroup.charCodeAt(0) - 65;

        if(startingPressureGroup !== 'a') {
            for (let i = 0; i < SurfaceTable.padi[startPg].length; i++) {
                if (this.padi[startPg][i] >= surfaceIntervalTime) {
                    i = Math.ceil((i + 1)/2.0) - 1;
                    startPg = startPg - i;
                    startPg = startPg + 65;
                    endingPressureGroup = String.fromCharCode(startPg);
                    return endingPressureGroup;
                }
            }
        }
        return endingPressureGroup;
    }

    static getSurfaceIntervalTime(startPg, endPg) {
        let surfTime = [0, 0];
        if (endPg !== 'a' && startPg !== 'a') {
            let start = startPg.charCodeAt(0) - 65;
            let end = endPg.charCodeAt(0) - 65;
            let index = (start - end) * 2;

            if (index >= 0) {
                surfTime[0] = this.padi[start][index];
                surfTime[1] = this.padi[start][index+1];
            }
        }

        return surfTime;
    }

}

