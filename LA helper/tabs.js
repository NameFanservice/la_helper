
const tabs = document.getElementsByClassName('tabs')[0];
const tabsItems = document.getElementsByClassName('tabs__item');
const tabContent = document.getElementsByClassName('tab-content')[0];

function syncActive(el, arr) {
    for (let item of arr) {
        item.classList.remove('active');
    }

    el.classList.add('active');
}

async function handleTabsClick(e) {
    if (e.target === e.currentTarget) return;

    const tab = e.target.closest('.tabs__item');

    if (tab) {
        syncActive(tab, tabsItems);
    }

    try {
        const res = await fetch(tab.dataset.tab + '.html');

        if (res.ok) {
            const data = await res.text();
            tabContent.innerHTML = data;
        } else {
            const err = await res.text();
            throw err;
        }
    } catch (err) {
        alert(err);
    }
}

tabs.addEventListener('click', handleTabsClick);