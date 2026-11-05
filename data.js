/* IELTS Mock Test – content (Test 1). All passages, recordings and tasks are original practice material. */
window.IELTS_DATA = {

/* ============================== LISTENING ============================== */
listening: {
  parts: [
  /* ---------- PART 1 ---------- */
  {
    range: [1, 10],
    script: [
      { s: 'n', t: 'Part 1. You will hear a telephone conversation between a man who wants to join an evening class and a receptionist at a community centre. First, you have some time to look at questions 1 to 10.' },
      { p: 25, label: 'Reading time' },
      { s: 'n', t: 'Now listen carefully and answer questions 1 to 10.' },
      { s: 'f', t: 'Good morning, Hillside Community Centre, Sarah speaking. How can I help?' },
      { s: 'm', t: "Oh, hello. I saw a leaflet about your evening classes, and I'm interested in the photography course." },
      { s: 'f', t: "Right. We actually run two photography courses at the moment, one for complete beginners and an intermediate one. Have you done any photography before?" },
      { s: 'm', t: "Only with my phone, really. So I think the beginners' course would be best." },
      { s: 'f', t: "OK, the beginners' course. That runs on Tuesday evenings. Oh, sorry, I tell a lie. It moved this term. It's on Thursday evenings now, from seven until nine." },
      { s: 'm', t: 'Thursday is fine. And when does it start?' },
      { s: 'f', t: "It's ten weeks in total, starting on the fourteenth of March." },
      { s: 'm', t: "And what's the cost?" },
      { s: 'f', t: "The full price is a hundred and twenty pounds, but if you're a member of the centre, it's ninety-five." },
      { s: 'm', t: "I'm not a member. How much is membership?" },
      { s: 'f', t: "It's twenty pounds a year, so it would still save you a little money." },
      { s: 'm', t: "In that case, I'll join as well." },
      { s: 'f', t: "Great. Can I take some details? What's your name?" },
      { s: 'm', t: "It's Daniel Fenwick." },
      { s: 'f', t: 'Is that F, E, N, W, I, C, K?' },
      { s: 'm', t: "That's right." },
      { s: 'f', t: 'And your address?' },
      { s: 'm', t: "Forty-two Marlow Road. That's M, A, R, L, O, W." },
      { s: 'f', t: 'Thank you. And can I ask how you heard about the course?' },
      { s: 'm', t: 'I picked up a leaflet in the library. Actually, no, that\'s not quite true. My neighbour gave it to me. She was the one who picked it up at the library.' },
      { s: 'f', t: "Lovely. Now, about equipment. You'll need your own camera, but it doesn't have to be an expensive one." },
      { s: 'm', t: 'Do I need a tripod?' },
      { s: 'f', t: "Not for the first few weeks. But you will need a notebook, because the tutor gives you quite a lot of technical information." },
      { s: 'm', t: "And who's the tutor?" },
      { s: 'f', t: "That's Mike Lawson. He's a professional photographer. He used to work for a newspaper, and these days he mostly does weddings." },
      { s: 'm', t: 'Is there parking at the centre?' },
      { s: 'f', t: "There's a small car park, but it fills up very quickly in the evenings. Most people use the one behind the supermarket. It's free after six o'clock." },
      { s: 'm', t: 'Perfect. And can I pay online?' },
      { s: 'f', t: 'You can, through our website, or by card over the phone now if you prefer.' },
      { s: 'm', t: "I'll do it online, thanks. Bye." },
      { s: 'n', t: 'That is the end of Part 1. You now have some time to check your answers.' },
      { p: 15, label: 'Checking time' }
    ],
    groups: [
      { type: 'notes',
        instructions: 'Complete the form below. Write <b>ONE WORD AND/OR A NUMBER</b> for each answer.',
        title: 'Hillside Community Centre – Course Booking Form',
        html: `<table class="form">
<tr><td>Course:</td><td>Photography for Beginners</td></tr>
<tr><td>Day:</td><td>{{1}}</td></tr>
<tr><td>Time:</td><td>7 – 9 pm</td></tr>
<tr><td>Start date:</td><td>{{2}} March</td></tr>
<tr><td>Cost for members:</td><td>£ {{3}}</td></tr>
<tr><td>Membership fee:</td><td>£ {{4}} per year</td></tr>
<tr><td>Name:</td><td>Daniel {{5}}</td></tr>
<tr><td>Address:</td><td>42 {{6}} Road</td></tr>
<tr><td>Heard about the course from:</td><td>a {{7}}</td></tr>
<tr><td>Students must bring:</td><td>a camera and a {{8}}</td></tr>
<tr><td>Tutor:</td><td>Mike Lawson – previously worked for a {{9}}</td></tr>
<tr><td>Parking:</td><td>free car park behind the {{10}}</td></tr>
</table>`,
        answers: { 1: ['Thursday', 'Thursdays'], 2: ['14', '14th', 'fourteenth'], 3: ['95'], 4: ['20'], 5: ['Fenwick'], 6: ['Marlow'], 7: ['neighbour', 'neighbor'], 8: ['notebook', 'note-book'], 9: ['newspaper'], 10: ['supermarket'] } }
    ]
  },
  /* ---------- PART 2 ---------- */
  {
    range: [11, 20],
    script: [
      { s: 'n', t: 'Part 2. You will hear the volunteer coordinator at a nature reserve talking to a group of people who are interested in volunteering. First, you have some time to look at questions 11 to 20.' },
      { p: 25, label: 'Reading time' },
      { s: 'n', t: 'Now listen and answer questions 11 to 20.' },
      { s: 'm', t: "Good evening, everyone, and thank you for coming to this information session about volunteering at Greenmere Nature Reserve. My name's Tom Bradley, and I've been the volunteer coordinator here for about six years." },
      { s: 'm', t: "Let me start with a little background. The reserve was created in nineteen eighty-seven, after the old gravel quarry closed and the land was flooded. Visitors often comment on its size. It covers around two hundred hectares. But what surprises most people is that the lake isn't natural at all. The whole site is man-made. We do have an impressive number of bird species, over a hundred and fifty, but that's not what people remember." },
      { s: 'm', t: "These days we have around a hundred and twenty volunteers, and honestly, we couldn't run the place without them. People sometimes assume our biggest problem is money. Funding is always tight, of course, but the single biggest challenge we face is invasive plants. One species in particular, Himalayan balsam, spreads so quickly along the riverbank that it crowds out our native flowers." },
      { s: 'm', t: "So what do we ask of volunteers? You don't need any previous experience, because all training is provided. Some of our volunteers come every week, which is wonderful, and many come twice a month. But the minimum we ask is one day a month." },
      { s: 'm', t: "We welcome anyone over the age of sixteen. If you're under eighteen, you don't need to bring an adult with you, but you do need a form signed by a parent or guardian. There's no extra training for younger volunteers. Everyone does the same induction." },
      { s: 'm', t: "As for food, I'm afraid we don't provide lunch, but there's a kettle and a fridge in the volunteer hut. We used to offer a discount in the gift shop, but that stopped last year. What every volunteer does get is a free hot drink from the café whenever they're working." },
      { s: 'm', t: 'Now let me tell you about the different areas of the reserve, and the main job in each one.' },
      { s: 'm', t: "Starting with the Visitor Centre. Many people think volunteers there just work in the café, but in fact what we mainly need is people to lead school groups around the site. We get about forty school visits a year." },
      { s: 'm', t: "Next, the Woodland Trail. After heavy rain, the surface gets washed away, so volunteers there spend most of their time repairing the paths, laying new gravel and so on. You might notice a few nest boxes along the trail, but those were put up by a local scout group, not by us." },
      { s: 'm', t: "The Reed Beds are where the Himalayan balsam is worst, so that's where you'll be pulling it up and cutting it back. We did use to record the water levels there, but that's now done automatically by sensors." },
      { s: 'm', t: "In the Wildflower Meadow, the main job in late summer is collecting seeds, which we then sow in other parts of the reserve." },
      { s: 'm', t: "And finally, the Bird Hides. Several volunteers take part in our monthly survey, where they count how many birds of each species they can see. It's a great job if you're a patient person." },
      { s: 'n', t: 'That is the end of Part 2. You now have some time to check your answers.' },
      { p: 15, label: 'Checking time' }
    ],
    groups: [
      { type: 'mcq',
        instructions: 'Choose the correct letter, <b>A, B or C</b>.',
        items: [
          { n: 11, q: 'What surprises most visitors about Greenmere Nature Reserve?', options: ['how large it is', 'that the lake is not natural', 'how many bird species live there'] },
          { n: 12, q: 'According to Tom, the biggest challenge for the reserve is', options: ['a shortage of money.', 'invasive plants.', 'damage caused by visitors.'] },
          { n: 13, q: 'What is the minimum time commitment for volunteers?', options: ['one day a week', 'two days a month', 'one day a month'] },
          { n: 14, q: 'Volunteers under the age of eighteen must', options: ['be accompanied by an adult.', 'bring a form signed by a parent.', 'complete extra training.'] },
          { n: 15, q: 'All volunteers receive', options: ['a free lunch.', 'a free hot drink.', 'a discount in the gift shop.'] }
        ],
        answers: { 11: 'B', 12: 'B', 13: 'C', 14: 'B', 15: 'B' } },
      { type: 'match',
        instructions: 'What is the main activity for volunteers in each area of the reserve? Choose <b>FIVE</b> answers from the box and write the correct letter, <b>A–G</b>, next to Questions 16–20.',
        optionsTitle: 'Activities',
        options: [
          { k: 'A', t: 'counting birds' }, { k: 'B', t: 'repairing paths' }, { k: 'C', t: 'guiding school groups' },
          { k: 'D', t: 'cutting back plants' }, { k: 'E', t: 'collecting seeds' }, { k: 'F', t: 'building nest boxes' }, { k: 'G', t: 'recording water levels' }
        ],
        items: [
          { n: 16, q: 'The Visitor Centre' }, { n: 17, q: 'The Woodland Trail' }, { n: 18, q: 'The Reed Beds' },
          { n: 19, q: 'The Wildflower Meadow' }, { n: 20, q: 'The Bird Hides' }
        ],
        answers: { 16: 'C', 17: 'B', 18: 'D', 19: 'E', 20: 'A' } }
    ]
  },
  /* ---------- PART 3 ---------- */
  {
    range: [21, 30],
    script: [
      { s: 'n', t: 'Part 3. You will hear two students, Lucy and Ahmed, discussing a presentation they have to give. First, you have some time to look at questions 21 to 30.' },
      { p: 25, label: 'Reading time' },
      { s: 'n', t: 'Now listen carefully and answer questions 21 to 30.' },
      { s: 'f2', t: 'So, Ahmed, we need to decide on our presentation topic for the environmental studies module. Have you had any thoughts?' },
      { s: 'm', t: "I was thinking about urban farming. You know, growing food in cities, on rooftops and in empty buildings." },
      { s: 'f2', t: "That could work. I was going to suggest plastic recycling, but I think half the class will do that." },
      { s: 'm', t: "Exactly. And urban farming is something we can actually see locally. There's that project on the roof of the old car factory." },
      { s: 'f2', t: 'Oh yes, I read about it. What got you interested?' },
      { s: 'm', t: "Well, I first heard about it from my cousin. He works in a restaurant that buys vegetables from them. But what really made up my mind was a documentary I watched last month about vertical farms in Singapore." },
      { s: 'f2', t: "Right. So what should our focus be? Dr Patel said we shouldn't try to cover everything." },
      { s: 'm', t: 'I thought maybe the economics. Whether these farms can actually make a profit.' },
      { s: 'f2', t: "Hmm, that's quite hard to find data on. The environmental benefits would be easier, like reduced transport emissions." },
      { s: 'm', t: "But that's a bit obvious, isn't it? What about the social side? How these farms bring local communities together?" },
      { s: 'f2', t: "Actually, yes. That's more original. And we could interview people at the rooftop farm." },
      { s: 'm', t: "Agreed. Let's go with that." },
      { s: 'f2', t: 'How many people should we interview?' },
      { s: 'm', t: 'Dr Patel said at least five, but I think we would get much better material if we aimed for about ten.' },
      { s: 'f2', t: "Ten is a lot. We've only got three weeks. Let's say eight." },
      { s: 'm', t: 'Fine, eight it is.' },
      { s: 'f2', t: 'And what about the format? Slides, as usual?' },
      { s: 'm', t: 'Everyone does slides. Could we make a short video instead?' },
      { s: 'f2', t: 'That would take ages to edit. What about a poster presentation, with a few short audio clips from the interviews?' },
      { s: 'm', t: "Oh, that's nice. People could listen while they look at the poster. OK, let's do that." },
      { s: 'f2', t: "Who's going to contact the farm?" },
      { s: 'm', t: 'I can do that. I know the manager a little, through my cousin. And I could write the interview questions too.' },
      { s: 'f2', t: "Actually, let's write the questions together. But I'll book the recording equipment from the media centre." },
      { s: 'm', t: 'Great. What problems do you think we might have?' },
      { s: 'f2', t: "Well, it isn't the rain I'm worried about. If it rains, we can just go another day. But the roof is very exposed, so wind noise could ruin the recordings." },
      { s: 'm', t: "True. We'll need those foam covers for the microphones. Some people might not want to be recorded, I suppose." },
      { s: 'f2', t: "I doubt it. The manager says the volunteers love talking about the project. The real issue is time. We've both got exams in May." },
      { s: 'm', t: "Yes, that's my main worry too." },
      { s: 'm', t: "When should we check our plan with Dr Patel? Her office hours are on Monday and Wednesday." },
      { s: 'f2', t: "Monday is too soon. We won't have anything ready. Let's go on Wednesday." },
      { s: 'm', t: 'OK. And for background reading?' },
      { s: 'f2', t: "There's a report by the city council about green spaces, from last year. It has a whole chapter on food growing, so that would be a good place to start." },
      { s: 'm', t: "The library has some books as well, but they're quite old." },
      { s: 'f2', t: "And remember, the poster has to be sent in electronically first, as a PDF, not as a PowerPoint file." },
      { s: 'm', t: "Right. I'll make a note of that." },
      { s: 'n', t: 'That is the end of Part 3. You now have some time to check your answers.' },
      { p: 15, label: 'Checking time' }
    ],
    groups: [
      { type: 'mcq',
        instructions: 'Choose the correct letter, <b>A, B or C</b>.',
        items: [
          { n: 21, q: 'What finally made Ahmed decide on urban farming as a topic?', options: ['his cousin works on an urban farm', 'a documentary he watched', 'a suggestion from his tutor'] },
          { n: 22, q: 'What will be the main focus of the presentation?', options: ['the economic side of urban farms', 'the environmental benefits of urban farms', 'the social impact of urban farms'] },
          { n: 23, q: 'How many people will the students interview?', options: ['five', 'eight', 'ten'] },
          { n: 24, q: 'Which format do the students choose?', options: ['a slide presentation', 'a short video', 'a poster with audio clips'] },
          { n: 25, q: 'Lucy will be responsible for', options: ['contacting the farm manager.', 'booking the recording equipment.', 'writing the interview questions.'] }
        ],
        answers: { 21: 'B', 22: 'C', 23: 'B', 24: 'C', 25: 'B' } },
      { type: 'multi', ns: [26, 27],
        instructions: 'Choose <b>TWO</b> letters, <b>A–E</b>.',
        q: 'Which TWO problems do the students expect to have?',
        options: ['bad weather', 'interviewees refusing to be recorded', 'background noise', 'lack of time', 'difficulty getting to the farm'],
        answers: ['C', 'D'] },
      { type: 'notes',
        instructions: 'Complete the sentences below. Write <b>ONE WORD ONLY</b> for each answer.',
        html: `<p>The students will meet Dr Patel on {{28}} to discuss their plan.</p>
<p>Lucy suggests reading a report published by the city {{29}}.</p>
<p>The poster must first be submitted as a {{30}} file.</p>`,
        answers: { 28: ['Wednesday'], 29: ['council'], 30: ['PDF'] } }
    ]
  },
  /* ---------- PART 4 ---------- */
  {
    range: [31, 40],
    script: [
      { s: 'n', t: 'Part 4. You will hear a lecture about Roman concrete. First, you have some time to look at questions 31 to 40.' },
      { p: 30, label: 'Reading time' },
      { s: 'n', t: 'Now listen carefully and answer questions 31 to 40.' },
      { s: 'f', t: "Good morning. Today I'm going to talk about one of the great puzzles of engineering: why Roman concrete has lasted so long. Many Roman structures, such as harbours and the dome of the Pantheon, are still standing after two thousand years, while modern concrete often begins to crack within fifty years." },
      { s: 'f', t: "Let's start with the ingredients. Roman concrete was made from lime, water, and volcanic ash. The ash came mainly from the area around the Bay of Naples, and the Romans named it after the nearby town of Pozzuoli." },
      { s: 'f', t: "For a long time, researchers believed that the lime was mixed with water first, a process called slaking, before it was added to the ash. But recent studies suggest that the Romans actually used quicklime, which is lime that has not been mixed with water, and that this created a great deal of heat during mixing." },
      { s: 'f', t: "This heat matters, because it left small white lumps of lime inside the concrete. Scientists used to think these lumps were simply evidence of poor mixing. In other words, they were seen as the result of careless workers." },
      { s: 'f', t: "In fact, these lumps seem to give the concrete a remarkable ability to repair itself. When a crack forms and water gets in, the water reacts with the lime in the lumps, producing calcium carbonate, which fills the crack." },
      { s: 'f', t: "Now, what about marine structures? You would expect seawater to damage concrete, and with modern concrete, it does. Salt attacks the steel bars inside, which rust and expand, and that breaks the concrete apart. Roman concrete contains no steel at all." },
      { s: 'f', t: "What's more, in Roman harbour walls, seawater actually reacts with the volcanic ash to form new minerals. One of these is a rare crystal that makes the material stronger over time, rather than weaker." },
      { s: 'f', t: "So why don't we simply use Roman concrete today? There are several reasons. First, it's much weaker when it's young. It gains strength too slowly for modern construction schedules, where builders need to add the next floor within days." },
      { s: 'f', t: "Second, suitable volcanic ash isn't available everywhere, so the cost of transport would be very high for most countries." },
      { s: 'f', t: "However, there is a strong environmental argument in its favour. Producing modern cement is responsible for about eight percent of global carbon dioxide emissions, largely because it has to be heated to around one thousand four hundred and fifty degrees. Roman-style mixtures need much lower temperatures." },
      { s: 'f', t: "Researchers are now testing modern versions of the Roman recipe for use in sea walls, and also, interestingly, for storing nuclear waste, where durability over thousands of years is essential. That's all for today." },
      { s: 'n', t: 'That is the end of the listening test.' }
    ],
    groups: [
      { type: 'notes',
        instructions: 'Complete the notes below. Write <b>ONE WORD AND/OR A NUMBER</b> for each answer.',
        title: 'Roman Concrete',
        html: `<h5>Ingredients</h5>
<ul><li>lime, water and volcanic {{31}}</li>
<li>Romans probably used {{32}} (lime not mixed with water), which produced heat</li></ul>
<h5>White lumps</h5>
<ul><li>once believed to be the result of poor {{33}}</li>
<li>self-healing: water reacts with lime and produces calcium {{34}}, which fills cracks</li></ul>
<h5>Marine structures</h5>
<ul><li>modern concrete is damaged when the {{35}} inside it rusts</li>
<li>in Roman harbour walls, seawater forms new {{36}} that increase strength</li></ul>
<h5>Why it is not used today</h5>
<ul><li>it gains strength too {{37}}</li>
<li>high cost of {{38}} of suitable ash</li></ul>
<h5>Environment and future</h5>
<ul><li>modern cement causes about {{39}} % of global CO<sub>2</sub> emissions</li>
<li>possible future uses: sea walls and storing nuclear {{40}}</li></ul>`,
        answers: { 31: ['ash'], 32: ['quicklime', 'quick-lime'], 33: ['mixing'], 34: ['carbonate'], 35: ['steel'], 36: ['minerals'], 37: ['slowly'], 38: ['transport', 'transportation'], 39: ['8', 'eight'], 40: ['waste'] } }
    ]
  }
  ]
},

/* ============================== READING ============================== */
reading: {
  passages: [
  /* ---------- PASSAGE 1 ---------- */
  {
    range: [1, 13],
    title: 'The Humble Pencil',
    html: `<p>For an object that most people take entirely for granted, the pencil has a surprisingly eventful history. Its story begins in the 1560s, in the Borrowdale valley of north-west England, where, according to local accounts, a violent storm uprooted a number of trees and exposed a deposit of an unusual black substance. Shepherds in the area soon discovered that it left a dark mark and began using it to label their sheep. The material was graphite, although at the time it was believed to be a form of lead, and the name 'lead pencil' has survived to this day even though no pencil has ever contained lead.</p>
<p>The Borrowdale deposit was remarkable not only for its size but for its purity. It is still the only large-scale deposit of solid graphite ever found, and the material could be cut directly into sticks without any further processing. Because graphite is soft and brittle, these sticks were at first wrapped in string or sheepskin to keep the user's hands clean. Graphite soon became valuable for another reason: it could be used to line the moulds in which cannonballs were cast, producing smoother and rounder balls. As a result, the English Crown took control of the mine, which was guarded by armed men. At times it was even flooded deliberately to prevent theft between periods of extraction.</p>
<p>Since England had a near monopoly on pure graphite, other countries had to find alternatives. Craftsmen in Nuremberg, in what is now Germany, experimented with mixing graphite powder with sulphur and other substances, but the results were of poor quality. The decisive breakthrough came in France in 1795. At war with Britain and cut off from English graphite, the French government asked an engineer named Nicolas-Jacques Conté to develop a domestic substitute. Conté mixed powdered graphite with clay, shaped the mixture into thin rods and fired them in a kiln. His method had a crucial advantage: by changing the proportion of clay to graphite, manufacturers could control how hard or soft the pencil would be. More clay produced a harder, lighter line; more graphite produced a softer, darker one. This is essentially the method still used today.</p>
<p>The wooden casing also has an interesting history. Early wooden pencils were made by cutting a groove into a strip of wood, inserting the graphite and gluing a second strip on top. In the nineteenth century, the American pencil industry, centred in New England, became famous for its use of red cedar, a wood that is soft enough to sharpen easily and does not split. By the early twentieth century, supplies of red cedar were running low, and manufacturers bought old cedar fences and barns from farmers in order to recover the wood. Most pencils today are made from incense cedar grown in California.</p>
<p>Several familiar features of the modern pencil were added along the way. The attached eraser was patented in the United States in 1858 by Hymen Lipman, but his patent was later declared invalid because the court decided that he had merely combined two existing objects. Many European pencils, interestingly, are still sold without erasers. The tradition of painting pencils yellow began in the 1890s, when one manufacturer, wanting to suggest that its graphite came from China, painted its premium pencils that colour; at the time, yellow was associated in China with royalty and quality. The idea was so successful that other manufacturers copied it, and in North America yellow remains the standard colour.</p>
<p>Despite the rise of digital devices, the pencil remains popular. Billions are produced every year, and they are still preferred by many artists, architects and engineers. Astronauts, too, have used them, though not without concern: tiny pieces of broken graphite can float in zero gravity and could potentially damage electronic equipment. One advantage the pencil holds over almost every other writing instrument is its reliability. It works upside down, under water and in freezing temperatures, and a single pencil can draw a line around 55 kilometres long.</p>`,
    groups: [
      { type: 'tf', options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        instructions: 'Do the following statements agree with the information given in Reading Passage 1?<br><b>TRUE</b> if the statement agrees with the information<br><b>FALSE</b> if the statement contradicts the information<br><b>NOT GIVEN</b> if there is no information on this',
        items: [
          { n: 1, q: 'The graphite at Borrowdale was first noticed after severe weather.' },
          { n: 2, q: 'The first people to use the Borrowdale substance knew that it was not lead.' },
          { n: 3, q: 'Borrowdale graphite had to be purified before it could be used.' },
          { n: 4, q: 'The Borrowdale mine was sometimes filled with water on purpose.' },
          { n: 5, q: 'Pencils made in Nuremberg were exported to England.' },
          { n: 6, q: 'Conté received a large payment from the French government for his invention.' },
          { n: 7, q: "Conté's method made it possible to adjust how dark a pencil line would be." }
        ],
        answers: { 1: 'TRUE', 2: 'FALSE', 3: 'FALSE', 4: 'TRUE', 5: 'NOT GIVEN', 6: 'NOT GIVEN', 7: 'TRUE' } },
      { type: 'notes',
        instructions: 'Complete the notes below. Choose <b>ONE WORD ONLY</b> from the passage for each answer.',
        title: 'The pencil: casing and later features',
        html: `<ul>
<li>American manufacturers used red cedar because it was easy to {{8}} and did not split.</li>
<li>When red cedar became scarce, wood was recovered from old fences and {{9}}.</li>
<li>Today, most pencils are made from incense cedar from {{10}}.</li>
<li>Lipman's {{11}} for the attached eraser was later declared invalid.</li>
<li>Yellow paint was used to suggest that the graphite came from {{12}}.</li>
<li>In space, broken pieces of graphite could damage electronic {{13}}.</li>
</ul>`,
        answers: { 8: ['sharpen'], 9: ['barns'], 10: ['California'], 11: ['patent'], 12: ['China'], 13: ['equipment'] } }
    ]
  },
  /* ---------- PASSAGE 2 ---------- */
  {
    range: [14, 26],
    title: 'Cities and the Heat They Make',
    html: `<p><b class="plabel">A</b> On a still summer afternoon, the centre of a large city can be several degrees warmer than the surrounding countryside, and the gap often widens after sunset, when rural areas cool quickly but urban streets continue to release the heat they have stored during the day. In extreme cases, night-time differences of more than 7°C have been recorded. The phenomenon, now known as the urban heat island effect, is far from a modern discovery. In the 1810s, Luke Howard, a London chemist with a passion for weather, compared his own thermometer readings in the city with those taken in the countryside and noticed that the city was consistently warmer. His observations, published in 1818, are generally regarded as the first scientific description of the effect.</p>
<p><b class="plabel">B</b> The causes are now well understood. Natural landscapes of soil, grass and trees absorb relatively little heat, and much of the energy they receive from the sun is used to evaporate water rather than to raise temperatures. Cities replace these surfaces with asphalt, concrete, brick and roofing materials that absorb large amounts of solar energy and release it slowly. Dark surfaces are particularly effective at this: a black asphalt road can reach 60°C on a hot day. The shape of the city also matters. Tall buildings lining narrow streets form so-called 'urban canyons', in which heat is reflected back and forth between walls and the wind that might otherwise carry it away is blocked. Finally, cities generate heat of their own, from vehicle engines, factories and, increasingly, the air conditioners that people use to escape the heat.</p>
<p><b class="plabel">C</b> The consequences for human health can be severe. Heat is already one of the deadliest forms of extreme weather, and urban residents are especially exposed. During the European heatwave of 2003, which is estimated to have caused more than 70,000 deaths across the continent, mortality rates in Paris were far higher than in the surrounding rural districts. Researchers who studied the event concluded that the lack of cooling at night was a major factor: when temperatures stay high after dark, the human body has no opportunity to recover, and the strain on the heart accumulates. Older people, young children and those with existing medical conditions are most vulnerable, as are people living in poorly ventilated top-floor apartments.</p>
<p><b class="plabel">D</b> The heat island also carries economic and environmental costs, and some of these feed back into the problem itself. Higher temperatures increase demand for air conditioning, which raises electricity consumption at exactly the moment when power networks are under the greatest strain, sometimes leading to blackouts. Much of that electricity is generated by burning fossil fuels, adding to the emissions that drive global warming, while the air conditioners themselves pump waste heat into the streets outside. The result is a loop in which efforts to stay cool make the city hotter still. Heat also affects water: rain falling on hot pavements and roofs warms up before draining into rivers, where sudden rises in temperature can harm fish and other aquatic life.</p>
<p><b class="plabel">E</b> One of the simplest responses is to change the colour of urban surfaces. So-called 'cool roofs', coated with white or highly reflective materials, can reflect most of the sunlight that falls on them, keeping the buildings beneath them cooler and reducing the need for air conditioning. Several cities, including New York, have run programmes to paint thousands of square metres of rooftops white. Roads present a bigger challenge, but in 2017 Los Angeles began trialling a light grey coating on residential streets. Early measurements showed that the treated surfaces were around 6°C cooler than ordinary asphalt. The trial was not without its critics, however; some researchers warned that light reflected from the ground could make pedestrians feel hotter, and that glare might be uncomfortable for drivers.</p>
<p><b class="plabel">F</b> Many experts argue that the most effective long-term answer lies in vegetation. Trees cool their surroundings in two ways: they provide shade, and they release moisture through their leaves, a process that uses energy that would otherwise heat the air. A well-shaded street can be several degrees cooler than an exposed one. Singapore, often described as a 'city in a garden', has gone further than most, introducing regulations that require new developments to replace any greenery lost during construction, often in the form of gardens on balconies, walls and roofs. Planting is not a quick fix, though. Trees take years to reach a size at which they provide meaningful shade, and in dry cities the water needed to keep them alive can be a serious drawback. Even so, their benefits extend well beyond temperature, from cleaner air to improved mental wellbeing, which makes them an attractive investment for city planners.</p>`,
    groups: [
      { type: 'match',
        instructions: 'Reading Passage 2 has six paragraphs, <b>A–F</b>. Choose the correct heading for each paragraph from the list of headings below.',
        optionsTitle: 'List of Headings',
        options: [
          { k: 'i', t: 'A self-reinforcing cycle' }, { k: 'ii', t: 'Nature as an answer' }, { k: 'iii', t: 'Why cities trap heat' },
          { k: 'iv', t: 'The difficulty of measuring urban temperatures' }, { k: 'v', t: 'A long-recognised phenomenon' },
          { k: 'vi', t: 'Changing the colour of the city' }, { k: 'vii', t: 'A threat to human wellbeing' }, { k: 'viii', t: 'Cities that have stopped growing' }
        ],
        items: [
          { n: 14, q: 'Paragraph A' }, { n: 15, q: 'Paragraph B' }, { n: 16, q: 'Paragraph C' },
          { n: 17, q: 'Paragraph D' }, { n: 18, q: 'Paragraph E' }, { n: 19, q: 'Paragraph F' }
        ],
        answers: { 14: 'v', 15: 'iii', 16: 'vii', 17: 'i', 18: 'vi', 19: 'ii' } },
      { type: 'mcq',
        instructions: 'Choose the correct letter, <b>A, B, C or D</b>.',
        items: [
          { n: 20, q: 'According to paragraph A, the temperature difference between a city and the countryside', options: ['is greatest in the middle of the day.', 'often increases after dark.', 'was first measured by a group of scientists.', 'has become smaller since the 1810s.'] },
          { n: 21, q: "The writer mentions 'urban canyons' as an example of how", options: ['the layout of streets can prevent heat from escaping.', 'tall buildings can provide useful shade.', 'traffic adds to temperatures in cities.', 'dark materials absorb sunlight.'] },
          { n: 22, q: 'What does the writer say about the 2003 European heatwave?', options: ['Most of the deaths occurred in rural areas.', 'High night-time temperatures were an important cause of deaths.', 'It led to new building regulations in Paris.', 'Only elderly people were seriously affected.'] },
          { n: 23, q: 'What is said about the Los Angeles road trial?', options: ['It was stopped because it was too expensive.', 'It cooled road surfaces but raised concerns about reflected light.', 'It has since been copied by New York.', 'It produced no measurable change in temperature.'] }
        ],
        answers: { 20: 'B', 21: 'A', 22: 'B', 23: 'B' } },
      { type: 'notes',
        instructions: 'Complete the summary below. Choose <b>ONE WORD ONLY</b> from the passage for each answer.',
        title: 'Trees and the urban heat island',
        html: `<p class="summary">Planting trees is widely seen as the most effective long-term way to cool a city, since trees provide shade and release moisture through their {{24}}. Singapore requires new developments to replace any {{25}} that is lost during construction. However, trees take many years to mature, and in dry cities the amount of {{26}} they need can be a serious disadvantage.</p>`,
        answers: { 24: ['leaves'], 25: ['greenery'], 26: ['water'] } }
    ]
  },
  /* ---------- PASSAGE 3 ---------- */
  {
    range: [27, 40],
    title: 'The Uses of Boredom',
    html: `<p>Boredom has a bad reputation. It is commonly regarded as a trivial complaint, something to be cured as quickly as possible with a phone or a snack. Yet over the past two decades, psychologists have begun to take it far more seriously, and some now argue that, far from being useless, boredom may serve an important purpose.</p>
<p>Part of the difficulty in studying boredom has been defining it. Early researchers tended to treat it as a simple consequence of a dull environment: put someone in a monotonous situation and they will become bored. This view, however, cannot explain why two people in the same situation may react so differently – why one person waiting in a queue becomes restless and irritated while another remains perfectly content. More recent definitions therefore focus on the mind rather than the situation. One widely cited definition, proposed by a team of Canadian researchers, describes boredom as the unpleasant experience of wanting, but being unable, to engage in a satisfying activity. Crucially, on this view, boredom is about attention: we are bored when we cannot keep our minds on what is in front of us, and we do not want to be where we are.</p>
<p>This shift has encouraged researchers to look at boredom as a signal. Just as pain alerts us to physical damage and hunger tells us to eat, boredom, they suggest, may tell us that our current activity is not meeting our needs and that we should change course. Seen in this way, boredom is not a failure but a motivating force; without it, the argument goes, we might remain indefinitely in unrewarding situations. I find this comparison persuasive, though it has an uncomfortable implication. If boredom is a signal, then silencing it with constant distraction may be rather like taking painkillers for a broken leg and continuing to walk on it.</p>
<p>Some of the most widely reported research concerns the relationship between boredom and creativity. In a frequently cited study conducted in the UK, participants were first asked to copy numbers from a telephone directory for fifteen minutes – a deliberately tedious task – and then to think of as many uses as possible for a pair of plastic cups. Compared with a control group who had not done the copying task, the bored participants generated more ideas, and more original ones. The researchers suggested that boredom encourages the mind to wander, and that daydreaming makes unexpected connections more likely. The study attracted considerable media attention, with headlines announcing that boredom was good for children. Such conclusions seem to me premature. The study was small, the effects were modest, and later attempts to reproduce similar findings have produced mixed results.</p>
<p>There is, moreover, a darker side to boredom that its enthusiasts sometimes overlook. People who are prone to boredom – that is, who become bored frequently and intensely – are more likely to experience depression and anxiety, and to engage in risky behaviours such as gambling or overeating. In one remarkable experiment, participants were left alone in an empty room for fifteen minutes with nothing to do except, if they chose, give themselves a mild electric shock. A substantial proportion of participants, particularly men, chose to shock themselves, apparently preferring an unpleasant sensation to no sensation at all. Whether boredom is beneficial, then, may depend less on the experience itself than on how people respond to it.</p>
<p>This is perhaps where the most useful lessons lie. Researchers distinguish between responses that address the underlying signal – finding a more meaningful task, for instance – and those that merely suppress it. Reaching for a smartphone falls largely into the second category: it relieves boredom quickly but rarely satisfies the need that triggered it, and heavy smartphone users report higher, not lower, levels of boredom overall. The implication is not that we should seek out boredom, still less that we should impose it on children in the hope of making them more creative. It is that we should listen to it. Boredom is an uncomfortable question about how we are spending our time, and the answer deserves more thought than a quick swipe of a screen.</p>`,
    groups: [
      { type: 'mcq',
        instructions: 'Choose the correct letter, <b>A, B, C or D</b>.',
        items: [
          { n: 27, q: 'In the second paragraph, the writer mentions people waiting in a queue to show that', options: ['boredom is more common in public places.', 'a dull situation alone cannot explain boredom.', 'some people are naturally more patient than others.', 'early research into boredom was badly designed.'] },
          { n: 28, q: 'According to the Canadian definition, boredom is mainly a problem of', options: ['memory.', 'attention.', 'intelligence.', 'physical energy.'] },
          { n: 29, q: 'The writer compares constant distraction to taking painkillers for a broken leg in order to suggest that', options: ['boredom is as serious as physical pain.', 'distraction may hide a warning that should be acted on.', 'boredom can be treated with medicine.', 'people often ignore physical injuries.'] },
          { n: 30, q: 'In the telephone directory study, the participants who had done the copying task', options: ['completed the second task more quickly.', 'produced a greater number of ideas than the other group.', 'said that they preferred creative tasks.', 'were more likely to stop working and daydream.'] },
          { n: 31, q: 'The electric shock experiment is used to illustrate that', options: ['men become bored more easily than women.', 'some people find having nothing to do extremely unpleasant.', 'boredom is a major cause of depression.', 'risky behaviour is more common in groups.'] }
        ],
        answers: { 27: 'B', 28: 'B', 29: 'B', 30: 'B', 31: 'B' } },
      { type: 'tf', options: ['YES', 'NO', 'NOT GIVEN'],
        instructions: 'Do the following statements agree with the claims of the writer in Reading Passage 3?<br><b>YES</b> if the statement agrees with the claims of the writer<br><b>NO</b> if the statement contradicts the claims of the writer<br><b>NOT GIVEN</b> if it is impossible to say what the writer thinks about this',
        items: [
          { n: 32, q: 'The idea that boredom works as a signal is convincing.' },
          { n: 33, q: 'Boredom is a more serious problem today than it was in the past.' },
          { n: 34, q: 'The media reports about the creativity study were justified.' },
          { n: 35, q: 'People who are frequently bored face a higher risk of certain mental health problems.' },
          { n: 36, q: 'Children should be deliberately exposed to boredom to improve their creativity.' }
        ],
        answers: { 32: 'YES', 33: 'NOT GIVEN', 34: 'NO', 35: 'YES', 36: 'NO' } },
      { type: 'match',
        instructions: 'Complete each sentence with the correct ending, <b>A–F</b>, below.',
        optionsTitle: 'Endings',
        options: [
          { k: 'A', t: 'was mainly the result of a monotonous environment.' },
          { k: 'B', t: 'mind-wandering may lead to unexpected connections.' },
          { k: 'C', t: 'are more likely to engage in risky activities.' },
          { k: 'D', t: 'tend to report higher levels of boredom.' },
          { k: 'E', t: 'should be avoided by parents and teachers.' },
          { k: 'F', t: 'is less common in adults than in children.' }
        ],
        items: [
          { n: 37, q: 'Early researchers believed that boredom' },
          { n: 38, q: 'The researchers in the UK study proposed that' },
          { n: 39, q: 'People who are prone to boredom' },
          { n: 40, q: 'Heavy smartphone users' }
        ],
        answers: { 37: 'A', 38: 'B', 39: 'C', 40: 'D' } }
    ]
  }
  ]
},

/* ============================== WRITING ============================== */
writing: {
  task1: {
    min: 150,
    prompt: 'The graph below shows the percentage of households with internet access in four countries between 2000 and 2020.<br><br>Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    chart: {
      title: 'Households with internet access (%)',
      years: [2000, 2005, 2010, 2015, 2020],
      series: [
        { name: 'South Korea', data: [50, 79, 94, 98, 99] },
        { name: 'Canada', data: [43, 64, 79, 87, 94] },
        { name: 'Brazil', data: [3, 13, 27, 51, 71] },
        { name: 'Egypt', data: [1, 8, 25, 40, 62] }
      ],
      note: 'Figures are illustrative, created for practice.'
    }
  },
  task2: [
    { min: 250, prompt: 'Some people believe that university education should be free for everyone, while others think that students should pay for their own studies.<br><br>Discuss both views and give your own opinion.' },
    { min: 250, prompt: 'In many countries, more and more people are choosing to live alone.<br><br>What are the reasons for this trend? Is it a positive or a negative development?' },
    { min: 250, prompt: 'Some people think that the best way to reduce traffic congestion in cities is to make public transport free.<br><br>To what extent do you agree or disagree?' }
  ]
},

