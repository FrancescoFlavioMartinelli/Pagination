class Pagination {
    constructor(_idTable, _items = [], _size = 10) {
        this.table = document.getElementById(_idTable)
        console.log(this.table);
        this.items = _items
        this.size = _size
        this.page = 1
        //Meglio la proprietà del metodo se items o size NON possono variare
        this.maxPages = Math.ceil(this.items.length / this.size)        
        this.makePageButtons()
        this.getView()
    }

    makePageButtons() {
        //indeitro
        let prevBtn = document.createElement("button")
        prevBtn.innerText = "Indietro"
        prevBtn.addEventListener("click", ()=>{
            this.prev()
        })
        this.table.getElementsByClassName("pagine")[0].append(prevBtn)

        //pulsanti pagine
        for(let i = 1; i <= this.maxPages; i++) {
            let b = document.createElement("span")
            b.addEventListener("click", ()=> {
                this.changePage(i)
            })
            b.innerText = i
            this.table.getElementsByClassName("pagine")[0].append(b)
        }

        //avanti
        let nextBtn = document.createElement("button")
        nextBtn.innerText = "Avanti"
        nextBtn.addEventListener("click", ()=>{
            this.next()
        })
        this.table.getElementsByClassName("pagine")[0].append(nextBtn)
    }

    changePage(p) {
        this.page = p
        if(this.page < 1) {
            this.page = 1
        }
        if(this.page > this.maxPages) {
            this.page = this.maxPages
        }
        this.getView()
    }

    next() {
        if(this.page < this.maxPages) {
            this.page += 1
        } else {
            this.page = this.maxPages 
        }
        this.getView()
    }

    prev() {
        if(this.page > 1) {
            this.page -= 1
        }  else {
            this.page = 1
        }
        this.getView()
    }

    getMaxPages() {
        //Meglio il metodo della proprietà se items o size possono variare
        let max = 0
        //max = Math.floor(this.items.length / this.size)
        // if(this.items.length % this.size > 0) {
        //     max++
        // }
        max = Math.ceil(this.items.length / this.size)
        return max
    }

    getView() {
        console.log(this.table);
        let iStart = this.size * (this.page - 1)
        
        let iEndNonCompreso = iStart + this.size
        if(iEndNonCompreso > this.items.length) {
            iEndNonCompreso = this.items.length
        }

        this.table.getElementsByTagName("tbody")[0].innerHTML = ""

        for(let i = iStart; i < iEndNonCompreso; i++) {
            this.addRow(this.items[i])
        }

        // document.getElementById("pagina").innerText = this.page
        //PER OGNI SPAN NEL DIV PAGINE TOGLIE LA CLASSE ACTIVE A MENO CHE NON SIA LO SPAN DELLA PAGINA CORRENTE
        Array.from(this.table.getElementsByTagName("span")).forEach((e, i)=>{
            if(i == this.page - 1) {
                e.classList.add("active")
            } else {
                e.classList.remove("active")
            }
        })
    }

    addRow(element) {
        let tr = document.createElement("tr")
        let tdId = document.createElement("td")
        tdId.innerText = element.id
        let tdNome = document.createElement("td")
        tdNome.innerText = element.nome
        let tdCognome = document.createElement("td")
        tdCognome.innerText = element.cognome

        tr.append(tdId, tdNome, tdCognome)

        this.table.getElementsByTagName("tbody")[0].appendChild(tr)
    }
}




////////////////////////////////
//page = 1
//size = 3
//indiceDiPartenza size * (page-1) -> 0
//indiceFinaleNonCompreso = indicePartenza + size
//getView -> arr[0] arr[1] arr[2]

//page = 2
//size = 3
//quanti elementi sono passati? 3 * 1 -> 3
//getView -> arr[3] arr[4] arr[5]

//page = 31
//size = 3
//quanti elementi sono passati? 3 * 30 -> 90
//getView -> arr[90] arr[91] arr[92]


const arr = [
    {id: 1, nome: "a", cognome: "A"},
    {id: 2, nome: "b", cognome: "B"},
    {id: 3, nome: "c", cognome: "C"},
    {id: 4, nome: "d", cognome: "D"},
    {id: 5, nome: "e", cognome: "E"},
    {id: 6, nome: "f", cognome: "F"},
    {id: 7, nome: "g", cognome: "G"},
    {id: 8, nome: "h", cognome: "H"}
]

// let p = new Pagination();
let p1 = new Pagination("table", arr, 3);
let p2 = new Pagination("table2", arr, 5);
// let p3 = new Pagination(5);


//SPOSTATI NEL METODO MAKEBUTTONS, ORA CREO UN EVENT LISTENER PER I DUE PULSANTI CREATI DALLA CLASSE
// document.getElementById("avanti").addEventListener("click", (e)=>{
//     p2.next()
// })
// document.getElementById("indietro").addEventListener("click", (e)=>{
//     p2.prev()
// })


//inserire nel documento
    //creare una riga e fare append in tablet