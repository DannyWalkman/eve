var blob1Points = 20, blob1CX = 250, blob1CY = 250, blob1MinRad = 300, blob1MaxRad = 325, blob1MinDur = 0.75, blob1MaxDur = 1.50,
    blob2Points =  8, blob2CX = 200, blob2CY = 280, blob2MinRad = 290, blob2MaxRad = 315, blob2MinDur = 0.75, blob2MaxDur = 1.50,
    blob3Points = 16, blob3CX = 280, blob3CY = 300, blob3MinRad = 280, blob3MaxRad = 305, blob3MinDur = 0.75, blob3MaxDur = 1.50,
    blob4Points =  4, blob4CX = 250, blob4CY = 250, blob4MinRad = 270, blob4MaxRad = 295, blob4MinDur = 0.75, blob4MaxDur = 1.50,
    blob5Points = 12, blob5CX = 250, blob5CY = 200, blob5MinRad = 260, blob5MaxRad = 285, blob5MinDur = 0.75, blob5MaxDur = 1.50,
    blob6Points = 10, blob6CX = 230, blob6CY = 250, blob6MinRad = 160, blob6MaxRad = 200, blob6MinDur = 0.75, blob6MaxDur = 1.50,
    blob7Points = 10, blob7CX = 230, blob7CY = 250, blob7MinRad = 150, blob7MaxRad = 190, blob7MinDur = 0.75, blob7MaxDur = 1.50;




// the one in the back
var blob1 = createBlob({
    element: document.querySelector("#path1"),
    numPoints: blob1Points,
    centerX: blob1CX,
    centerY: blob1CY,
    minRadius: blob1MinRad,
    maxRadius: blob1MaxRad,
    minDuration: blob1MinDur,
    maxDuration: blob1MaxDur
});

var blob2 = createBlob({
    element: document.querySelector("#path2"),
    numPoints: blob2Points,
    centerX: blob2CX,
    centerY: blob2CY,
    minRadius: blob2MinRad,
    maxRadius: blob2MaxRad,
    minDuration: blob2MinDur,
    maxDuration: blob2MaxDur
});

var blob3 = createBlob({
    element: document.querySelector("#path3"),
    numPoints: blob1Points,
    centerX: blob3CX,
    centerY: blob3CY,
    minRadius: blob3MinRad,
    maxRadius: blob3MaxRad,
    minDuration: blob3MinDur,
    maxDuration: blob3MaxDur
});

var blob4 = createBlob({
    element: document.querySelector("#path4"),
    numPoints: blob1Points,
    centerX: blob4CX,
    centerY: blob4CY,
    minRadius: blob4MinRad,
    maxRadius: blob4MaxRad,
    minDuration: blob4MinDur,
    maxDuration: blob4MaxDur
});

var blob5 = createBlob({
    element: document.querySelector("#path5"),
    numPoints: blob5Points,
    centerX: blob5CX,
    centerY: blob5CY,
    minRadius: blob5MinRad,
    maxRadius: blob5MaxRad,
    minDuration: blob5MinDur,
    maxDuration: blob5MaxDur
});

var blob6 = createBlob({
    element: document.querySelector("#path6"),
    numPoints: blob6Points,
    centerX: blob6CX,
    centerY: blob6CY,
    minRadius: blob6MinRad,
    maxRadius: blob6MaxRad,
    minDuration: blob6MinDur,
    maxDuration: blob6MaxDur
});

var blob7 = createBlob({
    element: document.querySelector("#path7"),
    numPoints: blob7Points,
    centerX: blob7CX,
    centerY: blob7CY,
    minRadius: blob7MinRad,
    maxRadius: blob7MaxRad,
    minDuration: blob7MinDur,
    maxDuration: blob7MaxDur
});

function createBlob(options) {

    var points = [];
    var path = options.element;
    var slice = (Math.PI * 2) / options.numPoints;
    var startAngle = random(Math.PI * 2);

    var tl = new TimelineMax({
        onUpdate: update
    });

    for (var i = 0; i < options.numPoints; i++) {

        var angle = startAngle + i * slice;
        var duration = random(options.minDuration, options.maxDuration);

        var point = {
            x: options.centerX + Math.cos(angle) * options.minRadius,
            y: options.centerY + Math.sin(angle) * options.minRadius
        };

        var tween = TweenMax.to(point, duration, {
            x: options.centerX + Math.cos(angle) * options.maxRadius,
            y: options.centerY + Math.sin(angle) * options.maxRadius,
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });

        tl.add(tween, -random(duration));
        points.push(point);
    }

    options.tl = tl;
    options.points = points;

    function update() {
        path.setAttribute("d", cardinal(points, true, 1));
    }

    return options;
}

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    var size = data.length - (closed ? 0 : 1);
    var path = "M" + data[0].x + " " + data[0].y + " C";

    for (var i = 0; i < size; i++) {

        var p0, p1, p2, p3;

        if (closed) {
            p0 = data[(i - 1 + size) % size];
            p1 = data[i];
            p2 = data[(i + 1) % size];
            p3 = data[(i + 2) % size];

        } else {
            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i == size - 1 ? p2 : data[i + 2];
        }

        var x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        var y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        var x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        var y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }
    return min + (max - min) * Math.random();
}



const cursor = document.querySelector('.cursor');

document.addEventListener('click', () => {
    cursor.classList.add("expand");

    setTimeout(() => {
        cursor.classList.remove("expand");
    }, 500)
})