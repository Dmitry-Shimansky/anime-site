const detailData = () => {
    const preloader = document.querySelector('.preloder');

    const renderGanreList = (ganres) => {
        const dropdownBloc = document.querySelector('.header__menu .dropdown');

        ganres.forEach(ganre => {
            dropdownBloc.insertAdjacentHTML('beforeend', `
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find((item) => item.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewsBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subtitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumb = document.querySelector('.breadcrumb__links span');

        if (animeObj) {
            imageBlock.dataset.setbg = animeObj.image

            viewsBlock.insertAdjacentHTML('beforeend', `
                <i class="fa fa-eye"></i> ${animeObj.views}
            `)

            titleBlock.textContent = animeObj.title
            subtitleBlock.textContent = animeObj['original-title']
            descriptionBlock.textContent = animeObj.description
            widgetList[0].insertAdjacentHTML('beforeend', `
                <span>Date aired:</span>${animeObj.date}
            `)
            widgetList[1].insertAdjacentHTML('beforeend', `
                <span>Rating:</span>${animeObj.rating}
            `)
            widgetList[2].insertAdjacentHTML('beforeend', `
                <span>Genre:</span>${animeObj.tags.join(", ")}
            `)

            breadcrumb.textContent = animeObj.ganre

            document.querySelectorAll('.set-bg').forEach((element) => {
                element.style.backgroundImage = `url(${element.dataset.setbg})`
            })

            setTimeout(() => {
                preloader.classList.remove('active');
            }, 500);
        } else {
            console.log('Anime not found');
        }
    }

    fetch('https://anime-3f885-default-rtdb.europe-west1.firebasedatabase.app/anime.json')
        .then((response) => response.json())
        .then((data) => {
            const ganres = new Set();
            const ganreParams = new URLSearchParams(window.location.search).get('itemId');

            data.forEach((element) => {
                ganres.add(element.ganre);
            })

            if (ganreParams) {
                renderAnimeDetails(data, ganreParams);
            } else {
                console.log('Anime not found');
            }
            renderGanreList(ganres);
        })
}

detailData()