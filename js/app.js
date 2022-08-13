window.addEventListener("DOMContentLoaded", initApp)

function  initApp () {
    // selectors
    const jobContainer = document.querySelector(".job__section");
    // eventlisteners
    
    // functions
    const fetchData = async () => {
        const response = await fetch('data.json');
        const data = await  response.json();
        let html = '';
        data.map(item => {
            
            html += `
            <div class="job__filters">
                    <h2 class="offset">Job Filters</h2>
                    <!-- job filters image container -->
                    <div class="job__filters__img__container">
                    <figure>
                        <img src="${item.logo}" alt="company imgae">
                        <figcaption class="offset">Photoshop Company Image</figcaption>
                    </figure>
                    </div>
                    <!-- end of job filters image container -->
                    <!-- job filter info -->
                    <div class="job__filters__info__container">
                    <header>
                        <h2>${item.company} ${item.new ? "<span class='job__filters__span job__filters__new'>NEW!</span>" : ""} ${item.featured ? "<span class='job__filters__span job__filters__features'>Featured</span>" : ""}</h2>
                    </header>
                    <div class="time">
                        <h3> ${item.position} </h3>
                        <span class="job__filters__posted">${item.postedAt}</span> 
                        <span class="job__filters__role">${item.contract}</span>
                        <span class="job__filters__place">${item.location}</span>
                        <hr class="hr">
                    </div>
                    </div>
                    <!-- end of job filter info -->
                    <!-- job filters skills -->
                    <div class="job__filters__skills">
                    ${item.role ? `<span class='skills' onClick='showFilter(this)'>${item?.role}</span>` : ""}
                    ${item.level ? `<span class='skills' onClick='showFilter(this)'>${item.level}</span>` : ""}
                    ${item.languages?.map(lang => {
                        return  `<span class="skills" onClick='showFilter(this)'>${lang}</span>`
                    })}
                    ${item.tools?.map(tool => {
                        return `<span class="skills" onClick='showFilter(this)'>${tool}</span>`
                    })}
                    </div>
                    <!-- end of job filters skills -->
                    </div>
                    `
                })
                jobContainer.insertAdjacentHTML('afterbegin', html)
            }
            fetchData()
        }
       
        const showFilter = (el) => {
            const filterContainer = document.querySelector(".filter__container");
            filterContainer.classList.remove("none")
            const elParent = el.parentElement;
            const  newArray = Array.from(elParent.querySelectorAll(".skills"));
            let li = ''
            newArray.map(array => {
                li +=  `
                <div class="filter">
                        <span>${array.textContent} <span class="filter_clear_img">
                            <img src="./images/icon-remove.svg" onClick='deleteSkill(this)' alt="remove icon image">
                        </span></span>
                    </div>
                `
            })
            filterContainer.innerHTML  =  li + `<div onClick="clearFunc(this)" class="filter__clear">Clear</div> `
        }
    
        const clearFunc = (el) =>{
            const elParent = el.parentElement;
            const  AllElements = Array.from(elParent.querySelectorAll(".filter"));
            AllElements.map(element => element.remove())
            elParent.classList.add("none")
        }
        const deleteSkill = async (el) =>{
            el.parentElement.parentElement.parentElement.remove()
        }

