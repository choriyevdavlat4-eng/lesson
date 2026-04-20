const parent = document.getElementById('parent')
const URl = document.getElementById('URL')
const Name = document.getElementById('Name')
const Price = document.getElementById('Price')
const Count = document.getElementById('Count')
const btn = document.getElementById('btn')

const Getuser = async () => {
    const request = await fetch('http://localhost:5000/products')
    const response = await request.json()
    parent.innerHTML = ""
    RenderList(response)
}

Getuser()

function RenderList(item) {
    item.forEach(i => {
        const div = document.createElement('tr')
        div.innerHTML = `
        <td>
          <div class="flex items-center gap-3">
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img src="${i.img}" alt="${i.name}" />
              </div>
            </div>
            <div>
              <div class="font-bold">${i.name}</div>
            </div>
          </div>
        </td>
        <td>${i.price}$</td>
        <td>${i.count}</td>
        <td>
          <img src="te.png" alt="edit" />
        </td>
       <td>
  <img src="de.png" style="cursor:pointer" onclick="DeleteUser('${i.id}')" />
</td>
        `
        parent.append(div)
    })
}

const Adduser = async () => {
    const request = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            img: URl.value,
            name: Name.value,
            price: Price.value,
            count: Count.value
        })
    })

    const data = await request.json()
    console.log(data)

    Getuser()
}

btn.addEventListener("click", () => {
    Adduser()
})


const DeleteUser = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE"
    })

    Getuser()
}