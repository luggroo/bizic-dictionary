// Broad categories adapted from Chinese dialect fieldwork vocabulary classifications.
// Reference: https://csrc.hfuu.edu.cn/8d/68/c3857a36200/page.htm (25 broad fieldwork categories).
// Keep original source categories intact; only the browsing layer is regrouped.
const SEMANTIC_GROUPS={
 '天文、地理':'Weather and seasons|Water and other liquids|Elements, metals, alloys|Landforms and geographical features|Light|Ground/Earth/Soil/Dirt|Cracks/Chasms/Crevices|Places in general, countries|Planets/Meteorological objects/Sky|Fire, flames, and burnt things|Rocks and minerals|Roads and Ways|Waterways/Having to do with water|Medium Primary (e.g. air)|Organic matter/Organic compounds',
 '时令、时间':'Months and Years|Other Intervals|Times of Day|Days',
 '农业':'Verbs involving plants|Husbandry|Vegetative/Agricultural activity|Agriculture/Husbandry/Hunting|Farm/Agricultural places|Bred|Brood on egg',
 '植物':'Fruits and vegetables|Seeds and flowers, nuts|Plant parts and types|Names of trees and shrubs|Other wild plants|Fungi|Leafy vegetables|Leaves|Limb/Branch|Stages of growth',
 '动物':'Insects, Arachnids, and Worms|Particular birds|Fowl (i.e. Domestic Birds)|Porcine|Fish and Mollusks|Bovine|Ovine and Hircine|Canine|Feline|Rodents|Reptiles and Amphibians|Equine|Birds (in general)|Ursine|Comb/Crest|Hoof/Paw|Claw/Talon/Pincer|Wing|Tail|Frog/Toad|Horn(ed)/Antler|Other Mammals|Dragon|Simian|Cervidae|Associated Animal Terms|Snake|Pachyderms|Gizzard/Crop|Scale (of fish, snake)|Feather|Gill|Otter|Wool',
 '房舍':'Parts of the structure|Construction|Functional buildings/places|Kinds of dwellings|Compound|Outdoor/Temporary structures|Dwellings|Governable units (towns, parts of towns)',
 '器具、用品':'Cooking Implements|Furnishings|Tools pertaining to fire|Artifacts (unclassified as yet)|Workshop use/Equipment|Toiletries|Building, Non-edible|Textile|Rope',
 '称谓':'Neutral term|Ethnonyms/Place names|Clans and neighbors|Artists and Artisans|Military roles|Nobility|Civil leaders|Teacher-Student roles|Outsiders|General roles|Occupations|Religious Roles|Titles|Criminals|Owners|Insulting names|Servants',
 '亲属':'Previous generation|Later generation|Related by marriage|Same generation|Marital roles',
 '身体':'Navel|Waste products|Spit/Saliva|Foot|Body|Chest|Forehead/Temples|Hair of Head|Feces/Shit/Dung/Filth/Excrement|Head/Headed|Lower body|Ear|Palm/Sole|Arm|Finger/Toe|Belly/Abdomen|Breast|Liver|Nail|Nose|Hide/Leather|Tooth|Stomach|Tears|Face|Blood/Bleed|Urine/Piss|Bladder|Heart|Beard/Moustache/Facial Hair|Head|Skin|Leg|Intestines/Bowels/Guts|Sweat/Perspire|Hand|Underarm/Armpit|Eye|Eyebrow|Thumb/Big Toe|Shoulder|Kidney|Mouth|Snot/Nasal Mucus|Thigh|Fontanel|Nostril|Fingernail|Lung|Knee|Brain|Bosom/Lap|Tongue|Lip|Body Hair/Fur|Throat/Pharynx|Fist|Muscle|Neck|Gall/Bile|Eyelid|Eyeball|Pus/Gleet|Breath/Breathe|Torso/Trunk|Waist|Fart|Sinew/Tendon/Ligament|Toenail|Carcass/Dead Body|Bone|Elbow|Uvula|Reproductive System|Anus/Rectum|Wrist|Internal Organs|The Body|Buttocks/Rump|Ankle|Heel|Earwax|Crotch/Fork|Gums|Joint|Lower Back/Small of Back|Back of Hand|Instep|Jaw/Cheek|Earlobe|Spine/Backbone|Eye Sand|Blood Vessel/Vein/Artery|Shoulderblade/Scapula|Heartbeat/Pulse|Hips/Pelvis/Haunches|Adam\'s Apple/Larynx|Chin',
 '疾病、医疗':'Diseases|Instruments and therapies|Sick/Hurt/Ache|Itch/Scratch|Swollen/Swell/Bloated|Deaf|Blind|Cough|Health-care|Lame/Limp|Abscess/Ulcer|Vomit|Challenged|Skin Blemish/Freckle|Sneeze|Choke|Blistered',
 '衣服、穿戴':'Jewelry and Accessories|Clothes (general)|Footwear|Special clothes and equipment|Parts of clothing',
 '饮食':'Other ground and milled food|Oil/Grease|Flesh/Meat|Juices, beers, etc.|Spices|Extracts and processed forms|Egg|Eat/Devour|Drink|Hungry|Thirsty|Satiated/Full/Enough',
 '红白大事':'Religion|Pregnant|Scary things|Deities/Spiritual Beings|Die/Deathly|Religious persons/things|General/Other Religious',
 '日常生活':'Wake/Conscious/Alert|Sleep/Be asleep|Wash (v.i./v.t.)|Queue/Braid|Life/Live/Alive|Sweep|Defecate|Snore|Dream|Yawn/Gape',
 '交际':'Mind|Social action|War and violence|Know, Believe|Affect|Fighting|Think|Cry/Weep|Psychological verbs|Laugh/Smile|Speak/Say/Tell|Ask|Angry|Talk, say|Garrulosity, verbosity|Scold|Declare|Banter/Discourse|Fear|Talk with purpose of convincing|Dislike|Compliment, praise|Agree|Admire|Complain|Trust|Think/plan|Ejaculations|Emotive|Worry|Willing|Accept|Honor|Sad|Surprised|Ignore|Comfort|Honest|Implore/Coax|Dedicate|Tolerate|Awe|Jest|Falsehood',
 '商业':'Monetary Terms|Acquisitions|Exchanges|Giving|Possession',
 '教育、文体':'Read|Write|Play',
 '动作':'Verbs referring to size/shape|Assorted action verbs|Change of state|Verbs requiring liquids|Chop, slice|Action Verbs with Patient|Manner is primary|Circularly|Move an object|Abstract verbs|Holding|Push|Putting|Intentional separation - Sort|Move with something else|Digging, excavation|Striking, hitting verbs|Regular, Cyclic, Smoothly|Carry|Carve, shave|Blow|Tying|Cutting/Boring|Throwing|Open|Unintentional loss - Misplace|Close|Bite/Hold in Mouth|Hang|Movement (general)|Fall|Life/Breathe/Exist|See/Look|Forget|Bark (of dog)|Behold|Harm|Float|Sit|Use|Awkwardly, Irregularly, Abruptly|Swallow|Castrate|Hear/Listen|Bring|To do/act|Verbs pertaining to fire|Intentional loss - Abandon|Join (general)|Wide separation - Scatter|Wait|Beckon|Repair|Mix|Answer|Mince, shred|Watch|Friction|With Tools|Carry on shoulder|Existence|Lick|Kick|Show|Dissolve|Blink/Wink|Tickle|Footprint|Hear|Suck/Suckle|Crouch|Sting|Chew',
 '方位':'Position - high/low|Directions|Outward|Inward|Back|Sideways|Up, etc.|Sides|Down|Amid|Apart|Downward|Front|Position - front/back/side-side|Up|Internal|External',
 '代词':'Pronouns|WH words|Demonstrators',
 '形容词':'Smell|Positive Qualities|Shape and size|Colors|Negative Qualities|Like|Feel/Tactile/Texture|Taste|Temperature|Feeling|Negative Human Qualities|Strength|Sounds|Light or lack of light|Positive Human Qualities|Happy|Fat/Be Fat|Human qualities and appearance|Mundane/unimportant/same/routine|Loud|Positive/Desirable qualities|Unique/important/special|Desirable|Cramped|Correct|Thrilled, Dizzy|Kind|Choppy',
 '副词、介词、连词':'Prepositions|Adverbial uses|Grammatical Words|Degree|Extent|Grammatical case|Subordination|Negative|Mood|Verbal|Epistemics|Formulaic|Structuring Words|Degrees of comparison|Grammatical identifiers',
 '数量词':'Numbers and numeric expression|Five|Classifiers|Measure Words|Groups|Other Collective terms|Single/part/few|Quantity - general|Span/Handspan|Knee-deep|Other Specific Digits',
 '附加成分':'Morphological identifiers|Diminutivizer, intensifier, etc.|Affixes'
};
const SEMANTIC_GROUP_ORDER=[...Object.keys(SEMANTIC_GROUPS),'未分类'];
const SEMANTIC_LOOKUP=new Map(Object.entries(SEMANTIC_GROUPS).flatMap(([group,list])=>list.split('|').map(label=>[label,group])));
const semanticCache=new WeakMap();
function wordSemanticCategories(w){return w._semantic||semanticCache.get(w)||['未分类']}
function initializeSemanticCategories(words){
 const byGloss=new Map();
 const glossKey=w=>String(w.zh||'').trim();
 for(const w of words){const groups=[...new Set((w.categories||[]).map(c=>SEMANTIC_LOOKUP.get(c)).filter(Boolean))];semanticCache.set(w,groups);const key=glossKey(w);if(key&&groups.length){if(!byGloss.has(key))byGloss.set(key,new Set());for(const g of groups)byGloss.get(key).add(g)}}
 // Only propagate an exact, unambiguous Chinese gloss match across sources.
 for(const w of words){if(semanticCache.get(w).length)continue;const candidates=byGloss.get(glossKey(w));semanticCache.set(w,candidates?.size===1?[...candidates]:['未分类'])}
}