/* ============================== SPEAKING ============================== */
speaking: {
  script: {
    intro: "Good morning. My name is Doctor Evans, and I'll be your examiner today. This part of the test is recorded.",
    p1intro: "In this first part, I'd like to ask you some questions about yourself.",
    p2intro: "Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. Before you talk, you'll have one minute to think about what you're going to say. You can make some notes if you wish. Here is your topic.",
    p2start: "All right? Remember, you have one to two minutes for this, so don't worry if I stop you. I'll tell you when the time is up. Can you start speaking now, please?",
    p2end: 'Thank you.',
    p3intro: "We've been talking about {topic}, and now I'd like to discuss with you one or two more general questions related to this.",
    end: 'Thank you very much. That is the end of the speaking test.'
  },
  part1First: [
    { name: 'Home', qs: ["Let's talk about where you live. Do you live in a house or an apartment?", 'What do you like most about your home?', 'Is there anything you would like to change about the place where you live?'] },
    { name: 'Work or studies', qs: ["Let's talk about what you do. Do you work, or are you a student?", 'Why did you choose that job, or that subject?', 'What do you find most difficult about it?'] }
  ],
  part1Topics: [
    { name: 'Weather', qs: ['What kind of weather do you like most?', 'Does the weather ever affect your mood?', 'Has the weather in your country changed in recent years?'] },
    { name: 'Reading', qs: ['Do you enjoy reading?', 'What kinds of things do you usually read?', 'Did you read more when you were a child than you do now?'] },
    { name: 'Music', qs: ['How often do you listen to music?', 'What kind of music do you like?', 'Have you ever learned to play a musical instrument?'] },
    { name: 'Food', qs: ['What is your favourite food?', 'Do you prefer eating at home or in restaurants?', 'Is there any food you did not like as a child but enjoy now?'] },
    { name: 'Mobile phones', qs: ['How much time do you spend on your phone each day?', 'What do you mainly use your phone for?', 'Do you think you will use your phone more or less in the future?'] },
    { name: 'Walking', qs: ['Do you walk much in your daily life?', 'Where do you like to go for a walk?', 'Do you think people walk less than they did in the past?'] },
    { name: 'Mornings', qs: ['Are you a morning person?', 'What do you usually do in the morning?', 'Has your morning routine changed since you were younger?'] }
  ],
  part2: [
    { topic: 'learning skills', title: 'Describe a skill that took you a long time to learn.',
      bullets: ['what the skill is', 'when and how you learned it', 'why it took a long time to learn'],
      explain: 'and explain how you feel about this skill now.',
      p3: ['What skills do young people think are most important today?', 'Is it better to learn a skill from a teacher or by yourself online? Why?', 'Why do some people give up when they are learning something new?', 'Do you think schools focus enough on practical skills?', 'How might the skills people need for work change in the future?'] },
    { topic: 'places you have visited', title: 'Describe a place you have visited that you would like to go back to.',
      bullets: ['where it is', 'when you went there and who you went with', 'what you did there'],
      explain: 'and explain why you would like to return.',
      p3: ['Why do some people like to visit the same places again and again?', 'What are the advantages and disadvantages of tourism for local communities?', 'How has the way people travel changed in your country in recent years?', 'Should governments limit the number of tourists who visit popular places?', 'Do you think international travel will become more or less common in the future?'] },
    { topic: 'people who influence us', title: 'Describe a person who has had an important influence on your life.',
      bullets: ['who this person is', 'how you know them', 'what they have done that influenced you'],
      explain: 'and explain why their influence has been important to you.',
      p3: ['What kinds of people are role models for young people today?', 'Do famous people have a responsibility to set a good example?', 'How important is the influence of parents compared with teachers?', 'Has social media changed the kind of people that young people admire?', 'What qualities make a good leader?'] }
  ]
},

