const modalTrriger = document.querySelector('.trriger'),
      modal = document.querySelector('.modal')
      modalclose = document.querySelector('.modal__close')

modalTrriger.addEventListener('click',()=>{
   modal.classList.add('show')
   modal.classList.remove('hide')
   document.body.style.overflow = 'hidden'
})
modalclose.addEventListener('click',()=>{
   modal.classList.add('hide')
   modal.classList.remove('show')
   document.body.style.overflow = ''
})



let products = document.querySelector('.product__cards')

function getProducts(){
   fetch('http://localhost:3000/cards')
   .then((res)=> res.json())
   .then((res)=>{
      res.map((item)=>{
         products.innerHTML += `
                <div class="product__card">
                    <img src="${item.image}" alt="Airpods">
                    <p class="product__card-title">${item.title}</p>
                    <p class="product__card-price">$${item.price}</p>
                    <button class="product__btn">Buy</button>
                </div>  
         `
      })
   })
}

getProducts()

let form = document.querySelector('form')

form.addEventListener('submit',(e)=>{
   e.preventDefault()
   let product = {
      title: e.target[0].value,
      price: e.target[1].value,
      memory: e.target[2].value,
      image: e.target[3].value
   }
   fetch('http://localhost:3000/cards' , {
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(product)
   }).then(()=>{
      (e.target[0].value = ""),
      (e.target[1].value = ""),
      (e.target[2].value = ""),
      (e.target[3].value = "")
      getProducts()
      console.log('Успешно');
      })
      .catch((err)=>console.log(err)
      )
})