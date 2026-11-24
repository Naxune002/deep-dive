// ===== DEEP DIVE — a Krillion-style rare-answer trivia game =====
// Paste this whole thing into Safari's JavaScript console and press Return.
(() => {
  // ---------- PROMPT BANK ----------
  // Each prompt has 5 tiers: [1] most common ... [5] rarest.
  // Aliases are separated by "/". Add your own prompts in the same format!
  const PROMPTS = [
    { q: 'Name a fruit', t: [
      ['apple','banana','orange','strawberry','grape'],
      ['mango','pineapple','watermelon','peach','pear','cherry','kiwi/kiwifruit','lemon','blueberry'],
      ['plum','apricot','raspberry','lime','papaya','coconut','pomegranate','cantaloupe','nectarine','grapefruit','fig','blackberry','honeydew'],
      ['guava','lychee/litchi','passion fruit/passionfruit','persimmon','dragon fruit/dragonfruit/pitaya','cranberry','date','tangerine','clementine','quince','gooseberry','kumquat','starfruit/carambola','mulberry','elderberry'],
      ['durian','rambutan','mangosteen','jackfruit','salak/snake fruit','feijoa','loquat','cherimoya','soursop','longan','ackee','jabuticaba','tamarillo','pawpaw','medlar','cloudberry','lingonberry','huckleberry','yuzu','bilberry','sapodilla','physalis'] ] },
    { q: 'Name a country in Europe', t: [
      ['france','germany','italy','spain','united kingdom/uk/england/britain/great britain'],
      ['portugal','greece','ireland','netherlands/holland','sweden','norway','poland','switzerland','belgium','austria'],
      ['denmark','finland','russia','ukraine','czechia/czech republic','hungary','romania','croatia','iceland','scotland','wales','turkey'],
      ['bulgaria','serbia','slovakia','slovenia','estonia','latvia','lithuania','belarus','luxembourg','albania','bosnia/bosnia and herzegovina','monaco','malta','cyprus','northern ireland'],
      ['moldova','montenegro','north macedonia/macedonia','andorra','liechtenstein','san marino','vatican city/vatican/holy see','kosovo'] ] },
    { q: 'Name an animal that lives in the ocean', t: [
      ['shark','whale','dolphin','fish','octopus'],
      ['jellyfish','crab','seal','turtle/sea turtle','starfish/sea star','squid','lobster','shrimp/prawn'],
      ['stingray/ray','orca/killer whale','clownfish','seahorse','eel','walrus','sea lion','manta ray/manta','sea urchin/urchin','clam','oyster','blue whale','hammerhead'],
      ['narwhal','manatee','dugong','barracuda','swordfish','tuna','pufferfish/blowfish','anglerfish','krill','sea otter','coral','sea cucumber','cuttlefish','marlin','beluga','mussel','scallop','anemone/sea anemone','plankton','humpback'],
      ['nudibranch','vampire squid','gulper eel','blobfish','oarfish','sunfish/mola','hagfish','siphonophore','sea pen','isopod/giant isopod','dumbo octopus','frilled shark','lamprey','chimaera','wobbegong','sea butterfly','pyrosome','sea spider','copepod','sea slug','goblin shark','barreleye','lanternfish','nautilus','sea angel','remora'] ] },
    { q: 'Name a color', t: [
      ['red','blue','green','yellow','purple','orange','pink','black','white'],
      ['brown','gray/grey'],
      ['teal','turquoise','maroon','navy/navy blue','magenta','cyan','beige','violet','indigo','gold','silver','lavender'],
      ['crimson','scarlet','burgundy','chartreuse','mauve','ochre/ocher','olive','coral','salmon','periwinkle','aquamarine','fuchsia','khaki','tan','ivory','lilac','amber','emerald','cream','peach','mint','rose','plum','ruby','sapphire'],
      ['vermilion/vermillion','cerulean','puce','viridian','taupe','sienna','umber','gamboge','smaragdine','celadon','cochineal','wenge','heliotrope','zaffre','falu red','coquelicot','glaucous','eau de nil','sarcoline','xanadu','cinnabar','carmine','chartreuse','sepia','mikado','razzmatazz','gunmetal','ecru','wisteria'] ] },
    { q: 'Name a musical instrument', t: [
      ['guitar','piano','drums/drum','violin'],
      ['flute','trumpet','saxophone/sax','bass/bass guitar','ukulele','harp','cello','clarinet'],
      ['trombone','tuba','harmonica','banjo','accordion','keyboard','xylophone','oboe','tambourine','viola','organ'],
      ['bassoon','french horn/horn','mandolin','bagpipes/bagpipe','sitar','triangle','cymbal/cymbals','piccolo','double bass/upright bass/contrabass','harpsichord','glockenspiel','recorder','marimba','bongos/bongo','synthesizer/synth','cowbell','castanets','timpani','vibraphone'],
      ['theremin','didgeridoo','hurdy gurdy/hurdy-gurdy','oud','erhu','kalimba/thumb piano','hang drum/handpan/hang','shamisen','koto','balalaika','tabla','celesta','ocarina','lute','zither','sackbut','bouzouki','kora','duduk','mbira','cajun/cajon','guzheng','pipa','sarangi','crwth','ondes martenot','euphonium','sousaphone','cimbalom','steelpan/steel drum'] ] },
    { q: 'Name a planet, moon or dwarf planet in our solar system', t: [
      ['earth','mars','jupiter','saturn','moon/the moon/luna'],
      ['venus','mercury','neptune','uranus','pluto'],
      ['titan','europa','io','ganymede','callisto'],
      ['phobos','deimos','enceladus','triton','charon','ceres','eris'],
      ['miranda','oberon','titania','umbriel','ariel','rhea','iapetus','dione','tethys','mimas','makemake','haumea','nereid','hyperion','phoebe','amalthea','proteus','nix','hydra','kerberos','styx','quaoar','gonggong','orcus','pandora','janus','epimetheus','thebe','metis','himalia','larissa','puck','sycorax'] ] },
    { q: 'Name a dog breed', t: [
      ['labrador/lab/labrador retriever','golden retriever','german shepherd','poodle','bulldog','chihuahua'],
      ['beagle','husky/siberian husky','pug','dachshund/wiener dog','rottweiler','pitbull/pit bull','boxer'],
      ['corgi','shih tzu','great dane','border collie','yorkshire terrier/yorkie','dalmatian','doberman/doberman pinscher','french bulldog/frenchie','labradoodle','maltese','pomeranian','goldendoodle'],
      ['australian shepherd/aussie','cocker spaniel','saint bernard/st bernard','bernese mountain dog/bernese','greyhound','shiba inu/shiba','akita','bloodhound','mastiff','samoyed','whippet','schnauzer','basset hound','newfoundland','jack russell/jack russell terrier','cavalier king charles spaniel/cavalier','collie','malamute/alaskan malamute','chow chow','sheltie/shetland sheepdog'],
      ['xoloitzcuintli/xolo','basenji','komondor','puli','borzoi','saluki','otterhound','lagotto romagnolo','vizsla','weimaraner','keeshond','papillon','bichon frise/bichon','affenpinscher','leonberger','briard','kuvasz','catahoula','chinook','norwegian lundehund','azawakh','sloughi','mudi','bergamasco','pharaoh hound','dandie dinmont','tibetan mastiff','sharpei/shar pei','bedlington terrier','skye terrier','cane corso','ibizan hound'] ] },
    { q: 'Name a vegetable', t: [
      ['carrot','broccoli','potato','lettuce','tomato','corn'],
      ['onion','cucumber','spinach','pepper/bell pepper','celery','peas/pea','cauliflower','cabbage'],
      ['zucchini/courgette','eggplant/aubergine','asparagus','kale','green beans/green bean','garlic','mushroom','pumpkin','sweet potato','radish','beet/beetroot'],
      ['brussels sprouts/brussel sprouts/brussels sprout','artichoke','leek','turnip','parsnip','okra','bok choy/pak choi','squash','arugula/rocket','shallot','chard/swiss chard','yam','collard greens/collards','butternut squash','edamame'],
      ['kohlrabi','rutabaga/swede','jicama','salsify','celeriac','fennel','romanesco','daikon','taro','cassava/yuca','chayote','sunchoke/jerusalem artichoke','burdock','fiddlehead/fiddleheads','samphire','kai lan/gai lan','watercress','endive','radicchio','mizuna','lotus root','tomatillo','ramps','napa cabbage','bitter melon','mustard greens'] ] },
    { q: 'Name a sport', t: [
      ['soccer/football','basketball','baseball','tennis'],
      ['golf','hockey/ice hockey','volleyball','swimming','american football','boxing','rugby','cricket'],
      ['badminton','wrestling','lacrosse','softball','skiing','cycling','table tennis/ping pong','track/track and field/athletics','gymnastics','surfing','skateboarding','bowling'],
      ['fencing','water polo','archery','rowing','curling','handball','snowboarding','karate','judo','polo','squash','triathlon','dodgeball','darts','field hockey','mma','taekwondo','diving','sailing'],
      ['sepak takraw','hurling','kabaddi','korfball','bandy','jai alai','pickleball','underwater hockey','bossaball','shinty','buzkashi','pesapallo','roller derby','sumo','chess boxing','biathlon','luge','skeleton','bobsled/bobsleigh','pentathlon/modern pentathlon','canoe polo','racquetball','teqball','gaelic football','netball','footvolley','padel','camogie','floorball','kendo'] ] },
    { q: 'Name a part of the human body', t: [
      ['arm','leg','head','hand','foot','eye','nose'],
      ['heart','finger','mouth','ear','knee','toe','brain','hair'],
      ['elbow','shoulder','neck','chin','stomach','liver','lung','kidney','ankle','wrist','back','skin'],
      ['spleen','pancreas','femur','gallbladder','eyebrow','eyelash','tongue','skull','rib','hip','thigh','calf','appendix','intestine','bladder','thumb','forehead','cheek'],
      ['philtrum','uvula','hyoid','coccyx/tailbone','patella/kneecap','tibia','fibula','clavicle/collarbone','scapula/shoulder blade','sternum','thymus','cornea','cochlea','epiglottis','duodenum','larynx','pinna','lunula','glabella','popliteal fossa','medulla','hypothalamus','stapes','incus','malleus','achilles tendon','tragus','septum','iris','retina','diaphragm','esophagus'] ] },
    { q: 'Name a US state', t: [
      ['california','texas','florida','new york'],
      ['washington','ohio','georgia','michigan','illinois','arizona','colorado','nevada','hawaii','alaska'],
      ['oregon','pennsylvania','virginia','massachusetts','new jersey','north carolina','tennessee','louisiana','utah'],
      ['minnesota','wisconsin','missouri','kentucky','alabama','south carolina','maryland','oklahoma','kansas','iowa','indiana','connecticut','maine','new mexico','idaho','montana','mississippi','arkansas'],
      ['north dakota','south dakota','wyoming','nebraska','vermont','new hampshire','rhode island','delaware','west virginia'] ] },
    { q: 'Name a bird', t: [
      ['eagle','robin','parrot','pigeon','chicken','owl'],
      ['crow','penguin','duck','sparrow','hawk','flamingo','blue jay','cardinal','seagull/gull'],
      ['hummingbird','swan','ostrich','goose','turkey','peacock/peafowl','falcon','woodpecker','toucan','raven','dove'],
      ['pelican','heron','emu','vulture','kingfisher','stork','crane','magpie','starling','finch','canary','puffin','albatross','cockatoo','condor','parakeet/budgie','macaw','swallow','wren'],
      ['cassowary','shoebill','kakapo','hoatzin','lyrebird','tui','oystercatcher','bittern','nightjar','wryneck','frigatebird','booby','kiwi','quetzal','hoopoe','roadrunner','kea','secretary bird','potoo','dodo','murrelet','grebe','merganser','bowerbird','cormorant','ibis','spoonbill','kookaburra','avocet','godwit','nuthatch','tanager','waxwing','shrike'] ] },
    { q: 'Name a programming language', t: [
      ['python','javascript/js','java','c++/cpp'],
      ['c','c#/c sharp/csharp','html','css','sql','typescript/ts'],
      ['ruby','php','swift','go/golang','rust','kotlin'],
      ['lua','perl','r','scala','dart','haskell','matlab','assembly/asm','bash/shell','visual basic/vb/vba','objective c/objective-c/objc','powershell','groovy'],
      ['cobol','fortran','lisp/common lisp','prolog','erlang','elixir','ocaml','f#/f sharp','clojure','zig','nim','julia','brainfuck','smalltalk','ada','pascal','crystal','racket','scheme','apl','forth','elm','scratch','haxe','v','odin','gleam','solidity','coffeescript','delphi','raku','vhdl','verilog'] ] },
    { q: 'Name something you find in a kitchen', t: [
      ['fridge/refrigerator','stove','oven','sink','microwave'],
      ['knife','spoon','fork','plate','pan/frying pan','pot','toaster','dishwasher','cup','bowl'],
      ['kettle','blender','spatula','cutting board/chopping board','whisk','ladle','mug','table/kitchen table','cabinet/cupboard','freezer','sponge','dish soap','napkin','paper towel'],
      ['colander','grater','peeler','rolling pin','tongs','oven mitt','measuring cup','can opener','timer','apron','coffee maker/coffee machine','food processor','mixer','air fryer','toaster oven','slow cooker/crockpot','pressure cooker/instant pot'],
      ['mandoline','mortar and pestle/mortar/pestle','zester','salad spinner','ramekin','trivet','baster','sieve','chinois','dutch oven','wok','tagine','potato masher','garlic press','bain marie','cheesecloth','larder','pastry brush','muffin tin','spurtle','mezzaluna','skimmer','spider','bundt pan','tamis','dough scraper/bench scraper','pastry blender','lemon squeezer','nutcracker'] ] },
  ];

  const TIERS = [
    { name: 'Not quite',            pts: 0,   emoji: '❌', color: '#64748b' },
    { name: 'Surface splash',       pts: 15,  emoji: '🐚', color: '#7dd3fc' },
    { name: 'Shallow reef',         pts: 35,  emoji: '🐠', color: '#34d399' },
    { name: 'Twilight find',        pts: 60,  emoji: '🦑', color: '#a78bfa' },
    { name: 'Deep cut',             pts: 80,  emoji: '🐙', color: '#f472b6' },
    { name: 'One in a billion!',    pts: 100, emoji: '🦐', color: '#fbbf24' },
  ];
  const ROUND = 7, SECONDS = 25, MAX_DEPTH = 10935;
  const ZONES = [
    [200, 'Sunlight Zone'], [1000, 'Twilight Zone'], [4000, 'Midnight Zone'],
    [6000, 'Abyssal Zone'], [10934, 'Hadal Zone'], [Infinity, 'Challenger Deep'],
  ];

  // ---------- ANSWER MATCHING ----------
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ').replace(/[^a-z0-9#+ ]/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/^(the|a|an) /, '');
  const variants = (s) => {
    const v = new Set([s, s.replace(/ /g, '')]);
    if (s.endsWith('ies')) v.add(s.slice(0, -3) + 'y');
    if (s.endsWith('es')) v.add(s.slice(0, -2));
    if (s.endsWith('s') && !s.endsWith('ss')) v.add(s.slice(0, -1));
    return [...v];
  };
  const lev = (a, b) => {
    if (Math.abs(a.length - b.length) > 2) return 9;
    // Damerau distance (swapped letters count as one typo)
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 0; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    return d[a.length][b.length];
  };
  // Returns { tier, answer } or null
  const check = (input, prompt) => {
    const iv = variants(norm(input)).filter(Boolean);
    if (!iv.length) return null;
    let best = null;
    prompt.t.forEach((list, ti) => list.forEach((entry) => {
      const display = entry.split('/')[0];
      entry.split('/').forEach((alias) => {
        const a = norm(alias), av = variants(a);
        let d = 9;
        for (const x of iv) for (const y of av) {
          if (x === y) d = 0;
          else if (y.length >= 5) d = Math.min(d, lev(x, y) <= (y.length >= 9 ? 2 : 1) ? lev(x, y) : 9);
        }
        if (d < 9 && (!best || d < best.d || (d === best.d && ti + 1 > best.tier)))
          best = { d, tier: ti + 1, answer: display };
      });
    }));
    return best;
  };


  // ---------- EXTRA PROMPTS ----------
  PROMPTS.push(
    { q: 'Name a capital city', t: [
      ['london','paris','tokyo','washington dc/washington/washington d c','rome'],
      ['berlin','madrid','beijing','moscow','ottawa','canberra','mexico city','cairo'],
      ['dublin','athens','lisbon','amsterdam','vienna','seoul','bangkok','new delhi/delhi','buenos aires','stockholm','oslo','brussels'],
      ['copenhagen','helsinki','warsaw','prague','budapest','nairobi','lima','bogota','santiago','havana','jakarta','manila','hanoi','tehran','baghdad','ankara','wellington','brasilia','kyiv/kiev','reykjavik','bern','addis ababa','accra','rabat','riyadh','islamabad','kabul','damascus','beirut','amman','doha','abu dhabi','kuala lumpur','singapore','taipei','caracas','quito','montevideo','edinburgh','cardiff','belfast'],
      ['ulaanbaatar/ulan bator','thimphu','ouagadougou','tegucigalpa','bishkek','ashgabat','dushanbe','nukualofa/nuku alofa','funafuti','ngerulmud','antananarivo','vientiane','paramaribo','asmara','windhoek','lilongwe','valletta','vaduz','podgorica','chisinau','tbilisi','yerevan','baku','tashkent','astana/nur sultan','kathmandu','sri jayawardenepura kotte/colombo','port moresby','honiara','suva','apia','majuro','tarawa','palikir','asuncion','la paz','sucre','managua','belmopan','kingston','nassau','bridgetown','castries','roseau','basseterre','dakar','bamako','niamey','ndjamena','bangui','libreville','malabo','kigali','gitega','dodoma','lusaka','harare','gaborone','maseru','mbabane','maputo','moroni','port louis','male','juba','khartoum','djibouti','mogadishu','lome','porto novo','abuja','freetown','monrovia','conakry','bissau','banjul','nouakchott','algiers','tunis','tripoli','yaounde','brazzaville','kinshasa','luanda','muscat','manama','sanaa','naypyidaw','phnom penh','dili','bandar seri begawan','port vila','san marino','andorra la vella','monaco','luxembourg','tirana','skopje','sarajevo','ljubljana','zagreb','bratislava','vilnius','riga','tallinn','minsk','bucharest','sofia','nicosia','belgrade','pristina'] ] },
    { q: 'Name an element on the periodic table', t: [
      ['oxygen','hydrogen','carbon','gold','iron'],
      ['helium','nitrogen','silver','copper','sodium','calcium'],
      ['aluminum/aluminium','zinc','lead','uranium','chlorine','potassium','neon','platinum','mercury','lithium','sulfur/sulphur'],
      ['magnesium','titanium','tin','nickel','plutonium','phosphorus','silicon','argon','fluorine','iodine','cobalt','chromium','tungsten','radon','radium','krypton','xenon','boron','manganese','bromine','arsenic','beryllium','cesium/caesium'],
      ['scandium','vanadium','gallium','germanium','selenium','rubidium','strontium','yttrium','zirconium','niobium','molybdenum','technetium','ruthenium','rhodium','palladium','cadmium','indium','antimony','tellurium','barium','lanthanum','cerium','praseodymium','neodymium','promethium','samarium','europium','gadolinium','terbium','dysprosium','holmium','erbium','thulium','ytterbium','lutetium','hafnium','tantalum','rhenium','osmium','iridium','thallium','bismuth','polonium','astatine','francium','actinium','thorium','protactinium','neptunium','americium','curium','berkelium','californium','einsteinium','fermium','mendelevium','nobelium','lawrencium','rutherfordium','dubnium','seaborgium','bohrium','hassium','meitnerium','darmstadtium','roentgenium','copernicium','nihonium','flerovium','moscovium','livermorium','tennessine','oganesson'] ] },
    { q: 'Name a word that rhymes with "cat"', t: [
      ['bat','hat','mat','rat','sat'],
      ['fat','pat','that','flat','chat'],
      ['splat','spat','brat','gnat','vat','at'],
      ['scat','slat','drat','combat','format','habitat','doormat','wombat','tomcat','bobcat','wildcat','copycat','top hat','hard hat','chitchat'],
      ['acrobat','diplomat','thermostat','aristocrat','democrat','bureaucrat','autocrat','technocrat','laundromat','cravat','begat','sprat','plat','tat','nonfat','lowfat','format','dingbat','fruit bat','welcome mat','placemat','hellcat','polecat','fat cat','muskrat','pack rat','lab rat','sun hat','cowboy hat','caveat','combat','frat','pussycat','scaredy cat','kumquat','ziggurat','photostat','rheostat','hydrostat','aerostat','cryostat','apparat','concordat','marat','ararat','heliostat','meerkat','pitapat','pit a pat','pitter pat','tit for tat','high hat','hi hat','old hat','nat','matt','pratt','gatt'] ] },
    { q: 'Name a Greek god or goddess', t: [
      ['zeus','poseidon','hades','athena','aphrodite'],
      ['apollo','ares','hermes','artemis','hera'],
      ['dionysus','demeter','hephaestus','persephone','eros','nike','kronos/cronus'],
      ['hestia','gaia/gaea','nyx','hecate','pan','helios','selene','eos','iris','nemesis','morpheus','hypnos','thanatos','tyche','uranus/ouranos','rhea','atlas','prometheus','hebe'],
      ['asclepius','eris','harmonia','phobos','deimos','aether','erebus','chaos','tartarus','hemera','pontus','oceanus','tethys','hyperion','themis','mnemosyne','metis','leto','dione','triton','amphitrite','nereus','proteus','aeolus','boreas','zephyrus','notus','eurus','priapus','hymenaeus','enyo','eileithyia','peitho','pheme','momus','plutus/ploutos','thalassa','phanes','ananke','chronos','nereids','charites','horae','moirai','the fates','eris','epimetheus','coeus','crius','iapetus','phoebe','theia','styx','persephone'] ] },
    { q: 'Name a type of cheese', t: [
      ['cheddar','mozzarella','swiss','parmesan/parmigiano/parmigiano reggiano','american'],
      ['brie','gouda','feta','provolone','blue cheese/blue','cream cheese'],
      ['camembert','ricotta','monterey jack/jack','pepper jack','colby','gruyere','goat cheese/chevre','cottage cheese','havarti','muenster/munster','string cheese'],
      ['manchego','halloumi','roquefort','gorgonzola','stilton','emmental/emmentaler','edam','mascarpone','burrata','pecorino','paneer','asiago','fontina','jarlsberg','queso fresco','colby jack','romano'],
      ['epoisses','taleggio','raclette','reblochon','comte','limburger','wensleydale','red leicester','double gloucester','caerphilly','lancashire','leerdammer','oaxaca','cotija','scamorza','stracciatella','gjetost/brunost','casu marzu','mimolette','port salut','tete de moine','cabrales','idiazabal','mahon','kefalotyri','kasseri','mizithra','labneh','quark','sbrinz','appenzeller','tilsit','saint agur','morbier','vacherin','boursin','beaufort','cantal','tomme','ossau iraty','maroilles','livarot','pont l eveque','halloumi','provola','caciocavallo','ragusano','robiola','castelmagno','grana padano','bocconcini','chhena','queso blanco','panela','manouri','graviera','kashkaval','sulguni','tvorog','oszczypek','bryndza','cheshire','shropshire blue','stinking bishop','cornish yarg','danablu','cambozola','neufchatel','chaource','langres','munster geromé'] ] },
    { q: 'Name a car brand', t: [
      ['toyota','ford','honda','tesla','chevrolet/chevy','bmw'],
      ['mercedes/mercedes benz/benz','audi','nissan','volkswagen/vw','jeep','ferrari','lamborghini','hyundai','kia','dodge'],
      ['porsche','subaru','mazda','lexus','volvo','cadillac','gmc','ram','buick','chrysler','jaguar','land rover/range rover','bentley','rolls royce','mini','fiat','mitsubishi','maserati','bugatti','mclaren'],
      ['acura','infiniti','lincoln','genesis','alfa romeo','aston martin','peugeot','renault','citroen','skoda','seat','suzuki','rivian','lucid','polestar','pagani','koenigsegg','lotus','smart','saab','pontiac','hummer','opel'],
      ['dacia','lada','tata','mahindra','byd','geely','nio','xpeng','proton','perodua','holden','vauxhall','cupra','ds','lancia','abarth','morgan','tvr','caterham','spyker','rimac','de tomaso','studebaker','packard','delorean','plymouth','oldsmobile','mercury','saturn','scion','isuzu','daihatsu','datsun','hispano suiza','ssangyong/kgm','zastava','trabant','wartburg','alpine','ginetta','noble','ariel','w motors','vinfast','lynk and co/lynk co','hongqi','zeekr','fisker','karma','maybach','daewoo','eagle','amc','hudson','nash','tucker','duesenberg','cord','auburn','avanti','bricklin','vector','saleen','hennessey','ssc','czinger','rezvani','donkervoort','wiesmann','borgward','horch','maybach','iso','bizzarrini','autobianchi','innocenti','reliant','triumph','mg','austin','morris','rover','sunbeam','hillman','humber','riley','wolseley','jensen','bristol'] ] },
    { q: 'Name a type of tree', t: [
      ['oak','pine','maple','palm','apple'],
      ['birch','willow','cherry','redwood','spruce','fir','cedar','elm','christmas tree'],
      ['ash','aspen','sequoia','cypress','magnolia','dogwood','beech','poplar','cottonwood','sycamore','chestnut','walnut','coconut','orange','lemon'],
      ['baobab','eucalyptus','juniper','hemlock','larch','hickory','alder','hawthorn','holly','yew','linden/lime/basswood','sweetgum','mahogany','teak','olive','banyan','acacia','mango','pecan','catalpa','ginkgo','cherry blossom/sakura','bonsai','fig'],
      ['jacaranda','rowan/mountain ash','hornbeam','dragon blood tree/dragons blood tree','bristlecone pine','monkey puzzle','wollemi pine','kauri','tamarack','mesquite','paulownia','sassafras','tupelo','buckeye','horse chestnut','ironwood','ebony','rosewood','balsa','cork oak','sumac','osage orange','joshua tree','quaking aspen','ceiba/kapok','sapele','ohia','rimu','totara','pohutukawa','frangipani','flame tree','tulip tree','wych elm','black locust','honey locust','hackberry','persimmon','pawpaw','loblolly pine','ponderosa pine','douglas fir','sitka spruce','bald cypress','weeping willow','silver birch','dawn redwood','araucaria','sandalwood','neem','tamarind','moringa','jackfruit','breadfruit','durian','cinnamon','camphor','eucalyptus','bottle tree','quiver tree','marula','mopane','umbrella thorn','whistling thorn','bunya pine','huon pine','blackwood','jarrah','karri','boab','yellowwood','stinkwood'] ] },
    { q: 'Name a gemstone', t: [
      ['diamond','ruby','emerald','sapphire'],
      ['amethyst','pearl','topaz','opal'],
      ['jade','garnet','turquoise','aquamarine','onyx','quartz','peridot'],
      ['citrine','tanzanite','moonstone','lapis lazuli/lapis','amber','tourmaline','zircon','jasper','agate','obsidian','malachite','spinel','morganite','rose quartz','tigers eye/tiger eye'],
      ['alexandrite','benitoite','painite','taaffeite','grandidierite','kunzite','iolite','chrysoberyl','larimar','labradorite','sunstone','sodalite','rhodochrosite','carnelian','chalcedony','bloodstone','hematite','fluorite','apatite','kyanite','sphene/titanite','demantoid','tsavorite','rubellite','heliodor','goshenite','ammolite','moldavite','chrysoprase','jet','coral','red beryl/bixbite','musgravite','serendibite','jeremejevite','poudretteite','beryl','corundum','padparadscha','paraiba','tanzanite','charoite','sugilite','seraphinite','amazonite','aventurine','howlite','unakite','rhodonite','prehnite','dioptase','azurite','chrysocolla','smoky quartz','ametrine','spessartine','almandine','pyrope','rhodolite','hiddenite','andalusite','sillimanite','scapolite','danburite','phenakite','euclase','hambergite','zultanite','diaspore'] ] },
    { q: 'Name a mammal', t: [
      ['dog','cat','lion','elephant','horse','cow','human'],
      ['tiger','bear','monkey','giraffe','wolf','mouse','rabbit/bunny','pig','deer','whale','dolphin'],
      ['kangaroo','zebra','fox','bat','squirrel','gorilla','panda','koala','cheetah','hippo/hippopotamus','rhino/rhinoceros','camel','sheep','goat','raccoon','otter','leopard','chimpanzee/chimp','hamster','guinea pig','rat'],
      ['platypus','sloth','armadillo','hedgehog','porcupine','beaver','moose','bison/buffalo','jaguar','hyena','meerkat','lemur','orangutan','badger','skunk','opossum/possum','walrus','seal','manatee','anteater','llama','alpaca','ferret','mole','weasel','lynx','puma/cougar/mountain lion','wombat','wallaby','gerbil','chipmunk','donkey','mule','yak','elk','reindeer/caribou','polar bear','grizzly bear','sea lion','narwhal','orca'],
      ['aardvark','pangolin','echidna','okapi','tapir','capybara','quokka','numbat','tarsier','aye aye','binturong','fossa','saiga','markhor','takin','dugong','solenodon','hyrax','colugo','kinkajou','coati','olinguito','gerenuk','dik dik/dikdik','bongo','sitatunga','serval','caracal','ocelot','margay','pika','marmot','vole','shrew','stoat','ermine','mink','wolverine','red panda','bilby','bandicoot','cuscus','sugar glider','tasmanian devil','quoll','dhole','fennec/fennec fox','jerboa','chinchilla','degu','agouti','paca','vicuna','guanaco','zorilla','muntjac','babirusa','warthog','mongoose','civet','genet','gibbon','bonobo','mandrill','baboon','proboscis monkey','howler monkey','marmoset','tamarin','loris','galago/bushbaby','gazelle','impala','kudu','eland','oryx','wildebeest/gnu','springbok','ibex','chamois','musk ox','pronghorn','zebu','gaur','banteng','anoa','vaquita','manatee','beluga'] ] },
    { q: 'Name an insect', t: [
      ['ant','bee','fly','butterfly','mosquito'],
      ['ladybug/ladybird','grasshopper','beetle','wasp','cockroach/roach','dragonfly','moth','cricket'],
      ['firefly/lightning bug','termite','flea','praying mantis/mantis','caterpillar','hornet','louse/lice','gnat','aphid','bumblebee'],
      ['cicada','stick insect/walking stick','earwig','weevil','silverfish','locust','horsefly','bedbug/bed bug','yellowjacket/yellow jacket','katydid','stink bug','scarab','damselfly','june bug','dung beetle','mayfly','fruit fly','housefly','monarch','honeybee','fire ant','carpenter ant','leafcutter ant'],
      ['lacewing','caddisfly','stonefly','thrips','cochineal','boll weevil','water strider','water boatman','backswimmer','antlion','dobsonfly/hellgrammite','scorpionfly','snakefly','booklouse','webspinner','firebrat','bristletail','sawfly','ichneumon','cicada killer','tarantula hawk','assassin bug','leafhopper','treehopper','spittlebug','whitefly','mealybug','stag beetle','hercules beetle','goliath beetle','rhinoceros beetle','click beetle','tiger beetle','bombardier beetle','longhorn beetle','weta','mole cricket','camel cricket','cave cricket','mud dauber','velvet ant','botfly','tsetse fly','crane fly','hoverfly','robber fly','deer fly','sand fly','midge','no see um','blowfly','bluebottle','greenbottle','lanternfly','spotted lanternfly','orchid mantis','leaf insect','owlfly','silkworm','silk moth','luna moth','atlas moth','hawk moth','sphinx moth','swallowtail','morpho','skipper','emerald ash borer','japanese beetle','colorado potato beetle','grain weevil','mealworm','wax moth','termite queen','army ant','bullet ant','driver ant','weaver ant','honeypot ant'] ] },
    { q: 'Name a type of pasta', t: [
      ['spaghetti','macaroni','penne','lasagna/lasagne'],
      ['fettuccine/fettucine','ravioli','linguine','rigatoni','tortellini','ziti'],
      ['farfalle/bow tie/bowtie','rotini','fusilli','orzo','angel hair/capellini','gnocchi','shells/conchiglie','manicotti','cannelloni','elbow/elbows'],
      ['orecchiette','pappardelle','tagliatelle','bucatini','ditalini','gemelli','cavatappi','campanelle','vermicelli','radiatori','rotelle/wagon wheels','tortelloni','agnolotti','paccheri','stelline','acini di pepe','alphabet','mezze maniche','spaghettini','fettuccelle'],
      ['strozzapreti','trofie','casarecce','mafaldine/mafalde','pici','bigoli','cavatelli','malloreddus','corzetti','garganelli','lumache','creste di gallo','fregola/fregula','anelli','calamarata','mezzelune','cappelletti','culurgiones','fileja','busiate','tajarin','pizzoccheri','maltagliati','fazzoletti','quadrefiore','gigli','tagliolini','reginette','lasagnette','sedanini','tubetti','perciatelli','ziti tagliati','mostaccioli','trenette','scialatielli','chitarra','orecchie','sorpresine','farfalline','ditali','fideo','lumaconi','conchiglioni','cappellacci','caramelle','sacchetti','fagottini','mezzi rigatoni','tortiglioni','candele','ziti lunghi','spaccatelle','torchio','lanterne','radiatore'] ] },
    { q: 'Name a famous painter', t: [
      ['picasso/pablo picasso','van gogh/vincent van gogh','da vinci/leonardo/leonardo da vinci','michelangelo','monet/claude monet'],
      ['rembrandt','frida kahlo/kahlo/frida','andy warhol/warhol','salvador dali/dali','bob ross'],
      ['raphael','georgia okeeffe/okeeffe/o keeffe','jackson pollock/pollock','renoir','cezanne','matisse','munch/edvard munch','vermeer','klimt','banksy','degas'],
      ['caravaggio','botticelli','goya','turner','manet','magritte','kandinsky','rothko','seurat','gauguin','hopper/edward hopper','basquiat','rubens','titian','el greco','hokusai','chagall','mondrian','constable','whistler'],
      ['bosch/hieronymus bosch','bruegel/brueghel','durer','artemisia gentileschi/gentileschi','velazquez','zurbaran','holbein','van eyck','giotto','fra angelico','tintoretto','canaletto','fragonard','watteau','ingres','delacroix','gericault','courbet','millet','sisley','pissarro','morisot','cassatt','toulouse lautrec','schiele','kokoschka','kirchner','klee','miro','max ernst/ernst','de chirico','modigliani','hilma af klint','sargent','winslow homer','wyeth','rockwell/norman rockwell','lichtenstein','hockney','lucian freud','francis bacon','diego rivera/rivera','tamayo','kusama','richter','kiefer','twombly','de kooning','franz kline','hiroshige','utamaro','sesshu','caspar david friedrich','friedrich','bierstadt','thomas cole','church','rousseau','bonnard','vuillard','dufy','derain','vlaminck','braque','leger','gris','malevich','rodchenko','repin','aivazovsky','shishkin','vasnetsov','sorolla','mucha','hammershoi','zorn','larsson','vigee le brun','kahlo','basquiat','haring','koons','hirst','emin','opie','riley','auerbach','kossoff','doig','tanning','carrington','varo','kahlo','lam','matta','botero','siqueiros','orozco','tamayo'] ] },
    { q: 'Name a shape', t: [
      ['circle','square','triangle','rectangle'],
      ['star','heart','oval','diamond','pentagon','hexagon'],
      ['octagon','cube','sphere','cylinder','pyramid','cone','rhombus','trapezoid','parallelogram','crescent'],
      ['ellipse','heptagon','nonagon','decagon','kite','cross','arrow','prism','polygon','semicircle','quadrilateral','dodecagon','torus/donut','spiral','line'],
      ['trapezium','deltoid','lune','annulus','rhomboid','dodecahedron','icosahedron','octahedron','tetrahedron','hendecagon/undecagon','tridecagon','icosagon','chiliagon','myriagon','reuleaux triangle','superellipse','cardioid','astroid','lemniscate','hyperboloid','paraboloid','frustum','gnomon','trefoil','quatrefoil','pentagram','hexagram','heptagram','mobius strip','klein bottle','rhombicuboctahedron','cuboid','ellipsoid','spheroid','stadium','squircle','sector','segment','arbelos','salinon','vesica piscis','parabola','hyperbola','helix','catenary','deltahedron','antiprism','rotunda','cupola','tesseract','hypercube','zonohedron','trapezohedron','bipyramid','oloid','sphericon','gomboc','deltoidal icositetrahedron','truncated icosahedron','snub cube'] ] },
    { q: 'Name a breakfast food', t: [
      ['eggs/egg','pancakes/pancake','cereal','bacon','toast','waffles/waffle'],
      ['oatmeal','french toast','sausage','bagel','yogurt/yoghurt','muffin','hash browns/hashbrowns'],
      ['omelette/omelet','croissant','granola','donut/doughnut','biscuits and gravy/biscuits','breakfast burrito','smoothie','grits','english muffin','avocado toast','fruit','scrambled eggs','fried eggs','pop tarts/pop tart'],
      ['eggs benedict','crepes/crepe','frittata','quiche','porridge','cinnamon roll','danish','scone','huevos rancheros','shakshuka','breakfast sandwich','home fries','corned beef hash/hash','chicken and waffles','breakfast tacos','acai bowl','cream of wheat','toaster strudel','sausage gravy','overnight oats','bagel and lox/lox'],
      ['congee','chilaquiles','menemen','kedgeree','black pudding','full english','baked beans','natto','tamagoyaki','dosa','idli','poha','upma','paratha','khachapuri','pan con tomate','gallo pinto','arepas/arepa','kaya toast','jook','youtiao','roti canai','shrimp and grits','scrapple','kippers','bubble and squeak','laverbread','muesli','bircher muesli','dutch baby','blintzes','latkes','ful medames/ful','simit','borek','syrniki','kasha','migas','molletes','pao de queijo','tapsilog','silog','nasi lemak','bubur ayam','banh mi','pho','khao tom','okonomiyaki','onigiri','miso soup','rice porridge','haggis','tattie scones','soda bread','boxty','croque madame','pain au chocolat','tartine','churros','tostada','huevos divorciados','mangu','salteñas','medialunas','pastelitos','kanelbullar','smorrebrod','aebleskiver','kaiserschmarrn','bauernfruhstuck','eggs in purgatory','toad in the hole','egg in a basket','loco moco','spam musubi','johnnycakes','hoecakes','fried bologna','grillades'] ] },
    { q: 'Name a dinosaur', t: [
      ['t rex/trex/tyrannosaurus/tyrannosaurus rex','triceratops','velociraptor/raptor','stegosaurus'],
      ['brachiosaurus','pterodactyl/pteranodon','brontosaurus','spinosaurus','ankylosaurus','diplodocus'],
      ['allosaurus','parasaurolophus','pachycephalosaurus','iguanodon','dilophosaurus','apatosaurus','carnotaurus','giganotosaurus'],
      ['gallimimus','compsognathus','deinonychus','therizinosaurus','utahraptor','argentinosaurus','baryonyx','oviraptor','protoceratops','styracosaurus','maiasaura','quetzalcoatlus','mosasaurus','plesiosaurus/plesiosaur','microraptor','troodon','edmontosaurus','megalosaurus','archaeopteryx','dimetrodon'],
      ['amargasaurus','nigersaurus','pachyrhinosaurus','kentrosaurus','dreadnoughtus','patagotitan','mamenchisaurus','sauropelta','nodosaurus','borealopelta','euoplocephalus','corythosaurus','lambeosaurus','ouranosaurus','suchomimus','irritator','ceratosaurus','majungasaurus','abelisaurus','cryolophosaurus','yutyrannus','dilong','sinosauropteryx','psittacosaurus','leaellynasaura','minmi','muttaburrasaurus','australovenator','coelophysis','herrerasaurus','eoraptor','plateosaurus','saltasaurus','camarasaurus','supersaurus','sauroposeidon','torosaurus','chasmosaurus','einiosaurus','zuniceratops','tarbosaurus','albertosaurus','daspletosaurus','gorgosaurus','nanotyrannus','struthiomimus','ornithomimus','deinocheirus','mononykus','halszkaraptor','zuul','stygimoloch','dracorex','pentaceratops','kosmoceratops','regaliceratops','sinoceratops','tsintaosaurus','shantungosaurus','olorotitan','hadrosaurus','maiasaura','tenontosaurus','hypsilophodon','dryosaurus','camptosaurus','scelidosaurus','scutellosaurus','gastonia','polacanthus','edmontonia','saichania','tarchia','pinacosaurus','talarurus','zuul','rajasaurus','rugops','skorpiovenator','aucasaurus','carcharodontosaurus','acrocanthosaurus','tyrannotitan','mapusaurus','concavenator','sinraptor','monolophosaurus','guanlong','proceratosaurus','eotyrannus','raptorex','alioramus','qianzhousaurus','lythronax','teratophoneus','bistahieversor','dakotaraptor','austroraptor','buitreraptor','unenlagia','pyroraptor','balaur','velociraptor'] ] },
    { q: 'Name a flower', t: [
      ['rose','tulip','daisy','sunflower','lily'],
      ['orchid','daffodil','carnation','lavender','dandelion','poppy'],
      ['violet','iris','hibiscus','lotus','marigold','peony','chrysanthemum/mum','jasmine','magnolia','cherry blossom','lilac','hydrangea','petunia'],
      ['begonia','dahlia','gardenia','geranium','azalea','camellia','zinnia','freesia','gerbera','snapdragon','pansy','buttercup','bluebell','crocus','morning glory','foxglove','hyacinth','honeysuckle','aster','lupine/lupin','anemone','ranunculus','gladiolus','sweet pea','forget me not','bougainvillea','cosmos','primrose','edelweiss','plumeria/frangipani','protea','amaryllis','rhododendron','water lily','daisy'],
      ['hellebore','columbine','delphinium','larkspur','salvia','verbena','yarrow','coreopsis','echinacea/coneflower','black eyed susan/rudbeckia','heliconia','bird of paradise/strelitzia','rafflesia','corpse flower/titan arum','ginger lily','clematis','wisteria','allium','agapanthus','alstroemeria','statice','scabiosa','nigella','cornflower','bachelors button','calendula','nasturtium','trillium','bloodroot','hepatica','gentian','lisianthus','gazania','osteospermum','portulaca','impatiens','lantana','celosia','gomphrena','ixia','sparaxis','red hot poker/kniphofia','crocosmia','nerine','tuberose','stephanotis','plumbago','oleander','passionflower','snowdrop','aconite/monkshood','hollyhock','mallow','sea holly','astilbe','bergenia','heuchera','saxifrage','anthurium','bromeliad','calla lily','canna','cyclamen','dianthus','fuchsia','gaillardia','hosta','kalanchoe','lobelia','lotus','mimosa','phlox','sedum','spirea','tansy','veronica','vinca/periwinkle','waratah','wattle','kangaroo paw','sturt desert pea','frangipani','jacaranda','ylang ylang','champak','chamomile','borage','feverfew','thistle','heather','gorse','broom','cowslip','oxlip','celandine','speedwell','campion','ragged robin','meadowsweet','sneezewort'] ] },
    { q: 'Name a herb or spice', t: [
      ['pepper/black pepper','cinnamon','garlic','basil','oregano','salt'],
      ['paprika','cumin','ginger','parsley','rosemary','thyme','chili/chili powder/chilli','nutmeg'],
      ['turmeric','mint','cilantro/coriander','dill','sage','bay leaf/bay','cayenne','vanilla','clove/cloves','curry powder/curry','garlic powder','onion powder'],
      ['cardamom','saffron','allspice','star anise','fennel seed/fennel','mustard seed/mustard','chives','tarragon','marjoram','sesame','red pepper flakes/chili flakes','chipotle','smoked paprika','poppy seed','celery seed','caraway','lemongrass','zaatar/za atar','garam masala','five spice/chinese five spice','italian seasoning','old bay','cajun seasoning','anise'],
      ['sumac','asafoetida/asafetida/hing','fenugreek','nigella seed/kalonji/nigella','mace','galangal','grains of paradise','long pepper','sichuan pepper/szechuan pepper','annatto/achiote','epazote','lovage','chervil','savory','sorrel','hyssop','borage','juniper berry/juniper','ajwain/carom','amchur','makrut lime leaf/kaffir lime leaf','curry leaf/curry leaves','pandan','shiso/perilla','mahlab','mastic','black lime/loomi','berbere','ras el hanout','baharat','dukkah','shichimi','sansho','culantro','wattleseed','pink peppercorn','cubeb','anardana','kokum','tamarind','file powder/file','angelica','rue','woodruff','lemon balm','lemon verbena','bergamot','licorice root','orris root','horseradish','wasabi','herbes de provence','bouquet garni','fines herbes','advieh','hawaij','panch phoron','chaat masala','sambar powder','tandoori masala','harissa','dukka','togarashi','furikake','gomasio','jerk seasoning','adobo','sazon','tajin','piri piri','aleppo pepper','urfa biber','espelette','gochugaru','kashmiri chili','ancho','guajillo','pasilla','mulato','arbol','habanero','scotch bonnet','bird eye chili','ghost pepper','carolina reaper','stevia','mugwort','yarrow','calendula','lavender','rose petals','hibiscus','chamomile','catnip','oregano'] ] },
    { q: 'Name a currency', t: [
      ['dollar','euro','pound'],
      ['yen','peso','rupee','bitcoin'],
      ['yuan/renminbi','franc','ruble/rouble','won','real','krona','dinar','pound sterling'],
      ['rand','lira','shekel','baht','dirham','krone','rupiah','ringgit','zloty','forint','koruna','dong','rial/riyal','naira','ethereum','dogecoin','dobra'],
      ['kwacha','kwanza','cedi','birr','shilling','leu','lev','lari','dram','manat','som','somoni','tenge','tugrik','kip','kyat','riel','taka','ngultrum','afghani','ouguiya','dalasi','leone','loti','lilangeni','pula','metical','ariary','nakfa','guarani','boliviano','sol','colon','cordoba','lempira','quetzal','balboa','gourde','florin','denar','convertible mark','hryvnia','pataca','paanga','tala','vatu','kina','rufiyaa','escudo','drachma','deutsche mark/deutschmark/mark','guilder','peseta','sucre','austral','cruzeiro','inti','zaire','ecu','sestertius','denarius','drachm','shekel','talent','obol','groat','farthing','guinea','sovereign','crown','shilling','penny','sen','fils','halala','paisa','kopek','centime','pfennig','ore','agora','satang','jiao','fen','tiyin','tyiyn','qindarka','lek','kuna','tolar','litas','lats','kroon','markka','schilling','escudo','punt','lira','pataca'] ] },
    { q: 'Name a famous scientist', t: [
      ['einstein/albert einstein','newton/isaac newton','darwin/charles darwin','marie curie/curie','tesla/nikola tesla'],
      ['galileo','edison/thomas edison','stephen hawking/hawking','copernicus','pasteur/louis pasteur'],
      ['aristotle','mendel/gregor mendel','faraday/michael faraday','bohr/niels bohr','oppenheimer','feynman','kepler','archimedes','alan turing/turing','ada lovelace/lovelace','carl sagan/sagan','neil degrasse tyson/tyson','bill nye'],
      ['heisenberg','schrodinger','planck/max planck','dirac','maxwell/james clerk maxwell','rosalind franklin','crick','watson','fleming/alexander fleming','lavoisier','mendeleev','hubble','euclid','pythagoras','hippocrates','boyle','hooke','rutherford','fermi','pauli','linnaeus','lamarck','humboldt','jane goodall/goodall','rachel carson'],
      ['lise meitner/meitner','emmy noether/noether','chien shiung wu','barbara mcclintock/mcclintock','dorothy hodgkin/hodgkin','hypatia','alhazen/ibn al haytham','al khwarizmi','avicenna/ibn sina','tycho brahe/brahe','leeuwenhoek','william harvey','vesalius','jenner','semmelweis','robert koch/koch','ramanujan','c v raman/raman','satyendra bose/bose','chandrasekhar','yukawa','becquerel','rontgen/roentgen','ampere','volta','ohm','kelvin/lord kelvin','joule','gauss','euler','riemann','hilbert','godel','von neumann','cavendish','priestley','dalton','avogadro','max born','sommerfeld','landau','sakharov','kapitsa','mae jemison','katherine johnson','tu youyou','wegener','lyell','hutton','cuvier','mary anning/anning','alfred russel wallace/wallace','haeckel','pavlov','fibonacci','leibniz','descartes','pascal','fermat','huygens','laplace','lagrange','fourier','torricelli','bernoulli','doppler','hertz','marconi','bell','carver/george washington carver','salk','sabin','crick','franklin','hodgkin','curie','higgs','gell mann','weinberg','salam','glashow','hawking','penrose','sagan','dawkins','gould','wilson','lovelock','margulis','sanger','mullis','doudna','charpentier','venter','collins','banting','best','lister','nightingale','galen','ptolemy','eratosthenes','aristarchus','democritus','thales','anaximander','empedocles','al biruni','al razi','omar khayyam','brahmagupta','aryabhata','zhang heng','shen kuo'] ] },
    { q: 'Name something that is yellow', t: [
      ['banana','sun','lemon','school bus','corn'],
      ['taxi/cab/taxi cab','sunflower','cheese','butter','duck/rubber duck','egg yolk/yolk','pineapple'],
      ['mustard','bee','pencil','highlighter','smiley face/smiley','canary','tennis ball','gold','daffodil','dandelion','caution sign','post it/sticky note','sand','bumblebee','star'],
      ['banana pepper','starfruit','squash','saffron','turmeric','honey','chick','goldfinch','buttercup','yellowjacket/yellow jacket','raincoat','hard hat','crayon','lemonade','popcorn','custard','curry','sulfur/sulphur','legal pad','traffic light','caution tape','yellow pages','school zone sign','rubber glove','sponge','corn on the cob','yellow brick road','yellow submarine','lemon meringue','cheddar','scrambled eggs','margarine','pollen','grapefruit','pear','lemon bar'],
      ['canary diamond','citrine','topaz','yuzu','quince','forsythia','goldenrod','mimosa','wattle','yellow tang','banana slug','yellowhammer','oriole','warbler','brimstone','sulphur butterfly','golden poison frog','yellow labrador','yellow labrador','yellow fever','jaundice','yellow card','yellow jersey','maillot jaune','legal pad','number two pencil','manila folder','tennis ball','school bus','crossing guard vest','hazmat suit','yellow cake','ochre','gamboge','naples yellow','cadmium yellow','chrome yellow','orpiment','sulfur','yellow river','yellowstone','yellowknife','yellow sea','yellowtail','yellowfin tuna','yellow perch','goldfish','golden pheasant','yellow warbler','yellow crowned night heron','marigold','zucchini flower','cassia','acacia','ginkgo leaves','autumn leaves','dijon','piccalilli','lemon curd','mango','golden kiwi','gold kiwi','yellow watermelon','yellow tomato','yellow beet','golden beet','yellow split peas','dal','polenta','cornbread','corn flakes','twinkie','peeps','lemonheads','banana runts','yellow starburst'] ] },
    { q: 'Name a job', t: [
      ['doctor','teacher','nurse','lawyer','police officer/cop/police/policeman','firefighter/fireman'],
      ['engineer','chef/cook','pilot','dentist','scientist','programmer/software engineer/developer/coder','farmer','artist','accountant'],
      ['plumber','electrician','mechanic','architect','veterinarian/vet','pharmacist','cashier','waiter/waitress/server','carpenter','actor','musician','writer/author','banker','barber','soldier','judge','photographer','journalist','youtuber','streamer','game developer','designer'],
      ['astronaut','surgeon','librarian','paramedic','therapist','psychologist','janitor/custodian','dietitian','optometrist','chiropractor','realtor/real estate agent','translator','interpreter','mail carrier/mailman/postman','bus driver','truck driver','baker','butcher','tailor','florist','welder','locksmith','lifeguard','zookeeper','tattoo artist','economist','professor','nanny','roofer','mason','flight attendant','air traffic controller','detective','spy','diplomat','politician','senator','mayor','priest','pastor','rabbi','imam','monk','nun'],
      ['farrier','cooper','wheelwright','fletcher','chandler','cartographer','actuary','sommelier','luthier','taxidermist','glazier','sexton','lexicographer','ombudsman','notary','auctioneer','falconer','horologist/watchmaker','milliner','haberdasher','cobbler','tanner','thatcher','saddler','apiarist/beekeeper','arborist','entomologist','ornithologist','herpetologist','ichthyologist','volcanologist','seismologist','glaciologist','mortician/undertaker','embalmer','coroner','stevedore/longshoreman','steeplejack','chimney sweep','lamplighter','ferryman','gondolier','sherpa','jockey','croupier','bailiff','concierge','perfumer','foley artist','gaffer','grip','puppeteer','mime','ventriloquist','stuntman/stunt performer','blacksmith','potter','glassblower','cryptographer','archivist','curator','conservator','docent','prosthetist','audiologist','phlebotomist','sonographer','anesthesiologist','podiatrist','orthodontist','endodontist','doula','midwife','ferrier','knacker','scrivener','town crier','toll collector','ice cutter','knocker upper','rat catcher','leech collector','dowser','tinker','peddler','costermonger','ostler','reeve','squire','herald','jester','minstrel','bard','scribe','alchemist','apothecary','barber surgeon','cartwright','shipwright','sailmaker','rope maker','cordwainer','currier','fuller','dyer','weaver','spinner','tinsmith','silversmith','goldsmith','gunsmith','armorer','bowyer','engraver','typesetter','compositor','linotype operator','telegraph operator','switchboard operator','elevator operator','milkman','iceman','paperboy'] ] },
    { q: 'Name a constellation', t: [
      ['big dipper','orion','little dipper'],
      ['ursa major','ursa minor','cassiopeia','leo','scorpius/scorpio'],
      ['gemini','taurus','aries','cancer','virgo','libra','sagittarius','capricornus/capricorn','aquarius','pisces','andromeda','pegasus','draco','cygnus'],
      ['perseus','hercules','lyra','aquila','canis major','canis minor','centaurus','crux/southern cross','cepheus','bootes','corona borealis','ophiuchus','auriga','cetus','hydra','lepus','monoceros'],
      ['antlia','apus','ara','caelum','camelopardalis','carina','chamaeleon','circinus','columba','coma berenices','corona australis','corvus','crater','delphinus','dorado','equuleus','eridanus','fornax','grus','horologium','hydrus','indus','lacerta','leo minor','lupus','lynx','mensa','microscopium','musca','norma','octans','pavo','phoenix','pictor','piscis austrinus','puppis','pyxis','reticulum','sagitta','sculptor','scutum','serpens','sextans','telescopium','triangulum','triangulum australe','tucana','vela','volans','vulpecula','argo navis','pleiades','summer triangle','winter hexagon','teapot','orions belt','great square','false cross','kite','sickle','keystone','northern cross','coathanger','hyades'] ] },
    { q: 'Name a language', t: [
      ['english','spanish','french','chinese/mandarin'],
      ['german','japanese','italian','russian','arabic','portuguese','korean','hindi'],
      ['dutch','greek','swedish','latin','hebrew','turkish','polish','sign language/asl/american sign language','cantonese','vietnamese','bengali/bangla','urdu','punjabi','tagalog/filipino'],
      ['norwegian','danish','finnish','irish/irish gaelic/gaelic','welsh','swahili','thai','indonesian','malay','persian/farsi','ukrainian','czech','hungarian','romanian','tamil','telugu','marathi','gujarati','navajo','hawaiian','esperanto','icelandic','catalan','basque'],
      ['yiddish','cherokee','quechua','guarani','nahuatl','yoruba','igbo','hausa','zulu','xhosa','afrikaans','amharic','somali','tigrinya','malagasy','maori','samoan','tongan','fijian','tok pisin','khmer','lao','burmese','tibetan','mongolian','kazakh','uzbek','kyrgyz','tajik','pashto','kurdish','armenian','georgian','azerbaijani/azeri','albanian','maltese','luxembourgish','frisian','faroese','sami','estonian','latvian','lithuanian','slovak','slovene/slovenian','serbian','croatian','bosnian','macedonian','bulgarian','belarusian','breton','cornish','manx','scottish gaelic/scots gaelic','scots','occitan','galician','sardinian','corsican','romansh','sanskrit','pali','aramaic','coptic','ainu','inuktitut','greenlandic','wolof','lingala','kinyarwanda','shona','sesotho','tswana','sinhala','nepali','kannada','malayalam','odia/oriya','assamese','javanese','sundanese','cebuano','ilocano','hmong','haitian creole/creole','papiamento','tetum','chamorro','marshallese','palauan','rapa nui','tahitian','cree','ojibwe','lakota','dakota','mohawk','inupiaq','yupik','hopi','zuni','apache','choctaw','chickasaw','seminole','mapudungun','aymara','sumerian','akkadian','hittite','egyptian','old norse','old english','middle english','gothic','etruscan','phoenician','sogdian','tocharian','ugaritic','elamite','klingon'] ] },
    { q: 'Name a board game', t: [
      ['monopoly','chess','checkers/draughts','scrabble','candy land/candyland'],
      ['clue/cluedo','sorry','connect four/connect 4','battleship','game of life/life/the game of life','risk','operation','trouble'],
      ['catan/settlers of catan','ticket to ride','backgammon','go','othello/reversi','guess who','chutes and ladders/snakes and ladders','mouse trap','pictionary','trivial pursuit','stratego','jenga','uno'],
      ['pandemic','carcassonne','mahjong','codenames','dominion','azul','splendor','mancala','parcheesi/ludo','chinese checkers','cranium','scattergories','boggle','yahtzee','hungry hungry hippos','dont break the ice','hedbanz','cribbage','axis and allies','diplomacy','wingspan','7 wonders/seven wonders','king of tokyo','betrayal at house on the hill/betrayal','exploding kittens','apples to apples','cards against humanity','sequence','rummikub','qwirkle','ticket to ride'],
      ['gloomhaven','twilight imperium','terraforming mars','agricola','puerto rico','brass','power grid','root','everdell','scythe','spirit island','arkham horror','dune','cosmic encounter','tigris and euphrates','el grande','acquire','hive','onitama','santorini','patchwork','kingdomino','cascadia','quoridor','blokus','abalone','pente','shogi','xiangqi','janggi','senet','mehen','royal game of ur/ur','hnefatafl/tafl','nine mens morris','fox and geese','pachisi','carrom','crokinole','tsuro','sagrada','takenoko','mysterium','dixit','small world','tokaido','jaipur','lost cities','hanabi','love letter','coup','the resistance','avalon','one night ultimate werewolf','secret hitler','camel up','sushi go','dominoes','dominos','labyrinth','heroquest','space alert','mansions of madness','descent','eldritch horror','robinson crusoe','mage knight','through the ages','great western trail','concordia','orleans','castles of burgundy','le havre','caverna','viticulture','lords of waterdeep','stone age','alhambra','istanbul','century spice road','quacks of quedlinburg','clank','dead of winter','zombicide','blood rage','inis','kemet','cyclades','hero realms','star realms','marvel champions','arkham horror lcg','race for the galaxy','san juan','bohnanza','no thanks','for sale','modern art','ra','samurai','tikal','torres','pandemic legacy','risk legacy','the crew','just one','wavelength','decrypto','so clover','monikers','telestrations','twister','operation'] ] },
    { q: 'Name a type of weather', t: [
      ['rain','snow','sunny/sun/sunshine','wind/windy','cloudy/cloud/clouds'],
      ['storm','thunder','lightning','fog','hail','tornado','hurricane'],
      ['drizzle','sleet','blizzard','humidity/humid','frost','rainbow','mist','breeze','heat wave','overcast','thunderstorm','showers'],
      ['monsoon','typhoon','cyclone','drought','flood','dew','haze','smog','gale','squall','downpour','flurry/flurries','black ice','wind chill','sandstorm','dust storm','ice storm','freezing rain','cold front','warm front','whiteout','heat index','muggy'],
      ['graupel','virga','derecho','haboob','petrichor','sirocco','mistral','chinook','foehn/fohn','bora','khamsin','williwaw','microburst','waterspout','landspout','gustnado','rime','hoarfrost','diamond dust','sun dog/sundog','halo','mammatus','cumulonimbus','cirrus','stratus','nimbostratus','altocumulus','lenticular cloud','noctilucent cloud','aurora','inversion','polar vortex','noreaster/nor easter','bomb cyclone','atmospheric river','el nino','la nina','thundersnow','firenado/fire tornado','pyrocumulonimbus','zephyr','doldrums','trade winds','jet stream','dust devil','supercell','shelf cloud','wall cloud','funnel cloud','ball lightning','heat lightning','sheet lightning','st elmos fire','fogbow','moonbow','glory','brocken spectre','crepuscular rays','green flash','ice pellets','snow grains','hailstorm','firestorm','squall line','bow echo','hook echo','cold snap','indian summer','dog days','harmattan','simoom','levanter','tramontane','pampero','zonda','santa ana','diablo wind','berg wind','southerly buster','brickfielder','sukhovey','buran','purga'] ] },
    { q: 'Name a famous landmark', t: [
      ['eiffel tower','statue of liberty','great wall/great wall of china','pyramids/pyramids of giza/great pyramid','big ben'],
      ['colosseum/coliseum','taj mahal','mount rushmore','golden gate bridge','leaning tower of pisa/tower of pisa','grand canyon','stonehenge'],
      ['machu picchu','sydney opera house','christ the redeemer','empire state building','burj khalifa','niagara falls','mount everest/everest','london eye','sphinx/great sphinx','buckingham palace','white house','times square','disneyland','central park'],
      ['petra','angkor wat','chichen itza','acropolis','parthenon','tower bridge','sagrada familia','neuschwanstein','kremlin','red square','forbidden city','brandenburg gate','arc de triomphe','louvre','notre dame','space needle','hollywood sign','alhambra','mont saint michel','st peters basilica','sistine chapel','trevi fountain','cn tower','uluru/ayers rock','victoria falls','matterhorn','mount fuji/fuji','hagia sophia','gateway arch','alcatraz','versailles/palace of versailles','edinburgh castle','tower of london','lincoln memorial','washington monument','capitol','pentagon','las vegas strip','brooklyn bridge','chrysler building','one world trade center','willis tower/sears tower','golden temple'],
      ['moai/easter island','borobudur','bagan','potala palace','terracotta army','great barrier reef','ha long bay','zhangjiajie','shwedagon pagoda','fushimi inari','itsukushima','petronas towers','marina bay sands','wat arun','prambanan','lalibela','great zimbabwe','abu simbel','karnak','luxor temple','valley of the kings','timbuktu','great mosque of djenne/djenne','leptis magna','carthage','meteora','delphi','knossos','pompeii','plitvice','cliffs of moher','giants causeway','skara brae','newgrange','hallstatt','sintra','cappadocia','ephesus','pamukkale','persepolis','mohenjo daro','hampi','ajanta','ellora','sigiriya','tikal','teotihuacan','palenque','nazca lines','salar de uyuni','iguazu falls','angel falls','galapagos','chand baori','gobekli tepe','mesa verde','devils tower','monument valley','antelope canyon','horseshoe bend','old faithful','half dome','el capitan','mount rainier','kilimanjaro','table mountain','sugarloaf','christ church','st basils cathedral/st basil s cathedral','hermitage','peterhof','charles bridge','prague castle','schonbrunn','atomium','manneken pis','little mermaid','nyhavn','kinderdijk','rijksmuseum','cologne cathedral','brandenburg','berlin wall','checkpoint charlie','duomo','florence cathedral','ponte vecchio','rialto bridge','st marks basilica','doges palace','pantheon','roman forum','vatican','mont blanc','dolomites','lake bled','dubrovnik','kotor','mostar bridge/stari most','rila monastery','bran castle','blue mosque','topkapi','galata tower','western wall/wailing wall','dome of the rock','masada','dead sea','wadi rum','burj al arab','sheikh zayed mosque','kaaba','qutub minar','red fort','india gate','gateway of india','lotus temple','meenakshi temple','konark','khajuraho','boudhanath','tiger s nest/tigers nest','golden pavilion/kinkaku ji','himeji castle','tokyo tower','tokyo skytree','gyeongbokgung','n seoul tower','taipei 101','oriental pearl tower','summer palace','temple of heaven','leshan giant buddha','tian tan buddha','victoria peak','senso ji','todai ji','kiyomizu dera','arashiyama','mount kinabalu','tanah lot','uluwatu','komodo','bryce canyon','zion','arches','yosemite','yellowstone','everglades','death valley','crater lake','carlsbad caverns','mammoth cave','biltmore','graceland','alamo','independence hall','liberty bell','fenway park','wrigley field','french quarter','hoover dam','route 66','lake louise','moraine lake','banff','chateau frontenac','cabot trail','perito moreno','torres del paine','fitz roy','aconcagua','christ of the andes','copacabana','ipanema','tierra del fuego','milford sound','hobbiton','twelve apostles','bondi beach','harbour bridge/sydney harbour bridge','kakadu','bungle bungles','wave rock','pinnacles'] ] },
  );

  // ---------- MORE ANSWERS FOR THE ORIGINAL PROMPTS ----------
  const ADD = {
    'Name a fruit': [[], ['grapes'], ['cantaloupe','tangerine'], ['red currant','blackcurrant','boysenberry','kiwano/horned melon','ugli fruit','pomelo','blood orange','mandarin','satsuma','persimmon','plantain','olive','tomato','avocado','rhubarb'], ['lucuma','pitanga','camu camu','bael','santol','langsat','duku','marang','pulasan','acerola','ackee','sapote','mamey','black sapote','canistel','soncoya','ilama','cupuacu','acai','buriti','pequi','bacuri','araza','naranjilla','lulo','pepino','kiwiberry','honeyberry','haskap','aronia','chokeberry','serviceberry','saskatoon','juneberry','sea buckthorn','rose hip','hawthorn','barberry','goji','wolfberry','schisandra','jujube','miracle fruit','monk fruit','luo han guo','buddhas hand','calamansi','finger lime','etrog','citron','bergamot','sudachi','kabosu','dekopon','sumo','ugni','muntries','davidson plum','quandong','riberry','kakadu plum']] ,
    'Name a country in Europe': [[], [], [], ['georgia','armenia','azerbaijan','kazakhstan'], ['faroe islands','gibraltar','isle of man','jersey','guernsey','aland','svalbard','greenland','transnistria','abkhazia','northern cyprus']],
    'Name an animal that lives in the ocean': [[], ['sea horse'], ['whale shark','great white shark/great white','tiger shark','hermit crab','sand dollar'], ['moray eel','grouper','halibut','flounder','cod','salmon','herring','sardine','anchovy','mackerel','lionfish','parrotfish','sea snake','leatherback turtle','elephant seal','leopard seal','sperm whale','humpback whale','bottlenose dolphin','porpoise','sea anemone','box jellyfish','portuguese man o war/man o war'], ['coelacanth','viperfish','fangtooth','dragonfish','hatchetfish','cookiecutter shark','megamouth shark','sixgill shark','greenland shark','basking shark','thresher shark','sawfish','guitarfish','skate','torpedo ray','electric ray','cownose ray','eagle ray','mantis shrimp','pistol shrimp','yeti crab','coconut crab','spider crab','japanese spider crab','horseshoe crab','sea lily','crinoid','brittle star','basket star','feather star','sea squirt','tunicate','salp','larvacean','comb jelly','ctenophore','lion s mane jellyfish/lions mane','irukandji','sea wasp','blue dragon','glaucus','violet snail','cone snail','sea hare','chiton','limpet','abalone','conch','whelk','cowrie','argonaut','paper nautilus','blanket octopus','mimic octopus','blue ringed octopus','glass octopus','telescope octopus','firefly squid','colossal squid','bigfin squid','humboldt squid','flamboyant cuttlefish','leafy seadragon','weedy seadragon','pipefish','frogfish','stonefish','scorpionfish','batfish','handfish','tripod fish','snailfish','cusk eel','rattail','grenadier','bristlemouth','orange roughy','opah','moonfish','ribbonfish','dealfish','king of herrings','sloane s viperfish','black swallower','pelican eel','umbrellamouth gulper','stoplight loosejaw','barreleye fish','spookfish','ghost shark','ratfish','elephant shark','wolf eel','wolffish','lumpsucker','sculpin','sea robin','gurnard','flying fish','needlefish','halfbeak','triggerfish','filefish','boxfish','cowfish','porcupinefish','tang','surgeonfish','damselfish','wrasse','cleaner wrasse','napoleon wrasse','goby','blenny','jawfish','dottyback','anthias','hawkfish','butterflyfish','angelfish','moorish idol','rabbitfish','unicornfish']],
    'Name a color': [[], [], ['dark blue','light blue','sky blue','baby blue','hot pink','lime green','forest green','neon green'], ['bronze','copper','charcoal','slate','rust','brick red','cherry','raspberry','mustard','lemon','sand','champagne','pearl','jade','sage','hunter green','royal blue','cobalt','denim','steel blue','powder blue','eggplant','grape','lilac','orchid','blush','magenta'], ['amaranth','byzantium','cattleya','chamoisee','cinereous','coquelicot','eburnean','fallow','feldgrau','fulvous','gainsboro','gridelin','isabelline','jasper','liseran','mikado yellow','mordant red','nankeen','orpiment','pervenche','phlox','rufous','skobeloff','smalt','titian','tyrian purple','ultramarine','wenge','xanthic','zomp','alabaster','arsenic','aureolin','bistre','bole','burnt sienna','burnt umber','raw umber','raw sienna','caput mortuum','dun','drab','ecru','fawn','glaucous','greige','haint blue','lapis','lust','malachite','marengo','melon','moccasin','nyanza','onyx','oxblood','paynes grey','persimmon','prussian blue','russet','sangria','saffron','sinopia','tawny','thistle','turmeric','vermilion','verdigris','wheat','zaffre']],
    'Name a musical instrument': [[], ['electric guitar','bass drum','snare drum'], ['bells','chimes','acoustic guitar','grand piano','electric piano'], ['cornet','flugelhorn','mellophone','baritone','english horn','bass clarinet','contrabassoon','soprano saxophone','alto saxophone','tenor saxophone','baritone saxophone','tubular bells','gong','djembe','conga','cabasa','maracas','guiro','claves','wood block','kazoo','melodica','dulcimer','pan flute/panpipes','tin whistle/penny whistle','bodhran','fiddle','keytar','turntables','drum machine','sampler'], ['shakuhachi','biwa','taiko','gamelan','angklung','khene','morin khuur','dombra','komuz','santur','kamancheh','tar','setar','ney','qanun','rebab','darbuka','riq','bendir','gimbri','ngoni','balafon','udu','talking drum','shekere','berimbau','charango','quena','cuatro','tiple','bandoneon','concertina','harmonium','nyckelharpa','hardanger fiddle','kantele','kokle','gusli','domra','bandura','tambura','sarod','veena','mridangam','shehnai','nadaswaram','esraj','santoor','pungi','dhol','dholak','tumbi','jaw harp','kouxian','hulusi','suona','sheng','dizi','xiao','yangqin','ruan','sanxian','gayageum','haegeum','piri','janggu','ondes martenot','glass harmonica','waterphone','stylophone','omnichord','mellotron','ondioline','trautonium','serpent','ophicleide','cornett','crumhorn','shawm','rackett','viol','viola da gamba','viola d amore','theorbo','cittern','vihuela','psaltery','harmonica','tromba marina','nail violin','aeolian harp','lithophone','hydraulophone']],
    'Name a planet, moon or dwarf planet in our solar system': [[], [], [], [], ['salacia','varuna','ixion','makemake','dysnomia','vanth','weywot','hiiaka','namaka','actaea','xiangliu','mab','cupid','belinda','perdita','rosalind','portia','juliet','desdemona','cressida','bianca','ophelia','cordelia','caliban','prospero','setebos','stephano','trinculo','francisco','margaret','ferdinand','naiad','thalassa','despina','galatea','halimede','sao','laomedeia','psamathe','neso','hippocamp','calypso','telesto','helene','polydeuces','pallene','methone','anthe','daphnis','pan','atlas','prometheus','ymir','paaliaq','siarnaq','tarvos','kiviuq','ijiraq','skathi','mundilfari','erriapus','albiorix','leda','lysithea','elara','ananke','carme','pasiphae','sinope','callirrhoe','themisto','adrastea','vesta','pallas','hygiea','juno','arrokoth','sedna']],
    'Name a dog breed': [[], ['shepherd','retriever','terrier','spaniel','sheepdog'], ['husky','great pyrenees','english bulldog','boston terrier','bull terrier','irish setter','pointer','border terrier'], ['airedale','west highland terrier/westie','scottish terrier/scottie','cairn terrier','rat terrier','boykin spaniel','springer spaniel','english setter','gordon setter','brittany','german shorthaired pointer','chesapeake bay retriever','flat coated retriever','nova scotia duck tolling retriever','toller','havanese','lhasa apso','pekingese','japanese chin','italian greyhound','miniature pinscher','toy poodle','standard poodle','cockapoo','maltipoo','pomsky','schnoodle','irish wolfhound','scottish deerhound','afghan hound','rhodesian ridgeback','dogo argentino','presa canario','boerboel','anatolian shepherd','belgian malinois','dutch shepherd','australian cattle dog/blue heeler/heeler','old english sheepdog','bearded collie','shetland sheepdog'], ['mudi','pumi','schapendoes','stabyhoun','kooikerhondje','drentsche patrijshond','wetterhoun','braque du bourbonnais','griffon nivernais','grand basset griffon vendeen','petit basset griffon vendeen','porcelaine','beauceron','berger picard','pyrenean shepherd','catalan sheepdog','spanish water dog','portuguese water dog','perro de presa mallorquin','ca de bou','podenco','cirneco dell etna','bracco italiano','spinone italiano','bergamasco','maremma','neapolitan mastiff','lagotto','volpino italiano','cesky terrier','slovensky cuvac','hovawart','eurasier','kromfohrlander','german spitz','japanese spitz','kai ken','kishu','shikoku','hokkaido','tosa','thai ridgeback','phu quoc','jindo','sapsali','pungsan','chinese crested','shar pei','lowchen','coton de tulear','bolognese','russian toy','black russian terrier','caucasian shepherd','central asian shepherd','south russian ovcharka','laika','finnish spitz','finnish lapphund','swedish vallhund','norwegian elkhound','icelandic sheepdog','danish swedish farmdog','greenland dog','canadian eskimo dog','american hairless terrier','treeing walker coonhound','bluetick coonhound','redbone coonhound','plott hound','black and tan coonhound','american english coonhound','mountain cur','blackmouth cur','carolina dog','alaskan klee kai','toy fox terrier','boston terrier']],
    'Name a vegetable': [[], ['bell pepper','green pepper','red pepper'], ['beans','lima beans','snap peas','snow peas','sweet corn'], ['acorn squash','spaghetti squash','delicata','romaine','iceberg lettuce','butter lettuce','escarole','frisee','broccolini','rapini/broccoli rabe','water chestnut','bamboo shoots','bean sprouts','alfalfa sprouts','jalapeno','poblano','serrano','habanero','green onion/scallion/spring onion','red onion','pearl onion','cherry tomato','new potato','fingerling potato','purple potato','yukon gold','russet','turnip greens','beet greens','dandelion greens'], ['oca','ulluco','mashua','yacon','arracacha','malanga','eddoe','dasheen','konjac','lotus root','arrowhead','water spinach','ong choy','yu choy','choy sum','tatsoi','komatsuna','mibuna','nozawana','takana','gobo','myoga','udo','fuki','warabi','zenmai','seri','mitsuba','shungiku','chrysanthemum greens','malabar spinach','new zealand spinach','orach','good king henry','lambs quarters','purslane','miners lettuce','sea kale','sea beet','marsh samphire','glasswort','cardoon','scorzonera','skirret','hamburg parsley','parsley root','crosne','chinese artichoke','oca','ahipa','maca','mauka','achira','topinambur','winged bean','yardlong bean','drumstick','moringa','ivy gourd','tindora','snake gourd','ridge gourd','luffa','bottle gourd','ash gourd','winter melon','chayote','pointed gourd','parwal','kantola','teasel gourd','tinda','karela','bitter gourd','sponge gourd','fluted pumpkin','ugu','bitterleaf','okazi','scent leaf','waterleaf','jute leaves','molokhia','callaloo','amaranth','dasheen bush','pigeon peas','ackee','breadfruit','christophene']],
    'Name a sport': [[], ['football'], ['ice skating','figure skating','martial arts','kickboxing','horse racing','equestrian','motocross','nascar','formula 1/formula one/f1','rock climbing/climbing','bouldering','frisbee','ultimate frisbee/ultimate','disc golf','paintball','laser tag','esports'], ['sailing','kayaking','canoeing','rafting','waterskiing','wakeboarding','kitesurfing','windsurfing','paddleboarding','scuba diving','snorkeling','free diving','bmx','mountain biking','parkour','jiu jitsu/bjj','muay thai','sambo','krav maga','aikido','capoeira','weightlifting','powerlifting','bodybuilding','crossfit','strongman','arm wrestling','tug of war','billiards/pool','snooker','croquet','bocce','petanque','shuffleboard','horseshoes','cornhole','ski jumping','speed skating','short track','cross country skiing','nordic combined','freestyle skiing','mogul skiing','slalom','marathon','decathlon','heptathlon','hammer throw','javelin','discus','shot put','pole vault','high jump','long jump','triple jump','hurdles','steeplechase','race walking'], ['sepak takraw','kho kho','gilli danda','lagori','pehlwani','mallakhamb','kalaripayattu','silat','pencak silat','sumo','kemari','yabusame','kyudo','naginata','jukendo','sambo','glima','schwingen','hornussen','kubb','bandy','floorball','rinkball','ringette','broomball','skijoring','dog sledding','mushing','kite skiing','sandboarding','bossaball','footgolf','swamp soccer','bog snorkelling','cheese rolling','wife carrying','toe wrestling','extreme ironing','unicycle hockey','underwater rugby','octopush','cycle ball','cyclo cross','gravel racing','track cycling','keirin','omnium','madison','fistball','faustball','hornussen','cestoball','pato','chilean rodeo','charreria','calcio storico','palla','pallone','pelota','basque pelota','fronton','fives','eton fives','rugby fives','real tennis','court tennis','rackets','padel','paddle tennis','platform tennis','speedminton','crossminton','sepak raga','jianzi','shuttlecock','chinlone','hacky sack','footbag','dodgeball','gaga','tchoukball','spikeball/roundnet','quadball','muggle quidditch']],
    'Name a part of the human body': [[], ['teeth/tooth','lips/lip','fingernail/nail','belly button/navel'], ['chest','hips','waist','eyelid','nostril','jaw','spine','bone','muscle','blood','vein','artery'], ['tonsils','adenoids','trachea/windpipe','bronchi','alveoli','ovary','uterus','prostate','thyroid','adrenal gland','pituitary','pineal gland','cerebellum','cerebrum','frontal lobe','temporal lobe','occipital lobe','parietal lobe','brainstem','spinal cord','nerve','tendon','ligament','cartilage','marrow','bone marrow','knuckle','palm','heel','arch','sole','shin','temple','armpit','groin','abdomen','pelvis','sacrum','vertebra','humerus','radius','ulna','sternum','mandible','maxilla','cranium'], ['lacrimal gland','meibomian gland','sclera','choroid','vitreous humor','aqueous humor','fovea','optic nerve','tympanic membrane/eardrum','eustachian tube','semicircular canals','vestibule','oval window','round window','organ of corti','pharynx','nasopharynx','turbinates','sinuses','frenulum','gingiva','palate','soft palate','hard palate','vallecula','arytenoid','cricoid','thyroid cartilage','adams apple','carotid','jugular','aorta','vena cava','ventricle','atrium','mitral valve','tricuspid valve','sinoatrial node','pericardium','pleura','mediastinum','omentum','mesentery','peritoneum','jejunum','ileum','cecum','colon','sigmoid colon','rectum','pylorus','fundus','islets of langerhans','nephron','glomerulus','ureter','urethra','fallopian tube','cervix','epididymis','vas deferens','seminal vesicle','scaphoid','lunate','triquetrum','pisiform','trapezium','trapezoid','capitate','hamate','metacarpal','phalanx','talus','calcaneus','navicular','cuboid','cuneiform','metatarsal','ilium','ischium','pubis','acetabulum','olecranon','acromion','coracoid','xiphoid process','manubrium','atlas','axis','corpus callosum','amygdala','hippocampus','thalamus','basal ganglia','pons','sulcus','gyrus','meninges','dura mater','arachnoid','pia mater','cerebrospinal fluid','canthus','columella','alae','nares','cupids bow','vermilion border','nasolabial fold','uvula','hallux','pollex','purlicue','opisthenar','axilla','antecubital fossa','tarsus','carpus','sartorius','gluteus maximus','latissimus dorsi','trapezius','deltoid','pectoralis','biceps','triceps','quadriceps','hamstring','gastrocnemius','soleus','abdominals','obliques','diaphragm','masseter','buccinator','platysma','sternocleidomastoid']],
    'Name a US state': [[], [], [], [], []],
    'Name a bird': [[], ['bald eagle','hen','rooster','parakeet'], ['mockingbird','bluebird','chickadee','pheasant','quail','sandpiper','loon','kiwi bird'], ['osprey','kestrel','peregrine falcon','barn owl','snowy owl','great horned owl','swift','martin','lark','nightingale','thrush','blackbird','oriole','grackle','cowbird','meadowlark','bobolink','tanager','grosbeak','bunting','junco','towhee','titmouse','creeper','kinglet','vireo','cuckoo','mynah','lovebird','cockatiel','budgerigar','rhea','guinea fowl','partridge','grouse','ptarmigan','sage grouse','prairie chicken','turkey vulture','black vulture','bald eagle','golden eagle','harpy eagle','red tailed hawk','coopers hawk','harrier','kite','buzzard','sparrowhawk','goshawk','skua','tern','gannet','petrel','shearwater','fulmar','auk','guillemot','razorbill','murre','eider','scoter','mallard','teal','wigeon','pintail','shoveler','canvasback','wood duck','mandarin duck','coot','moorhen','rail','gallinule','crane','egret','ibis'], ['bee eater','roller','motmot','trogon','jacamar','puffbird','barbet','honeyguide','mousebird','turaco','go away bird','hamerkop','umbrellabird','cock of the rock','manakin','cotinga','bellbird','antbird','ovenbird','woodcreeper','tapaculo','pitta','broadbill','sunbird','spiderhunter','white eye','babbler','laughingthrush','fulvetta','parrotbill','bulbul','drongo','monarch flycatcher','fantail','paradise flycatcher','whistler','currawong','butcherbird','magpie lark','apostlebird','chough','treecreeper','wallcreeper','dipper','accentor','pipit','wagtail','longspur','snow bunting','crossbill','redpoll','siskin','hawfinch','bullfinch','linnet','twite','serin','weaver','bishop','widowbird','whydah','indigobird','waxbill','munia','mannikin','firefinch','cordon bleu','zebra finch','gouldian finch','java sparrow','pardalote','bristlebird','emu wren','fairywren','grasswren','thornbill','gerygone','scrubwren','honeyeater','wattlebird','friarbird','miner','spinebill','chat','ifrit','berrypecker','satinbird','sittella','shrike thrush','pitohui','bird of paradise','riflebird','manucode','paradise crow','catbird','bowerbird','scrubbird','lyrebird','kagu','sunbittern','seriema','mesite','buttonquail','sandgrouse','tinamou','screamer','magpie goose','steamer duck','torrent duck','hoatzin','oilbird','frogmouth','owlet nightjar','treeswift','hummingbird','sword billed hummingbird','sapsucker','flicker','wryneck','piculet','toucanet','aracari','hornbill','ground hornbill','hoopoe','wood hoopoe','kingfisher','kookaburra','tody','penguin','emperor penguin','king penguin','adelie','gentoo','chinstrap','macaroni penguin','rockhopper','fairy penguin','little penguin','yellow eyed penguin','galapagos penguin','humboldt penguin','african penguin','magellanic penguin','albatross','wandering albatross','storm petrel','diving petrel','tropicbird','anhinga','darter','shag','frigatebird','solan goose','great auk','passenger pigeon','carolina parakeet','moa','elephant bird','haast s eagle','terror bird']],
    'Name a programming language': [[], [], ['json','xml','markdown','yaml'], ['vb net','cuda','glsl','hlsl','gdscript','luau','autohotkey','batch','applescript','actionscript','vbscript','tcl','awk','sed','m4','makefile','cmake','nix','terraform','hcl','graphql','sparql','prolog','lisp'], ['algol','simula','bcpl','b','pl i','modula','oberon','eiffel','sather','self','io','rebol','red','factor','joy','cat','j','k','q','apl','befunge','malbolge','whitespace','intercal','lolcode','shakespeare','chef','piet','rockstar','emojicode','arnoldc','brainf','ook','unlambda','false','snobol','icon','unicon','logo','basic','qbasic','quickbasic','turbo pascal','freebasic','purebasic','blitzbasic','darkbasic','gml','game maker language','hack','reason','rescript','purescript','idris','agda','coq','lean','isabelle','miranda','clean','mercury','curry','oz','alice','chapel','x10','fortress','pony','vala','genie','d','carbon','mojo','vlang','jai','beef','hare','roc','grain','unison','koka','flix','lobster','wren','squirrel','angelscript','pawn','moonscript','fennel','janet','hy','arc','newlisp','picolisp','emacs lisp/elisp','autolisp','common lisp','clojurescript','livescript','typescript','assemblyscript','webassembly/wasm','opencl','metal','vhdl','verilog','systemverilog','chisel','spinalhdl','ladder logic','structured text','abap','apex','rpg','jcl','rexx','natural','mumps','pl sql','t sql','plpgsql','q sharp','qiskit','silq','cirq']],
    'Name something you find in a kitchen': [[], ['glass','towel','stove top','counter/countertop'], ['oven','pantry','spice rack','trash can/garbage can/bin','fruit bowl','dish rack','faucet','tea towel','plastic wrap','aluminum foil/tin foil/foil','ziploc bag','tupperware','salt shaker','pepper grinder','toaster'], ['stand mixer','hand mixer','immersion blender','rice cooker','waffle iron','griddle','cast iron/cast iron skillet','saucepan','stockpot','baking sheet','cookie sheet','loaf pan','pie dish','cake pan','cooling rack','meat thermometer','kitchen scale','measuring spoons','funnel','strainer','slotted spoon','wooden spoon','pizza cutter','pizza stone','bottle opener','corkscrew','ice cube tray','ice maker','water filter','range hood','backsplash','lazy susan','breadbox','cookie jar','knife block','paring knife','chef s knife/chefs knife','bread knife','cleaver','sharpener','honing steel','oven rack','broiler','pot holder','dish soap','scrub brush','steel wool','paper towel holder','magnet','calendar','fridge magnet'], ['fish slice','egg slicer','egg separator','melon baller','apple corer','cherry pitter','herb stripper','pastry cutter','cookie cutter','piping bag','offset spatula','bench knife','lame','proofing basket/banneton','couche','dough hook','paddle attachment','sous vide','dehydrator','smoker','yogurt maker','bread machine','pasta maker','pasta roller','ravioli stamp','gnocchi board','spaetzle maker','tortilla press','comal','molcajete','suribachi','surikogi','donabe','tamagoyaki pan','takoyaki pan','bamboo steamer','spider strainer','chinois','tamis','drum sieve','fat separator','gravy boat','butter dish','butter bell','salt pig','salt cellar','cruet','soup tureen','chafing dish','fondue pot','raclette grill','paella pan','cataplana','couscoussier','tandoor','tawa','karahi','kadai','pressure canner','mason jar','crock','fermentation crock','kimchi fridge','spice grinder','burr grinder','french press','moka pot','percolator','chemex','aeropress','pour over','siphon','samovar','tea kettle','teapot','tea infuser','tea strainer','cocktail shaker','jigger','muddler','bar spoon','citrus reamer','juicer','salamander','plancha','flat top','deep fryer','spoon rest','utensil crock','pot rack','plate rack','drying rack','dish drainer','garbage disposal','compost bin','recycling bin','pantry moth trap','silverware drawer','junk drawer']],
  };
  for (const p of PROMPTS) {
    const extra = ADD[p.q]; if (!extra) continue;
    extra.forEach((list, i) => { for (const a of list) if (a && !p.t[i].includes(a)) p.t[i].push(a); });
  }
  // remove accidental duplicates across tiers (keep the most common tier)
  for (const p of PROMPTS) {
    const seen = new Set();
    p.t.forEach((list, i) => { p.t[i] = list.filter((a) => { const k = norm(a.split('/')[0]); if (!k || seen.has(k)) return false; seen.add(k); return true; }); });
  }

  // ---------- HELPERS ----------
  const rng = (seed) => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const shuffle = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const today = new Date(); const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const diveNo = Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - new Date(2026, 0, 1)) / 864e5) + 1;
  const depthOf = (pts) => Math.round((pts / (ROUND * 100)) * MAX_DEPTH);
  const zoneOf = (m) => ZONES.find(([lim]) => m <= lim)[1];
  const mem = {};                                   // fallback when the page blocks localStorage
  const store = {
    get(k, d) { try { const v = localStorage.getItem('deepdive:' + k); if (v != null) return JSON.parse(v); } catch {} return k in mem ? mem[k] : d; },
    set(k, v) { mem[k] = v; try { localStorage.setItem('deepdive:' + k, JSON.stringify(v)); } catch {} },
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- WHERE TO DRAW: new tab if allowed, otherwise full-screen overlay ----------
  let win = null;
  try { win = window.open('', '_blank'); } catch {}
  let doc, inNewTab = false;
  if (win && win.document) {
    doc = win.document; inNewTab = true;
    doc.open(); doc.write('<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>DEEP DIVE</title><meta name="theme-color" content="#050a14"></head><body style="margin:0;background:#050a14"></body></html>'); doc.close();
  } else {
    doc = document; win = window;
    document.getElementById('deep-dive-host')?.__dd_close?.();
    document.getElementById('deep-dive-host')?.remove();
  }
  const host = doc.createElement('div');
  host.id = 'deep-dive-host';
  host.style.cssText = 'position:fixed;inset:0;z-index:2147483647;';
  doc.body.appendChild(host);
  const root = host.attachShadow({ mode: 'open' });

  const CSS = `
  :host{all:initial}
  *{box-sizing:border-box;margin:0;padding:0}
  .app{position:absolute;inset:0;overflow:hidden;background:#050a14;color:#e6f4ff;
    font-family:ui-rounded,"SF Pro Rounded",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
  canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
  .vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.55) 100%)}
  .ui{position:absolute;inset:0;overflow-y:auto;display:flex;justify-content:center;align-items:flex-start}
  .wrap{position:relative;width:min(540px,100%);min-height:100%;padding:70px 22px 40px 64px;display:flex;flex-direction:column;justify-content:center;gap:16px}
  @media (max-width:520px){.wrap{padding-left:46px;padding-right:14px}}
  .screen-in>*{animation:rise-in .6s cubic-bezier(.2,.8,.2,1) both}
  .screen-in>*:nth-child(2){animation-delay:.07s}.screen-in>*:nth-child(3){animation-delay:.14s}
  .screen-in>*:nth-child(4){animation-delay:.21s}.screen-in>*:nth-child(5){animation-delay:.28s}.screen-in>*:nth-child(6){animation-delay:.35s}
  @keyframes rise-in{from{opacity:0;transform:translateY(26px);filter:blur(6px)}}
  .screen-out{animation:sink-out .35s ease-in forwards}
  @keyframes sink-out{to{opacity:0;transform:translateY(40px);filter:blur(6px)}}

  /* HUD */
  .hud{position:absolute;top:0;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;z-index:4;pointer-events:none}
  .hud>*{pointer-events:auto}
  .brand{font-weight:900;letter-spacing:.32em;font-size:13px;opacity:.75}
  .hudr{display:flex;align-items:center;gap:10px}
  .depthread{font-variant-numeric:tabular-nums;font-weight:800;font-size:15px;padding:6px 12px;border-radius:99px;background:rgba(5,10,20,.5);border:1px solid rgba(160,220,255,.18);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
  .depthread small{opacity:.6;font-weight:600;margin-left:6px;letter-spacing:.05em}
  .icon{width:34px;height:34px;border-radius:50%;border:1px solid rgba(160,220,255,.2);background:rgba(5,10,20,.5);color:#e6f4ff;font-size:16px;cursor:pointer;display:grid;place-items:center}

  /* depth ruler */
  .ruler{position:absolute;left:14px;top:80px;bottom:40px;width:28px;z-index:3;pointer-events:none}
  .ruler .line{position:absolute;left:13px;top:0;bottom:0;width:2px;border-radius:2px;background:linear-gradient(#7dd3fc,#0ea5e9 10%,#1e3a8a 40%,#1e1b4b 70%,#000)}
  .ruler .tick{position:absolute;left:8px;width:12px;height:2px;background:rgba(200,230,255,.35)}
  .ruler .lbl{position:absolute;left:26px;transform:translateY(-50%);font-size:10px;letter-spacing:.08em;white-space:nowrap;opacity:.45;text-transform:uppercase}
  @media (max-width:760px){.ruler .lbl{display:none}}
  .ruler .me{position:absolute;left:0;transform:translateY(-50%);font-size:22px;transition:top 2s cubic-bezier(.3,.7,.2,1);filter:drop-shadow(0 0 8px rgba(255,170,120,.8))}

  /* type */
  .wordmark{font-weight:900;font-size:clamp(46px,12vw,78px);letter-spacing:.06em;text-align:center;line-height:1;display:flex;justify-content:center}
  .wordmark span{display:inline-block;animation:bob 3.2s ease-in-out infinite;background:linear-gradient(180deg,#fff,#9be7ff 55%,#3ba7e0);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 8px 40px rgba(90,200,255,.25)}
  @keyframes bob{50%{transform:translateY(-7px) rotate(-1.5deg)}}
  .tag{text-align:center;font-size:19px;font-style:italic;color:#06324d;font-weight:600;text-shadow:0 1px 12px rgba(255,255,255,.6)}
  .descending{text-align:center;font-size:13px;letter-spacing:.4em;text-transform:uppercase;color:#0b4a70;font-weight:700;opacity:.8}
  .descending i{font-style:normal;animation:blink 1.4s infinite}.descending i:nth-child(2){animation-delay:.2s}.descending i:nth-child(3){animation-delay:.4s}
  @keyframes blink{0%,100%{opacity:.15}50%{opacity:1}}

  .card{background:linear-gradient(180deg,rgba(20,40,70,.55),rgba(5,10,20,.55));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
    border:1px solid rgba(160,220,255,.16);border-radius:22px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.08)}
  .btn{position:relative;overflow:hidden;display:block;width:100%;padding:17px;border:0;border-radius:16px;font:inherit;font-size:18px;font-weight:800;letter-spacing:.02em;cursor:pointer;
    color:#04202f;background:linear-gradient(180deg,#bff0ff,#5cc8f0);box-shadow:0 8px 30px rgba(60,180,240,.35),inset 0 -3px 0 rgba(0,0,0,.15);transition:transform .12s,box-shadow .2s}
  .btn:hover{box-shadow:0 10px 40px rgba(60,180,240,.55),inset 0 -3px 0 rgba(0,0,0,.15)} .btn:active{transform:scale(.96)}
  .btn::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-20deg);animation:sheen 3.5s infinite}
  @keyframes sheen{0%,70%{left:-60%}100%{left:130%}}
  .btn.alt{background:rgba(160,220,255,.08);color:#e6f4ff;border:1px solid rgba(160,220,255,.25);box-shadow:none}
  .btn.alt::after{display:none}
  .row{display:flex;gap:10px} .row>*{flex:1}
  ol.how{padding-left:20px;line-height:1.7;font-size:15px;opacity:.9}
  .tiers{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
  .pill{font-size:12px;padding:5px 10px;border-radius:99px;background:rgba(255,255,255,.06);border:1px solid currentColor}
  .foot{text-align:center;font-size:12px;opacity:.5}

  /* play */
  .top{display:flex;justify-content:space-between;align-items:center;padding:6px 6px 6px 16px;border-radius:99px;background:rgba(5,10,20,.55);border:1px solid rgba(160,220,255,.14);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
  .ring{transform:scale(.85)}
  .dots{display:flex;gap:7px}
  .dots i{width:30px;height:8px;border-radius:99px;background:rgba(160,220,255,.15);display:block;transition:all .4s}
  .dots i.cur{background:rgba(220,245,255,.85);box-shadow:0 0 12px rgba(160,230,255,.8);animation:pulse 1.4s infinite}
  @keyframes pulse{50%{opacity:.5}}
  .ring{position:relative;width:64px;height:64px}
  .ring svg{transform:rotate(-90deg)}
  .ring circle{fill:none;stroke-width:5}
  .ring .bg{stroke:rgba(160,220,255,.15)}
  .ring .fg{stroke:#7fe0ff;stroke-linecap:round;filter:drop-shadow(0 0 6px #7fe0ff);transition:stroke .3s}
  .ring .num{position:absolute;inset:0;display:grid;place-items:center;font-weight:900;font-size:22px;font-variant-numeric:tabular-nums}
  .ring.low .fg{stroke:#ff6b81;filter:drop-shadow(0 0 8px #ff6b81)} .ring.low .num{color:#ff9aa9;animation:thump 1s infinite}
  @keyframes thump{10%{transform:scale(1.25)}30%{transform:scale(1)}}
  .qno{font-size:12px;letter-spacing:.3em;text-transform:uppercase;text-align:center;font-weight:700;color:#fff;opacity:.8;text-shadow:0 1px 8px rgba(0,0,0,.6)}
  .prompt{font-size:clamp(26px,6vw,34px);font-weight:900;line-height:1.15;text-align:center;padding:6px 0 2px}
  .prompt span{display:inline-block;animation:word .5s cubic-bezier(.2,.8,.2,1) both}
  @keyframes word{from{opacity:0;transform:translateY(14px) scale(.9)}}
  .field{position:relative}
  input{width:100%;padding:18px 20px;border-radius:16px;border:2px solid rgba(160,220,255,.25);background:rgba(3,8,18,.6);color:#fff;font:inherit;font-size:21px;font-weight:700;outline:none;transition:border-color .2s,box-shadow .2s}
  input::placeholder{color:rgba(200,230,255,.35);font-weight:500}
  input:focus{border-color:#7fe0ff;box-shadow:0 0 0 4px rgba(127,224,255,.15),0 0 30px rgba(127,224,255,.2)}
  .shake{animation:shake .4s} @keyframes shake{15%,55%{transform:translateX(-10px)}35%,75%{transform:translateX(10px)}}
  .bad input{border-color:#ff6b81;box-shadow:0 0 0 4px rgba(255,107,129,.15)}
  .msg{min-height:22px;text-align:center;font-size:15px;color:#ffb3bf}
  .msg.in{animation:rise-in .3s both}

  /* reveal */
  .reveal{text-align:center;padding:30px 16px;overflow:hidden}
  .reveal .em{font-size:84px;display:inline-block;animation:drop .7s cubic-bezier(.3,1.6,.5,1) both}
  @keyframes drop{from{transform:translateY(-60px) scale(.3) rotate(-25deg);opacity:0}}
  .reveal .nm{font-size:30px;font-weight:900;margin-top:8px;letter-spacing:.02em;animation:stamp .5s .25s cubic-bezier(.3,1.8,.5,1) both}
  @keyframes stamp{from{transform:scale(2.4);opacity:0}}
  .reveal .ans{font-size:18px;opacity:.9;margin-top:8px;animation:rise-in .4s .45s both}
  .reveal .pts{font-size:44px;font-weight:900;margin-top:6px;font-variant-numeric:tabular-nums;animation:rise-in .4s .55s both}
  .reveal .sink{font-size:13px;letter-spacing:.3em;text-transform:uppercase;opacity:.6;margin-top:10px;animation:rise-in .4s .7s both}
  .reveal.legend{border-color:rgba(255,210,90,.6);box-shadow:0 0 60px rgba(255,200,80,.35),inset 0 0 40px rgba(255,200,80,.12)}
  .reveal.legend .nm{background:linear-gradient(90deg,#fff3b0,#ffc83d,#fff3b0,#ffb020);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:stamp .5s .25s cubic-bezier(.3,1.8,.5,1) both,shimmer 1.2s linear infinite}
  @keyframes shimmer{to{background-position:-200% 0}}
  .ripple{position:absolute;left:50%;top:38%;width:20px;height:20px;margin:-10px;border-radius:50%;border:2px solid currentColor;animation:ripple 1.4s ease-out forwards;pointer-events:none}
  @keyframes ripple{to{transform:scale(28);opacity:0}}
  .reveal.miss .em{animation:drop .7s both,sway 2s ease-in-out .7s infinite}
  @keyframes sway{50%{transform:rotate(12deg)}}

  /* results */
  .big{font-size:clamp(54px,15vw,84px);font-weight:900;text-align:center;letter-spacing:-.02em;font-variant-numeric:tabular-nums;line-height:1;
    background:linear-gradient(180deg,#fff,#8fdcff);-webkit-background-clip:text;background-clip:text;color:transparent}
  .unit{text-align:center;font-size:13px;letter-spacing:.35em;text-transform:uppercase;opacity:.6;margin-top:6px}
  .zone{text-align:center;font-size:22px;font-weight:900;margin-top:12px}
  .score{text-align:center;opacity:.8;margin-top:4px}
  .tiles{display:flex;justify-content:center;gap:8px;margin-top:16px}
  .tiles b{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-size:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);animation:flip .5s cubic-bezier(.3,1.5,.5,1) both}
  @keyframes flip{from{transform:rotateX(90deg) scale(.6);opacity:0}}
  table{width:100%;border-collapse:collapse;font-size:14px;color:inherit}
  td{color:inherit;font-size:14px}
  td{padding:10px 4px;border-bottom:1px solid rgba(160,220,255,.1);vertical-align:top}
  tr:last-child td{border-bottom:0}
  td.r{text-align:right;white-space:nowrap;font-weight:800}
  .hint{font-size:12px;opacity:.55;margin-top:3px;font-weight:500}
  `;
  try { const sheet = new win.CSSStyleSheet(); sheet.replaceSync(CSS); root.adoptedStyleSheets = [sheet]; }
  catch { const st = doc.createElement('style'); st.textContent = CSS; root.appendChild(st); }

  const app = doc.createElement('div'); app.className = 'app'; root.appendChild(app);
  const zonesLbl = [[0, 'Surface'], [200, 'Twilight'], [1000, 'Midnight'], [4000, 'Abyss'], [6000, 'Hadal'], [MAX_DEPTH, 'Challenger Deep']];
  app.innerHTML = `
    <canvas></canvas><div class="vignette"></div>
    <div class="ruler"><div class="line"></div>
      ${zonesLbl.map(([m, n]) => `<div class="tick" style="top:${(m / MAX_DEPTH) * 100}%"></div><div class="lbl" style="top:${(m / MAX_DEPTH) * 100}%;${m === 200 ? 'margin-top:9px' : m === 0 ? 'margin-top:-5px' : ''}">${n}</div>`).join('')}
      <div class="me" style="top:0%">🦐</div></div>
    <div class="hud"><div class="brand">DEEP DIVE</div>
      <div class="hudr"><div class="depthread"><span id="dm">0</span> m<small id="dz">SURFACE</small></div>
      <button class="icon" data-act="mute" id="mute" title="Sound">🔊</button>${inNewTab ? '' : '<button class="icon" data-act="close" title="Close (Esc)">✕</button>'}</div></div>
    <div class="ui"><div class="wrap" id="wrap"></div></div>`;
  const $ = (id) => root.getElementById(id);
  const canvas = app.querySelector('canvas'), ctx = canvas.getContext('2d');
  const wrap = $('wrap'), meEl = app.querySelector('.ruler .me');

  // ---------- SOUND (tiny synth, no files) ----------
  let muted = store.get('muted', false), AC = null;
  $('mute').textContent = muted ? '🔇' : '🔊';
  const tone = (freq, dur = 0.25, type = 'sine', vol = 0.15, slide = 0, delay = 0) => {
    if (muted) return;
    try {
      AC = AC || new (win.AudioContext || win.webkitAudioContext)();
      const t = AC.currentTime + delay, o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + dur);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(AC.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch {}
  };
  const sfx = {
    sonar: () => { tone(880, 1.2, 'sine', 0.12); tone(880, 1.4, 'sine', 0.04, 0, 0.35); },
    tier: (n) => [523, 659, 784, 988, 1175].slice(0, n).forEach((f, i) => tone(f, 0.35, 'triangle', 0.12, 0, i * 0.09)),
    wrong: () => tone(180, 0.25, 'sawtooth', 0.08, 0.6),
    tick: () => tone(1400, 0.05, 'square', 0.04),
    bubble: () => tone(300 + Math.random() * 300, 0.12, 'sine', 0.08, 2.2),
    splash: () => { for (let i = 0; i < 6; i++) tone(200 + Math.random() * 500, 0.2, 'sine', 0.06, 2, i * 0.04); },
  };

  // ---------- OCEAN RENDERER ----------
  const DPR = Math.min(2, win.devicePixelRatio || 1);
  let W = 0, H = 0;
  const resize = () => { W = app.clientWidth; H = app.clientHeight; canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0); };
  resize(); win.addEventListener('resize', resize);
  const PX_PER_M = () => H / 220;                          // ~220 m visible on screen
  let cam = -40, camTarget = -40, lastCam = cam;           // camera depth in metres (negative = sky)
  const STOPS = [[-60, [120, 200, 240]], [0, [40, 150, 210]], [80, [16, 100, 170]], [200, [10, 60, 120]], [600, [8, 34, 72]],
    [1000, [6, 20, 44]], [3000, [5, 10, 20]], [6000, [3, 6, 13]], [MAX_DEPTH, [1, 2, 5]]];
  const colAt = (m) => {
    if (m <= STOPS[0][0]) return STOPS[0][1];
    for (let i = 1; i < STOPS.length; i++) if (m <= STOPS[i][0]) {
      const [m0, c0] = STOPS[i - 1], [m1, c1] = STOPS[i], f = (m - m0) / (m1 - m0);
      return c0.map((v, k) => Math.round(v + (c1[k] - v) * f));
    }
    return STOPS[STOPS.length - 1][1];
  };
  const rgb = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const R = rng(12345);
  // creatures placed through the water column
  const FAUNA = [
    [0, 200, ['🐠', '🐟', '🐡', '🐬', '🐢', '🦈', '🐠', '🐟']],
    [200, 1000, ['🪼', '🦑', '🐋', '🐟', '🪼']],
    [1000, 4000, ['🦑', '🪼', '🐙', '🐟']],
    [4000, 6000, ['🐙', '🦐', '🦀', '🪼']],
    [6000, MAX_DEPTH, ['🦐', '🐟', '🪼', '🦐']],
  ];
  const creatures = [];
  for (let m = 15; m < MAX_DEPTH - 40; m += 22 + R() * 40) {
    const z = FAUNA.find(([a, b]) => m >= a && m < b);
    const e = z[2][Math.floor(R() * z[2].length)];
    creatures.push({ m, e, x: R(), dir: R() < 0.5 ? -1 : 1, sp: 0.00004 + R() * 0.00012, size: 18 + R() * (e === '🐋' || e === '🦑' && m > 1000 ? 46 : 22),
      glow: m > 700, phase: R() * 6.28, angler: m > 1000 && e === '🐟' });
  }
  const rocks = Array.from({ length: 140 }, (_, i) => 0.6 + R() * 0.6);
  const snow = Array.from({ length: 110 }, () => ({ x: Math.random(), y: Math.random(), z: 0.3 + Math.random() * 0.9, r: 0.5 + Math.random() * 1.6 }));
  const glints = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), p: Math.random() * 6.28, s: 0.5 + Math.random() * 2, c: Math.random() < 0.5 ? '120,255,230' : '140,180,255' }));
  let fx = [];                                             // screen-space particles (bubbles, krill shower)
  const burst = (n, kind = 'bubble', color) => {
    for (let i = 0; i < n; i++) fx.push(kind === 'bubble'
      ? { k: 'b', x: W / 2 + (Math.random() - 0.5) * 220, y: H * 0.55 + Math.random() * 80, vx: (Math.random() - 0.5) * 0.6, vy: -(1.2 + Math.random() * 2.6), r: 2 + Math.random() * 7, life: 1 }
      : { k: 'k', x: Math.random() * W, y: -30 - Math.random() * H * 0.6, vx: (Math.random() - 0.5) * 0.8, vy: 1.5 + Math.random() * 2.5, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.1, life: 1, e: kind, c: color });
  };

  let t0 = performance.now(), running = true;
  function frame(now) {
    if (!running) return;
    const t = (now - t0) / 1000;
    cam += (camTarget - cam) * 0.028;
    if (Math.abs(camTarget - cam) < 0.6) cam = camTarget;
    const k = PX_PER_M(), dyPx = (cam - lastCam) * k; lastCam = cam;
    const yOf = (m) => H / 2 + (m - cam) * k;
    // water gradient
    const top = cam - H / 2 / k, bot = cam + H / 2 / k;
    const g = ctx.createLinearGradient(0, 0, 0, H);
    for (let i = 0; i <= 6; i++) g.addColorStop(i / 6, rgb(colAt(top + (bot - top) * i / 6)));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // sky + waves at the surface
    const ys = yOf(0);
    if (ys > -40) {
      const sky = ctx.createLinearGradient(0, ys - H, 0, ys);
      sky.addColorStop(0, '#9fd8ff'); sky.addColorStop(1, '#e8f7ff');
      ctx.fillStyle = sky; ctx.beginPath(); ctx.moveTo(0, -10);
      for (let x = 0; x <= W + 20; x += 20) ctx.lineTo(x, ys + Math.sin(x * 0.02 + t * 1.6) * 6 + Math.sin(x * 0.007 - t) * 5);
      ctx.lineTo(W, -10); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath();
      for (let x = 0; x <= W + 20; x += 20) ctx.lineTo(x, ys + Math.sin(x * 0.02 + t * 1.6) * 6 + Math.sin(x * 0.007 - t) * 5);
      ctx.stroke();
    }
    // god rays
    const rayA = Math.max(0, 1 - Math.max(0, cam) / 260);
    if (rayA > 0) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 7; i++) {
        const x = (i / 7) * W + Math.sin(t * 0.3 + i) * 40, w = 40 + (i % 3) * 30;
        const rg = ctx.createLinearGradient(0, Math.max(0, ys), 0, H);
        rg.addColorStop(0, `rgba(200,240,255,${0.12 * rayA})`); rg.addColorStop(1, 'rgba(200,240,255,0)');
        ctx.fillStyle = rg; ctx.beginPath(); ctx.moveTo(x, Math.max(0, ys)); ctx.lineTo(x + w, Math.max(0, ys)); ctx.lineTo(x + w * 3 + 120, H); ctx.lineTo(x + 120, H); ctx.fill();
      }
      ctx.restore();
    }
    // trench walls below 6000 m
    if (bot > 5600) {
      ctx.fillStyle = 'rgba(0,0,0,.85)';
      for (const side of [0, 1]) {
        ctx.beginPath(); ctx.moveTo(side ? W : 0, Math.max(0, yOf(5600)));
        for (let m = Math.max(5600, Math.floor(top / 50) * 50); m <= bot + 50; m += 50) {
          const depthF = Math.min(1, (m - 5600) / 2500), w = W * 0.22 * depthF * rocks[Math.floor(m / 50) % rocks.length];
          ctx.lineTo(side ? W - w : w, yOf(m));
        }
        ctx.lineTo(side ? W : 0, H); ctx.closePath(); ctx.fill();
      }
    }
    // sea floor at Challenger Deep
    const yf = yOf(MAX_DEPTH);
    if (yf < H + 20) {
      ctx.fillStyle = '#0a0d12'; ctx.beginPath(); ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 30) ctx.lineTo(x, yf + Math.sin(x * 0.05) * 8 + Math.sin(x * 0.013) * 14);
      ctx.lineTo(W, H); ctx.fill();
      ctx.fillStyle = 'rgba(180,220,255,.5)'; ctx.font = '700 12px -apple-system,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('CHALLENGER DEEP · 10,935 m', W / 2, yf + 40);
    }
    // bioluminescent glints in the dark
    const dark = Math.min(1, Math.max(0, (cam - 600) / 1500));
    if (dark > 0) for (const s of glints) {
      const a = dark * (0.5 + 0.5 * Math.sin(t * s.s + s.p)) ** 6;
      if (a < 0.02) continue;
      ctx.fillStyle = `rgba(${s.c},${a})`; ctx.shadowColor = `rgba(${s.c},1)`; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, 1.8, 0, 6.28); ctx.fill();
    }
    ctx.shadowBlur = 0;
    // creatures
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const c of creatures) {
      const y = yOf(c.m) + Math.sin(t * 0.8 + c.phase) * 10;
      if (y < -80 || y > H + 80) continue;
      c.x += c.dir * c.sp * 16; if (c.x > 1.15) c.x = -0.15; if (c.x < -0.15) c.x = 1.15;
      const x = c.x * W;
      ctx.save(); ctx.translate(x, y); if (c.dir > 0) ctx.scale(-1, 1);
      ctx.globalAlpha = c.glow ? 0.75 : 0.9;
      if (c.glow) { ctx.shadowColor = c.m > 4000 ? 'rgba(255,120,200,.9)' : 'rgba(120,230,255,.9)'; ctx.shadowBlur = 18; }
      ctx.font = `${c.size}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;
      ctx.fillText(c.e, 0, 0);
      if (c.angler) { ctx.fillStyle = '#fffbb0'; ctx.shadowColor = '#fff59a'; ctx.shadowBlur = 25; ctx.beginPath(); ctx.arc(-c.size * 0.7, -c.size * 0.55, 3.5 + Math.sin(t * 3 + c.phase), 0, 6.28); ctx.fill(); }
      ctx.restore();
    }
    // marine snow (streaks while descending)
    const speed = Math.min(40, Math.abs(dyPx));
    for (const p of snow) {
      p.y += (0.0004 * p.z) - dyPx / H * p.z; p.x += Math.sin(t + p.z * 10) * 0.0002;
      if (p.y > 1.05) p.y -= 1.1; if (p.y < -0.05) p.y += 1.1;
      ctx.strokeStyle = ctx.fillStyle = `rgba(220,240,255,${0.15 + 0.35 * p.z})`;
      if (speed > 2) { ctx.lineWidth = p.r; ctx.beginPath(); ctx.moveTo(p.x * W, p.y * H); ctx.lineTo(p.x * W, p.y * H + speed * p.z * 1.5); ctx.stroke(); }
      else { ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, 6.28); ctx.fill(); }
    }
    // fx particles
    fx = fx.filter((p) => p.life > 0 && p.y > -60 && p.y < H + 60);
    for (const p of fx) {
      p.x += p.vx; p.y += p.vy;
      if (p.k === 'b') { p.vx += Math.sin(p.y * 0.05) * 0.03; p.life -= 0.006; ctx.strokeStyle = `rgba(220,245,255,${p.life * 0.8})`; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28); ctx.stroke(); ctx.fillStyle = `rgba(255,255,255,${p.life * 0.6})`; ctx.beginPath(); ctx.arc(p.x - p.r * 0.35, p.y - p.r * 0.35, p.r * 0.25, 0, 6.28); ctx.fill(); }
      else { p.rot += p.vr; p.life -= 0.004; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = Math.min(1, p.life * 2);
        ctx.shadowColor = p.c || '#ffcc55'; ctx.shadowBlur = 14; ctx.font = '22px "Apple Color Emoji",sans-serif'; ctx.fillText(p.e, 0, 0); ctx.restore(); }
    }
    // HUD depth readout
    const shown = Math.max(0, Math.round(cam));
    $('dm').textContent = shown.toLocaleString();
    $('dz').textContent = (cam < 1 ? 'SURFACE' : zoneOf(shown).replace(' Zone', '')).toUpperCase();
    win.requestAnimationFrame(frame);
  }
  win.requestAnimationFrame(frame);
  const diveTo = (m) => { camTarget = Math.max(0, Math.min(MAX_DEPTH, m)); meEl.style.top = (camTarget / MAX_DEPTH) * 100 + '%'; };

  // ---------- SCREENS ----------
  let S = null, tick = null;
  const totalPts = () => S.results.reduce((a, r) => a + TIERS[r.tier].pts, 0);
  const render = (html, after) => {
    const swap = () => { wrap.className = 'wrap screen-in'; wrap.innerHTML = html; wrap.parentElement.scrollTop = 0; after && after(); };
    if (wrap.innerHTML) { wrap.className = 'wrap screen-out'; setTimeout(swap, 300); } else swap();
  };
  const letters = (s) => [...s].map((ch, i) => `<span style="animation-delay:${-i * 0.18}s">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');

  function home() {
    clearInterval(tick); S = null; camTarget = -40; meEl.style.top = '0%';
    const best = store.get('best', 0), daily = store.get('daily:' + dateKey, null);
    render(`
      <div class="wordmark">${letters('DEEP DIVE')}</div>
      <p class="tag">one in a billion.</p>
      <div class="descending">descending<i>.</i><i>.</i><i>.</i></div>
      <div class="card"><ol class="how">
        <li>${ROUND} prompts, ${SECONDS} seconds each.</li>
        <li>Any <b>correct</b> answer counts — but the rarer it is, the deeper you sink.</li>
        <li>Wrong guess? Keep trying until the clock runs out.</li>
        <li>A perfect ${ROUND * 100} reaches Challenger Deep, ${MAX_DEPTH.toLocaleString()} m down.</li>
      </ol>
      <div class="tiers">${TIERS.slice(1).map((t) => `<span class="pill" style="color:${t.color}">${t.emoji} ${t.name} · ${t.pts}</span>`).join('')}</div></div>
      <button class="btn" data-act="daily">${daily != null ? `✅ Daily Dive #${diveNo} · ${daily} pts — replay` : `Start Daily Dive #${diveNo}`}</button>
      <button class="btn alt" data-act="unlimited">Unlimited</button>
      <p class="foot">${PROMPTS.length} prompts · ${PROMPTS.reduce((a, p) => a + p.t.flat().length, 0).toLocaleString()} answers · Personal best ${best} / ${ROUND * 100} · Esc to close</p>`);
  }

  function start(mode) {
    const r = mode === 'daily' ? rng([...dateKey].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) : Math.random;
    let picks = shuffle(PROMPTS, r);
    if (mode !== 'daily') {                       // Unlimited: play prompts you haven't seen recently first
      const recent = store.get('recent', []);
      picks = [...picks.filter((p) => !recent.includes(p.q)), ...picks.filter((p) => recent.includes(p.q))];
      store.set('recent', [...recent.filter((q) => !picks.slice(0, ROUND).some((p) => p.q === q)), ...picks.slice(0, ROUND).map((p) => p.q)].slice(-(PROMPTS.length - ROUND)));
    }
    S = { mode, prompts: picks.slice(0, ROUND), i: 0, results: [] };
    sfx.splash(); burst(40); diveTo(0); setTimeout(ask, 500);
  }

  function ask() {
    const p = S.prompts[S.i], C = 2 * Math.PI * 28;
    render(`
      <div class="top"><div class="dots">${S.prompts.map((_, k) => `<i class="${k === S.i ? 'cur' : ''}" style="${k < S.i ? `background:${TIERS[S.results[k].tier].color};box-shadow:0 0 10px ${TIERS[S.results[k].tier].color}` : ''}"></i>`).join('')}</div>
        <div class="ring" id="ring"><svg width="64" height="64"><circle class="bg" cx="32" cy="32" r="28"/><circle class="fg" id="arc" cx="32" cy="32" r="28" stroke-dasharray="${C}" stroke-dashoffset="0"/></svg><div class="num" id="t">${SECONDS}</div></div></div>
      <div class="qno">Prompt ${S.i + 1} of ${ROUND}</div>
      <div class="card"><div class="prompt">${p.q.split(' ').map((w, i) => `<span style="animation-delay:${0.25 + i * 0.07}s">${esc(w)}</span>`).join(' ')}</div></div>
      <div class="field" id="field"><input id="in" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Something nobody else will say…" maxlength="60"></div>
      <button class="btn" data-act="submit">Dive ↓</button>
      <div class="msg" id="msg"></div>`, () => {
      sfx.sonar();
      S.wrong = new Set(); S.end = Date.now() + SECONDS * 1000; S.locked = false; S.lastSec = SECONDS;
      setTimeout(() => $('in')?.focus(), 80);
      clearInterval(tick);
      tick = setInterval(() => {
        const left = Math.max(0, S.end - Date.now()), sec = Math.ceil(left / 1000);
        const tEl = $('t'), arc = $('arc'), ring = $('ring');
        if (tEl) tEl.textContent = sec;
        if (arc) arc.style.strokeDashoffset = C * (1 - left / (SECONDS * 1000));
        if (ring) ring.classList.toggle('low', left < 6000);
        if (sec !== S.lastSec) { S.lastSec = sec; if (sec <= 5 && sec > 0) sfx.tick(); }
        if (left <= 0) { clearInterval(tick); finish(null); }
      }, 50);
    });
  }

  function submit() {
    if (!S || S.locked) return;
    const inp = $('in'), msg = $('msg'), field = $('field');
    if (!inp) return;
    const val = inp.value.trim(); if (!val) return;
    const n = norm(val), res = check(val, S.prompts[S.i]);
    if (res) { clearInterval(tick); finish({ input: val, ...res }); return; }
    sfx.wrong();
    field.classList.remove('shake', 'bad'); void field.offsetWidth; field.classList.add('shake', 'bad');
    setTimeout(() => field.classList.remove('bad'), 600);
    msg.classList.remove('in'); void msg.offsetWidth; msg.classList.add('in');
    msg.textContent = S.wrong.has(n) ? 'You already tried that one.' : `“${val}” isn't on the list — try another!`;
    S.wrong.add(n); inp.value = '';
  }

  function finish(res) {
    S.locked = true;
    const tier = res ? res.tier : 0, T = TIERS[tier];
    S.results.push({ q: S.prompts[S.i].q, input: res ? res.answer : null, tier, prompt: S.prompts[S.i] });
    const pts = totalPts(), depth = depthOf(pts);
    const legend = tier === 5;
    render(`<div class="card reveal ${legend ? 'legend' : ''} ${res ? '' : 'miss'}" style="color:${T.color}">
      ${res ? `<div class="ripple"></div><div class="ripple" style="animation-delay:.25s"></div>` : ''}
      <div class="em">${res ? T.emoji : '⏱️'}</div>
      <div class="nm">${res ? T.name : "Time's up!"}</div>
      <div class="ans" style="color:#e6f4ff">${res ? `“${esc(res.answer)}”` : 'The current carries you nowhere.'}</div>
      <div class="pts" id="cnt">+0</div>
      <div class="sink" style="color:#e6f4ff">${res ? 'sinking to' : 'holding at'} ${depth.toLocaleString()} m</div></div>`, () => {
      if (res) { sfx.tier(tier); burst(18 + tier * 10); if (legend) { burst(36, '🦐', '#ffcc55'); sfx.sonar(); } }
      else sfx.wrong();
      let c = 0; const step = () => { c = Math.min(T.pts, c + Math.max(1, Math.ceil(T.pts / 20))); const el = $('cnt'); if (el) el.textContent = '+' + c; if (c < T.pts) setTimeout(step, 30); };
      setTimeout(step, 550);
      setTimeout(() => diveTo(depth), 700);
    });
    setTimeout(() => { S.i++; S.i < ROUND ? ask() : results(); }, 2900);
  }

  function results() {
    const pts = totalPts(), m = depthOf(pts), zone = zoneOf(m);
    if (pts > store.get('best', 0)) store.set('best', pts);
    if (S.mode === 'daily') store.set('daily:' + dateKey, pts);
    const rare = (p) => p.t[4].slice(0, 3).map((x) => x.split('/')[0]).join(', ');
    render(`
      <div class="card" style="text-align:center">
        <div class="big" id="bigm">0</div><div class="unit">metres deep</div>
        <div class="zone">${zone}</div>
        <div class="score">${pts} / ${ROUND * 100} points</div>
        <div class="tiles">${S.results.map((r, i) => `<b style="animation-delay:${0.5 + i * 0.12}s;border-color:${TIERS[r.tier].color}">${TIERS[r.tier].emoji}</b>`).join('')}</div>
      </div>
      <div class="card"><table>${S.results.map((r) => `<tr><td><b>${esc(r.q)}</b><div class="hint">Deep cuts: ${esc(rare(r.prompt))}</div></td>
        <td class="r" style="color:${TIERS[r.tier].color}">${r.input ? esc(r.input) : '—'}<div class="hint">${TIERS[r.tier].pts} pts</div></td></tr>`).join('')}</table></div>
      <div class="row"><button class="btn" data-act="share">Copy result</button><button class="btn alt" data-act="unlimited">Dive again</button></div>
      <button class="btn alt" data-act="home">Surface</button>`, () => {
      diveTo(m);
      const t1 = performance.now(), dur = 1800;
      const up = (now) => { const f = Math.min(1, (now - t1) / dur), e = 1 - Math.pow(1 - f, 3), el = $('bigm');
        if (el) el.textContent = Math.round(m * e).toLocaleString(); if (f < 1) win.requestAnimationFrame(up); };
      win.requestAnimationFrame(up);
      S.results.forEach((r, i) => setTimeout(() => tone(400 + r.tier * 120, 0.15, 'triangle', 0.08), 500 + i * 120));
      if (m >= MAX_DEPTH) burst(60, '🦐', '#ffcc55');
    });
    S.share = `🦐 DEEP DIVE${S.mode === 'daily' ? ' #' + diveNo : ''}\n${S.results.map((r) => TIERS[r.tier].emoji).join('')}\n${pts}/${ROUND * 100} · ${m.toLocaleString()} m (${zone})`;
  }

  function share(btn) {
    const done = () => { btn.textContent = 'Copied!'; setTimeout(() => (btn.textContent = 'Copy result'), 1500); };
    const fallback = () => { const ta = doc.createElement('textarea'); ta.value = S.share; root.appendChild(ta); ta.select();
      try { doc.execCommand('copy'); done(); } catch { win.prompt('Copy your result:', S.share); } ta.remove(); };
    try { win.navigator.clipboard.writeText(S.share).then(done, fallback); } catch { fallback(); }
  }

  function close() {
    running = false; clearInterval(tick); win.removeEventListener('resize', resize);
    doc.removeEventListener('keydown', onKey, true);
    try { AC && AC.close(); } catch {}
    inNewTab ? win.close() : host.remove();
  }
  host.__dd_close = close;

  // ---------- EVENTS ----------
  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    const a = b.dataset.act;
    if (a === 'daily' || a === 'unlimited') start(a);
    else if (a === 'submit') submit();
    else if (a === 'home') home();
    else if (a === 'share') share(b);
    else if (a === 'close') close();
    else if (a === 'mute') { muted = !muted; store.set('muted', muted); b.textContent = muted ? '🔇' : '🔊'; }
  });
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Enter' && $('in')) { e.preventDefault(); submit(); }
    else if ($('in') && e.key.length === 1 && Math.random() < 0.25) sfx.bubble();
    e.stopPropagation(); // keep the host site's shortcuts from firing while you type
  };
  doc.addEventListener('keydown', onKey, true);

  home();
  console.log('%c🦐 DEEP DIVE loaded' + (inNewTab ? ' in a new tab.' : ' — press Esc to close.'), 'color:#5cc8f0;font-weight:bold;font-size:14px');
})();
