const STORAGE="maisonDuoZeroV6";
const DAYS=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
let step=1, setup={}, editingTaskId=null;

const CATALOG=[
["Vaisselle / lave-vaisselle","maison","weekly",15,1],
["Nettoyer plan de travail cuisine","maison","weekly",10,1],
["Aspirateur","maison","weekly",25,1],
["Laver les sols","maison","weekly",35,1],
["Dépoussiérer","maison","weekly",20,2],
["Nettoyer salle de bain","maison","weekly",25,1],
["Nettoyer WC","maison","weekly",15,1],
["Changer les draps","linge","weekly",20,1],
["Changer serviettes","linge","weekly",10,1],
["Lancer une lessive","linge","weekly",10,1],
["Étendre / sécher le linge","linge","weekly",15,1],
["Plier et ranger le linge","linge","weekly",25,1],
["Faire les courses","courses","weekly",60,1],
["Faire la liste des courses","courses","weekly",15,1],
["Planifier les repas","organisation","weekly",20,1],
["Préparer quelques repas","organisation","weekly",60,2],
["Trier courrier / papiers","organisation","weekly",15,2],
["Faire le point budget","organisation","monthly",25,2],
["Nettoyer frigo","maison","monthly",30,2],
["Nettoyer four / micro-ondes","maison","monthly",30,2],
["Faire les vitres","maison","monthly",45,2],
["Détartrer robinetterie","maison","monthly",20,2],
["Nettoyer gamelles chiens","animaux","weekly",15,1,"dogs"],
["Nettoyer couchage chiens","animaux","biweekly",30,2,"dogs"],
["Brosser les chiens","animaux","weekly",20,2,"dogs"],
["Balade hebdomadaire chiens","animaux","weekly",60,1,"dogwalk"],
["Nettoyer litière en profondeur","animaux","weekly",25,1,"cats"],
["Nettoyer gamelles chats","animaux","weekly",15,1,"cats"],
["Nettoyer espace autres animaux","animaux","weekly",20,1,"otherpets"],
["Tonte pelouse","terrain","weekly",90,2,"garden"],
["Débroussaillage","terrain","biweekly",90,2,"garden"],
["Désherbage","terrain","weekly",45,2,"garden"],
["Bordures","terrain","biweekly",45,2,"garden"],
["Ramasser feuilles / branches","terrain","weekly",30,2,"garden"],
["Tailler haies / arbustes","terrain","monthly",90,3,"hedges"],
["Nettoyer terrasse / balcon","terrain","monthly",30,2,"terrace"],
["Contrôler eau piscine","terrain","weekly",20,1,"pool"],
["Nettoyer piscine","terrain","weekly",30,1,"pool"],
["Ranger / balayer garage","maison","monthly",30,2,"garage"],
["Ranger dépendance / abri","terrain","monthly",30,2,"shed"],
["Nettoyer filtre lave-vaisselle","maison","monthly",15,2,"dishwasher"],
["Nettoyer filtre sèche-linge","linge","weekly",10,1,"dryer"],
["Nettoyer robot aspirateur","maison","weekly",15,1,"robot"],
["Nettoyer filtres climatisation","maison","monthly",20,2,"ac"],
["Entretien cheminée / poêle","maison","seasonal",45,2,"fireplace"],
["Ranger affaires des enfants","organisation","weekly",20,1,"children"],
["Préparer affaires école / crèche","organisation","weekly",20,1,"children"],
["Trier vêtements enfants","linge","monthly",30,2,"children"]
];

function blankState(){return {configured:false,household:null,tasks:[],week:[]}}
let state=load();
function load(){try{return JSON.parse(localStorage.getItem(STORAGE))||blankState()}catch(e){return blankState()}}
function save(){localStorage.setItem(STORAGE,JSON.stringify(state))}
function uid(){return Date.now()+"_"+Math.random().toString(36).slice(2)}

function renderSetup(){
  document.querySelectorAll(".step").forEach(s=>s.classList.toggle("active",Number(s.dataset.step)===step));
  document.querySelector("#prevStep").disabled=step===1;
  document.querySelector("#nextStep").classList.toggle("hidden",step===7);
  document.querySelector("#finishSetup").classList.toggle("hidden",step!==7);
  document.querySelector("#progressBar").style.width=(step/7*100)+"%";
  document.querySelector("#progressText").textContent=`Étape ${step} / 7`;
}

