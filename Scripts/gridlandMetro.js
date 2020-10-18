/*
	https://www.hackerrank.com/challenges/gridland-metro/problem
*/

'use strict';

// Complete the gridlandMetro function below.
function gridlandMetro(n, m, k, track) {
    var trackObj = {};
    var start = 0;
    var end = 0;
    var row = 0;
    track.sort((a, b) => {
        if(a[0] == b[0]){
            if(a[1] == b[1]){
                return b[2] - a[2];
            }
            return a[1] - b[1];
        }
        else {
            return a[0] - b[0];
        }
    });
    console.log('track', track);
    for(var i=0; i<track.length; i++){
        row = track[i][0];
        start = track[i][1];
        end = track[i][2];
        if(trackObj[row]){
            for(var j=0; j<trackObj[row].length; j++){
                var rail = trackObj[row][j];
                if(rail.start <= start && rail.end >= end){
                    // do nothing complete overlap in already accounted
                    break;
                }
                else if(end > rail.end && start <= rail.end){
                    // partial overlap 
                    trackObj[row][j].end = end;
                    break;
                }
                else if(j == (trackObj[row].length - 1)){
                    trackObj[row].push({
                        start: start,
                        end: end
                    });
                }
            }
        }
        else{
            trackObj[row] = [{
                start: track[i][1],
                end: track[i][2]
            }];
        }
    }
    console.log(trackObj);
    var rows = Object.values(trackObj);
    var rowTrackCount = 0;
    for(var i=0; i<rows.length; i++){
        for(var j=0; j<rows[i].length; j++){
            rowTrackCount = stringSum(String(rowTrackCount), String(rows[i][j].end - rows[i][j].start + 1));
        }
    }

    return stringSubstract(multiplyString(String(n), String(m)), String(rowTrackCount));
}

function stringSum(a, b){
    var retString = '';
    var iteration = 0;
    var partialSum = 0;
    var carry = 0;
    var partialA = 0;
    var partialB = 0;
    
    iteration = a.length > b.length ? a.length : b.length;

    for(var i=a.length-1,j=b.length-1; iteration>0; iteration--,i--,j--){
        
        partialA = i < 0 ? 0 : parseInt(a[i]);
        partialB = j < 0 ? 0 : parseInt(b[j]);
        
        partialSum = carry + partialA + partialB;
        
        carry = Math.floor(partialSum/10);
        partialSum = partialSum%10;
        
        retString = partialSum + retString;
    }

    retString = carry ? (carry + retString) : retString;
    
    return retString;
}


function addZeros(n) {
	var retString = '';
	while(n>0){
		retString += '0';
		n--;
	}
	return retString;
}


function multiplyString(a, b) {
	var mainA = '';
	var mainB = '';
	var rowDigit = 0;
	var rowDigitCarry = 0;
	var rowNumber = '';
	var retString = '0';

	mainA = a.length > b.length ? a : b;
	mainB = a.length > b.length ? b : a;

	for(var i=mainB.length-1; i>=0; i--){
		for(var j=mainA.length-1; j>=0; j--){
			rowDigit = parseInt(mainB[i])*parseInt(mainA[j]) + rowDigitCarry;
			rowDigitCarry = Math.floor(rowDigit/10);
			rowDigit = rowDigit%10;
			rowNumber = rowDigit + rowNumber;
		}
		rowNumber = rowDigitCarry ? (rowDigitCarry + rowNumber) : rowNumber;
		rowNumber = rowNumber + addZeros(mainB.length - 1 - i);
		retString = stringSum(retString, rowNumber);
		rowNumber = '';
		rowDigitCarry = 0;
	}

	return retString;

}

function stringSubstract(a, b){
	var retString = '';
	var partialSub = 0;
	var partialA = 0;
	var partialB = 0;
	var carry = 0;
	var trimIndex = 0;

	if(isGreater(a, b) == a){
		for(var i=a.length-1,j=b.length-1; i>=0; i--,j--){
			partialA = parseInt(a[i]);
			partialB = j < 0 ? 0 : parseInt(b[j]);
			partialSub = partialA - partialB + carry;
			carry = partialSub >= 0 ? 0 : -1;
			partialSub = partialSub >= 0 ? partialSub : 10 + partialSub;
			retString = partialSub + retString;
		}
		while((retString[trimIndex] == 0) && (trimIndex < retString.length - 1)){
			trimIndex++;
		}
		return retString.slice(trimIndex);
	}
	else{
		return '-' + stringSubstract(b, a);
	}
}


