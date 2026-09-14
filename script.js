const ACCOUNTS_KEY="maisonDuoAccountsV9";
const SESSION_KEY="maisonDuoSessionV9";
const DAYS=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const SHORT=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
const DEFAULT_COLORS={categories:{maison:"#5E7EA8",linge:"#B56E86",courses:"#B68A4A",animaux:"#C77A1F",terrain:"#6F9B45",organisation:"#7A5AA6"},priorities:{1:"#D84B4B",2:"#E3A13A",3:"#6F8FB8"}};
const TASK_CATALOG=[["Faire le lit", "maison", "daily", 5, 3, null], ["Rangement rapide des pièces de vie", "maison", "daily", 10, 2, null], ["Vaisselle / lave-vaisselle", "maison", "daily", 15, 1, null], ["Nettoyer plan de travail cuisine", "maison", "daily", 10, 1, null], ["Essuyer table et évier", "maison", "daily", 5, 2, null], ["Aspirateur maison", "maison", "weekly", 25, 1, null], ["Laver les sols", "maison", "weekly", 35, 1, null], ["Dépoussiérer meubles", "maison", "weekly", 20, 2, null], ["Nettoyer salle de bain", "maison", "weekly", 25, 1, null], ["Nettoyer WC", "maison", "weekly", 15, 1, null], ["Nettoyer miroirs", "maison", "weekly", 10, 2, null], ["Changer draps", "linge", "weekly", 20, 1, null], ["Changer serviettes", "linge", "weekly", 10, 1, null], ["Changer torchons", "linge", "weekly", 10, 1, null], ["Faire vitres principales", "maison", "monthly", 45, 2, null], ["Nettoyer frigo", "maison", "monthly", 30, 2, null], ["Nettoyer four", "maison", "monthly", 30, 2, null], ["Nettoyer micro-ondes", "maison", "monthly", 15, 2, null], ["Nettoyer placards cuisine", "maison", "monthly", 30, 3, null], ["Détartrer robinetterie", "maison", "monthly", 20, 2, null], ["Nettoyer plinthes", "maison", "monthly", 30, 3, null], ["Nettoyer poignées et interrupteurs", "maison", "monthly", 15, 3, null], ["Nettoyer portes", "maison", "quarterly", 30, 3, null], ["Nettoyer canapé / fauteuil", "maison", "quarterly", 45, 3, null], ["Lancer une lessive", "linge", "weekly", 10, 1, null], ["Étendre le linge", "linge", "weekly", 15, 1, null], ["Plier le linge", "linge", "weekly", 20, 1, null], ["Ranger le linge", "linge", "weekly", 15, 1, null], ["Nettoyer machine à laver", "linge", "monthly", 20, 2, null], ["Trier vêtements à donner", "linge", "quarterly", 30, 3, null], ["Faire liste des courses", "courses", "weekly", 15, 1, null], ["Faire courses alimentaires", "courses", "weekly", 60, 1, null], ["Ranger les courses", "courses", "weekly", 15, 1, null], ["Vérifier stocks alimentaires", "courses", "weekly", 10, 2, null], ["Vérifier produits ménagers", "courses", "weekly", 10, 2, null], ["Contrôler produits périmés", "courses", "monthly", 15, 2, null], ["Planifier les repas", "organisation", "weekly", 20, 1, null], ["Préparer quelques repas", "organisation", "weekly", 60, 2, null], ["Vérifier rendez-vous semaine", "organisation", "weekly", 10, 1, null], ["Trier courrier", "organisation", "weekly", 15, 2, null], ["Faire point budget", "organisation", "monthly", 25, 2, null], ["Classer documents importants", "organisation", "monthly", 20, 3, null], ["Vérifier pharmacie", "organisation", "monthly", 15, 2, null], ["Sauvegarder documents importants", "organisation", "monthly", 20, 3, null], ["Révision des tâches du foyer", "organisation", "monthly", 20, 2, null], ["Nettoyer gamelles chiens", "animaux", "weekly", 15, 1, "dogs"], ["Nettoyer coin chiens", "animaux", "weekly", 20, 1, "dogs"], ["Brosser chiens", "animaux", "weekly", 20, 2, "dogs"], ["Balade hebdomadaire chiens", "animaux", "weekly", 60, 1, "dogwalk"], ["Vérifier oreilles / griffes chiens", "animaux", "weekly", 15, 2, "dogs"], ["Nettoyer couchages chiens", "animaux", "biweekly", 30, 2, "dogs"], ["Laver couvertures chiens", "animaux", "monthly", 30, 2, "dogs"], ["Vérifier antiparasitaires", "animaux", "monthly", 10, 1, "pets"], ["Nettoyer gamelles chats", "animaux", "weekly", 15, 1, "cats"], ["Nettoyer litière en profondeur", "animaux", "weekly", 25, 1, "cats"], ["Vérifier litière / nourriture chats", "courses", "weekly", 10, 1, "cats"], ["Nettoyer espace autres animaux", "animaux", "weekly", 20, 1, "otherpets"], ["Tonte pelouse", "terrain", "weekly", 90, 2, "garden"], ["Débroussaillage", "terrain", "biweekly", 90, 2, "garden"], ["Faire bordures", "terrain", "biweekly", 45, 2, "garden"], ["Désherbage", "terrain", "weekly", 45, 2, "garden"], ["Ramasser feuilles / branches", "terrain", "weekly", 30, 2, "garden"], ["Contrôler clôture / portail", "terrain", "weekly", 20, 1, "garden"], ["Arrosage / contrôle végétaux", "terrain", "weekly", 30, 2, "garden"], ["Tailler haies / arbustes", "terrain", "monthly", 90, 3, "hedges"], ["Nettoyer terrasse / balcon", "terrain", "monthly", 30, 2, "terrace"], ["Contrôler eau piscine", "terrain", "weekly", 20, 1, "pool"], ["Nettoyer piscine", "terrain", "weekly", 30, 1, "pool"], ["Nettoyer panier / filtre piscine", "terrain", "weekly", 20, 1, "pool"], ["Ranger / balayer garage", "maison", "monthly", 30, 2, "garage"], ["Ranger dépendance / abri", "terrain", "monthly", 30, 2, "shed"], ["Nettoyer filtre lave-vaisselle", "maison", "monthly", 15, 2, "dishwasher"], ["Nettoyer filtre sèche-linge", "linge", "weekly", 10, 1, "dryer"], ["Nettoyer robot aspirateur", "maison", "weekly", 15, 1, "robot"], ["Préparer affaires école / crèche", "organisation", "weekly", 20, 1, "children"], ["Ranger affaires enfants", "organisation", "weekly", 20, 1, "children"], ["Trier vêtements enfants", "linge", "monthly", 30, 2, "children"], ["Nettoyer jouets / zone enfants", "maison", "weekly", 25, 2, "children"], ["Vérifier cartables / fournitures", "organisation", "weekly", 15, 2, "children"], ["Nettoyer gouttières accessibles", "terrain", "seasonal", 60, 2, "garden"], ["Inspection toiture / extérieur", "terrain", "monthly", 20, 2, "garden"], ["Nettoyer portail / clôture", "terrain", "quarterly", 60, 3, "garden"], ["Contrôler évacuation des eaux", "terrain", "quarterly", 30, 2, "garden"], ["Préparer extérieur pour hiver", "terrain", "seasonal", 60, 2, "garden"], ["Remise en route extérieur printemps", "terrain", "seasonal", 60, 2, "garden"], ["Nettoyer mobilier extérieur", "terrain", "monthly", 45, 2, "terrace"], ["Trier un placard", "maison", "monthly", 30, 3, null], ["Nettoyer dessus des meubles", "maison", "monthly", 25, 3, null], ["Nettoyer poubelles intérieures", "maison", "monthly", 20, 2, null], ["Sortir / trier recyclage", "organisation", "weekly", 15, 1, null], ["Vérifier ampoules / petits consommables", "organisation", "monthly", 10, 3, null], ["Nettoyer siphons accessibles", "maison", "monthly", 20, 2, null], ["Désinfecter poubelle cuisine", "maison", "monthly", 15, 2, null]];