/* ============== BAND DESCRIPTORS (short paraphrases of the public descriptors) ============== */
descriptors: {
  TA: { name: 'Task Achievement (Task 1)', bands: {
    9: 'Fully meets all requirements; a clear, well-chosen overview; all key features fully and accurately presented.',
    8: 'Covers all requirements well; a clear overview; key features clearly highlighted with only occasional lapses.',
    7: 'Clear overview of the main trends or differences; key features covered and highlighted, though they could be more fully extended.',
    6: 'Addresses the requirements; an overview is attempted; key features covered, but some details are irrelevant, inaccurate or missing.',
    5: 'Generally addresses the task, but recounts details mechanically with no clear overview; key features not adequately covered; may be under length.',
    4: 'Attempts the task but misses or confuses key features; format may be inappropriate; may be seriously under length.',
    3: 'Fails to address the task; very limited, largely irrelevant or inaccurate content.' } },
  TR: { name: 'Task Response (Task 2)', bands: {
    9: 'Fully addresses all parts of the question; a fully developed position with relevant, fully extended and well-supported ideas.',
    8: 'Sufficiently addresses all parts; a well-developed response with relevant, extended and supported ideas.',
    7: 'Addresses all parts; a clear position throughout; main ideas extended and supported, though there may be over-generalisation or loss of focus.',
    6: 'Addresses all parts, some more fully than others; a relevant position, but conclusions may be unclear or repetitive; some ideas insufficiently developed.',
    5: 'Addresses the task only partially; a position is expressed but not always clear; ideas limited and not well developed; may be under length.',
    4: 'Responds minimally or only tangentially; position unclear; few ideas, which may be repetitive or irrelevant.',
    3: 'Does not adequately address any part of the task; no clear position; few ideas, largely undeveloped or irrelevant.' } },
  CC: { name: 'Coherence & Cohesion', bands: {
    9: 'Cohesion is so natural it attracts no attention; paragraphing is skilfully managed.',
    8: 'Ideas sequenced logically; all aspects of cohesion well managed; paragraphing sufficient and appropriate.',
    7: 'Logically organised with clear progression; a range of linking devices, with some under- or over-use; each paragraph has a clear central topic.',
    6: 'Coherent overall with clear progression; linking is effective but may be faulty or mechanical within or between sentences; paragraphing not always logical.',
    5: 'Some organisation but no clear overall progression; linking inadequate, inaccurate or overused; repetitive; paragraphing may be inadequate.',
    4: 'Ideas not arranged coherently; basic linking that is inaccurate or repetitive; may lack paragraphs.',
    3: 'Ideas not organised logically; very limited linking.' } },
  LR: { name: 'Lexical Resource', bands: {
    9: 'Wide range used naturally with sophisticated control; very rare minor slips.',
    8: 'Wide range used fluently and flexibly; skilful use of less common items; only occasional errors in word choice or spelling.',
    7: 'Sufficient range for flexibility and precision; some less common items with awareness of style and collocation; occasional errors.',
    6: 'Adequate range for the task; attempts less common vocabulary with some inaccuracy; spelling or word-form errors do not stop communication.',
    5: 'Limited range, minimally adequate; noticeable errors in spelling or word formation that may cause difficulty for the reader.',
    4: 'Basic, repetitive vocabulary; poor control of word formation and spelling; errors may strain the reader.',
    3: 'Extremely limited range; errors severely distort the message.' } },
  GRA: { name: 'Grammatical Range & Accuracy', bands: {
    9: 'Wide range of structures with full flexibility and accuracy; very rare slips.',
    8: 'Wide range of structures; the majority of sentences are error-free; only very occasional errors.',
    7: 'A variety of complex structures; frequent error-free sentences; good control, though a few errors persist.',
    6: 'A mix of simple and complex sentence forms; some grammar and punctuation errors, which rarely reduce communication.',
    5: 'Limited range; complex sentences attempted but less accurate than simple ones; frequent errors that may cause difficulty.',
    4: 'Very limited range; subordinate clauses rare; errors predominate.',
    3: 'Sentence forms attempted, but errors predominate and distort meaning.' } },
  FC: { name: 'Fluency & Coherence', bands: {
    9: 'Speaks fluently with only rare repetition or self-correction; any hesitation is about content, not language; topics fully developed.',
    8: 'Speaks fluently with only occasional repetition or self-correction; develops topics coherently and appropriately.',
    7: 'Speaks at length without noticeable effort or loss of coherence; some language-related hesitation; uses a range of connectives flexibly.',
    6: 'Willing to speak at length, though may lose coherence at times through repetition, self-correction or hesitation; connectives not always appropriate.',
    5: 'Usually keeps going, but relies on repetition, self-correction and/or slow speech; overuses certain connectives.',
    4: 'Cannot respond without noticeable pauses; may speak slowly with frequent repetition; only simple linking.',
    3: 'Long pauses; limited ability to link simple sentences; often unable to convey basic meaning.' } },
  SLR: { name: 'Lexical Resource', bands: {
    9: 'Full flexibility and precision on all topics; uses idiomatic language naturally and accurately.',
    8: 'Wide resource used readily and flexibly; skilful use of less common and idiomatic vocabulary, with occasional inaccuracies; paraphrases effectively.',
    7: 'Discusses a variety of topics flexibly; some less common and idiomatic vocabulary with awareness of style and collocation; paraphrases effectively.',
    6: 'Vocabulary wide enough to discuss topics at length; meaning is clear despite some inappropriate choices; generally paraphrases successfully.',
    5: 'Manages familiar and unfamiliar topics, but with limited flexibility; attempts paraphrase with mixed success.',
    4: 'Basic vocabulary, adequate for familiar topics only; frequent errors in word choice; rarely paraphrases.',
    3: 'Simple vocabulary for personal information only; insufficient for less familiar topics.' } },
  SGRA: { name: 'Grammatical Range & Accuracy', bands: {
    9: 'Full range of structures used naturally and appropriately; consistently accurate.',
    8: 'Wide range of structures used flexibly; the majority of sentences are error-free.',
    7: 'A range of complex structures with some flexibility; frequently error-free sentences, though some errors persist.',
    6: 'A mix of simple and complex structures with limited flexibility; frequent mistakes in complex structures that rarely cause comprehension problems.',
    5: 'Basic sentence forms with reasonable accuracy; limited range of complex structures, which usually contain errors.',
    4: 'Basic sentence forms and some correct simple sentences; subordinate structures rare; errors frequent.',
    3: 'Attempts basic sentence forms with limited success; relies on memorised phrases.' } },
  P: { name: 'Pronunciation', bands: {
    9: 'Uses a full range of pronunciation features with precision and subtlety; effortless to understand throughout.',
    8: 'Uses a wide range of features flexibly; easy to understand throughout; accent has minimal effect on understanding.',
    7: 'All the positive features of Band 6 and some, but not all, of Band 8.',
    6: 'Uses a range of features with mixed control; generally understood, though some mispronunciation reduces clarity at times.',
    5: 'All the positive features of Band 4 and some, but not all, of Band 6.',
    4: 'Limited range of features; frequent lapses; mispronunciations cause some difficulty for the listener.',
    3: 'Some features of Band 2 and some of Band 4; often difficult to understand.' } }
}
};