function isGreater(a, b){
	if(a.length > b.length){
		return a;
	}
	else if(b.length > a.length){
		return b;
	}
	else{
		for(var i=0; i<a.length; i++){
			if(parseInt(a[i]) > parseInt(b[i])){
				return a;
			}
			else if(parseInt(a[i]) < parseInt(b[i])){
				return b;
			}
		}
	}
	return a;
}

/*var n = 9, m = 9, k = 2;
var tracks = [
	[1, 2, 8],
	[1, 3, 9]
]

console.log(gridlandMetro(n, m, k, tracks));*/

var n = 85262176, m = 406977280, k = 732;
var tracks = [
	[83619354, 80492819, 191778891],
	[73716848, 127341390, 361864789],
	[78873467, 232269151, 252088356],
	[61009392, 326238163, 351712190],
	[84874187, 202365070, 395916913],
	[70578072, 279889240, 339662846],
	[26977617, 153673187, 221942224],
	[42452526, 351867388, 398066133],
	[75576127, 143970762, 285016123],
	[14926008, 104943205, 323377272],
	[9701748, 354754944, 359321199],
	[8644694, 308841412, 332800748],
	[36087924, 60976505, 385017425],
	[29887940, 317686406, 357983129],
	[16429145, 321618464, 374341542],
	[55933152, 187048169, 327409636],
	[49585375, 151343887, 349467808],
	[72279795, 346258494, 375175107],
	[72476485, 109081379, 303625646],
	[2672810, 54230294, 318834187],
	[58083211, 45674282, 172611655],
	[27051387, 294775288, 295206721],
	[5982130, 292774815, 313075086],
	[14356531, 367536353, 393595765],
	[19514576, 359506427, 362974416],
	[23989634, 33104756, 284119010],
	[29238427, 298135399, 393548264],
	[44036709, 92569375, 193438556],
	[30956220, 91330068, 113963029],
	[2850944, 327772704, 351947516],
	[35073248, 280531282, 379347902],
	[80599770, 388096612, 404580289],
	[19994202, 329022315, 392072124],
	[67727112, 25380634, 285025033],
	[77210403, 111792354, 311437326],
	[77927460, 375477518, 396659675],
	[16184, 240707420, 269755327],
	[9533924, 167400381, 280346789],
	[32599052, 197722372, 246412350],
	[74265449, 163901081, 302009094],
	[11068021, 163380791, 267662881],
	[83906510, 344608564, 351601818],
	[41151806, 181483170, 185552107],
	[3609893, 181008836, 348264837],
	[2334316, 394310877, 406552717],
	[24055024, 54741059, 361953510],
	[60789965, 125506774, 404042939],
	[78234562, 354781070, 394271822],
	[60070734, 345704827, 397211358],
	[1546752, 266865429, 370899700],
	[48033610, 130889600, 310773742],
	[71244460, 228782553, 279162734],
	[54553739, 374844920, 389371668],
	[9670583, 93820633, 326305883],
	[10329159, 232228231, 244458317],
	[8292248, 113093269, 187302276],
	[3961985, 5327495, 248925488],
	[40266862, 121903391, 208165020],
	[70827001, 256992584, 268380517],
	[25532534, 97217227, 196305133],
	[62727667, 319199050, 372779509],
	[4135439, 27698790, 380235558],
	[75354296, 366044545, 402273492],
	[57363986, 141909159, 301150861],
	[29240640, 383241003, 406840138],
	[15919742, 268940621, 279881587],
	[45639742, 102868835, 359999993],
	[68253755, 122531269, 132458447],
	[36866504, 250313630, 292909631],
	[67788401, 367518674, 390319754],
	[44791844, 282963215, 291002497],
	[21673028, 357072207, 368070584],
	[51451862, 209755307, 233261661],
	[63356416, 40311399, 245392086],
	[78136350, 14021211, 301440532],
	[74608006, 356175970, 359483446],
	[75503713, 245574356, 249727582],
	[44448303, 298264201, 345666038],
	[7061533, 136127522, 396882597],
	[37331509, 199472555, 365661946],
	[11813203, 258524145, 310802440],
	[76667168, 70791660, 229483550],
	[14652875, 260742987, 401160029],
	[54228906, 191231748, 324985429],
	[67757599, 301778909, 370456033],
	[20395380, 290522912, 351650291],
	[11312381, 44764214, 136201898],
	[33029272, 337906696, 371689181],
	[83388182, 280128188, 314315559],
	[81649996, 116637897, 300907659],
	[40621555, 319371155, 405607113],
	[43487924, 115516987, 310049564],
	[34958621, 30465153, 378544928],
	[21852071, 1254575, 156669296],
	[3415871, 202934350, 326480450],
	[3921198, 389716816, 392141811],
	[20517632, 118890842, 262969130],
	[83454023, 193473376, 264629604],
	[40627930, 207035058, 334354188],
	[16844666, 201753410, 332917430],
	[38437221, 120552523, 266056327],
	[17780528, 253775634, 333013581],
	[46128593, 2364721, 369213340],
	[658336, 21258738, 106794499],
	[71581392, 15771704, 378234566],
	[9279342, 122367063, 219393424],
	[39758680, 344707926, 372406579],
	[49138605, 93849261, 263225502],
	[34084590, 126052491, 138762092],
	[80037036, 119323672, 241121286],
	[70152466, 37406059, 148513856],
	[53005610, 351417090, 357766858],
	[45664047, 148272210, 384458549],
	[43586354, 246865939, 391279675],
	[2548481, 211976642, 343836083],
	[60323569, 19264459, 406911355],
	[38705990, 56474146, 389128919],
	[23599259, 70954552, 212178829],
	[33489780, 181173822, 346159409],
	[35306442, 378927163, 404405330],
	[57633566, 306674687, 333075774],
	[52218661, 289741869, 326651472],
	[25488710, 353815275, 392385650],
	[82039073, 352701977, 391921740],
	[134442, 370604355, 393768110],
	[180719, 21962480, 302139646],
	[22128292, 356305144, 359348675],
	[3483969, 259328172, 388413817],
	[58977625, 110249333, 145372235],
	[57148157, 164857546, 367063311],
	[39190418, 284612241, 329899974],
	[7927204, 51979842, 265411627],
	[35987342, 236044382, 365095787],
	[77337009, 30497559, 188333597],
	[6887412, 137903282, 239485354],
	[64411690, 404468113, 405504014],
	[57429954, 277496195, 365825445],
	[55529640, 155443450, 379802199],
	[50995074, 257136431, 258690470],
	[43134667, 273201173, 291840166],
	[78450752, 49708923, 268957509],
	[13256122, 375250691, 380717976],
	[62188812, 273966126, 290147202],
	[63649805, 387600743, 397900726],
	[5707483, 356060404, 383362461],
	[85148864, 61047428, 354541380],
	[1005591, 298449707, 344927228],
	[45740775, 126719018, 255239635],
	[41747125, 36246252, 261614855],
	[34305515, 18785789, 374149289],
	[10565903, 347043079, 380836752],
	[18558672, 147389258, 272643331],
	[62635526, 350779945, 387642725],
	[5788289, 363184310, 380162253],
	[59484681, 365863026, 383618217],
	[34694562, 289036964, 298296751],
	[23655063, 233016737, 287833672],
	[74023117, 338866547, 379108723],
	[38347145, 97186136, 360956708],
	[33005933, 353227719, 377699429],
	[73664045, 248793003, 394604793],
	[65227757, 185106746, 207457217],
	[27390451, 382102638, 396640571],
	[1057396, 159417344, 252909266],
	[51631879, 11776934, 314823753],
	[33756230, 295667703, 355097911],
	[32173848, 219765482, 252340896],
	[14227367, 184910942, 330881172],
	[12248744, 19232196, 366771982],
	[65447298, 148553236, 402666166],
	[13267992, 145929602, 152760683],
	[44430525, 277378605, 326693976],
	[54709494, 2882090, 149170465],
	[33146368, 30800023, 339928444],
	[35186855, 255975259, 303713436],
	[8698161, 290821099, 391888777],
	[52036042, 228099419, 293346007],
	[72303487, 93584140, 285278943],
	[84871644, 240384356, 318381240],
	[9041696, 295611534, 314527444],
	[12073408, 208559188, 255289813],
	[2365387, 217091322, 320934397],
	[82808465, 58320952, 195833890],
	[8529995, 16748662, 98299967],
	[2659083, 397558206, 401220602],
	[35575234, 68730187, 210261625],
	[2005930, 134521063, 351048580],
	[12632518, 196934133, 301699380],
	[24845938, 55855096, 378007413],
	[71767207, 49881306, 182451549],
	[82112803, 160976909, 240299072],
	[40716842, 381566473, 392853538],
	[51792399, 355068109, 383633890],
	[84526088, 37882346, 150490702],
	[52130367, 65104960, 204505961],
	[2657524, 165576101, 251573246],
	[66446485, 232532794, 260118123],
	[41049446, 237817273, 329258420],
	[46532089, 72300171, 344995452],
	[21209187, 358049933, 399446961],
	[37833625, 152980570, 234137532],
	[71022866, 111383492, 328897118],
	[16718061, 76094336, 96727209],
	[43589312, 147080287, 328915062],
	[23214101, 100947715, 397428504],
	[71355600, 239534116, 333134794],
	[29830871, 70970919, 278728366],
	[50077982, 59784528, 218713976],
	[12929698, 268965592, 382125085],
	[41996005, 89038538, 221779061],
	[67206646, 315498814, 397692795],
	[25811842, 267750820, 314397474],
	[48909143, 340385347, 382037166],
	[39637868, 86462891, 327912085],
	[33942075, 63558708, 77681824],
	[73234156, 204245468, 349637210],
	[46645457, 389528972, 393505304],
	[11370701, 254697789, 394200568],
	[51464066, 310158158, 344660483],
	[45817563, 196909829, 383734283],
	[3262592, 56114755, 323068460],
	[67904275, 235932209, 257376262],
	[4959919, 341110882, 386092794],
	[23688254, 200481374, 388835142],
	[2960200, 405462990, 406931408],
	[12781477, 198717660, 308862614],
	[84266175, 40231998, 228979190],
	[64821470, 370890839, 388645695],
	[50571654, 129900204, 237368849],
	[42212500, 122743102, 272335136],
	[17456731, 241682835, 372558768],
	[37900829, 166017884, 319059014],
	[43918228, 394593556, 400704890],
	[31118592, 247939455, 363381249],
	[74352511, 384164447, 406569997],
	[39168322, 175056085, 280868769],
	[71083335, 258607276, 375879486],
	[50801454, 246328807, 379570146],
	[82123825, 204648055, 245649553],
	[9385725, 25542843, 358973637],
	[272117, 188613410, 333330820],
	[72754071, 128176817, 383896366],
	[20648691, 26825334, 148606820],
	[75889046, 109971591, 247508427],
	[42452526, 398066133, 402623910],
	[50801454, 246328807, 349836281],
	[9670583, 326305883, 401377260],
	[9041696, 295611534, 297772139],
	[2005930, 134521063, 271056203],
	[84266175, 228979190, 352051844],
	[42452526, 351867388, 392179111],
	[48909143, 382037166, 399330213],
	[58977625, 145372235, 181459389],
	[59484681, 365863026, 378227393],
	[74023117, 338866547, 363321649],
	[37833625, 152980570, 368920038],
	[76667168, 70791660, 170563704],
	[84871644, 318381240, 337234801],
	[58977625, 145372235, 402385230],
	[84526088, 150490702, 152869920],
	[72754071, 383896366, 406937268],
	[60070734, 397211358, 403833055],
	[20648691, 148606820, 370997355],
	[27051387, 295206721, 328506212],
	[83619354, 191778891, 195014872],
	[9701748, 359321199, 394533703],
	[54228906, 191231748, 379790893],
	[59484681, 365863026, 396443033],
	[49585375, 349467808, 357758852],
	[73716848, 127341390, 343071274],
	[50571654, 237368849, 369468776],
	[37833625, 234137532, 351987947],
	[41049446, 237817273, 369434988],
	[73234156, 349637210, 398734573],
	[13267992, 152760683, 317473783],
	[23989634, 33104756, 67700605],
	[83454023, 193473376, 298190650],
	[52036042, 228099419, 241995308],
	[36866504, 250313630, 315142667],
	[14227367, 330881172, 362104548],
	[70578072, 339662846, 344163006],
	[78136350, 301440532, 338894851],
	[77337009, 188333597, 213424817],
	[59484681, 365863026, 399241331],
	[78450752, 268957509, 400257156],
	[13267992, 145929602, 165341908],
	[73716848, 127341390, 400820630],
	[19514576, 362974416, 386113069],
	[48909143, 340385347, 360488859],
	[32173848, 219765482, 234770941],
	[44036709, 193438556, 300946798],
	[71355600, 239534116, 376030847],
	[25532534, 97217227, 330825942],
	[38705990, 389128919, 390027748],
	[77927460, 375477518, 377779804],
	[33146368, 30800023, 188102528],
	[27390451, 396640571, 399696626],
	[71244460, 279162734, 309407675],
	[67206646, 397692795, 400305143],
	[83454023, 264629604, 379660674],
	[21673028, 357072207, 403479231],
	[9533924, 167400381, 269747607],
	[29240640, 406840138, 406964406],
	[70578072, 279889240, 321732074],
	[62188812, 273966126, 337912415],
	[71355600, 333134794, 349872503],
	[77337009, 188333597, 333113789],
	[9670583, 326305883, 405639692],
	[75576127, 143970762, 305969707],
	[54553739, 374844920, 386399805],
	[17780528, 333013581, 380985214],
	[35575234, 68730187, 112725212],
	[24055024, 361953510, 402129948],
	[8698161, 391888777, 399496978],
	[25811842, 314397474, 356352744],
	[70152466, 148513856, 305780736],
	[37833625, 152980570, 320694710],
	[64411690, 404468113, 404648285],
	[34694562, 289036964, 370476371],
	[58977625, 110249333, 184469951],
	[43586354, 246865939, 364804524],
	[40266862, 121903391, 357420727],
	[63356416, 245392086, 378198836],
	[44791844, 291002497, 355136918],
	[55529640, 155443450, 286861844],
	[2850944, 327772704, 339136547],
	[23688254, 388835142, 402945677],
	[8698161, 391888777, 395993334],
	[83454023, 264629604, 335739291],
	[32599052, 246412350, 293371885],
	[73234156, 204245468, 231616345],
	[71022866, 111383492, 304521327],
	[52036042, 228099419, 237822515],
	[45639742, 102868835, 332540748],
	[40627930, 207035058, 271988625],
	[23989634, 33104756, 33157349],
	[60789965, 125506774, 271858969],
	[40716842, 381566473, 382757167],
	[35186855, 255975259, 298337374],
	[5707483, 383362461, 400138377],
	[51464066, 344660483, 348620040],
	[62188812, 273966126, 386620231],
	[43586354, 391279675, 391339771],
	[54228906, 191231748, 247026506],
	[42212500, 122743102, 334887016],
	[58083211, 45674282, 169162459],
	[64821470, 370890839, 374568355],
	[71022866, 328897118, 357027897],
	[80599770, 404580289, 405228714],
	[55529640, 379802199, 402709920],
	[25811842, 267750820, 312611455],
	[43134667, 291840166, 383419602],
	[67904275, 235932209, 389154676],
	[17456731, 241682835, 316212100],
	[658336, 21258738, 376547469],
	[34958621, 30465153, 177789579],
	[50571654, 129900204, 405945887],
	[51631879, 314823753, 323160613],
	[30956220, 91330068, 318308937],
	[9701748, 354754944, 380619763],
	[55529640, 379802199, 390339787],
	[84266175, 228979190, 342207391],
	[71355600, 333134794, 385256228],
	[51631879, 314823753, 315231146],
	[67727112, 285025033, 305512406],
	[75354296, 366044545, 395491751],
	[39637868, 327912085, 380914002],
	[2334316, 406552717, 406962873],
	[68253755, 132458447, 350367275],
	[80599770, 404580289, 406860321],
	[51631879, 314823753, 380419154],
	[17456731, 241682835, 292887815],
	[15919742, 279881587, 293594887],
	[60323569, 406911355, 406962897],
	[59484681, 383618217, 398736248],
	[75889046, 247508427, 255468325],
	[23989634, 284119010, 329601508],
	[52218661, 326651472, 404187772],
	[21852071, 156669296, 283093211],
	[25811842, 267750820, 329702736],
	[38705990, 56474146, 220291216],
	[44036709, 92569375, 161580487],
	[59484681, 383618217, 392271688],
	[24845938, 55855096, 188216416],
	[83619354, 191778891, 203613790],
	[41996005, 221779061, 365112881],
	[24055024, 54741059, 203813801],
	[6887412, 239485354, 380734782],
	[17780528, 253775634, 384211950],
	[8698161, 391888777, 395094789],
	[40621555, 405607113, 406507978],
	[48909143, 340385347, 372079642],
	[84871644, 240384356, 391594132],
	[38347145, 97186136, 168462992],
	[52130367, 65104960, 307703753],
	[8529995, 98299967, 299090390],
	[75576127, 285016123, 321253556],
	[20517632, 118890842, 160797728],
	[64821470, 370890839, 394409926],
	[35073248, 379347902, 399814043],
	[9041696, 314527444, 343997207],
	[50801454, 379570146, 397323575],
	[36087924, 385017425, 393720370],
	[32173848, 219765482, 359001856],
	[2548481, 211976642, 250868600],
	[13256122, 375250691, 403572500],
	[58083211, 172611655, 241190257],
	[9701748, 354754944, 374018709],
	[27390451, 396640571, 397241783],
	[37833625, 234137532, 254093419],
	[82112803, 240299072, 328923471],
	[35987342, 365095787, 376363451],
	[19514576, 359506427, 399377096],
	[14227367, 330881172, 332008093],
	[25532534, 97217227, 222463112],
	[4959919, 341110882, 363401467],
	[23214101, 397428504, 397613384],
	[33146368, 30800023, 79359857],
	[37900829, 319059014, 356071134],
	[42452526, 398066133, 402467042],
	[9041696, 314527444, 352275514],
	[11813203, 310802440, 362628802],
	[67904275, 235932209, 338175052],
	[15919742, 268940621, 270315539],
	[52036042, 293346007, 347218264],
	[33942075, 63558708, 78468264],
	[22128292, 359348675, 378325156],
	[33756230, 295667703, 381828028],
	[75503713, 245574356, 320722884],
	[24845938, 378007413, 385763097],
	[24845938, 378007413, 384386175],
	[3483969, 259328172, 278806332],
	[82123825, 204648055, 379950123],
	[35073248, 379347902, 395290693],
	[84874187, 202365070, 218768611],
	[12632518, 301699380, 342778629],
	[66446485, 260118123, 314580330],
	[2850944, 327772704, 342227590],
	[29240640, 406840138, 406899865],
	[84874187, 202365070, 273682866],
	[21673028, 368070584, 381416363],
	[24845938, 378007413, 399454000],
	[22128292, 356305144, 367720726],
	[67757599, 370456033, 394018148],
	[40621555, 405607113, 406389155],
	[83619354, 80492819, 268180416],
	[63356416, 40311399, 299183659],
	[74023117, 379108723, 394402767],
	[50801454, 379570146, 403777658],
	[29830871, 278728366, 366655469],
	[70578072, 339662846, 376951564],
	[45817563, 196909829, 375100101],
	[40716842, 381566473, 396971086],
	[82112803, 160976909, 234533087],
	[53005610, 357766858, 367990603],
	[83454023, 193473376, 226185519],
	[63356416, 245392086, 393974037],
	[49585375, 151343887, 341969416],
	[8292248, 187302276, 399197526],
	[62727667, 319199050, 373180686],
	[33489780, 181173822, 288186521],
	[82808465, 58320952, 79694316],
	[60323569, 406911355, 406955633],
	[16429145, 321618464, 371629815],
	[31118592, 363381249, 406778338],
	[17456731, 241682835, 282770000],
	[40716842, 392853538, 400351891],
	[72754071, 383896366, 398927766],
	[35987342, 365095787, 392237924],
	[74352511, 406569997, 406798611],
	[72476485, 109081379, 347429979],
	[81649996, 116637897, 179522725],
	[10329159, 244458317, 364325436],
	[78234562, 394271822, 402146791],
	[77210403, 111792354, 386693304],
	[18558672, 272643331, 390019860],
	[82112803, 240299072, 294440921],
	[13256122, 375250691, 384039063],
	[77927460, 396659675, 406794696],
	[41049446, 329258420, 370432723],
	[34694562, 289036964, 397177196],
	[3415871, 326480450, 339760896],
	[51631879, 11776934, 287865555],
	[57363986, 141909159, 359304347],
	[67757599, 301778909, 403504698],
	[23688254, 388835142, 394974399],
	[44791844, 291002497, 375158454],
	[2548481, 343836083, 377868204],
	[11370701, 254697789, 263997762],
	[54709494, 149170465, 334390859],
	[55933152, 187048169, 343045125],
	[77927460, 396659675, 406267669],
	[73716848, 361864789, 384348375],
	[5788289, 380162253, 386343004],
	[80037036, 119323672, 132995113],
	[19994202, 392072124, 398270629],
	[31118592, 363381249, 376613109],
	[57148157, 164857546, 357142803],
	[25532534, 97217227, 214260956],
	[25488710, 353815275, 404768146],
	[33756230, 355097911, 405501458],
	[72476485, 303625646, 368669111],
	[68253755, 122531269, 388435640],
	[66446485, 260118123, 372802417],
	[45664047, 148272210, 295068726],
	[77337009, 30497559, 100899075],
	[9279342, 219393424, 308923569],
	[9701748, 359321199, 386087170],
	[11068021, 163380791, 381656480],
	[34084590, 138762092, 267969036],
	[71244460, 228782553, 389427693],
	[36087924, 60976505, 302335404],
	[71355600, 333134794, 343279733],
	[9385725, 25542843, 335226724],
	[58977625, 145372235, 374558379],
	[3921198, 392141811, 395737948],
	[73664045, 394604793, 406494883],
	[29238427, 393548264, 396199641],
	[34694562, 289036964, 402546961],
	[52218661, 326651472, 359607166],
	[33146368, 339928444, 403884534],
	[9385725, 25542843, 229569298],
	[50995074, 258690470, 292301270],
	[57363986, 141909159, 265111229],
	[39758680, 372406579, 404251247],
	[5707483, 383362461, 387541048],
	[72279795, 375175107, 381982058],
	[18558672, 272643331, 274448542],
	[9385725, 25542843, 31083370],
	[60789965, 125506774, 362987433],
	[84526088, 37882346, 323740768],
	[67904275, 257376262, 311836609],
	[17456731, 241682835, 361651777],
	[74352511, 384164447, 393193151],
	[3483969, 259328172, 400454398],
	[82123825, 204648055, 402431846],
	[2659083, 401220602, 403482044],
	[74265449, 163901081, 379716089],
	[38705990, 56474146, 333173492],
	[8698161, 290821099, 327805531],
	[62727667, 319199050, 339961622],
	[23655063, 233016737, 315021021],
	[27390451, 396640571, 404726999],
	[74265449, 302009094, 405106324],
	[55529640, 379802199, 400558826],
	[24845938, 55855096, 361945599],
	[52218661, 326651472, 375522066],
	[78873467, 252088356, 384979071],
	[78873467, 232269151, 372646731],
	[33029272, 337906696, 364021866],
	[12781477, 308862614, 363997039],
	[8292248, 187302276, 369217452],
	[59484681, 383618217, 384699157],
	[10329159, 232228231, 376839651],
	[7061533, 136127522, 187062432],
	[29830871, 278728366, 345714708],
	[72303487, 285278943, 384465131],
	[14356531, 367536353, 377630364],
	[71581392, 378234566, 385320035],
	[42452526, 351867388, 374333101],
	[23599259, 70954552, 391159680],
	[65227757, 207457217, 207547776],
	[30956220, 113963029, 390492380],
	[44791844, 282963215, 302392513],
	[83454023, 193473376, 406092805],
	[2960200, 405462990, 406909053],
	[20648691, 26825334, 219972039],
	[9701748, 359321199, 383789162],
	[35575234, 210261625, 308749180],
	[40621555, 405607113, 406477952],
	[3921198, 392141811, 393490069],
	[2659083, 397558206, 397866102],
	[2960200, 405462990, 405550377],
	[43918228, 394593556, 400109552],
	[78450752, 268957509, 307133941],
	[33029272, 337906696, 380997656],
	[51792399, 355068109, 368214971],
	[3415871, 202934350, 318300040],
	[78450752, 49708923, 178049154],
	[17780528, 253775634, 354497382],
	[29830871, 278728366, 310016410],
	[3262592, 56114755, 124688541],
	[33942075, 63558708, 392209277],
	[50801454, 379570146, 382372988],
	[26977617, 221942224, 316423643],
	[23214101, 397428504, 399541099],
	[8529995, 16748662, 31948927],
	[8292248, 187302276, 195444362],
	[31118592, 247939455, 275812484],
	[16184, 240707420, 389617432],
	[33756230, 355097911, 369893483],
	[10329159, 244458317, 401465665],
	[9279342, 122367063, 288903643],
	[8698161, 290821099, 342911200],
	[55529640, 155443450, 302000072],
	[71581392, 15771704, 237691969],
	[37331509, 365661946, 397301938],
	[23214101, 397428504, 400130756],
	[77927460, 375477518, 386627076],
	[71581392, 378234566, 404007087],
	[3262592, 323068460, 402774337],
	[29830871, 70970919, 390429951],
	[83454023, 264629604, 324680117],
	[2005930, 134521063, 357964015],
	[37833625, 234137532, 319381131],
	[46645457, 393505304, 400225170],
	[35987342, 365095787, 373714359],
	[1546752, 370899700, 392234870],
	[75354296, 366044545, 373731541],
	[51451862, 209755307, 277567665],
	[5707483, 383362461, 403651559],
	[75576127, 143970762, 199557251],
	[34694562, 289036964, 297526478],
	[83388182, 314315559, 320758718],
	[51451862, 209755307, 402166675],
	[33942075, 77681824, 245159261],
	[45664047, 148272210, 258172926],
	[14356531, 367536353, 399783547],
	[71022866, 328897118, 394167027],
	[8644694, 332800748, 357831443],
	[72303487, 93584140, 322743128],
	[24845938, 378007413, 400385435],
	[11312381, 44764214, 300373602],
	[71022866, 111383492, 157890340],
	[180719, 302139646, 396186876],
	[43586354, 246865939, 335919534],
	[8644694, 308841412, 337055594],
	[44791844, 291002497, 340363068],
	[64821470, 370890839, 372246860],
	[3921198, 392141811, 394042100],
	[77337009, 30497559, 329406492],
	[57148157, 367063311, 367063778],
	[5707483, 356060404, 377359649],
	[16429145, 374341542, 391472566],
	[83388182, 280128188, 287238885],
	[52036042, 228099419, 402238539],
	[60070734, 397211358, 399423660],
	[1546752, 370899700, 381878889],
	[78873467, 232269151, 286661782],
	[39758680, 372406579, 380387482],
	[73234156, 204245468, 204546898],
	[36087924, 385017425, 401081589],
	[60789965, 404042939, 406881332],
	[74608006, 359483446, 370187147],
	[84871644, 318381240, 377709698],
	[23655063, 233016737, 365784256],
	[17780528, 253775634, 383917035],
	[35575234, 68730187, 219995068],
	[41747125, 261614855, 306479624],
	[51464066, 344660483, 365206541],
	[21209187, 399446961, 404816584],
	[4135439, 380235558, 402160814],
	[45639742, 102868835, 158584982],
	[35073248, 379347902, 389626479],
	[14652875, 260742987, 394322422],
	[75889046, 247508427, 380766976],
	[16844666, 201753410, 249102940],
	[2659083, 397558206, 404755654],
	[3921198, 392141811, 400203732],
	[5707483, 356060404, 363709610],
	[65227757, 185106746, 271161995],
	[2672810, 54230294, 202574783],
	[35987342, 365095787, 396837687],
	[33146368, 30800023, 38871193],
	[11068021, 267662881, 306177233],
	[82112803, 160976909, 291745097],
	[62188812, 273966126, 310050124],
	[43918228, 394593556, 402394433],
	[9701748, 354754944, 379994030],
	[29240640, 406840138, 406889744],
	[1005591, 344927228, 404011576],
	[51451862, 209755307, 339045991],
	[35186855, 255975259, 275907185],
	[35575234, 68730187, 269194814],
	[23989634, 33104756, 337942735],
	[180719, 21962480, 298593397],
	[134442, 370604355, 376868063],
	[40621555, 319371155, 404606095],
	[64821470, 388645695, 396883472],
	[71022866, 328897118, 341315430],
	[13267992, 145929602, 194300530],
	[35186855, 255975259, 271043690],
	[45664047, 384458549, 402622148],
	[2960200, 406931408, 406937005],
	[65447298, 148553236, 182141291],
	[72303487, 285278943, 389643165],
	[67206646, 315498814, 347674102],
	[45639742, 359999993, 361456406],
	[66446485, 260118123, 267803937],
	[78234562, 394271822, 396078382],
	[67757599, 301778909, 324691845],
	[76667168, 229483550, 348516097],
	[82123825, 245649553, 271638446],
	[12929698, 382125085, 385093466],
	[44430525, 277378605, 376907201],
	[72303487, 93584140, 315288793],
	[55529640, 155443450, 265425995],
	[37900829, 166017884, 304798326],
	[52218661, 289741869, 326963012],
	[34958621, 378544928, 392268924],
	[74265449, 302009094, 356412654],
	[40716842, 392853538, 398324496],
	[9041696, 295611534, 398077270],
	[21852071, 156669296, 160727248],
	[26977617, 153673187, 363635685],
	[23214101, 397428504, 398618303],
	[78873467, 252088356, 378956497],
	[44430525, 326693976, 376605702],
	[71083335, 375879486, 402124788],
	[39758680, 372406579, 375784166],
	[40266862, 121903391, 281956960],
	[44430525, 326693976, 367300694],
	[21209187, 358049933, 392912882],
	[77337009, 30497559, 239112142],
	[39168322, 280868769, 349175748],
	[36087924, 385017425, 394479479],
	[82039073, 352701977, 369492277],
	[8698161, 290821099, 348357478],
	[67206646, 315498814, 326562309],
	[3609893, 348264837, 404835636],
	[2657524, 165576101, 346068505],
	[6887412, 239485354, 403117958],
	[20517632, 262969130, 296547981],
	[19994202, 329022315, 397690331],
	[25811842, 267750820, 383541705],
	[32599052, 197722372, 343139746],
	[74608006, 359483446, 389311000],
	[44791844, 291002497, 327747643],
	[48909143, 382037166, 402423547],
	[51631879, 11776934, 227176184],
	[52130367, 65104960, 90478043],
	[4135439, 27698790, 149856702]
];

console.log(gridlandMetro(n, m, k, tracks));
console.log('34699729330557983');