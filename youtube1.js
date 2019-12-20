var vm = new Vue({
    el:'#app',
    data:{
        //検索結果を格納するresultsプロパティ
        results:null,
        //検索キーワードを格納するkeywordプロパティ
        keyword:'',
        //paramsにクエリパラメータを格納する
        params:{
            q:'', //検索文字列
            part:'snippet', //part:APIレスポンスに含まれる1つor複数のsearchリソースのプロパティをカンマ区切りリストの形式で指定する。 snippet:APIレスポンスにはネストされるプロパティも全て含まれる。
            type: 'video', //type:検索クエリの対象を特定のタイプのリソースのみに制限する video:動画
            maxResults:'20', //最大検索数
            //キーの設定
            key:'AIzaSyC4sjC-FaJVNHZ7i2y2BTn5wD1S8XVe1kA'
        }
    },
    methods:{
        //検索を実行する関数
        searchMovies:function(){
            //クエリパラメータのqに検索文字列を代入する
            this.params.q = this.keyword;
            //thisを変数selfに退避させる。 axiosのthen関数などでthisの値が変化するのに対処する
            var self = this;
            // axiosを使ってWebサーバにHTTPプロトコルのgetリクエストを送信して、レスポンスを受け取る
            axios
            // get()メソッド:引数に指定したアドレスにHTTPプロトコルのgetリクエストを送信する。 youtube Data APIのurlにクエリパラメータを加える
                .get('https://www.googleapis.com/youtube/v3/search',{params: this.params})
            //then():get()メソッドの結果が正常に受け取れれば、then()メソッドの引数で指定した関数を処理する.関数では引数resに渡される
                .then(function(res){
                    //検索結果として取得したitems配列をreultsプロパティに代入する。 results配列の各要素にはそれぞれの動画の情報が格納される。
                    self.results = res.data.items;
                })
                .catch(function(err){
                    console.log(err);
                });
        }
    }
});