// Lineクラス  constructor():classで作られたオブジェクトの生成と初期化のためのメソッド 引数をプロパティに格納
class Line{
    constructor(points,color,width){
        this.width = width;
        this.points = points;
        this.color = color;
    }
}

// Pointクラス
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
var vm = new Vue({
    el:'#app',
    data:{
        // 初期設定
        line: null,
        lines: [],
        points: [],
        color: 'black',
        width: 4,
        isDrawing: false,
        canvas: null
    },
    methods:{
        // isDrawingプロパティをtrueにして描画の開始
        mousedown:function(event){
            this.isDrawing = true; //描画開始
            this.points = []; //pointsプロパティの設定
            // event.offsetX/Y:マウスが乗っている要素の左上を原点とした座標値になる
            this.points.push(new Point(event.offsetX,event.offsetY)); //x軸とy軸のポイントを配列に格納
            // Lineオブジェクトを生成 
            this.line = new Line(this.points,this.color,this.width);
            // linesに線を追加
            this.lines.push(this.line);
        },
        // マウスのドラッグに応じて前のポイントから現在のポイントまで線をひく
        mousemove:function(event){
            if(!this.isDrawing)return;
            // console.log(event);
            // １つ前のポイント
            var prevPoint = this.line.points[this.line.points.length - 1];

            // 線をかく
            var x = event.offsetX;
            var y = event.offsetY;

            // console.log(canvas);
            var ctx = this.canvas.getContext('2d');
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.width;
            ctx.beginPath(); //現在のパスをリセットする
            ctx.moveTo(prevPoint.x,prevPoint.y); //パスの開始座標を指定する
            ctx.lineCap = 'round';
            ctx.lineTo(x,y); //座標を指定してラインを引く
            ctx.stroke(); //現在のパスの輪郭を表示する
            ctx.closePath(); //パスを閉じる(最後の座標から開始座標にむけてラインを引く)
            this.line.points.push(new Point(x,y)); //x軸とy軸の値を格納
        },
        mouseup:function(event){
            this.isDrawing = false; //isDrawingプロパティをfalseに設定して描画を終了
        },
        clearAll:function(){
            this.lines = []
            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        },
        undo:function(){
            if(this.lines.length == 0)return;

            // キャンバスをクリアする
            var ctx = this.canvas.getContext('2d');
            // clearRect:座標を始点とする大きさ(width,height)の領域を透明色で塗りつぶす
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            // 最後の線を削除 pop():配列から最後の要素を取り除きその要素を返す。
            this.lines.pop();

            // ポイントを2つずつ取り出して描画する
            for(i = 0; i < this.lines.length; i++){
                var line = this.lines[i];
                for(j = 0; j < line.points.length - 1; j++){
                    point1 = line.points[j];
                    point2 = line.points[j + 1];
                    ctx.strokeStyle = line.color;
                    ctx.lineWidth = line.width;
                    ctx.beginPath();
                    ctx.moveTo(point1.x,point1.y);
                    ctx.lineTo(point2.x,point2.y);
                    ctx.stroke();
                }
            }
        },
        redraw:function(){
            if(this.lines.length == 0) return;
            // キャンバスをクリアする
            var ctx = this.canvas.getContext('2d');
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            for(i = 0;i < this.lines.length; i++){
                var line = this.lines[i];
                line.color = this.color //色を選択色に
                for(j = 0; j < line.points.length - 1; j++){
                    point1 = line.points[j];
                    point2 = line.points[j + 1];
                    ctx.strokeStyle = line.color;
                    ctx.lineWidth = line.width;
                    ctx.beginPath();
                    ctx.moveTo(point1.x,point1.y);
                    ctx.lineTo(point2.x,point2.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    },
    mounted:function(){
        this.canvas = this.$refs.myCanvas; //mounted():ライフサイクル関数で$refsを使用してキャンバスを取得しcanvasプロパティに代入する。
    }
});