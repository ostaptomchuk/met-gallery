const museumItems = document.querySelector('.museum-items')
const selectDate = document.querySelector('.date')
const buttons = document.querySelector('.pages')
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))



showButton()
showFirst()

function showButton() {
    fetch('https://www.metmuseum.org/mothra/collectionlisting/search?&perPage=40')
        .then(data => data.json())
        .then(data => {
            console.log(data)

            let count = 120;

            for (let i = 1; i <= count; i++) {
                let btn = document.createElement('button')
                btn.setAttribute("value", `${i}`)
                btn.classList.add('btn')
                btn.innerHTML = `${i}`;
                btn.onclick = () => {
                    pages(btn.value)
                }
                buttons.append(btn)
            }
        })
        .catch(err => console.log('Error: ', err))
}

function showFirst() {
    museumItems.innerHTML = ``
    fetch(`https://www.metmuseum.org/mothra/collectionlisting/search?&perPage=40`)
        .then(data => data.json())
        .then(data => {
            let arr = data.results;
            console.log(data)
            createSelect(data.results)

            arr.forEach((item) => {

                let newItem = createItem(item);
                museumItems.innerHTML += newItem;
            })
            selectDate.onchange = () => {
                museumItems.innerHTML = ''
                arr.filter((item) => {
                    if (item.species == selectDate.value) {
                        let newItem = createItem(item);
                        museumItems.innerHTML += newItem;
                    } else if (selectDate.value == 'all') {
                        let newItem = createItem(item);
                        museumItems.innerHTML += newItem;
                    }
                    console.log(selectDate.value);
                })
            }

        })
        .catch(err => console.log('Error: ', err))
}

function pages(num) {
    museumItems.innerHTML = ``;
    fetch(`https://www.metmuseum.org/mothra/collectionlisting/search?page=${num}`)
        .then(data => data.json())
        .then(data => {
            let arr = data.results;
            console.log(data)
            createSelect(data.results)
            arr.forEach((item) => {
                let newItem = createItem(item);
                museumItems.innerHTML += newItem;
            })

        })
        .catch(err => console.log('Error: ', err))
}

function createItem(item) {
    return `
            <div class="museum-item">
                    <h2 class="item-title">${item.description}</h2>
                    <div class="item-img"><img src="${item.image}" alt=""></div>
                    <p class="item-text">Author: <b>${item.artist}</b></p>
                    <p class="item-text">Date of art: <b>${item.date}</b></p>
                    <p class="item-text">Medium: <b>${item.medium}</b></p>
                    <p class="item-text">Gallery information: <b>${item.galleryInformation}</b></p>
                </div>
            `
}

function createSelect(selItem) {
    selectDate.innerHTML = ''
    let newArr = [];
    selItem.map((item) => {
        newArr.push(item.date)
    })
    let newArr2 = new Set(newArr)
    selectDate.innerHTML = `<option value="all"> all </option>`
    newArr2.forEach((item) => {
        selectDate.innerHTML += `<option value="${item}"> ${item} </option>`
    })
}

// async function getData() {
//     const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
//     const data = await response.json();
//     console.log(data);
//     return data;
// }


// async function main() {
//     const postsData = await getData();
//     let currentPage = 1;
//     let showedItems = 40;

//     function displayList(arrayFromApi, showedPostsPerPage, activePage) {
//         const museumItems = document.querySelector('.museum-items');
//         museumItems.innerHTML = "";
//         activePage--;
//         const start = showedPostsPerPage * activePage;
//         const end = start + showedPostsPerPage;
//         const paginatedData = arrayFromApi.slice(start, end);

//         paginatedData.forEach((item) => {
//             const museumItem = document.createElement('div');
//             const title = document.createElement('span');
//             const maker = document.createElement('span');
//             const medium = document.createElement('span');
//             const date = document.createElement('span');
//             const image = document.createElement('img');

//             museumItem.classList.add('museum-item');
//             title.classList.add('museum-item-title');
//             maker.classList.add('.museum-item-title');
//             medium.classList.add('museum-item-medium');
//             date.classList.add('museum-item-date');
//             image.classList.add('museum-item-image');

//             title.innerHTML = `Title: ${item.objectID.title}`;
//             maker.innerHTML = `Author: ${item.artistDisplayName}`;
//             medium.innerHTML = `Medium: ${item.medium}`;
//             date.innerHTML = `Date of Creation: ${item.objectDate}`;
//             image.src = item.primaryImageSmall;
//             if (!item.primaryImageSmall) {
//                 image.src = URL('https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg');
//             }

//             museumItems.append(image, title, date, maker, medium);

//         })
//     }
//     function displayPagination(arrayFromApi, showedPostsPerPage) {
//         const paginationElement = document.querySelector('.pagination');
//         const pagesCount = Math.ceil(arrayFromApi.length / showedPostsPerPage);
//         const ulElement = document.createElement('ul');
//         ulElement.classList.add('pagination-ul-list');

//         for (let i = 0; i < pagesCount; i++) {
//             const liElement = displayPaginationBtn(i + 1);
//             ulElement.appendChild(liElement);
//         }

//         paginationElement.appendChild(ulElement)

//     }
//     function displayPaginationBtn(page) {
//         const liElement = document.createElement('li');
//         liElement.classList.add('pagination-item');
//         liElement.innerText = page;
//         liElement.addEventListener('click', () => {
//             currentPage = page;
//             displayList(postsData, showedItems, currentPage)
//         })
//         return liElement;
//     }

//     displayList(postsData, showedItems, currentPage);
//     displayPagination(postsData, showedItems)

// }

// main()


// // fetch(`https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&page=6`)
// //   .then((data) => data.json())
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((err) => console.log("Error:", err));

