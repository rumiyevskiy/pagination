'use strict'

import { data_reserv } from './data.js';


// identify device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.classList.add('_touch');
  } else {
    document.body.classList.add('pc');
}

let data = data_reserv;

async function main() {

  // *****************************************
  let countRows;
  const customersData = data;

  const element = document.querySelector('.page__field__body');
    const rect = element.getBoundingClientRect();
    let elementHeight = rect.height;
    console.log('elementHeight: ', rect);
    countRows = Math.ceil((elementHeight) / 25);
// *****************************************

    let currentPage = 1;
    let rows = countRows;

    function displayData (arrData, rowPerPage, page) {
 

      const tableDataEl = document.querySelector('.page__field__body');
      tableDataEl.innerHTML = '';
      page--;

      const start = rowPerPage * page;
      const end = start + rowPerPage;
      const paginatedData = arrData.slice(start, end);

      // *********************************************

      let paginationDescription = document.querySelector('.field__footer__content__description');
      let paggDescText = `Showing data ${start+1} to ${start + paginatedData.length} of ${arrData.length} entries`;
      paginationDescription.innerText = paggDescText;

      // *********************************************


      for (let i = 0; i < paginatedData.length; i++) {
        const text = paginatedData[i].name;
        tableDataEl.innerHTML += text + '<br>';;
      }
      

      // *********************************************

      
      const paginationEl = document.querySelector('.field__footer__content__pagination__content');
      const pagesCount = Math.ceil(arrData.length / rowPerPage);

      paginationEl.innerHTML = '';

      const prevButton = document.querySelector('.item__left');
      prevButton.style.pointerEvents = "auto";
      if (currentPage > 1) {
        prevButton.onclick = () => {
            currentPage--;
            displayData(customersData, rows, currentPage);
        };
      } else {prevButton.style.pointerEvents = "none"};      

      if (pagesCount <= 4) {
        for (let i = 1; i <= pagesCount; i++) {
            const pageButton = displayPaginationBtn(i, currentPage);
            paginationEl.appendChild(pageButton);
        }
      } else {
          if (currentPage > 2) {
              const firstButton = displayPaginationBtn(1, currentPage);
              paginationEl.appendChild(firstButton);
          }

          if (currentPage > 3) {
              const dots = document.createElement('span');
              dots.textContent = '...';
              paginationEl.appendChild(dots);
          }

          const startPage = Math.max(1, currentPage - 1);
          const endPage = Math.min(pagesCount, currentPage + 1);

          for (let i = startPage; i <= endPage; i++) {
              const pageButton = displayPaginationBtn(i, currentPage);
              paginationEl.appendChild(pageButton);
          }

          if (currentPage < pagesCount - 2) {
              const dots = document.createElement('span');
              dots.textContent = '...';
              paginationEl.appendChild(dots);
          }

          if (currentPage < pagesCount - 1) {
              const lastButton = displayPaginationBtn(pagesCount, currentPage);
              paginationEl.appendChild(lastButton);
          }                             
      }

        const nextButton = document.querySelector('.item__right');
        nextButton.style.pointerEvents = "auto";
        if (currentPage < pagesCount) {
            nextButton.onclick = () => {
                currentPage++;
                displayData(customersData, rows, currentPage);
            };
        } else {nextButton.style.pointerEvents = "none"};    

    };

    function displayPaginationBtn (page) {

        const liEl = document.createElement('button');
        liEl.classList.add('field__footer__content__pagination__item');
        liEl.innerText = page;

        if (currentPage == page) {
          liEl.classList.add('field__footer__content__pagination__item--active');
        };

        liEl.addEventListener('click', () => {

          if(currentPage !== page) {

            currentPage = page;

            let currentItemLi = document.querySelector('.field__footer__content__pagination__item--active');

            if (currentItemLi) {
              currentItemLi.classList.remove('field__footer__content__pagination__item--active');
            }            

            liEl.classList.add('field__footer__content__pagination__item--active');

            displayData(customersData, rows, currentPage);

          }          

        });

      return liEl;
    };

    displayData(customersData, rows, currentPage);

    // *****************************************

};

main();