let currentEmail=null,state=null,setup={},setupStep=1,editingTaskId=null;

function accounts(){try{return JSON.parse(localStorage.getItem(ACCOUNTS_KEY))||{}}catch(e){return {}}}
function saveAccounts(a){localStorage.setItem(ACCOUNTS_KEY,JSON.stringify(a))}
function setSession(email){localStorage.setItem(SESSION_KEY,email);currentEmail=email}
function clearSession(){localStorage.removeItem(SESSION_KEY);currentEmail=null}
function uid(){return Date.now()+"_"+Math.random().toString(36).slice(2)}
function iso(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function parseDate(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d,12)}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
function startOfWeek(d){d=new Date(d);d.setHours(12,0,0,0);const i=(d.getDay()+6)%7;d.setDate(d.getDate()-i);return d}
function hexToRgba(hex,a){const n=parseInt(hex.replace("#",""),16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`}
function pOpacity(p){return +p===1?.34:+p===2?.20:.10}
function catLabel(c){return {maison:"Maison",linge:"Linge",courses:"Courses",animaux:"Animaux",terrain:"Terrain",organisation:"Organisation"}[c]||c}
function fmt(min){return min<60?`${min} min`:`${Math.floor(min/60)} h${min%60?" "+min%60:""}`}

function blankProfile(email,name){
 return {email,homeName:name||"Maison Duo",configured:false,household:null,colors:structuredClone(DEFAULT_COLORS),view:"week",cursor:iso(new Date()),tasks:[],instances:[]}
}

function saveProfile(){
 const a=accounts();a[currentEmail]=state;saveAccounts(a)
}

function eligible(row,h){
 const tag=row[5];if(!tag)return true;
 if(tag==="dogs")return h.dogs>0;
 if(tag==="dogwalk")return h.dogs>0&&h.dogWalk;
 if(tag==="cats")return h.cats>0;
 if(tag==="pets")return h.dogs+h.cats+h.otherPets>0;
 if(tag==="otherpets")return h.otherPets>0;
 if(tag==="garden")return h.garden;
 if(tag==="hedges")return h.hedges;
 if(tag==="terrace")return h.terrace;
 if(tag==="pool")return h.pool;
 if(tag==="garage")return h.garage;
 if(tag==="shed")return h.shed;
 if(tag==="dishwasher")return h.dishwasher;
 if(tag==="dryer")return h.dryer;
 if(tag==="robot")return h.robotVacuum;
 if(tag==="children")return h.people.some(p=>p.role==="child");
 return true
}
function buildTasks(h){
 const maxP=h.loadProfile==="light"?1:h.loadProfile==="balanced"?2:3;
 return TASK_CATALOG.filter(r=>r[4]<=maxP&&eligible(r,h)).map((r,i)=>({id:"task_"+i+"_"+uid(),title:r[0],category:r[1],frequency:r[2],duration:r[3],priority:r[4],enabled:true}))
}

function availability(person,date){
 const dow=(date.getDay()+6)%7;let free=person.baseFreeMinutes||60,label="";
 if(person.role==="child"&&person.mode==="school"){free=person.days.includes(dow)?30:180;label=person.days.includes(dow)?"École":"Libre"}
 else if(person.mode==="fulltime"){free=person.days.includes(dow)?60:240;label=person.days.includes(dow)?"Temps plein":"Libre"}
 else if(person.mode==="parttime"){free=person.days.includes(dow)?180:240;label=person.days.includes(dow)?"Mi-temps":"Libre"}
 else if(person.mode==="none"){free=300;label="Disponible"}
 else{free=person.days.includes(dow)?person.baseFreeMinutes:240;label=person.days.includes(dow)?"Horaire perso":"Libre"}
 const active=(person.periods||[]).find(p=>date>=parseDate(p.start)&&date<=parseDate(p.end));
 if(active){if(active.type==="vacation"||active.type==="leave"){free=Math.max(free,300);label=active.type==="vacation"?"Vacances":"Congé"}if(active.type==="away"){free=0;label="Absent"}}
 return {minutes:free,label}
}

function generateCurrentRange(){
 const c=parseDate(state.cursor);let start,end;
 if(state.view==="day")start=end=c;
 if(state.view==="week"){start=startOfWeek(c);end=addDays(start,6)}
 if(state.view==="month"){start=new Date(c.getFullYear(),c.getMonth(),1,12);end=new Date(c.getFullYear(),c.getMonth()+1,0,12)}
 const out=[];let d=new Date(start);const tasks=state.tasks.filter(t=>t.enabled);
 while(d<=end){
  const dow=(d.getDay()+6)%7,dateStr=iso(d),adults=state.household.people.filter(p=>p.role==="adult").map(p=>({p,a:availability(p,d)}));
  let cap=adults.reduce((s,x)=>s+x.a.minutes,0);
  let due=[];
  tasks.forEach((t,idx)=>{
    if(t.frequency==="weekly"&&idx%7===dow)due.push(t);
    if(t.frequency==="biweekly"&&Math.floor((d-start)/86400000/7)%2===0&&idx%7===dow)due.push(t);
    if(t.frequency==="monthly"&&d.getDate()===1)due.push(t);
    if(t.frequency==="quarterly"&&[1,4,7,10].includes(d.getMonth()+1)&&d.getDate()===1)due.push(t);
    if(t.frequency==="seasonal"&&[3,6,9,12].includes(d.getMonth()+1)&&d.getDate()===1)due.push(t);
  });
  due=[...new Map(due.map(x=>[x.id,x])).values()].sort((a,b)=>a.priority-b.priority||b.duration-a.duration);
  for(const t of due){
    if(!adults.length)continue;
    adults.sort((a,b)=>b.a.minutes-a.a.minutes);const pick=adults[0];
    if(cap<t.duration&&t.priority>1)continue;
    out.push({id:uid(),taskId:t.id,title:t.title,category:t.category,duration:t.duration,priority:t.priority,date:dateStr,ownerId:pick.p.id,done:false});
    cap=Math.max(0,cap-t.duration);pick.a.minutes=Math.max(0,pick.a.minutes-t.duration)
  }
  d=addDays(d,1)
 }
 state.instances=out;saveProfile()
}

function showOnly(id){["authScreen","setupScreen","appScreen"].forEach(x=>document.getElementById(x).classList.toggle("hidden",x!==id))}
function openCurrentProfile(email){
 const a=accounts();if(!a[email])return;
 currentEmail=email;state=a[email];setSession(email);
 if(state.configured){showOnly("appScreen");generateCurrentRange();renderApp()}else{showOnly("setupScreen");setupStep=1;renderSetup()}
}

document.querySelectorAll(".auth-tab").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".auth-tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");
 document.getElementById("loginForm").classList.toggle("hidden",b.dataset.auth!=="login");
 document.getElementById("signupForm").classList.toggle("hidden",b.dataset.auth!=="signup")
});
document.getElementById("loginForm").onsubmit=e=>{
 e.preventDefault();const email=loginEmail.value.trim().toLowerCase(),pw=loginPassword.value,a=accounts();
 if(!a[email]||a[email].password!==pw){loginError.textContent="Compte ou mot de passe incorrect.";return}
 loginError.textContent="";openCurrentProfile(email)
};
document.getElementById("signupForm").onsubmit=e=>{
 e.preventDefault();const email=signupEmail.value.trim().toLowerCase(),pw=signupPassword.value,a=accounts();
 if(a[email]){signupError.textContent="Ce compte existe déjà.";return}
 const profile=blankProfile(email,signupHomeName.value.trim());profile.password=pw;a[email]=profile;saveAccounts(a);openCurrentProfile(email)
};

document.querySelectorAll("[data-radio]").forEach(btn=>btn.onclick=()=>{
 const g=btn.dataset.radio;document.querySelectorAll(`[data-radio="${g}"]`).forEach(x=>x.classList.remove("selected"));btn.classList.add("selected");setup[g]=btn.dataset.value
});
function renderPeopleSetup(){
 const a=Number(adultCount.value||0),c=Number(childCount.value||0);peopleSetup.innerHTML="";
 for(let i=0;i<a;i++)peopleSetup.innerHTML+=`<div class="person-card"><strong>Adulte ${i+1}</strong><div class="schedule-grid"><label>Prénom<input class="setup-person-name" data-role="adult" value="Adulte ${i+1}"></label><label>Rythme<select class="setup-person-mode"><option value="fulltime">Temps plein</option><option value="parttime">Mi-temps</option><option value="none">Ne travaille pas</option><option value="custom">Personnalisé</option></select></label></div></div>`;
 for(let i=0;i<c;i++)peopleSetup.innerHTML+=`<div class="person-card"><strong>Enfant ${i+1}</strong><div class="schedule-grid"><label>Prénom<input class="setup-person-name" data-role="child" value="Enfant ${i+1}"></label><label>Rythme<select class="setup-person-mode"><option value="school">École</option><option value="none">À la maison</option></select></label></div></div>`
}
adultCount.oninput=renderPeopleSetup;childCount.oninput=renderPeopleSetup;renderPeopleSetup();

function renderSetup(){
 document.querySelectorAll(".step").forEach(s=>s.classList.toggle("active",+s.dataset.step===setupStep));
 setupBar.style.width=(setupStep/5*100)+"%";prevSetup.disabled=setupStep===1;
 nextSetup.classList.toggle("hidden",setupStep===5);finishSetup.classList.toggle("hidden",setupStep!==5)
}
nextSetup.onclick=()=>{if(setupStep<5){setupStep++;renderSetup()}};prevSetup.onclick=()=>{if(setupStep>1){setupStep--;renderSetup()}};
function collectHousehold(){
 const people=[...document.querySelectorAll(".setup-person-name")].map((el,i)=>{
  const mode=document.querySelectorAll(".setup-person-mode")[i].value,role=el.dataset.role;
  return {id:uid(),name:el.value.trim()||`Personne ${i+1}`,role,mode,workStart:"07:00",workEnd:"17:00",days:[0,1,2,3,4],baseFreeMinutes:mode==="parttime"?180:mode==="none"?300:mode==="school"?30:60,periods:[]}
 });
 return {homeType:setup.homeType||"autre",homeArea:+homeArea.value||0,bedrooms:+bedrooms.value||0,bathrooms:+bathrooms.value||0,toilets:+toilets.value||0,
 people,dogs:+dogs.value||0,cats:+cats.value||0,otherPets:+otherPets.value||0,otherPetType:otherPetType.value.trim(),dogWalk:dogWalk.checked,landArea:+landArea.value||0,
 garden:garden.checked,terrace:terrace.checked,pool:pool.checked,garage:garage.checked,shed:shed.checked,hedges:hedges.checked,dishwasher:dishwasher.checked,dryer:dryer.checked,robotVacuum:robotVacuum.checked,
 weekdayCap:+weekdayCap.value||75,weekendCap:+weekendCap.value||240,loadProfile:setup.loadProfile||"balanced",autoBalance:autoBalance.checked,rotation:rotation.checked,batching:batching.checked,lightSunday:lightSunday.checked}
}
finishSetup.onclick=()=>{state.household=collectHousehold();state.tasks=buildTasks(state.household);state.configured=true;saveProfile();showOnly("appScreen");generateCurrentRange();renderApp()};
logoutSetup.onclick=logout;logoutBtn.onclick=logout;
function logout(){clearSession();state=null;showOnly("authScreen")}

function summary(){
 const h=state.household,pets=[];if(h.dogs)pets.push(`${h.dogs} chien${h.dogs>1?"s":""}`);if(h.cats)pets.push(`${h.cats} chat${h.cats>1?"s":""}`);
 return `${h.homeType} · ${h.homeArea} m² · ${h.people.length} personne${h.people.length>1?"s":""}${h.landArea?` · ${h.landArea} m² extérieur`:""}${pets.length?" · "+pets.join(", "):""}`
}
function renderApp(){
 homeTitle.textContent=state.homeName||"Planning du foyer";homeSummary.textContent=summary();renderHeader();renderStats();renderCalendar();renderPeoplePanel();renderLibrary();renderColors()
}
function renderHeader(){
 document.querySelectorAll(".view-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===state.view));const d=parseDate(state.cursor);let txt="";
 if(state.view==="day")txt=d.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 if(state.view==="week"){const s=startOfWeek(d),e=addDays(s,6);txt=`${s.toLocaleDateString("fr-FR",{day:"numeric",month:"short"})} — ${e.toLocaleDateString("fr-FR",{day:"numeric",month:"short",year:"numeric"})}`}
 if(state.view==="month")txt=d.toLocaleDateString("fr-FR",{month:"long",year:"numeric"});dateLabel.textContent=txt
}
function renderStats(){
 const total=state.instances.length,done=state.instances.filter(x=>x.done).length,mins=state.instances.filter(x=>!x.done).reduce((s,x)=>s+x.duration,0);
 stats.innerHTML=`<article class="stat"><strong>${total}</strong><span>tâches affichées</span></article><article class="stat"><strong>${total?Math.round(done/total*100):0}%</strong><span>terminées</span></article><article class="stat"><strong>${fmt(mins)}</strong><span>temps restant</span></article><article class="stat"><strong>${state.household.people.length}</strong><span>personnes</span></article><article class="stat"><strong>${state.tasks.length}</strong><span>tâches disponibles</span></article>`
}
function taskCard(t){
 const cat=state.colors.categories[t.category],pri=state.colors.priorities[t.priority],owner=state.household.people.find(p=>p.id===t.ownerId)?.name||"Foyer";
 const el=document.createElement("article");el.className="task"+(t.done?" done":"");el.style.borderLeftColor=pri;el.style.background=`linear-gradient(0deg,${hexToRgba(pri,pOpacity(t.priority))},${hexToRgba(pri,pOpacity(t.priority))}),#fff`;
 el.innerHTML=`<div class="category-stripe" style="background:${cat}"></div><div class="task-line"><span class="task-name">${t.title}</span><span class="task-time">${fmt(t.duration)}</span></div><div class="task-meta"><span class="pill" style="background:${hexToRgba(cat,.16)};color:${cat}">${catLabel(t.category)}</span><span class="pill">${owner}</span><span class="priority-badge">P${t.priority}</span></div><div class="task-actions"><button class="mini-btn">${t.done?"↩ Réouvrir":"✓ Terminer"}</button></div>`;
 el.querySelector(".mini-btn").onclick=()=>{t.done=!t.done;saveProfile();renderApp()};return el
}
function renderCalendar(){
 calendar.innerHTML="";const c=parseDate(state.cursor),today=new Date();
 if(state.view==="day"){const wrap=document.createElement("div");wrap.className="day-view";const side=document.createElement("div");side.className="day-sidebar";state.household.people.forEach(p=>{const a=availability(p,c);side.innerHTML+=`<div class="person-availability"><strong>${p.name}</strong><small>${a.label} · ${fmt(a.minutes)} disponibles</small></div>`});const main=document.createElement("div");state.instances.filter(t=>t.date===iso(c)).forEach(t=>main.appendChild(taskCard(t)));wrap.append(side,main);calendar.appendChild(wrap);return}
 if(state.view==="week"){const grid=document.createElement("div");grid.className="week-grid";const s=startOfWeek(c);DAYS.forEach((day,i)=>{const d=addDays(s,i),col=document.createElement("section");col.className="day"+(i>=5?" weekend":"");col.innerHTML=`<div class="day-head"><h3>${day}</h3><small>${d.getDate()}/${d.getMonth()+1}</small></div>`;state.instances.filter(t=>t.date===iso(d)).forEach(t=>col.appendChild(taskCard(t)));grid.appendChild(col)});calendar.appendChild(grid);return}
 const grid=document.createElement("div");grid.className="month-grid";SHORT.forEach(x=>{const h=document.createElement("div");h.className="month-head";h.textContent=x;grid.appendChild(h)});const first=new Date(c.getFullYear(),c.getMonth(),1,12),offset=(first.getDay()+6)%7,start=addDays(first,-offset);for(let i=0;i<42;i++){const d=addDays(start,i),cell=document.createElement("div");cell.className="month-cell"+(d.getMonth()!==c.getMonth()?" out":"");cell.innerHTML=`<div class="month-date">${d.getDate()}</div>`;state.instances.filter(t=>t.date===iso(d)).slice(0,4).forEach(t=>{const x=document.createElement("div");x.className="month-task";x.style.borderLeftColor=state.colors.priorities[t.priority];x.style.background=hexToRgba(state.colors.categories[t.category],.12);x.textContent=t.title;cell.appendChild(x)});grid.appendChild(cell)}calendar.appendChild(grid)
}

function renderPeoplePanel(){
 personList.innerHTML="";state.household.people.forEach((p,idx)=>{const card=document.createElement("div");card.className="person-card";card.innerHTML=`<div class="person-card-head"><h3>${p.name}</h3><span>${p.role==="child"?"Enfant":"Adulte"}</span></div><div class="schedule-grid"><label>Nom<input data-field="name" value="${p.name}"></label><label>Profil<select data-field="mode"><option value="fulltime">Temps plein</option><option value="parttime">Mi-temps</option><option value="none">Ne travaille pas</option><option value="school">École</option><option value="custom">Personnalisé</option></select></label><label>Début<input data-field="workStart" type="time" value="${p.workStart||""}"></label><label>Fin<input data-field="workEnd" type="time" value="${p.workEnd||""}"></label><label>Temps libre/jour (min)<input data-field="baseFreeMinutes" type="number" value="${p.baseFreeMinutes||0}"></label><label>Type<select data-field="role"><option value="adult">Adulte</option><option value="child">Enfant</option></select></label></div><div class="weekday-row">${SHORT.map((d,i)=>`<button type="button" class="weekday-toggle ${p.days.includes(i)?"active":""}" data-day="${i}">${d}</button>`).join("")}</div><div>${(p.periods||[]).map((per,j)=>`<div class="period-row" data-j="${j}"><input type="date" value="${per.start}"><input type="date" value="${per.end}"><select><option value="vacation">Vacances</option><option value="leave">Congé</option><option value="away">Absent</option></select><button type="button">×</button></div>`).join("")}</div><button class="mini-btn add-period">＋ Période spéciale</button>`;
 card.querySelector('[data-field="mode"]').value=p.mode;card.querySelector('[data-field="role"]').value=p.role;card.querySelectorAll("[data-field]").forEach(el=>el.onchange=()=>{p[el.dataset.field]=el.type==="number"?+el.value:el.value;saveProfile()});card.querySelectorAll(".weekday-toggle").forEach(b=>b.onclick=()=>{const d=+b.dataset.day;p.days=p.days.includes(d)?p.days.filter(x=>x!==d):[...p.days,d].sort();b.classList.toggle("active");saveProfile()});card.querySelectorAll(".period-row").forEach((row,j)=>{const ins=row.querySelectorAll("input"),sel=row.querySelector("select");sel.value=p.periods[j].type;ins[0].onchange=()=>{p.periods[j].start=ins[0].value;saveProfile()};ins[1].onchange=()=>{p.periods[j].end=ins[1].value;saveProfile()};sel.onchange=()=>{p.periods[j].type=sel.value;saveProfile()};row.querySelector("button").onclick=()=>{p.periods.splice(j,1);saveProfile();renderPeoplePanel()}});card.querySelector(".add-period").onclick=()=>{p.periods=p.periods||[];p.periods.push({start:iso(new Date()),end:iso(addDays(new Date(),7)),type:p.role==="child"?"vacation":"leave"});saveProfile();renderPeoplePanel()};personList.appendChild(card)})
}
addPersonBtn.onclick=()=>{state.household.people.push({id:uid(),name:`Personne ${state.household.people.length+1}`,role:"adult",mode:"none",workStart:"",workEnd:"",days:[],baseFreeMinutes:300,periods:[]});saveProfile();renderPeoplePanel()};

function renderLibrary(){const q=(searchTask.value||"").toLowerCase();libraryList.innerHTML="";state.tasks.filter(t=>!q||t.title.toLowerCase().includes(q)).forEach(t=>{const el=document.createElement("div");el.className="library-item"+(t.enabled?"":" off");el.innerHTML=`<div><strong><span class="lib-color-dot" style="background:${state.colors.categories[t.category]}"></span>${t.title}</strong><small>${catLabel(t.category)} · ${t.frequency} · ${fmt(t.duration)} · P${t.priority}</small></div><div><button class="mini-btn edit-task">Modifier</button></div>`;el.querySelector(".edit-task").onclick=()=>openTaskEditor(t.id);libraryList.appendChild(el)})}
function openTaskEditor(id=null){editingTaskId=id;const t=id?state.tasks.find(x=>x.id===id):null;taskDialogTitle.textContent=t?"Modifier la tâche":"Nouvelle tâche";deleteTaskBtn.classList.toggle("hidden",!t);taskTitle.value=t?.title||"";taskCategory.value=t?.category||"maison";taskFrequency.value=t?.frequency||"weekly";taskDuration.value=t?.duration||30;taskPriority.value=t?.priority||2;taskEnabled.checked=t?.enabled??true;taskDialog.showModal()}
taskForm.onsubmit=e=>{e.preventDefault();const d={title:taskTitle.value.trim(),category:taskCategory.value,frequency:taskFrequency.value,duration:+taskDuration.value||30,priority:+taskPriority.value||2,enabled:taskEnabled.checked};if(editingTaskId)Object.assign(state.tasks.find(t=>t.id===editingTaskId),d);else state.tasks.push({id:uid(),...d});saveProfile();taskDialog.close();renderLibrary()};
deleteTaskBtn.onclick=()=>{if(editingTaskId&&confirm("Supprimer cette tâche ?")){state.tasks=state.tasks.filter(t=>t.id!==editingTaskId);saveProfile();taskDialog.close();renderLibrary()}};closeTaskDialog.onclick=()=>taskDialog.close();addTaskBtn.onclick=()=>openTaskEditor();

function renderColors(){categoryColorList.innerHTML="";["maison","linge","courses","animaux","terrain","organisation"].forEach(c=>{const row=document.createElement("label");row.className="color-row";row.innerHTML=`<span><strong>${catLabel(c)}</strong></span><input type="color" data-cat="${c}" value="${state.colors.categories[c]}">`;categoryColorList.appendChild(row)});[1,2,3].forEach(p=>document.getElementById("priorityColor"+p).value=state.colors.priorities[p])}
saveColorsBtn.onclick=()=>{document.querySelectorAll("[data-cat]").forEach(x=>state.colors.categories[x.dataset.cat]=x.value);[1,2,3].forEach(p=>state.colors.priorities[p]=document.getElementById("priorityColor"+p).value);saveProfile();closePanels();renderApp()};resetColorsBtn.onclick=()=>{state.colors=structuredClone(DEFAULT_COLORS);saveProfile();renderColors();renderApp()};

document.querySelectorAll(".view-btn").forEach(b=>b.onclick=()=>{state.view=b.dataset.view;saveProfile();generateCurrentRange();renderApp()});prevPeriod.onclick=()=>move(-1);nextPeriod.onclick=()=>move(1);todayBtn.onclick=()=>{state.cursor=iso(new Date());saveProfile();generateCurrentRange();renderApp()};function move(dir){let d=parseDate(state.cursor);if(state.view==="day")d=addDays(d,dir);if(state.view==="week")d=addDays(d,7*dir);if(state.view==="month")d=new Date(d.getFullYear(),d.getMonth()+dir,1,12);state.cursor=iso(d);saveProfile();generateCurrentRange();renderApp()}
regenerateBtn.onclick=()=>{generateCurrentRange();renderApp()};savePeopleBtn.onclick=()=>{closePanels();generateCurrentRange();renderApp()};searchTask.oninput=renderLibrary;
reconfigureBtn.onclick=()=>{state.configured=false;saveProfile();showOnly("setupScreen");setupStep=1;renderSetup()};

const overlay=document.getElementById("overlay"),panels=[peoplePanel,libraryPanel,colorsPanel];
function openPanel(p){closePanels();p.classList.add("open");overlay.classList.add("show")}function closePanels(){panels.forEach(p=>p.classList.remove("open"));overlay.classList.remove("show")}
peopleBtn.onclick=()=>openPanel(peoplePanel);libraryBtn.onclick=()=>openPanel(libraryPanel);colorsBtn.onclick=()=>openPanel(colorsPanel);document.querySelectorAll("[data-close]").forEach(b=>b.onclick=closePanels);overlay.onclick=closePanels;

const sess=localStorage.getItem(SESSION_KEY);if(sess&&accounts()[sess])openCurrentProfile(sess);else showOnly("authScreen");
