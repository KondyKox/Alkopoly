(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();class x{constructor(){this.players={},this.playerIds=null,this.currentPlayerId=null,this.board=[],this.reward=0,this.isGameStarted=!1}initializeBoard(a){this.board=a}getCurrentPlayer(){return this.players[this.currentPlayerId]}currentPlayerStyle(a){const t=document.querySelector(".current-player__name");t.textContent=a,document.querySelectorAll(".player-container").forEach(n=>{n.querySelector(".player-info-name").textContent===a?n.style.borderColor="var(--clr-red)":n.style.borderColor="var(--clr-blue)"})}startGame(){this.isGameStarted=!0,this.setReward(this.reward),this.playerIds=Object.keys(this.players),this.currentPlayerId=this.playerIds[0],this.currentPlayerStyle(this.players[this.currentPlayerId].name),console.log(`Gra się zaczęła! ${this.players[this.currentPlayerId].name} rozpoczyna.`)}rollDice(){const a=document.querySelector(".dice-result"),t=Math.floor(Math.random()*6)+1;a.innerHTML=t;const e=this.getCurrentPlayer();console.log(`${e.name} wyrzucił: ${t}`),e.move(t),this.nextTurn()}switchPlayerTurn(){const a=this.playerIds.indexOf(this.currentPlayerId);if(a!==-1){const t=(a+1)%this.playerIds.length;this.currentPlayerId=this.playerIds[t]}else this.playerIds.length>0&&(this.currentPlayerId=this.playerIds[0])}nextTurn(){this.switchPlayerTurn();const a=this.getCurrentPlayer();this.currentPlayerStyle(this.players[this.currentPlayerId].name),console.log(`Tura należy do ${a.name}`)}setReward(a){this.reward+=a,document.querySelector(".reward-money").innerText=this.reward}}const $=[{id:1,name:"Start",type:"start",image:"./properties/start.png",price:100},{id:2,name:"Asik",type:"property",image:"./properties/asik.jpg",price:100,tax:200,owner:null},{id:3,name:"Hakuna Matata",type:"property",image:"./properties/hakuna_matata.jpg",price:100,tax:200,owner:null},{id:4,name:"Remiza",type:"property",image:"./properties/remiza.jpg",price:100,tax:200,owner:null},{id:5,name:"Domek Kubusia",type:"property",image:"./properties/domek_kubusia.jpg",price:100,tax:200,owner:null},{id:6,name:"Domek Ozziego",type:"property",image:"./properties/domek_oskara.jpg",price:100,tax:200,owner:null},{id:7,name:"Domek Benia",type:"property",image:"./properties/domek_benia.jpg",price:100,tax:200,owner:null},{id:8,name:"Czerwony Pomost",type:"property",image:"./properties/czerwony_pomost.jpg",price:100,tax:200,owner:null},{id:9,name:"Karta Szansy",type:"chance",image:"./properties/chance.jpg"},{id:10,name:"Grzywna",type:"fine",image:"./properties/fine.png",price:200},{id:11,name:"Grzywna",type:"fine",image:"./properties/fine.png",price:200},{id:12,name:"Wypłata",type:"reward",image:"./properties/reward.png"},{id:13,name:"Zakup zioła",type:"fine",image:"./properties/weed.png",price:200},{id:14,name:"Zakup alkoholu",type:"fine",image:"./properties/vodka.png",price:200},{id:15,name:"Plaża",type:"property",image:"./properties/plaza.jpg",price:100,tax:200,owner:null},{id:16,name:"Dom Kondiego",type:"property",image:"./properties/kondi_dom.jpg",price:100,tax:200,owner:null},{id:17,name:"Izba wytrzeźwień",type:"jail",image:"./properties/jail.jpg"},{id:18,name:"Dom Kamcia",type:"property",image:"./properties/dom_kamcia.jpg",price:100,tax:200,owner:null},{id:19,name:"Zakup alkoholu",type:"fine",image:"./properties/vodka.png",price:200},{id:20,name:"Plac zabaw",type:"property",image:"./properties/plac_zabaw.jpg",price:100,tax:200,owner:null},{id:21,name:"Głuchów",type:"property",image:"./properties/gluchow.jpg",price:100,tax:200,owner:null},{id:22,name:"Stare Bogaczowice",type:"property",image:"./properties/stare_bogaczowice.jpg",price:100,tax:200,owner:null},{id:23,name:"Discord",type:"property",image:"./properties/discord.jpg",price:100,tax:200,owner:null},{id:24,name:"Zjeżdzalnia na plaży",type:"property",image:"./properties/zjezdzalnia.jpg",price:100,tax:200,owner:null},{id:25,name:"Wałbrzych",type:"property",image:"./properties/walbrzych.jpg",price:100,tax:200,owner:null},{id:26,name:"Zameczek",type:"property",image:"./properties/zameczek.jpg",price:100,tax:200,owner:null},{id:27,name:"Piwnica u Kamilka",type:"property",image:"./properties/piwnica_kamcia.jpg",price:100,tax:200,owner:null},{id:28,name:"Kuźnica",type:"property",image:"./properties/kuznica.jpg",price:100,tax:200,owner:null},{id:29,name:"Jacuzzi",type:"property",image:"./properties/jacuzzi.jpg",price:100,tax:200,owner:null},{id:30,name:"Karta Szansy",type:"chance",image:"./properties/chance.jpg"},{id:31,name:"Karta Szansy",type:"chance",image:"./properties/chance.jpg"},{id:32,name:"Dom Mikiego",type:"property",image:"./properties/dom_mikiego.jpg",price:100,tax:200,owner:null}];class E{constructor(){this.type="beer",this.quantity=0,this.price=430,this.image=new Image,this.image.src="./game_pieces/alkohol/beer.png",this.updateTaxMultiplier()}updateTaxMultiplier(){const a=this.type==="beer"?1:3,t=this.type==="beer"?.5:1;this.taxMultiplier=a+this.quantity*t}draw(a){for(let t=0;t<this.quantity;t++){const e=document.createElement("img");e.className="property-alcohol",e.src=this.image.src,e.alt="ALKOHOL!!!",this.type==="beer"?e.classList.add("beer"):this.type==="vodka"&&(e.classList.remove("beer"),e.classList.add("vodka")),a.appendChild(e)}}update(){this.quantity++,this.updateTaxMultiplier(),this.type==="beer"&&this.quantity>4&&this.changeBeerIntoVodka()}destroy(a,t){if(!a.hasKilof)return console.log(`${a.name} nie ma kilofa.`),!1;switch(this.type){case"beer":this.quantity>0&&(this.quantity--,console.log(`${a.name} niszczy browara w ${t.name}.`));break;case"vodka":this.quantity>1?(this.quantity--,console.log(`${a.name} niszczy flaszkę w ${t.name} :(.`)):(this.changeVodkaIntoBeer(),console.log(`${a.name} zniszczył ostatnią flaszkę w ${t.name} :(.`));break;default:return!1}a.hasKilof=!1,this.updateTaxMultiplier(),t.displayPropertyCard()}changeBeerIntoVodka(){this.type="vodka",this.quantity=1,this.price=900,this.image.src="./game_pieces/alkohol/vodka.png"}changeVodkaIntoBeer(){this.quantity=4,this.resetToBeer()}resetAfterBankruptcy(){this.quantity=0,this.resetToBeer()}resetToBeer(){this.type="beer",this.price=430,this.image.src="./game_pieces/alkohol/beer.png",this.updateTaxMultiplier()}}class g{static buyProperty(a,t){t.money>=a.price?(t.properties[a.id]=a,a.owner=t.name,t.substractMoney(a.price),a.background=t.color,C(),console.log(`${t.name} zakupił ${a.name}`)):(alert(`No sorry ${t.name}, za biedny jesteś. XD.`),console.log(`${t.name} to jebany biedak.`))}static payTaxes(a,t,e){if(t.isSIGMA)a.substractMoney(e),t.addMoney(e),t.isSIGMA=!1,setTimeout(()=>{alert(`${a.name} płaci podatek ${e} zł dla SIGMY ${t.name}`)},200),console.log(`${t.name} jest SIGMĄ więc ${a.name} płaci mu ${e} zł.`);else{t.money<=0&&t.bankruptcy();let n=t.respect?Math.floor(e/2):e;t.substractMoney(n),a.addMoney(n),t.respect=!1,setTimeout(()=>{alert(`Podatek ${n} zł dla ${a.name}`)},200),console.log(`${t.name} zapłacił ${n} zł podatku dla ${a.name}.`)}}static buyAlcohol(a,t){const e=a.alcohols;t.money>=e.price?(e.update(),t.substractMoney(e.price),alert(`${t.name} kupuje alkohol w ${a.name}.`),console.log(`${t.name} kupuje alkohol w "${a.name}" za ${e.price} zł.`)):(alert(`No sorry ${t.name}, za biedny jesteś. XD.`),console.log(`${t.name} to jebany biedak.`))}static destroyAlcohol(a,t){const e=Object.values(r.players).find(n=>n.name===a);t.alcohols.destroy(e,t)}}class v{constructor(a){this.id=a.id,this.name=a.name,this.type=a.type,this.image=new Image,this.image.src=a.image,this.price=a.price,this.tax=a.tax,this.owner=a.owner,this.alcohols=new E,this.background="none"}resetAfterBankruptcy(){this.owner=null,this.background="none",this.alcohols.resetAfterBankruptcy()}displayPropertyCard(){const a=document.querySelector(".property-card");a&&document.body.removeChild(a);const t=document.createElement("div");t.className="property-card";const e=document.createElement("button");e.className="property-close",e.className="close-btn",e.innerText="x",e.addEventListener("click",()=>{document.body.removeChild(t)});const n=document.createElement("h2");n.className="property-title",n.innerText=this.name;const o=document.createElement("img");o.className="property-img",o.src=this.image.src,o.alt=this.name;const s=document.createElement("div");s.className="property-value";const c=document.createElement("div");c.className="property-alcohol-container",this.owner&&this.alcohols.draw(c);const l=document.createElement("span");switch(this.type){case"start":l.innerHTML=`Za przejście przez <span class="property-price">START</span> dostajesz <span class="property-price">${this.price}.</span>`;break;case"jail":l.innerText="Izba Wytrzeźwień. Tu zostaniesz zamknięty.";break;case"property":this.owner?(l.innerHTML=`Podatek <span class="property-price">${this.tax*this.alcohols.taxMultiplier}</span> zł dla <span class="property-price">${this.owner}</span>`,c.addEventListener("click",()=>g.destroyAlcohol(this.owner,this))):l.innerHTML=`Cena: <span class="property-price">${this.price}</span> zł`;break;case"fine":l.innerHTML=`Płacisz <span class="property-price">${this.price}</span> zł mordeczko.`;break;case"reward":l.innerText="Zgarniasz cały hajs jako nagrodę :O";break;case"chance":l.innerText="Ciągnij szansę.";break}s.appendChild(c),s.appendChild(l),t.appendChild(e),t.appendChild(n),t.appendChild(o),t.appendChild(s),document.body.appendChild(t)}}const b=$.map(i=>new v(i));function S(){const i=b.find(e=>e.name==="Start"),a=b.find(e=>e.type==="jail"),t=b.filter(e=>e!==i&&e!==a);return t.sort(()=>Math.random()-.5),t.unshift(i),t.splice(16,0,a),t}function P(i){const a=document.createElement("img");a.src=i.image.src,a.alt=i.name,a.classList.add("property-image");const t=document.createElement("div");return t.classList.add("property-name"),t.textContent=i.name,[a,t]}function I(){const i=S();r.initializeBoard(i);for(let a=0;a<i.length;a++){const t=document.querySelector(`#c${a+1}`);t.style.backgroundColor=i[a].background;const e=i[a],[n,o]=P(e);t.appendChild(n),t.appendChild(o),t.addEventListener("click",()=>i[a].displayPropertyCard())}}function C(){for(let i=0;i<r.board.length;i++){const a=document.querySelector(`#c${i+1}`);if(a.style.backgroundColor!==r.board[i].background){for(a.style.backgroundColor=r.board[i].background;a.firstChild;)a.removeChild(a.firstChild);const t=r.board[i],[e,n]=P(t);a.appendChild(e),a.appendChild(n),Object.values(r.players).forEach(o=>{o.draw()})}}}const T=[{id:1,name:"Zestaw Deluxe",text:"Kupujesz Zestaw Deluxe.",action:"Tracisz 100zł oraz idziesz 4 pola do przodu.",image:"./chance_cards/zestaw_deluxe.jpg"},{id:2,name:"Zakup zioła",text:"Kupujesz zioło mordeczko i jest essa 420 😎.",action:"Idziesz na pole zakupu zioła.",image:"./chance_cards/ziolo.jpg"},{id:3,name:"Tatuaż TJ",text:"Robisz sobie tatuaż TJ i zyskujesz respekt.",action:"Następnym razem płacisz połowę mniej podatku.",image:"./chance_cards/tatuaz-tj.jpg"},{id:4,name:"Półwidoczny",text:"Jesteś incognito półwidoczny.",action:"Gdy staniesz na polu innego gracza masz 50% szans, że Cię nie zauważy (3 użycia).",image:"./chance_cards/polwidoczni.jpg"},{id:5,name:"Koleje Dolnośląskie",text:"100 minut opóźnienia xD",action:"Wracasz na Start",image:"./chance_cards/koleje-dolnoslaski.jpg"},{id:6,name:"Kilof",text:"Zbudowałeś zajebisty kilof! Zniszcz komuś jakieś domki.",action:"Niszczysz dowolny alkohol innego gracza.",image:"./chance_cards/kilof.jpg"},{id:7,name:"Wódka ❤",text:"Wódeczka to miłość życia.",action:"Przejdź na pole wódki.",image:"./chance_cards/wodka-serce.jpg"},{id:8,name:"Emotki",text:"Zjarałeś się i robisz emotki. Inni czują respekt.",action:"Dostajesz od każdego po 20zł, ale stoisz w miejscu jedną kolejkę.",image:"./chance_cards/emotki.jpg"},{id:9,name:"Zgon",text:"Najebałeś się i zgonujesz.",action:"Lecisz na izbe wytrzeźwień.",image:"./chance_cards/zgon.jpg"},{id:10,name:"Prezent urodzinowy",text:"Urodzinki 🥳",action:"Dostajesz od każdego po 50zł.",image:"./chance_cards/prezencik.jpg"},{id:11,name:"Scam and Run",text:"Zakładasz Scam and Run i stajesz się bogaty.",action:"Dostajesz 1 000 000 zł, ale tracisz z tego 999 000 zł.",image:"./chance_cards/scam-and-run.jpg"},{id:12,name:"Wiadro",text:"Walisz wiadro z ziomeczkami.",action:"Przez 2 tury się nie ruszasz.",image:"./chance_cards/wiadro.jpg"},{id:13,name:"Wypłata",text:"Dostajesz wypłatę 💵",action:"Idziesz na pole nagrody.",image:"./chance_cards/wyplata.jpg"},{id:14,name:"Rudy chuj",text:"Twoje włosy to teraz rudy chuj.",action:"Nic się nie dzieje, po prostu jest śmiesznie xD.",image:"./chance_cards/rudy-chuj.jpg"},{id:15,name:"SIGMA",text:"SIGMA",action:"Stajesz się SIGMĄ. Gdy następnym razem staniesz na polu innego gracza, to on Ci płaci.",image:"./chance_cards/sigma.jpg"},{id:16,name:"Main Event",text:"Szczepan przyjechał 😯",action:"Tracisz 200zł.",image:"./chance_cards/main-event.jpg"},{id:17,name:"Alkoholizm",text:"Zostajesz alkoholikiem 🍺.",action:"Zyskujesz respekt, ale tracisz hajs. -10% twoich pieniędzy.",image:"./chance_cards/alkoholizm.jpg"},{id:18,name:"Tankowanie Polówki",text:"Polówkę wypada zatankować.",action:"Tracisz 51zł.",image:"./chance_cards/tankowanie-polowki.jpg"},{id:19,name:"Małżeństwo",text:"Żenisz się z losowym graczem.",action:"20% twoich pieniędzy idzie do niego.",image:"./chance_cards/malzenstwo.jpg"},{id:20,name:"Polówka",text:"Polówką dojedziesz wszędzie.",action:"Udaj się na dowolne pole.",image:"./chance_cards/polowka.jpg"},{id:21,name:"Snajper",text:"Snajper do ciebie strzela!",action:"Następne 2 kolejki ruszasz się tylko o połowe oczek.",image:"./chance_cards/snajper.jpg"},{id:22,name:"No i chuj",text:"No i chuj, zostałeś błogosławiony!",action:"Unikasz izby wytrzeźwień.",image:"./chance_cards/no-i-chuj.jpg"}];class M{constructor(a){this.name=a.name,this.text=a.text,this.action=a.action,this.image=new Image,this.image.src=a.image}static drawChanceCard(a){const t=Math.floor(Math.random()*u.length),e=document.createElement("div");e.className="chance-card";const n=document.createElement("button");n.classList.add("close-btn"),n.classList.add("card-close"),n.innerText="x",n.addEventListener("click",()=>{document.body.removeChild(e),u[t].chanceCardAction(a,u[t])});const o=document.createElement("h2");o.className="card-title",o.innerText=u[t].name;const s=document.createElement("img");s.className="card-image",s.src=u[t].image.src,s.alt=u[t].name;const c=document.createElement("p");c.className="card-description",c.innerText=u[t].text;const l=document.createElement("p");l.className="card-action",l.innerText=u[t].action,e.appendChild(n),e.appendChild(o),e.appendChild(s),e.appendChild(c),e.appendChild(l),document.body.appendChild(e)}chanceCardAction(a,t){const e=r.players[a];switch(t.name){case"Zestaw Deluxe":e.substractMoney(100),e.move(4),r.setReward(100),console.log(`${e.name} zakupił Zestaw Deluxe.`);break;case"Zakup zioła":r.board.forEach((p,d)=>{p.name===t.name&&(e.clearPlayerFromCell(),e.position=d+1,e.draw(),y.checkCurrentField(e))}),console.log(`${e.name} idzie kupić jazz.`);break;case"Tatuaż TJ":e.respect=!0,console.log(`${e.name} zyskuje respekt za tatuaż TJ.`);break;case"Półwidoczny":e.incognito+=3,console.log(`${e.name} staje się Incognito Półwidoczny.`);break;case"Koleje Dolnośląskie":e.clearPlayerFromCell(),e.position=1,e.draw(),y.checkCurrentField(e),console.log(`${e.name} wsiada w Koleje Dolnośląskie.`);break;case"Kilof":e.hasKilof=!0,console.log(`${e.name} zbudował kilof po jaraniu i teraz może niszczyć.`);break;case"Wódka ❤":r.board.forEach((p,d)=>{p.name==="Zakup alkoholu"&&(e.clearPlayerFromCell(),e.position=d+1,e.draw(),y.checkCurrentField(e))}),console.log(`${e.name} idzie kupić wódkę.`);break;case"Emotki":let n=0;r.playerIds.forEach(p=>{r.players[p].substractMoney(20),n+=20}),e.addMoney(n),e.cantMove=1,console.log(`${e.name} robi emotki, więc dostaje hajsik.`);break;case"Zgon":e.isBlessed?(alert(`${e.name} uratowany poprzez błogosławieństwo.`),console.log(`${e.name} uratowany poprzez błogosławieństwo.`)):(r.board.forEach((p,d)=>{p.name==="Izba wytrzeźwień"&&(e.clearPlayerFromCell(),e.position=d+1,e.draw(),y.checkCurrentField(e))}),console.log(`${e.name} idzie do Izby wytrzeźwień. Jebany alkoholik.`));break;case"Prezent urodzinowy":let o=0;r.playerIds.forEach(p=>{r.players[p].substractMoney(50),o+=50}),e.addMoney(o),console.log(`${e.name} ma urodzinki, więc zarabia.`);break;case"Scam and Run":e.addMoney(1e6),e.substractMoney(999e3),console.log(`${e.name} zarabia 1 000 000zł ze Scam and Run. Oraz traci 999 000zł.`);break;case"Wiadro":e.cantMove=2,console.log(`${e.name} wali wiadro i nie rusza się 2 tury.`);break;case"Wypłata":r.board.forEach((p,d)=>{p.name===t.name&&(e.clearPlayerFromCell(),e.position=d+1,e.draw(),y.checkCurrentField(e))}),console.log(`${e.name} dostaje wypłatę.`);break;case"Rudy chuj":e.pawn="./game_pieces/pawns/rudy_chuj.png",e.draw(),console.log(`${e.name} to rudy chuj.`);break;case"SIGMA":e.isSIGMA=!0,console.log(`${e.name} zostaje SIGMĄ.`);break;case"Main Event":e.substractMoney(200),console.log(`${e.name} traci 200zł z powodu wizyty Szczepana.`);break;case"Alkoholizm":const s=Math.floor(e.money/10);e.substractMoney(s),console.log(`${e.name} w wyniku alkoholizmu traci ${s}zł.`);break;case"Tankowanie Polówki":e.substractMoney(51),r.setReward(51),console.log(`${e.name} tankuje za 51zł.`);break;case"Małżeństwo":const c=Math.floor(e.money/5),l=Math.floor(Math.random()*r.playerIds.length),m=r.players[r.playerIds[l]];e.substractMoney(c),m.addMoney(c),console.log(`${e.name} oddał ${c}zł dla ${m.name}.`);break;case"Polówka":y.driveAnywhere(e),y.checkCurrentField(e),console.log(`${e.name} wsiada do Polówki i jedzie gdzie chce.`);break;case"Snajper":e.isShot=!0,e.turnsToHeal=2,console.log(`${e.name} został postrzelony przez Snajpera.`);break;case"No i chuj":e.isBlessed=!0,console.log(`No i chuj! ${e.name} został błogosławiony.`);break}}}const u=T.map(i=>new M(i));class y{static driveAnywhere(a){const t=document.querySelectorAll(".board-cell");t.forEach(n=>{n.addEventListener("click",e)});function e(n){let o=n.target;for(;o!==null&&!o.classList.contains("board-cell");)o=o.parentNode;const c=o.id.match(/\d+/);a.clearPlayerFromCell(),a.position=parseInt(c[0]),a.draw(),t.forEach(l=>{l.removeEventListener("click",e)})}}static checkCurrentField(a){const t=r.board[a.position-1];switch(t.type){case"jail":if(!a.isBlessed){a.cantMove=3;return}a.isBlessed=!1;break;case"chance":M.drawChanceCard(a.id);break;case"fine":const e=t.price;a.substractMoney(e),r.setReward(e);break;case"reward":a.addMoney(r.reward),r.setReward(-r.reward);break;case"property":let n=!1;Object.values(a.properties).forEach(o=>{if(o.id===t.id){n=!0,setTimeout(()=>{confirm(`Czy chcesz kupić alkohol w "${t.name}" za ${t.alcohols.price} zł?`)&&g.buyAlcohol(t,a)},200);return}}),r.playerIds.forEach(o=>{const s=r.players[o],c=a.properties[t.id];if(s.id!==a.id&&c){if(n=!0,a.incognito>0&&Math.random()<.5){g.payTaxes(s,a,c.tax*c.alcohols.taxMultiplier),a.incognito--;return}g.payTaxes(s,a,c.tax*c.alcohols.taxMultiplier);return}}),n||setTimeout(()=>{confirm(`Kupujesz "${t.name}" za ${t.price}zł?`)&&g.buyProperty(t,a)},200);break}t.type!=="chance"&&t.displayPropertyCard()}}class _{constructor(a,t,e){this.id=a,this.name=t,this.pawn=e,this.position=1,this.money=1e3,this.color=this.getRandomColor(),this.properties={},this.isBankrupt=!1,this.isSIGMA=!1,this.isShot=!1,this.turnsToHeal=0,this.respect=!1,this.incognito=0,this.cantMove=0,this.hasKilof=!1,this.isBlessed=!1}getRandomColor(){const a="0123456789ABCDEF";let t="#";for(let e=0;e<6;e++)t+=a[Math.floor(Math.random()*16)];return t}clearPlayerFromCell(){const a=document.querySelector(`#c${this.position}`),t=a.querySelector(".player");t&&a.removeChild(t)}goThroughStart(){const a=r.board[0].price;this.addMoney(a)}draw(){if(this.clearPlayerFromCell(),this.isBankrupt)return;const a=document.createElement("div");a.className="player",a.style.backgroundColor=this.color,a.style.filter=`drop-shadow(0 0 1em ${this.color})`,a.innerHTML=`
      <div class="player-name">${this.name}</div> 
      <img class="player-pawn" src="${this.pawn}" alt="${this.name}">
    `,document.querySelector(`#c${this.position}`).appendChild(a)}move(a){if(this.cantMove>0){this.cantMove--;return}let t=0;const e=this,n=setInterval(()=>{e.clearPlayerFromCell(),e.isShot?(e.position+=Math.floor(a/2),e.turnsToHeal--,e.turnsToHeal===0&&(e.isShot=!1)):e.position++,e.position>32&&(e.position-=32,e.goThroughStart()),e.draw(),t++,t===a&&(clearInterval(n),y.checkCurrentField(this))},500)}addMoney(a){this.money+=a}substractMoney(a){this.money-=a}bankruptcy(){this.isBankrupt=!0,Object.values(this.properties).forEach(a=>{a.resetAfterBankruptcy()}),C(),delete r.players[this.id]}}const j=document.querySelector(".registered-players");function L(){j.innerHTML="",Object.keys(r.players).forEach(a=>{const t=r.players[a],e=document.createElement("li");e.className="lobby__player";const n=document.createElement("span");n.className="lobby__player-name",n.textContent=t.name;const o=document.createElement("img");o.className="lobby__player-img",o.src=t.pawn,o.alt=t.name,e.style.backgroundColor=t.color,e.appendChild(n),e.appendChild(o),j.appendChild(e)})}document.addEventListener("DOMContentLoaded",function(){const i=document.querySelector(".menu-toggle"),a=document.querySelector(".side-menu"),t=document.querySelector(".close-button"),e=document.querySelector(".players-list"),n=()=>{a.classList.toggle("open")},o=()=>{e.innerHTML="",Object.values(r.players).forEach(s=>{const c=document.createElement("div");c.className="player-container",c.style.backgroundColor=s.color;const l=document.createElement("li");l.className="player-info";const m=document.createElement("img");m.className="player-info-pawn",m.src=s.pawn,m.alt=s.name,m.loading="lazy";const p=document.createElement("span");p.className="player-info-name",p.textContent=s.name;const d=document.createElement("span");d.className="player-info-money",d.textContent=`${s.money}zł`;const k=document.createElement("ul");k.className="player-properties",Object.values(s.properties).forEach(w=>{const z=document.createElement("li");z.className="player-property";const f=document.createElement("span");f.className="player-property-name",f.textContent=w.name;const h=document.createElement("img");h.className="player-property-img",h.src=w.image.src,h.alt=w.name,h.loading="lazy",z.appendChild(h),z.appendChild(f),k.appendChild(z)}),l.appendChild(m),l.appendChild(p),l.appendChild(d),c.appendChild(l),c.appendChild(k),e.appendChild(c),r.currentPlayerStyle(s.name)})};i.addEventListener("click",()=>{n(),o()}),t.addEventListener("click",n)});const N=[{id:1,name:"Pionek 1",image:"./game_pieces/pawns/pionek1.png"},{id:2,name:"Pionek 2",image:"./game_pieces/pawns/pionek2.png"},{id:3,name:"Pionek 3",image:"./game_pieces/pawns/pionek3.png"},{id:4,name:"Pionek 4",image:"./game_pieces/pawns/pionek4.png"},{id:5,name:"Pionek 5",image:"./game_pieces/pawns/pionek5.png"},{id:6,name:"Pionek 6",image:"./game_pieces/pawns/pionek6.png"},{id:7,name:"Pionek 7",image:"./game_pieces/pawns/pionek7.png"},{id:8,name:"Pionek 8",image:"./game_pieces/pawns/pionek8.png"},{id:9,name:"Pionek 9",image:"./game_pieces/pawns/pionek9.png"},{id:10,name:"Pionek 10",image:"./game_pieces/pawns/pionek10.png"},{id:11,name:"Pionek 11",image:"./game_pieces/pawns/pionek11.png"},{id:12,name:"Pionek 12",image:"./game_pieces/pawns/pionek12.png"},{id:13,name:"Pionek 13",image:"./game_pieces/pawns/pionek13.png"},{id:14,name:"Pionek 14",image:"./game_pieces/pawns/pionek14.png"},{id:15,name:"Pionek 15",image:"./game_pieces/pawns/pionek15.png"},{id:16,name:"Pionek 16",image:"./game_pieces/pawns/pionek16.png"}];document.addEventListener("DOMContentLoaded",function(){const i=document.querySelector(".pawns-list");let a=null;const t=n=>{a&&a.classList.remove("selectedPawn"),n.classList.add("selectedPawn"),a=n};(()=>{i.innerHTML="",N.forEach(n=>{const o=document.createElement("li");o.className="pawn";const s=document.createElement("img");s.className="playerPhoto",s.src=n.image,s.alt=n.name,s.loading="lazy",o.addEventListener("click",()=>t(o)),o.appendChild(s),i.appendChild(o)})})()});const r=new x;function q(){return Math.random().toString(36).substring(2,10)}document.querySelector("#userForm").addEventListener("submit",i=>{i.preventDefault();const a=document.querySelector("#usernameInput"),t=document.querySelector(".selectedPawn"),e=q();r.players[e]=new _(e,a.value,t.querySelector(".playerPhoto").src),a.value="",t.classList.remove("selectedPawn"),L()});document.querySelector("#start").addEventListener("click",()=>{document.querySelector(".lobby").style.display="none",document.querySelector("#userForm").style.display="none",Object.values(r.players).forEach(i=>{i.draw()}),r.startGame()});document.querySelector(".dice-container").addEventListener("click",()=>{r.rollDice()});I();