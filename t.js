
fs = require('fs');

var words, wordsre;
fs.readFile('/usr/share/dict/american-english', 'utf8', function(err,data){
	data = data.replace("'","");
	words = data.split('\n');
	wordsre = words.map(function(w){return new RegExp(w+'$','i')});
	console.log(splitWords(tosplit));
});

//var tosplit = 'WhenthewindblewonthiseggitturnedintoastonemonkeycompletewiththefivesensesandfourlimbsWhenthestonemonkeyhadlearnedtocrawlandwalkhebowedtoeachofthefourquartersAshiseyesmovedtwobeamsofgoldenlightshottowardsthepolestarpalaceandstartledthesupremeheavenlysagethegreatlycompassionatejadeemperoroftheazurevaultofheavenwhowassittingsurroundedbyhisimmortalministersonhisthroneinthehallofmiraculousmistinthegoldengatedcloudpalaceWhenhesawthedazzlinggoldenlightheorderedthousandmileeyeandwindaccompanyingeartoopenthesoutherngateofheavenandtakealookThetwoofficerswentoutthroughthegateinobediencetotheimperialcommandandwhileoneobservedwhatwasgoingontheotherlistenedcarefullySoonafterwardstheyreportedback';
var tosplit = 'SimplicitypatiencecompassionThesethreeareyourgreatesttreasuresSimpleinactionsandthoughtsyoureturntothesourceofbeingpatientwithbothfriendsandenemiesYouaccordwiththewaythingsareCompassionatetowardyourselfyoureconcileallbeingsintheworld';
var cache = {};

var splitWords = function(s){
	if(cache[s])
		return cache[s]
	if(s.length == 0)
        	return ['',0]
        var minCost = s.length+1;
        var toReturn = s;
        for(var i = 0; i < words.length; i++){
            if(s.match(wordsre[i])){
                var result = splitWords(
                        s.slice(0, -words[i].length))
                if( result[1] - Math.pow(words[i].length,2) < minCost){
                    minCost = result[1] - Math.pow(words[i].length,2);
                    toReturn = result[0] + ' ' + words[i];
                }
            }
        }
        var result = splitWords(s.slice(0, -1))
        if( result[1]+1 < minCost){
            minCost = result[1]+1;
            toReturn = result[0] + ' ' + s.slice(-1);
        }
        cache[s] = [toReturn, minCost];
        console.log('mincost for string "'+s+'" is ' + minCost + ', split thusly: ' + toReturn);
        return [toReturn, minCost];
    }
    