document.querySelectorAll("[data-radio]").forEach(btn=>{
  btn.onclick=()=>{
    const group=btn.dataset.radio;
    document.querySelectorAll(`[data-radio="${group}"]`).forEach(x=>x.classList.remove("selected"));
    btn.classList.add("selected");
    setup[group]=btn.dataset.value;
  }
});

document.querySelector("#setupAdults").oninput=renderPeopleInputs;
document.querySelector("#setupChildren").oninput=renderPeopleInputs;
function renderPeopleInputs(){
  const adults=Number(document.querySelector("#setupAdults").value||0);
  const children=Number(document.querySelector("#setupChildren").value||0);
  const a=document.querySelector("#adultNamesBox");
  a.innerHTML=adults?`<h3>Prénoms des adultes</h3>`:"";
  for(let i=0;i<adults;i++)a.innerHTML+=`<label>Adulte ${i+1}<input class="adult-name" placeholder="Prénom"></label>`;
  const c=document.querySelector("#childAgesBox");
  c.innerHTML=children?`<h3>Âge des enfants</h3>`:"";
  for(let i=0;i<children;i++)c.innerHTML+=`<label>Enfant ${i+1}<input class="child-age" type="number" min="0" max="25" placeholder="Âge"></label>`;
}

document.querySelector("#nextStep").onclick=()=>{if(step<7){step++;renderSetup()}};
document.querySelector("#prevStep").onclick=()=>{if(step>1){step--;renderSetup()}};

function collectSetup(){
  const adults=[...document.querySelectorAll(".adult-name")].map((x,i)=>x.value.trim()||`Adulte ${i+1}`);
  const childAges=[...document.querySelectorAll(".child-age")].map(x=>Number(x.value||0));
  return {
    homeType:setup.homeType||"autre",
    homeArea:Number(document.querySelector("#setupHomeArea").value||0),
    bedrooms:Number(document.querySelector("#setupBedrooms").value||0),
    bathrooms:Number(document.querySelector("#setupBathrooms").value||0),
    toilets:Number(document.querySelector("#setupToilets").value||0),
    adults,
    childAges,
    dogs:Number(document.querySelector("#setupDogs").value||0),
    cats:Number(document.querySelector("#setupCats").value||0),
    otherPets:Number(document.querySelector("#setupOtherPets").value||0),
    otherPetType:document.querySelector("#setupOtherPetType").value.trim(),
    dogWalk:document.querySelector("#setupDogWalk").checked,
    landArea:Number(document.querySelector("#setupLandArea").value||0),
    garden:document.querySelector("#setupGarden").checked,
    terrace:document.querySelector("#setupTerrace").checked,
    pool:document.querySelector("#setupPool").checked,
    garage:document.querySelector("#setupGarage").checked,
    shed:document.querySelector("#setupShed").checked,
    hedges:document.querySelector("#setupHedges").checked,
    dishwasher:document.querySelector("#setupDishwasher").checked,
    dryer:document.querySelector("#setupDryer").checked,
    robot:document.querySelector("#setupRobotVacuum").checked,
    ac:document.querySelector("#setupAC").checked,
    fireplace:document.querySelector("#setupFireplace").checked,
    workStart:document.querySelector("#setupWorkStart").value||"",
    workEnd:document.querySelector("#setupWorkEnd").value||"",
    workDays:Number(document.querySelector("#setupWorkDays").value||0),
    weekdayCap:Number(document.querySelector("#setupWeekdayCap").value||60),
    weekendCap:Number(document.querySelector("#setupWeekendCap").value||180),
    loadProfile:setup.loadProfile||"balanced",
    autoBalance:document.querySelector("#setupAutoBalance").checked,
    rotation:document.querySelector("#setupRotation").checked,
    batching:document.querySelector("#setupBatching").checked,
    lightSunday:document.querySelector("#setupLightSunday").checked,
    includeDaily:document.querySelector("#setupDaily").checked
  }
}

