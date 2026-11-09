(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX'];
  const scenes = [
    { chapter:'THE TEMPLE OF DAWN', place:'HWAJEON MOUNTAIN · DAWN', route:'THE SEEKER', art:'scene-temple.svg', speaker:'Narrator', text:'On the mountain of Hwa-jeon, where clouds gathered like unspoken thoughts, a young monk named Seong-jin sat beneath an old pine. The morning bell had barely faded when eight maidens came to the temple, carrying the fragrance of another world.' },
    { chapter:'THE TEMPLE OF DAWN', place:'THE OLD PINE · FIRST LIGHT', route:'THE SEEKER', art:'scene-temple.svg', speaker:'Narrator', text:'Their laughter drifted through the gate. Seong-jin lowered his eyes to his sutra, but the words had begun to blur. A single thought took root: <em>What lies beyond this quiet life?</em>' },
    { chapter:'THE TEMPLE OF DAWN', place:'THE GARDEN GATE · MORNING', route:'THE SEEKER', art:'scene-temple.svg', speaker:'Yang So-yu', text:'The eldest maiden paused beside the pine. A jade hairpin gleamed in her hand. “Reverend, is a life without longing truly a life at all?”' },
    { chapter:'THE TEMPLE OF DAWN', place:'THE MOUNTAIN PATH · MORNING', route:'THE SEEKER', art:'scene-temple.svg', speaker:'Narrator', text:'The question opened a door within him. When the incense curled around his face, Seong-jin felt the world tilt, as if heaven itself had become a page turning.' },
    { chapter:'A WORLD UNFOLDS', place:'THE CAPITAL · SPRING', route:'THE SCHOLAR', art:'scene-capital.svg', speaker:'Narrator', text:'He awoke as Yang So-yu: brilliant, young, and free to choose his fate. The capital shimmered beyond the river. His learning might earn him a name, his courage a place at court—and his heart, perhaps, a home.' },
    { chapter:'A WORLD UNFOLDS', place:'THE EXAMINATION HALL · SPRING', route:'THE SCHOLAR', art:'scene-capital.svg', speaker:'Scholar at the gate', text:'A notice was posted beneath the vermilion arch: the imperial examinations would begin at sunrise. “A single day may change the course of a life,” said an old scholar. “What will you carry with you?”' },
    { chapter:'A WORLD UNFOLDS', place:'THE IMPERIAL GARDEN · EVENING', route:'THE BELOVED', art:'scene-garden.svg', speaker:'Princess Jeong', text:'The palace garden held the hush of falling petals. Princess Jeong met his gaze across the pond. “You speak as though the world is yours to win,” she said. “Tell me, what would you keep if you could not keep everything?”' },
    { chapter:'A WORLD UNFOLDS', place:'THE RIVER PAVILION · NIGHT', route:'THE BELOVED', art:'scene-garden.svg', speaker:'Yang So-yu', text:'Music rang over the water. Friends, honors, and bright promises gathered around him like lanterns. Yet in the hush between songs, a small ache returned: the fear that every joy was already passing.' },
    { chapter:'THE MANY ROADS', place:'THE NORTHERN FRONTIER · AUTUMN', route:'THE WARRIOR', art:'scene-frontier.svg', speaker:'General Yang', text:'At the frontier, the wind carried the smell of rain and iron. He had won a hundred victories, but tonight he stood alone beneath a sky without borders. What is glory worth when no one is beside you to remember it?' },
    { chapter:'THE MANY ROADS', place:'THE PALACE · WINTER', route:'THE WARRIOR', art:'scene-frontier.svg', speaker:'Narrator', text:'Years turned like prayer beads. He had reached the highest rooms, held the rarest treasures, and loved more deeply than he thought possible. Still, the heart asked for more. Perhaps it always would.' },
    { chapter:'THE TURNING POINT', place:'THE BANQUET HALL · MIDNIGHT', route:'THE AWAKENING', art:'scene-garden.svg', speaker:'A mysterious monk', text:'An old monk appeared at the feast, his robe dusted with mountain snow. “Yang So-yu, you have gathered the world,” he said. “But tell me—does it belong to you, or have you merely passed through it?”' },
    { chapter:'THE TURNING POINT', place:'THE MIRROR LAKE · BEFORE DAWN', route:'THE AWAKENING', art:'scene-lake.svg', speaker:'Narrator', text:'The lanterns went out one by one. In the still lake, his reflection wore the face of the monk he had once been. A ripple crossed the water, and every bright possession trembled into light.' },
    { chapter:'THE TURNING POINT', place:'THE LOTUS POND · FIRST LIGHT', route:'THE AWAKENING', art:'scene-lake.svg', speaker:'The monk', text:'“All things are dreams,” the monk whispered. “But a dream may still teach the heart how to love.” The world loosened its hold. He could cling to its beauty, or let its beauty go.' },
    { chapter:'THE NINE CLOUDS', place:'HWAJEON MOUNTAIN · DAWN', route:'THE RETURN', art:'scene-temple.svg', speaker:'Seong-jin', text:'Seong-jin opened his eyes beneath the old pine. The morning bell rang once more. No years had passed—yet he carried the weight and wonder of a lifetime in his heart.' },
    { chapter:'THE NINE CLOUDS', place:'THE TEMPLE GATE · MORNING', route:'THE RETURN', art:'scene-temple.svg', speaker:'Narrator', text:'The eight maidens had gone. Only a jade hairpin rested in the dust, though perhaps it had always been a fallen leaf. The monk smiled at the mystery, and at the tenderness it had left behind.' },
    { chapter:'THE NINE CLOUDS', place:'THE MOUNTAIN PATH · MORNING', route:'THE RETURN', art:'scene-temple.svg', speaker:'Narrator', text:'He returned to his sutra, but not as the same man. Desire had shown him the shape of the world; loss had shown him its impermanence. Between them lay compassion—the truest waking.' },
    { chapter:'THE NINE CLOUDS', place:'THE BELL TOWER · SUNRISE', route:'THE RETURN', art:'scene-temple.svg', speaker:'Seong-jin', text:'“A dream is not false simply because it ends,” he said. “Love is no less real for passing. Let me wake, and still be grateful.” The bell answered, clear as the first note of a song.' },
    { chapter:'THE NINE CLOUDS', place:'HWAJEON MOUNTAIN · SUNRISE', route:'THE RETURN', art:'scene-temple.svg', speaker:'Narrator', text:'The clouds parted. Below, the valleys filled with morning. Seong-jin bowed—not to the life he had lost, but to the lives that had taught him how to see. <em>And in the quiet, the dream was complete.</em>' }
  ];
  const decisions = {
    3: { prompt:'What will Seong-jin do with the question?', choices:[['a','Return to his sutra, and let the thought pass.','discipline'],['b','Follow the maidens down the mountain path.','curiosity'],['c','Ask the old monk what desire is meant to teach.','wisdom']] },
    5: { prompt:'At the threshold of his new life, what will Yang So-yu pursue?', choices:[['a','Earn a name through learning and service.','duty'],['b','Follow the call of his restless heart.','love'],['c','Seek adventure beyond the city walls.','freedom']] },
    7: { prompt:'The princess asks what he would keep. How does he answer?', choices:[['a','“The people I love, above all honors.”','love'],['b','“The chance to do good with what I have.”','compassion'],['c','“Nothing can be held forever; I will cherish this moment.”','wisdom']] },
    11: { prompt:'The monk holds out a mirror. What does Yang So-yu see?', choices:[['a','A life built from every choice he made.','reflection'],['b','The faces of those who shared his journey.','love'],['c','A quiet heart, beneath all the names and honors.','awakening']] },
    13: { prompt:'What does the young monk carry from his dream?', choices:[['a','A vow to quiet every desire.','discipline'],['b','Gratitude for the love he was given.','compassion'],['c','The wisdom to meet each passing moment fully.','wisdom']] }
  };
  const chapterNames=['THE TEMPLE OF DAWN','A WORLD UNFOLDS','THE MANY ROADS','THE TURNING POINT','THE NINE CLOUDS'];
  const state={index:0,history:[],choices:{},flags:{},seen:{},auto:false,skip:false,volume:0.65,locale:'en',ending:null};
  let typingTimer=null, typeToken=0, toastTimer=null, progressionTimer=null;
  const saveKey='nine-cloud-dream-save-v1', manualSaveKey='nine-cloud-dream-manual-save-v1', settingKey='nine-cloud-dream-settings-v1';
  try {const s=JSON.parse(localStorage.getItem(settingKey)||'{}');Object.assign(state,{volume:s.volume??.65,locale:s.locale||'en'});} catch(_){}
  function persisted(){try{return JSON.parse(localStorage.getItem(saveKey)||'null')}catch(_){return null}}
  function saveData(){return JSON.stringify({index:state.index,history:state.history,choices:state.choices,flags:state.flags,seen:state.seen,ending:state.ending})}
  function persist(){try{localStorage.setItem(saveKey,saveData())}catch(_){toast('Dream could not be saved in this browser.')}}
  function toast(msg){const el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2100)}
  function showStory(){ $('title-screen').hidden=true;$('story-screen').hidden=false;render(); }
  function begin(){clearTimeout(progressionTimer);state.index=0;state.history=[];state.choices={};state.flags={};state.seen={};state.ending=null;showStory();persist();}
  function loadSaved(){const s=persisted();if(!s)return;restore(s)}
  function restore(s){clearTimeout(progressionTimer);Object.assign(state,{index:Math.max(0,Math.min(Number(s.index)||0,scenes.length-1)),history:s.history||[],choices:s.choices||{},flags:s.flags||{},seen:s.seen||{},ending:s.ending||null});showStory();}
  function setText(el,html){el.innerHTML=html}
  function render(){
    const scene=scenes[state.index];if(!scene)return;
    state.seen[state.index]=true;
    $('chapter-name').textContent=scene.chapter;$('chapter-index').textContent=roman[chapterNames.indexOf(scene.chapter)]||'I';$('scene-caption').textContent=scene.place;$('route-label').textContent=scene.route;$('dialogue-count').textContent=String(state.index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');$('progress-label').textContent=String(state.index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');$('progress-fill').style.width=((state.index+1)/scenes.length*100)+'%';
    $('scene-art').style.backgroundImage=`url('assets/${scene.art}')`;
    $('speaker').textContent=scene.speaker;
    $('story-side-note').textContent=scene.route==='THE RETURN'?'悟 · ONE LIFE, NINE DREAMS':'書 · ONE LIFE, NINE DREAMS';
    $('auto-button').classList.toggle('active',state.auto);$('skip-button').classList.toggle('active',state.skip);
    const dialogue=$('dialogue'), choiceBox=$('choices'), choice=decisions[state.index+1];
    dialogue.classList.toggle('has-choices',!!choice); choiceBox.innerHTML=''; choiceBox.hidden=!choice;
    setText($('dialogue-text'),scene.text);
    if(choice){$('dialogue-text').insertAdjacentHTML('beforeend',`<br><em>${choice.prompt}</em>`);choice.choices.forEach(([key,label,flag])=>{const b=document.createElement('button');b.className='choice-button';b.innerHTML=`<span>${key.toUpperCase()}.</span>${label}`;b.addEventListener('click',()=>choose(key,flag));choiceBox.appendChild(b)});}
    $('advance-button').hidden=!!choice;$('next-button').disabled=!!choice;
    if(!choice)typeText($('dialogue-text'));
    $('prev-button').disabled=state.index===0;
    persist();
    scheduleProgression();
  }
  function scheduleProgression(){
    clearTimeout(progressionTimer);
    if(decisions[state.index+1])return;
    const next=state.index+1;
    if(state.skip){
      if(next<scenes.length&&state.seen[next])progressionTimer=setTimeout(advance,140);
      return;
    }
    if(state.auto){
      const delay=1800+(1-state.volume)*6200;
      progressionTimer=setTimeout(advance,delay);
    }
  }
  function typeText(el){clearInterval(typingTimer);const full=el.innerHTML;const plain=el.textContent;const scene=scenes[state.index];el.innerHTML=scene.text; // reveal a subtle entry while preserving markup
    el.classList.remove('typing');void el.offsetWidth;el.classList.add('typing');typeToken++;}
  function choose(key,flag){const decision=decisions[state.index+1];const picked=decision.choices.find(c=>c[0]===key);if(!picked)return;clearTimeout(progressionTimer);state.choices[state.index+1]=key;state.flags[flag]=(state.flags[flag]||0)+1;state.history.push({speaker:'Your choice',text:picked[1],scene:state.index});state.index++;persist();render();}
  function advance(){clearTimeout(progressionTimer);if(decisions[state.index+1])return;if(state.index>=scenes.length-1){endingModal();return}const s=scenes[state.index];state.history.push({speaker:s.speaker,text:s.text,scene:state.index});state.index++;persist();render();}
  function previous(){if(state.index<=0)return;clearTimeout(progressionTimer);state.index--;render();}
  function endingModal(){const sorted=Object.entries(state.flags).sort((a,b)=>b[1]-a[1]);const best=sorted[0]?.[0]||'wisdom';const text={compassion:'THE LANTERN OF COMPASSION',love:'THE LOTUS OF LOVE',wisdom:'THE MIRROR OF WISDOM',discipline:'THE QUIET BELL',curiosity:'THE OPEN GATE',freedom:'THE WANDERER'}[best]||'THE CLOUD THAT RETURNS';state.ending=best;persist();openModal(text,`<div class="ending-mark">雲夢九記</div><p>You have completed <em>The Nine Cloud Dream</em>.</p><p>Your choices leave a gentle mark: <strong style="color:#ddc990">${text}</strong>.</p><p>The dream ends, but its meaning belongs to you. Begin again to discover another path.</p><button class="modal-action" id="again-button">DREAM AGAIN</button><button class="modal-action" id="close-ending">RETURN TO THE LAST MOMENT</button>`);$('again-button').onclick=()=>{closeModal();begin()};$('close-ending').onclick=closeModal;}
  function openModal(title,content){$('modal-title').textContent=title;$('modal-content').innerHTML=content;$('overlay').hidden=false;$('modal-close').focus()}
  function closeModal(){$('overlay').hidden=true}
  function openSettings(){openModal('Settings',`<div class="setting-row"><div><label for="volume">Text speed</label><small>Reading pace for auto-advance</small></div><input id="volume" type="range" min="0" max="100" value="${Math.round(state.volume*100)}"></div><div class="setting-row"><div><label for="language">Language</label><small>Story and interface</small></div><select id="language"><option value="en" ${state.locale==='en'?'selected':''}>English</option><option value="ko" ${state.locale==='ko'?'selected':''}>한국어 · WIP</option><option value="zh" ${state.locale==='zh'?'selected':''}>中文 · WIP</option></select></div><div class="setting-row"><div><label>Keyboard controls</label><small>Space / → continue · ← previous · Esc close</small></div></div><button class="modal-action" id="settings-done">RETURN TO THE DREAM</button>`);$('volume').oninput=e=>{state.volume=+e.target.value/100;try{localStorage.setItem(settingKey,JSON.stringify({volume:state.volume,locale:state.locale}))}catch(_){}scheduleProgression();};$('language').onchange=e=>{state.locale=e.target.value;toast(state.locale==='en'?'Language set to English':'This translation is not yet available. Showing English.');state.locale='en';try{localStorage.setItem(settingKey,JSON.stringify({volume:state.volume,locale:state.locale}))}catch(_){}};$('settings-done').onclick=closeModal;}
  function journal(){const entries=Object.keys(state.choices).map(k=>{const d=decisions[k];const key=state.choices[k];const picked=d?.choices.find(c=>c[0]===key);return picked?`<div class="journal-entry"><strong>${scenes[+k-1].place}</strong><span>${picked[1]}</span></div>`:''}).join('');openModal('Dream journal',`<div class="journal-list">${entries||'<p class="journal-empty">Your dream is still unfolding. The choices you make will be kept here.</p>'}</div><button class="modal-action" id="journal-done">RETURN TO THE DREAM</button>`);$('journal-done').onclick=closeModal;}
  function historyModal(){const entries=state.history.slice(-30).map(x=>`<div class="history-item"><b>${x.speaker} · ${scenes[x.scene]?.place||''}</b><span>${x.text.replace(/<[^>]*>/g,'')}</span></div>`).join('');openModal('Story so far',`<div class="history-list">${entries||'<p class="journal-empty">The first page is waiting.</p>'}</div><button class="modal-action" id="history-done">RETURN TO THE DREAM</button>`);$('history-done').onclick=closeModal;}
  function save(){try{localStorage.setItem(manualSaveKey,saveData());toast('Dream saved. Your choices are remembered.')}catch(_){toast('Dream could not be saved in this browser.')}}
  function load(){let s;try{s=JSON.parse(localStorage.getItem(manualSaveKey)||'null')}catch(_){}if(!s){toast('No saved dream found.');return}restore(s);toast('Your last dream returns.')}
  function toggleAuto(){state.auto=!state.auto;$('auto-button').classList.toggle('active',state.auto);scheduleProgression();toast(state.auto?'Auto advance is on.':'Auto advance is off.');}
  function toggleSkip(){state.skip=!state.skip;$('skip-button').classList.toggle('active',state.skip);scheduleProgression();toast(state.skip?'Skipping previously read scenes.':'Skip seen text is off.');}
  $('begin-button').addEventListener('click',begin);$('continue-button').addEventListener('click',loadSaved);$('advance-button').addEventListener('click',advance);$('next-button').addEventListener('click',advance);$('prev-button').addEventListener('click',previous);$('settings-button').addEventListener('click',openSettings);$('title-settings').addEventListener('click',openSettings);$('modal-close').addEventListener('click',closeModal);$('overlay').addEventListener('click',e=>{if(e.target===$('overlay'))closeModal()});$('journal-button').addEventListener('click',journal);$('save-button').addEventListener('click',save);$('load-button').addEventListener('click',load);$('history-button').addEventListener('click',historyModal);$('auto-button').addEventListener('click',toggleAuto);$('skip-button').addEventListener('click',toggleSkip);$('wordmark').addEventListener('click',e=>{e.preventDefault();openModal('Leave the dream?',`<p>Your progress is saved automatically. Return to the title, or stay within the dream.</p><button class="modal-action" id="title-return">RETURN TO TITLE</button><button class="modal-action" id="stay-dream">STAY HERE</button>`);$('title-return').onclick=()=>{$('overlay').hidden=true;$('story-screen').hidden=true;$('title-screen').hidden=false};$('stay-dream').onclick=closeModal});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(!$('overlay').hidden)closeModal();return}if(!$('overlay').hidden)return;if(e.key===' '||e.key==='ArrowRight'){e.preventDefault();advance()}else if(e.key==='ArrowLeft'){previous()}else if(e.key.toLowerCase()==='s')save();else if(e.key.toLowerCase()==='l')load();else if(e.key.toLowerCase()==='j')journal();});
  const saved=persisted();if(saved&&saved.index>0)$('continue-button').hidden=false;
})();
