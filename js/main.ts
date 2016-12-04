enum Direction {
    Top,
    Right,
    Bottom,
    Left
}

class Square {
    private shapeType: number;
    private direction: Direction;
    private position: number[] = [0, 0];
    static color: string = '#a1bfff';
    readonly lineWidth: number = 10;

    constructor(position: number[], shapeType: number, direction: Direction, color?: string) {
        this.position = position;

        this.shapeType = shapeType;
        this.direction = direction;

    }

    render(ctx) {

        this.createShapeHandle(ctx);
    }

    createShapeHandle(ctx) {

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;

        //旋转方向
        ctx.translate(this.position[0] + 30, this.position[1] + 30);
        ctx.rotate((Math.PI / 180) * this.direction * 90);
        ctx.translate(-(this.position[0] + 30), -(this.position[1] + 30));

        switch (this.shapeType) {
            case 1:
                this.createShape1(ctx);
                break;
            case 2:
                this.createShape2(ctx);
                break;
            case 3:
                this.createShape3(ctx);
                break;
            case 4:
                this.createShape4(ctx);
                break;
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    createShape1(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.position[0] + 30, this.position[1] + 30, 20, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = Square.color;
        ctx.fill();

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(this.position[0] + 30, this.position[1] + 30, 10, 0, Math.PI * 2, true);
        ctx.strokeStyle = "rgba(250,250,250,0)";
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";

        ctx.fillRect(this.position[0] + 25, this.position[1], 10, 20);

        ctx.restore();
    }

    createShape2(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1] + 60, 30, Math.PI * 1.5, Math.PI, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.restore();
    }

    createShape3(ctx) {
        ctx.save();

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;

        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 30, Math.PI * 0.5, 0, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1], 30, Math.PI, Math.PI * 0.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.restore();
    }

    createShape4(ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = Square.color;

        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 30, Math.PI * 0.5, 0, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1], 30, Math.PI, Math.PI * 0.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.position[0] + 60, this.position[1] + 60, 30, Math.PI * 1.5, Math.PI, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1] + 60, 30, 0, Math.PI * 1.5, true);
        ctx.fillStyle = Square.color;
        ctx.stroke();

        ctx.restore();
    }

}
class Loop {
    readonly canvas;
    readonly context;
    data: number[][][] = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
    }

    game() {

        // 数据
        for (let i = 0; i < 5; i++) {
            let dataTemp: number[][] = [];
            for (let j = 0; j < 5; j++) {
                dataTemp.push([Math.ceil(Math.random() * 4), Math.ceil(Math.random() * 4)]);
            }
            this.data.push(dataTemp);
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                new Square([i * 60, j * 60], this.data[i][j][0], this.data[i][j][1]).render(this.context);
            }
        }
        //点击
        this.canvas.addEventListener('click', event=>this.clickHandle(event));

    }

    clickHandle(event) {
        let x: number = Math.floor((event.clientX - this.canvas.getBoundingClientRect().left) / 60);
        let y: number = Math.floor((event.clientY - this.canvas.getBoundingClientRect().top) / 60);

        this.data[x][y][1]++;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                new Square([i * 60, j * 60], this.data[i][j][0], this.data[i][j][1]).render(this.context);
            }
        }

    }
    checkResult(){
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.data
            }
        }
    }
}

new Loop(document.getElementById('canvas')).game();