function eligible(entry,h){
  const tag=entry[5];
  if(!tag)return true;
  if(tag==="dogs")return h.dogs>0;
  if(tag==="dogwalk")return h.dogs>0&&h.dogWalk;
  if(tag==="cats")return h.cats>0;
  if(tag==="otherpets")return h.otherPets>0;
  if(tag==="garden")return h.garden;
  if(tag==="hedges")return h.hedges;
  if(tag==="terrace")return h.terrace;
  if(tag==="pool")return h.pool;
  if(tag==="garage")return h.garage;
  if(tag==="shed")return h.shed;
  if(tag==="dishwasher")return h.dishwasher;
  if(tag==="dryer")return h.dryer;
  if(tag==="robot")return h.robot;
  if(tag==="ac")return h.ac;
  if(tag==="fireplace")return h.fireplace;
  if(tag==="children")return h.childAges.length>0;
  return true;
}

function buildTasks(h){
  const maxP=h.loadProfile==="light"?1:h.loadProfile==="balanced"?2:3;
  return CATALOG.filter(x=>eligible(x,h)&&x[4]<=maxP).map(x=>({
    id:uid(),title:x[0],category:x[1],frequency:x[2],duration:scaledDuration(x[3],x[1],h),
    priority:x[4],enabled:true
  }))
}

function scaledDuration(d,cat,h){
  let n=Number(d);
  if(cat==="maison"){
    if(h.homeArea>140)n*=1.35;else if(h.homeArea>90)n*=1.15;else if(h.homeArea&&h.homeArea<50)n*=.8;
  }
  if(cat==="linge"){
    const people=h.adults.length+h.childAges.length;if(people>=5)n*=1.35;else if(people>=3)n*=1.15;
  }
  if(cat==="terrain"){
    if(h.landArea>2000)n*=1.35;else if(h.landArea>1000)n*=1.2;else if(h.landArea>0&&h.landArea<300)n*=.75;
  }
  return Math.max(5,Math.round(n/5)*5);
}

function generateWeek(){
  const h=state.household;
  const tasks=state.tasks.filter(t=>t.enabled);
  const week=[];
  const usage=Object.fromEntries(DAYS.map((d,i)=>[d,{used:0,cap:i<5?h.weekdayCap:(d==="Dimanche"&&h.lightSunday?Math.round(h.weekendCap*.75):h.weekendCap)}]));
  const ownerTime=h.adults.map(()=>0);
  const categoriesByDay=Object.fromEntries(DAYS.map(d=>[d,{}]));
  const sorted=[...tasks].sort((a,b)=>a.priority-b.priority||b.duration-a.duration);

  for(const t of sorted){
    const candidates=[...DAYS].sort((a,b)=>{
      const ia=DAYS.indexOf(a),ib=DAYS.indexOf(b);
      let sa=usage[a].used/usage[a].cap*100,sb=usage[b].used/usage[b].cap*100;
      if(t.duration>=45||t.category==="terrain"||t.category==="courses"){if(ia<5)sa+=35;if(ib<5)sb+=35}
      if(h.batching){if(categoriesByDay[a][t.category])sa-=10;if(categoriesByDay[b][t.category])sb-=10}
      return sa-sb;
    });
    const day=candidates.find(d=>usage[d].used+t.duration<=usage[d].cap)||candidates[0];
    usage[day].used+=t.duration;categoriesByDay[day][t.category]=true;
    let owner=0;
    if(h.autoBalance&&ownerTime.length>1){
      owner=ownerTime.indexOf(Math.min(...ownerTime));
    }
    if(ownerTime.length){ownerTime[owner]+=t.duration}
    week.push({id:uid(),taskId:t.id,title:t.title,category:t.category,duration:t.duration,day,owner,done:false});
  }
  state.week=week;save();renderApp();
}

document.querySelector("#finishSetup").onclick=()=>{
  const h=collectSetup();
  state.household=h;
  state.tasks=buildTasks(h);
  state.configured=true;
  generateWeek();
  showApp();
};

