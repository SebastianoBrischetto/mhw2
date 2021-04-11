/*-----------------------------------------------------------
			variabili globali e event listener
-----------------------------------------------------------*/
let new_course;
let preferred_list=[];
document.querySelector('input').addEventListener("keyup", find_all);
/*-----------------------------------------------------------
		Funzione per creazione di nuovi blocchi
-----------------------------------------------------------*/
function create_course(image,title,description,button_function){
	//creazione nuovo div courses_element
	const new_courses_element = document.createElement('div');
	//aggiunta di classe corrispondente e event listener al div
	new_courses_element.classList.add('courses_element');
	new_courses_element.addEventListener("click", details);
	//elementi div courses_element
	const new_img = document.createElement('img');
	const new_div = document.createElement('div');
	//elementi sub-div
	const new_title = document.createElement('h1');
	const new_description = document.createElement ('p');
	const new_button = document.createElement ('img');
	const new_note= document.createElement('p');
	//aggiunta di classe details e classe che nasconde la descrizione
	new_description.classList.add('hidden');
	new_description.classList.add('details');
	//aggiunta di classe che nasconde il bottone
	new_button.classList.add('hidden');
	//aggiunta di event listener al bottone in base se bottone di 'add' o bottone di 'remove'
	switch (button_function){
		case 'add':
			new_button.src='images/buttons/add.png';
			new_button.addEventListener("click", addpref);
		break;
		case 'remove':
			new_button.src='images/buttons/remove.png';
			new_button.addEventListener("click", removepref);
		break;
	}	
	//aggiunta classe note, e un testo di default (piu dettagli)
	new_note.classList.add('note');
	new_note.textContent='Più dettagli';
	//aggiunta di elementi al div courses_element
	new_courses_element.appendChild(new_img);
	new_courses_element.appendChild(new_div);
	//aggiunta di elementi al sub-div 
	new_div.appendChild(new_title);
	new_div.appendChild(new_description);
	new_div.appendChild(new_button);
	new_div.appendChild(new_note);
	//inserimento dati negli elementi
	new_img.src=image;
	new_title.textContent=title;
	new_description.textContent=description;
	new_course=new_courses_element;
}
/*-----------------------------------------------------------
 Funzione per creazione di blocchi con i dati di Content.js
-----------------------------------------------------------*/
function load_courses() {
	//constante che specifica il comportamento del bottone
	const button_function='add';
	//ciclo che scorre attraverso array di dati CONTENT
	for(let i=0; i<CONTENT.length; i++){
		//creazione variabili con dati di posizione i
		let type = CONTENT[i].type;
		let image = CONTENT[i].image;
		let title = CONTENT[i].title;
		let description = CONTENT[i].description;
		//creazione blocco div con dati di posizione i
		create_course(image,title,description,button_function);
		//in base al tipo del corso il div "padre" viene messo in un blocco diverso e quel blocco smette di essere nascosto
		switch (type){
			case 'fitness':
				document.querySelector('#fitness').querySelector('.courses_list').appendChild(new_course);
				document.querySelector('#fitness').classList.remove('hidden');
				break;
			case 'nuoto':
				document.querySelector('#nuoto').querySelector('.courses_list').appendChild(new_course);
				document.querySelector('#nuoto').classList.remove('hidden');
				break;
			case 'benessere':
				document.querySelector('#benessere').querySelector('.courses_list').appendChild(new_course);
				document.querySelector('#benessere').classList.remove('hidden');
				break;
			case 'artimarziali':
				document.querySelector('#artimarziali').querySelector('.courses_list').appendChild(new_course);
				document.querySelector('#artimarziali').classList.remove('hidden');
				break;
		}
	}
}
/*-----------------------------------------------------------
		Funzione per mostrare/nascondere i dettagli (uso .contains())
-----------------------------------------------------------*/
function details(){
	//percorso del sub-div
	const sub_div=event.currentTarget.querySelector('div');
	//controllo dello stato (nascosto o meno)
	if(sub_div.querySelector('.details').classList.contains('hidden')){
		//procedura quando i dati sono nascosti
		sub_div.style.height ='100%';
		sub_div.style.justifyContent = 'flex-start';
		sub_div.querySelector('img').classList.remove('hidden');
		sub_div.querySelector('.details').classList.remove('hidden');
		sub_div.querySelector('.note').textContent='Meno dettagli';
	}
	else {
		//procedura quando i dati non sono nascosti
		sub_div.style.height = '20%';
		sub_div.style.justifyContent = 'center';
		sub_div.querySelector('img').classList.add('hidden');
		sub_div.querySelector('.details').classList.add('hidden');
		sub_div.querySelector('.note').textContent='Più dettagli';
	};
}
/*-----------------------------------------------------------
		Funzione per l'inserimento nei preferiti (uso .includes())
-----------------------------------------------------------*/
function addpref() {
	//div lista preferiti
	const preferred=document.querySelector('#preferred').querySelector('.courses_list')
	//div da aggiungere ai preferiti
	const add_div=event.currentTarget.parentNode.parentNode;
	//creazione variabili con i dati del corso da aggiungere
	const image = add_div.querySelector('img').src;
	const title = add_div.querySelector('div').querySelector('h1').textContent;
	const description = add_div.querySelector('div').querySelector('.details').textContent;
	const button_function = 'remove';
	//controllo duplicati
	update_preferred();
	//se duplicato non aggiungere e mostrare messaggio di errore
	if(preferred_list.includes(title)){
		alert('Corso di '+title+' gia aggiunto');
	}
	//se non duplicato aggiungere alla lista preferiti
	else {
		//creazione blocco div con i dati del corso da aggiungere
		create_course(image,title,description,button_function);
		//aggiunta del blocco div ai preferiti
		preferred.appendChild(new_course);
		//cambio classe blocco dei preferiti (non piu nascosto)
		preferred.parentNode.classList.remove('hidden');
	};
}
/*-----------------------------------------------------------
		Funzione per la rimozione dai preferiti
-----------------------------------------------------------*/
function removepref() {
	//div lista preferiti
	const preferred= document.querySelector('#preferred').querySelector('.courses_list');
	//div da rimuovere
	const remove_div=event.currentTarget.parentNode.parentNode;
	//rimozione del div
	remove_div.remove();
	//conteggio del numero di elementi nella lista preferiti
	const elements=preferred.querySelectorAll('.courses_element').length;
	//controllo del numero di elementi nella lista preferiti, se 0 nasconderla
	if(elements==0){
		preferred.parentNode.classList.add('hidden');
	};
}
/*-----------------------------------------------------------
	Funzione per il riempimento dell'array lista preferiti
-----------------------------------------------------------*/
function update_preferred() {
	//svuotare array lista preferiti
	preferred_list = [];
	//div lista preferiti
	const preferred= document.querySelector('#preferred').querySelector('.courses_list')
	//array con div courses_element
	const elements= preferred.querySelectorAll('.courses_element');
	//ciclo che riempie l'array con i titoli dei corsi preferiti
	for(let i=0; i<elements.length; i++){
		preferred_list[i]= elements[i].querySelector('div').querySelector('h1').textContent
	}
}
/*-----------------------------------------------------------
		Funzione ricerca in base al tipo
-----------------------------------------------------------*/
function find(type,search) {
	let find_type;
	//in base al tipo cambiare variabile find_type
	switch (type){
		case 'fitness':
			find_type=document.querySelector('#fitness').querySelector('.courses_list').querySelectorAll('.courses_element');
		break;
		case 'nuoto':
			find_type=document.querySelector('#nuoto').querySelector('.courses_list').querySelectorAll('.courses_element');
		break;
		case 'benessere':
			find_type=document.querySelector('#benessere').querySelector('.courses_list').querySelectorAll('.courses_element');
		break;
		case 'artimarziali':
			find_type=document.querySelector('#artimarziali').querySelector('.courses_list').querySelectorAll('.courses_element');
		break;
	}
	//ciclo per il controllo di ogni elemento di find_type
	for(var i=0; i<find_type.length; i++){
		//se il titolo di find_type[i] include la stringa search rimuovere la classe .hidden
		if(find_type[i].querySelector('div').querySelector('h1').textContent.toLowerCase().includes(search)){
			find_type[i].classList.remove('hidden');
		}
		//se invece non include search aggiungere la classe .hidden
		else{
			find_type[i].classList.add('hidden');
		};
	}
}
/*-----------------------------------------------------------
		Funzione per la ricerca in ogni tipo
-----------------------------------------------------------*/
function find_all(){
	//prende il valore del campo input
	let text=document.querySelector('input').value.toLowerCase();
	//chiama la funzione find() con ogni tipo di corso e il valore di input
	find('fitness',text);
	find('nuoto',text);
	find('benessere',text);
	find('artimarziali',text);	
}
/*-----------------------------------------------------------
		Funzioni da avviare al caricamento della pagina
-----------------------------------------------------------*/
load_courses();