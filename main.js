// Selected 

let title = document.querySelector(".title input");

let price = document.querySelector(".price");

let taxes = document.querySelector(".taxes");

let ads = document.querySelector(".ads");

let discount = document.querySelector(".discount");

let totalSpan = document.querySelector(".total span");

let createbtn = document.querySelector(".create")

let Category = document.querySelector(".category input")


let count = document.querySelector(".count input")

let prices = document.querySelector(".prices")

let id = 1;

let arrayOfTasks = [];

if(window.localStorage.getItem("data")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("data"))

    if (arrayOfTasks.length > 0) {
        id = Math.max(...arrayOfTasks.map(task => task.id)) + 1;
    }
}

triggerDataLocalStorge()

function addDatatoArray() {

    if(title.value != "" && price.value != "" && taxes.value != "" && ads.value != "" && discount.value != "" && count.value != "" && Category.value != "") {
        for(let i = 0; i < count.value;i++) {
            const task = {
                id : id++ ,
                title : title.value,
                price : price.value,
                taxes : taxes.value,
                ads:ads.value,
                discount : discount.value,
                total : totalSpan.innerHTML,
                Category : Category.value, 
            }
            arrayOfTasks.push(task);
    
        }
    }else {

        alert("Complete Full Data")

    }

    addElementToPage(arrayOfTasks)
    addAddToLocalStorage(arrayOfTasks)
    countElements(arrayOfTasks)
    clearData()
}

function addAddToLocalStorage(arrayOfTasks) {

    window.localStorage.setItem("data" , JSON.stringify(arrayOfTasks))

}
function calculateTotal() {
    if(this.value != "") {
        price.value < 0 ? price.value = price.value * -1 : price.value = price.value;
        taxes.value < 0 ? taxes.value = taxes.value * -1 : taxes.value = taxes.value;
        ads.value < 0 ? ads.value = ads.value * -1 : ads.value = ads.value;
        discount.value < 0 ? discount.value = discount.value * -1 : discount.value = discount.value; 
        totalSpan.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value 
        totalSpan.innerHTML < 0 ? totalSpan.innerHTML = 0 : totalSpan.innerHTML
    }
}


createbtn.addEventListener("click" , addDatatoArray)


function addElementToPage(arrayOfTasks) {

        document.querySelector(".tbody").innerHTML = "";
        arrayOfTasks.forEach(element => { 
            let tr_tbody = document.createElement("tr")
            //Id
            let idTd = document.createElement("td")
            idTd.appendChild(document.createTextNode(element.id))
            idTd.className = "id";
            //Title
            let tdTitle = document.createElement("td")
            tdTitle.appendChild(document.createTextNode(element.title))
            tdTitle.className = "td_title";
            //Price 
            let tdPrice = document.createElement("td")
            tdPrice.appendChild(document.createTextNode(element.price))
            tdPrice.className = "td_price";
            // Taxes
            let tdTaxes = document.createElement("td")
            tdTaxes.appendChild(document.createTextNode(element.taxes))
            tdTaxes.className = "td_taxes";
            //ADS 
            let tdADS = document.createElement("td")
            tdADS.appendChild(document.createTextNode(element.ads))
            tdADS.className = "td_ads";
            //Discount
            let tdDiscount = document.createElement("td")
            tdDiscount.appendChild(document.createTextNode(element.discount))
            tdDiscount.className = "td_discount";
            //Total
            let tdTotal = document.createElement("td")
            tdTotal.append(document.createTextNode(element.total));
            tdTotal.className = "td_total";
            //Category
            let tdCategory = document.createElement("td")
            tdCategory.appendChild(document.createTextNode(element.Category))
            tdCategory.className = "td_category"
            // Update
            let tdUpdate = document.createElement("td")
            let btnUpdate = document.createElement("button")
            btnUpdate.className = "update";
            btnUpdate.appendChild(document.createTextNode("Update"))
            tdUpdate.appendChild(btnUpdate)
            //Delete
            let tdDelete = document.createElement("td")
            let btnDelete = document.createElement("button")
            btnDelete.className = "deleter";
            btnDelete.appendChild(document.createTextNode("Delete"))
            tdDelete.appendChild(btnDelete)
        
            // Append All in tr
        
            tr_tbody.appendChild(idTd)
            tr_tbody.appendChild(tdTitle )
            tr_tbody.appendChild(tdPrice)
            tr_tbody.appendChild(tdTaxes)
            tr_tbody.appendChild(tdADS)
            tr_tbody.appendChild(tdDiscount)
            tr_tbody.appendChild(tdTotal)
            tr_tbody.appendChild(tdCategory)
            tr_tbody.appendChild(tdUpdate)
            tr_tbody.appendChild(tdDelete)
            tr_tbody.setAttribute("data-id" , element.id)
            document.querySelector(".tbody").appendChild(tr_tbody)
    
})}