function showApp(){
  document.querySelector("#setupScreen").classList.add("hidden");
  document.querySelector("#appScreen").classList.remove("hidden");
  renderApp();
}
function showSetupFromState(){
  const h=state.household||{};
  setup.homeType=h.homeType;setup.loadProfile=h.loadProfile;
  document.querySelectorAll('[data-radio="homeType"]').forEach(b=>b.classList.toggle("selected",b.dataset.value===h.homeType));
  document.querySelectorAll('[data-radio="loadProfile"]').forEach(b=>b.classList.toggle("selected",b.dataset.value===h.loadProfile));
  const map={
    setupHomeArea:h.homeArea,setupBedrooms:h.bedrooms,setupBathrooms:h.bathrooms,setupToilets:h.toilets,
    setupAdults:h.adults?.length||0,setupChildren:h.childAges?.length||0,setupDogs:h.dogs,setupCats:h.cats,
    setupOtherPets:h.otherPets,setupOtherPetType:h.otherPetType,setupLandArea:h.landArea,setupWorkStart:h.workStart,
    setupWorkEnd:h.workEnd,setupWorkDays:h.workDays,setupWeekdayCap:h.weekdayCap,setupWeekendCap:h.weekendCap
  };
  Object.entries(map).forEach(([id,v])=>{const el=document.querySelector("#"+id);if(el)el.value=v??""});
  ["dogWalk","garden","terrace","pool","garage","shed","hedges","dishwasher","dryer","robot","ac","fireplace","autoBalance","rotation","batching","lightSunday","includeDaily"].forEach(k=>{
    const id="setup"+k[0].toUpperCase()+k.slice(1);const el=document.querySelector("#"+id);if(el)el.checked=!!h[k]
  });
  renderPeopleInputs();
  [...document.querySelectorAll(".adult-name")].forEach((x,i)=>x.value=h.adults?.[i]||"");
  [...document.querySelectorAll(".child-age")].forEach((x,i)=>x.value=h.childAges?.[i]??"");
  step=1;renderSetup();
  document.querySelector("#appScreen").classList.add("hidden");
  document.querySelector("#setupScreen").classList.remove("hidden");
}
document.querySelector("#reconfigureBtn").onclick=showSetupFromState;

function summary(){
  const h=state.household;const people=h.adults.length+h.childAges.length;const pets=[];
  if(h.dogs)pets.push(`${h.dogs} chien${h.dogs>1?"s":""}`);if(h.cats)pets.push(`${h.cats} chat${h.cats>1?"s":""}`);if(h.otherPets)pets.push(`${h.otherPets} autre${h.otherPets>1?"s":""}`);
  return `${h.homeType} · ${h.homeArea||0} m² · ${people} habitant${people>1?"s":""}${h.landArea?` · ${h.landArea} m² extérieur`:""}${pets.length?` · ${pets.join(", ")}`:""}`;
}
function renderApp(){
  document.querySelector("#householdSummary").textContent=summary();
  const done=state.week.filter(t=>t.done).length,total=state.week.length,mins=state.week.filter(t=>!t.done).reduce((s,t)=>s+t.duration,0);
  document.querySelector("#stats").innerHTML=`
    <article class="stat"><strong>${total}</strong><span>tâches planifiées</span></article>
    <article class="stat"><strong>${total?Math.round(done/total*100):0}%</strong><span>terminées</span></article>
    <article class="stat"><strong>${formatTime(mins)}</strong><span>temps restant</span></article>
    <article class="stat"><strong>${state.tasks.length}</strong><span>tâches dans la bibliothèque</span></article>`;
  const grid=document.querySelector("#weekGrid");grid.innerHTML="";
  DAYS.forEach((day,i)=>{
    const col=document.createElement("section");col.className="day"+(i>=5?" weekend":"");
    col.innerHTML=`<div class="day-head"><h3>${day}</h3><small>${i<5?"Semaine":"Week-end"}</small></div><div class="slot"><div class="slot-title">Tâches</div><div class="tasks"></div></div>`;
    const box=col.querySelector(".tasks");
    state.week.filter(t=>t.day===day).forEach(t=>{
      const el=document.createElement("article");el.className="task"+(t.done?" done":"");
      const owner=state.household.adults[t.owner]||"Foyer";
      el.innerHTML=`<div class="task-line"><span class="task-name">${escapeHtml(t.title)}</span><span class="task-time">${formatTime(t.duration)}</span></div>
        <div class="task-meta"><span class="pill">${t.category}</span><span class="pill">${escapeHtml(owner)}</span></div>
        <div class="task-actions"><button class="mini-btn done-btn">${t.done?"↩ Réouvrir":"✓ Terminer"}</button></div>`;
      el.querySelector(".done-btn").onclick=()=>{t.done=!t.done;save();renderApp()};
      box.appendChild(el);
    });
    grid.appendChild(col);
  });
  renderLibrary();
}

