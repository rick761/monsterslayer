var app = new Vue({
    el: '#app',
    data: {
        speler: 80,
        monster: 80,
        spelBegonnen: false, //'niet begonnen', 'begonnen'
        gevechtsLog : []
    },
    //console.log('trigger'); // for testing
    computed: {
        spelerHealthBar: function () {
            return {
                width: this.speler + '%'
            };
        },
        monsterHealthBar: function () {
            return {
                width: this.monster + '%'
            };
        }
    }
    ,
    watch:{
        speler: function () {
            if (this.player == 0) {
                this.schrijfLog('player', 'is verslagen', 'afgelopen');
                this.spelBegonnen = false;
            }
        },monster: function(){
            if (this.monster == 0) {
                this.schrijfLog('monster', 'is verslagen', 'afgelopen');
                return this.spelBegonnen = false;
            }
        }

    },

    methods : {
        startSpel : function(){
            this.spelBegonnen = true;
            this.speler = 100;
            this.monster = 100;
        },


        geefOp : function(){
            this.spelBegonnen = false;
            this.speler = 0;
        },


        monsterAanval:function(){
            hit = Math.floor((Math.random() * 7) + 4);
            this.speler -= hit;
            if(this.speler < 0){
                this.speler = 0;
            }
            this.schrijfLog('speler',hit,'aanval');
        },


        aanvallen : function (){
            hit = Math.floor((Math.random() * 7) + 4);
            this.monster -= hit;
            if(this.monster < 0){
                this.monster = 0;
            }
            this.schrijfLog('monster',hit,'aanval');
            this.monsterAanval();
        },

        herstellen : function(){
            hit = Math.floor((Math.random() * 5) + 6);
            this.speler += hit;
            if(this.speler > 100){
                this.speler = 100;
            }
            this.schrijfLog('speler',hit,'herstellen');
            this.monsterAanval();
        },
        speciaalAanvallen : function(){
            hit = Math.floor((Math.random() * 13) + 12);
            this.monster -= hit;
            if(this.monster < 0){
                this.monster = 0;
            }
            this.schrijfLog('monster',hit,'speciaalAanvallen');
            this.monsterAanval();
            this.monsterAanval();
        },


        schrijfLog : function(naam,waarde,type){
            switch(type){

                case  'afgelopen' :
                    this.gevechtsLog.unshift({
                        log: naam + " " + waarde ,
                        color: {  backgroundColor: 'Olive'}
                    });
                    break;

                case 'aanval' :
                    if(naam == 'speler'){
                        this.gevechtsLog.unshift({
                            log: naam + " loses "+ waarde + " hp from an attack",
                            color: {backgroundColor:'OrangeRed'}
                        });
                    }

                    if(naam == 'monster'){
                        this.gevechtsLog.unshift({
                            log: naam + " loses "+ waarde + " hp from an attack",
                            color: {backgroundColor:'RoyalBlue'}
                        });
                    }
                    break;
                case 'herstellen':
                    this.gevechtsLog.unshift({
                        log: naam + " heals for "+ waarde + " hp",
                        color: {backgroundColor:'ForestGreen'}
                    });
                    break;
                default:break;
                case 'speciaalAanvallen':
                    this.gevechtsLog.unshift({
                        log: naam + " loses "+ waarde + " hp from an special attack",
                        color: {backgroundColor:'Magenta'}
                    });
                    break;
            }
            this.gevechtsLog = this.gevechtsLog.slice(0,10);

        }
    }
})