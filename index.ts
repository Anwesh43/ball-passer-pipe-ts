const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 5
const scGap : number = 0.02 
const strokeFactor : number = 90 
const sizeFactor : number = 5.9 
const delay : number = 20 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#3F51B5",
    "#4CAF50",
    "#FF9800",
    "#F44336",
    "#2196F3"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawBallPasserPipe(context : CanvasRenderingContext2D, scale : number) {
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        const sf4 : number = ScaleUtil.divideScale(sf, 3, parts)
        const size : number = Math.min(w, h) / sizeFactor 
        context.save()
        context.translate(w / 2, h / 2)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(-w / 2, (-size / 2 + size * j) * sf2)
            DrawingUtil.drawLine(context, 0, 0, w * sf1, 0)
            context.restore()
        }
        DrawingUtil.drawCircle(context, -w / 2 + w * sf4, 0, size * sf3)
        context.restore()
    }

    static drawBPPNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        DrawingUtil.drawBallPasserPipe(context, scale)
    }
}