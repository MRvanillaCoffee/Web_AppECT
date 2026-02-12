const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const dataTransaction = [
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าห้อง",amount:-3000},
    {id:3,text:"เงินเดือน",amount:+18000}
]

const transactions=dataTransaction
console.log(transactions)

function init(){
    list.innerHTML = ''
    transactions.forEach(addDataToList)
    calculateMoney()
}

function addDataToList(trans){
    const symbol = trans.amount < 0 ? '-':'+'
    const status = trans.amount < 0 ? 'minus':'plus'
    const item = document.createElement('li')
    item.classList.add(status)
    item.innerHTML = `${trans.text} <span>${symbol} ${formatNumber(Math.abs(trans.amount))}</span> <button class="delete-btn"  data-id="${trans.id}">x</button>`;
    list.appendChild(item)
}

function formatNumber(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
}

function calculateMoney(){
    const amount = transactions.map(element=>element.amount)
    const total = amount.reduce((result,item) => (result+=item),0).toFixed(2);
    const income = amount.filter(item=>item>0).reduce((result,item) => (result+=item),0).toFixed(2);
    const expense = amount.filter(item=>item<0).reduce((result,item) => (result+=item),0).toFixed(2);
    console.log(total)
    balance.innerText = `฿` + formatNumber(total)
    money_plus.innerHTML = `฿` + formatNumber(income)
    money_minus.innerHTML = `฿` + formatNumber(expense)
}

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim === '' || amount.value.trim === ''){
        alert(กรุณาป้อนข้อมูลให้ครบ)
    }
    else{
        const data ={
            id:nextId(),
            text:text.value,
            amount:+amount.value
        }
        transactions.push(data)
        addDataToList(data)
        calculateMoney()
        text.value = ''
        amount.value = ''
    }
}

form.addEventListener('submit',addTransaction)

function nextId(){
    const id = transactions.map(element=>element.id)
    if(id.length===0){
        return 1
    }
    else{
        return id[id.length-1]+1
    }
}

function deleteTransaction(id){
    const index = transactions.findIndex(item => item.id === id)
    if(index === -1) return
    transactions.splice(index,1)
    init()
}

init()

list.addEventListener('click', (event) => {
    const button = event.target.closest('.delete-btn')
    if(!button) return
    const id = Number(button.getAttribute('data-id'))
    deleteTransaction(id)
});