function triggerDataLocalStorge() {
    let getTask = window.localStorage.getItem("data")

    if(getTask) {
        arrayOfTasks = JSON.parse(getTask)
      
    }
    addElementToPage(arrayOfTasks)
}


let btnDeleter = document.querySelector("tbody");
btnDeleter.addEventListener("click" , (e) => {

    if(e.target.classList.contains("deleter")) {
        e.target.parentElement.parentElement.remove()
        deleteDataFromLocalStorage(e.target.parentElement.parentElement.getAttribute("data-id"))
        countElements(arrayOfTasks)
    }

    if(e.target.classList.contains("update")) {
        document.querySelectorAll(".update-data").forEach((e) => e.remove())
        let updateData = document.createElement("input")
        updateData.value = "Update";
        updateData.type = "submit";
        updateData.className = "update-data";
        prices.appendChild(updateData)
        createbtn.style.display = "none";
        

        // Add Disable on count input
        count.disabled = true;
        count.style.cursor = "no-drop";


        let target = e.target.parentElement.parentElement.getAttribute("data-id");

        let tdUpdated = document.querySelectorAll("tbody tr")

        let one;

        tdUpdated.forEach((e) => {
            if(e.getAttribute("data-id") == target) {
              one = e
            }

        })
        let td_up = one.querySelectorAll("td");
       


        updateData.addEventListener("click" , () => {
            let swaped;
            updateData.style.display = "none";
            createbtn.style.display = "block";
            let updated_id;

            td_up.forEach((e) => {
                if(e.className == "id") {
                    updated_id = e.innerHTML;
                }
                if(e.className == "td_category") {
               
                    e.innerHTML = Category.value;
                }
                if(e.className == "td_discount") {
                    e.innerHTML  = discount.value;
                }
                if(e.className == "td_ads") {
                    e.innerHTML =  ads.value;
                }
                if(e.className == "td_taxes") {
                    e.innerHTML = taxes.value;
                }
                if(e.className == "td_price") {
                    e.innerHTML = price.value;
                }
                if(e.className == "td_title") {
                    e.innerHTML = title.value;
                }
                if(e.className == "td_total" ) {
                    e.innerHTML = totalSpan.innerHTML;
                }

                 swaped = {
                    id : updated_id,
                    title : title.value,
                    price : price.value,
                    taxes : taxes.value,
                    ads:ads.value,
                    discount : discount.value,
                    total : totalSpan.innerHTML,
                    Category : Category.value, 
                }
            })
            clearData()
            for(let i = 0; i < arrayOfTasks.length;i++) {

                if(arrayOfTasks[i].id == updated_id) {
                    arrayOfTasks[i] = swaped;
                }
            }
            addElementToPage(arrayOfTasks)
            addAddToLocalStorage(arrayOfTasks)
        })

        td_up.forEach((e) => {
            if(e.className == "td_category") {
                Category.value = e.innerHTML;
            }
            if(e.className == "td_discount") {
                discount.value = e.innerHTML
            }
            if(e.className == "td_ads") {
                ads.value = e.innerHTML;
            }
            if(e.className == "td_taxes") {
                taxes.value = e.innerHTML;
            }
            if(e.className == "td_price") {
                price.value = e.innerHTML;
            }
            if(e.className == "td_title") {
                title.value = e.innerHTML;
            }
            if(e.className == "td_total" ) {
               totalSpan.innerHTML = e.innerHTML;
            }
        })

    }
})



function deleteDataFromLocalStorage(data_id) {

    arrayOfTasks = arrayOfTasks.filter((task) => task.id != data_id)

    addAddToLocalStorage(arrayOfTasks)
}




function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    Category.value = ""
}

function countElements(arrayOfTasks) {

   let btnDeleteAll = document.querySelector(".span-del");

   btnDeleteAll.innerHTML = arrayOfTasks.length
}
countElements(arrayOfTasks);



function deleteAll() {

    let delete_all = document.querySelector(".delete");

    delete_all.addEventListener("click" , () => {
        
        window.localStorage.removeItem("data")
        document.querySelectorAll(".tbody tr").forEach((e) => {
            e.remove()
        })
        arrayOfTasks = [];
        countElements(arrayOfTasks);
    })

  
}
deleteAll()

// SearchByTitle
let searchTitle = document.querySelector(".search")

let searchByTitle = document.querySelector(".searchByTitle");




searchByTitle.addEventListener("click" , () => { 

    let array =  arrayOfTasks.filter((e) => e.title == searchTitle.value);

    addElementToPage(array)

    if(searchTitle.value == "") {
        addElementToPage(arrayOfTasks)
    }
})



// SearchByCategory

let searchByCategory = document.querySelector(".searchByCategory");

searchByCategory.addEventListener("click" , () => {

    let array = arrayOfTasks.filter((e) => e.Category == searchTitle.value)
 
    addElementToPage(array)

    if(searchTitle.value == "") {
        addElementToPage(arrayOfTasks)
    }


})