function renderLibrary(){
  const q=(document.querySelector("#searchTask")?.value||"").toLowerCase();
  const list=document.querySelector("#libraryList");if(!list)return;list.innerHTML="";
  state.tasks.filter(t=>!q||t.title.toLowerCase().includes(q)).forEach(t=>{
    const el=document.createElement("article");el.className="library-item"+(t.enabled?"":" off");
    el.innerHTML=`<div><strong>${escapeHtml(t.title)}</strong><small>${t.category} · ${t.frequency} · ${formatTime(t.duration)}</small></div>
      <div><button class="mini-btn edit-lib">Modifier</button></div>`;
    el.querySelector(".edit-lib").onclick=()=>openTaskEditor(t.id);
    list.appendChild(el);
  });
}

function openTaskEditor(id=null){
  editingTaskId=id;const t=id?state.tasks.find(x=>x.id===id):null;
  document.querySelector("#taskDialogTitle").textContent=t?"Modifier la tâche":"Nouvelle tâche";
  document.querySelector("#deleteTaskBtn").classList.toggle("hidden",!t);
  document.querySelector("#taskTitle").value=t?.title||"";
  document.querySelector("#taskCategory").value=t?.category||"maison";
  document.querySelector("#taskFrequency").value=t?.frequency||"weekly";
  document.querySelector("#taskDuration").value=t?.duration||30;
  document.querySelector("#taskPriority").value=t?.priority||2;
  document.querySelector("#taskEnabled").checked=t?.enabled??true;
  document.querySelector("#taskDialog").showModal();
}
document.querySelector("#taskForm").onsubmit=e=>{
  e.preventDefault();
  const data={title:document.querySelector("#taskTitle").value.trim(),category:document.querySelector("#taskCategory").value,
    frequency:document.querySelector("#taskFrequency").value,duration:Number(document.querySelector("#taskDuration").value||30),
    priority:Number(document.querySelector("#taskPriority").value||2),enabled:document.querySelector("#taskEnabled").checked};
  if(editingTaskId)Object.assign(state.tasks.find(t=>t.id===editingTaskId),data);else state.tasks.push({id:uid(),...data});
  save();document.querySelector("#taskDialog").close();renderLibrary()
};
document.querySelector("#deleteTaskBtn").onclick=()=>{if(editingTaskId&&confirm("Supprimer cette tâche ?")){state.tasks=state.tasks.filter(t=>t.id!==editingTaskId);save();document.querySelector("#taskDialog").close();renderLibrary()}};
document.querySelector("#closeTaskDialog").onclick=()=>document.querySelector("#taskDialog").close();
document.querySelector("#addTaskBtn").onclick=()=>openTaskEditor();
document.querySelector("#searchTask").oninput=renderLibrary;

const panel=document.querySelector("#libraryPanel"),overlay=document.querySelector("#overlay");
document.querySelector("#libraryBtn").onclick=()=>{panel.classList.add("open");overlay.classList.add("show")};
document.querySelector("#closeLibrary").onclick=()=>{panel.classList.remove("open");overlay.classList.remove("show")};
overlay.onclick=()=>{panel.classList.remove("open");overlay.classList.remove("show")};
document.querySelector("#regenerateBtn").onclick=()=>generateWeek();

function formatTime(min){min=Number(min);if(min<60)return `${min} min`;const h=Math.floor(min/60),m=min%60;return m?`${h} h ${m}`:`${h} h`}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}

if(state.configured)showApp();else renderSetup();
