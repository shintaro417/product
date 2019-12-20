var app = new Vue({
    el:'#app',
    data:{
        // storageKeyプロパティを追加してtodolistに設定する
        storageKey:'todolist',
        // newtodo:新規のtodo項目を管理する
        newtodo:'',
        // todolis:todo項目の一覧を管理するtodolist配列
        todolist:[]
    },
    // watch:指定したプロパティを監視して、変更があった場合に関数を呼び出す。　今回はtodolistプロパティを監視
    watch:{
        todolist:{
            handler:function(){
            // 保存 変化があるとsetItem()メソッドが実行されデータが保存される。
            localStorage.setItem(
                this.storageKey,
                // JSONオブジェクトのstrigify()メソッドによりtodolistプロパティを文字列に変換する
                JSON.stringify(this.todolist)
                );
            },
            // deepオプションをtrueに定義してhandlerで関数定義する
            deep:true
        }
    },
    // created関数を追加する
    created:function(){
        // localStorageオブジェクトのgetItem()メソッドを実行して、ローカルストレージからデータを読み込んで変数dataStrに格納
        var dataStr = localStorage.getItem(this.storageKey);
        if(dataStr){
            // JSON.parse()メソッドによってオブジェクトに変換してtodolistプロパティに代入する
            this.todolist = JSON.parse(dataStr);
        }
    },
    methods:{
        // addTodoメソッドの定義
        addTodo:function(){
            if(this.newtodo == '') return;
            // push():新しい項目をtodolist配列に追加 引数にはテキストボックスの内容とdone,hoverをfalseにする
            this.todolist.push({text:this.newtodo,done:false,hover:false});
            // pushし終わったらテキストボックスは空白に
            this.newtodo = '';
        },
        // removeメソッドの定義
        remove:function(index){
            //削除する要素のインデックスを引数に渡してsplice()メソッドでtodolist配列から削除
            if(this.todolist[index].done == true){
                this.todolist.splice(index,1);
            }
        }
    }
});