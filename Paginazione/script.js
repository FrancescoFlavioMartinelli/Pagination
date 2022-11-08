class Pagination {
    constructor(_idTable, _items = [], _size = 10) {
        this.table = document.getElementById(_idTable)
        this.items = _items
        this.size = _size
        this.page = 1
        //Meglio la proprietà del metodo se items o size NON possono variare
        this.maxPages = Math.ceil(this.items.length / this.size)
        this.getView()

        this.makePageButtons()
    }

    makePageButtons() {
        for(let i = 1; i <= this.maxPages; i++) {
            console.log(i);
            let b = document.createElement("span")
            b.addEventListener("click", ()=> {
                this.changePage(i)
            })
            b.innerText = i
            this.table.getElementById("pagina").append(b)
        }
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
    }

    addRow(element) {
        console.log("THIS", element);
        let tr = document.createElement("tr")
        let tdId = document.createElement("td")
        tdId.innerText = element.id
        let tdNome = document.createElement("td")
        tdNome.innerText = element.nome
        let tdCognome = document.createElement("td")
        tdCognome.innerText = element.cognome

        tr.append(tdId, tdNome, tdCognome)

        document.getElementById("tbody").appendChild(tr)
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
let p1 = new Pagination("table2", arr.slice(2, 5));
let p2 = new Pagination("table", arr, 3);
// let p3 = new Pagination(5);

document.getElementById("avanti").addEventListener("click", (e)=>{
    p2.next()
})
document.getElementById("indietro").addEventListener("click", (e)=>{
    p2.prev()
})


//inserire nel documento
    //creare una riga e fare append in tablet