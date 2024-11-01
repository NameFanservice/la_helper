const arrayFromEnter = {WildKazashka: '1620.00', МалыйАрктус: '1585.83'};
const arrayToSave = []

const raidValue = {
    'гер егир': 27500,
    'норм егир': 23000,
    'бехемос': 21500,
    'гер ехидна': 18500,
    'норм ехидна': 14500,
    'гер камен': 41000,
    'норм камен': 13000,
    'гер дом': 13000,
    'норм дом': 6500,
    'гер кай': 4800,
    'норм кай': 3600,
    'гер дед': 7500,
    'норм дед': 5400,
    'гер аврель': 5600,
    'норм аврель': 4600
}



document.addEventListener('DOMContentLoaded', () => {
    startWednesdayTimer();

    let personCount = 0;
    for(let i in arrayFromEnter) {
        arrayToSave[personCount] = [
            i,
            arrayFromEnter[i],
            3
        ]
        personCount++;
        document.getElementById('raid_lasts').innerHTML = parseInt(document.getElementById('raid_lasts').innerHTML) + 3;
    }

    for(let i of arrayToSave) {
        let div_node = document.createElement("div");
        div_node.id = i[0];
        document.getElementById('char_list').appendChild(div_node);

        let name_node = document.createElement("span");
        name_node.innerText = i[0];
        div_node.appendChild(name_node);

        let gs_node = document.createElement('span');
        gs_node.innerText = i[1];
        div_node.appendChild(gs_node);

        let raid_node = document.createElement('div');
        raid_node.className = 'raid';
        div_node.appendChild(raid_node);
    }

    const count = document.getElementsByClassName('raid');
    for (let i of count) {
        for(let n = 0; n < 3; n++) {
            let raid_node = document.createElement('div');
            raid_node.innerText = get_raids(parseFloat(i.previousSibling.innerText))[n];
            let done_button = document.createElement('button');
            done_button.type = 'submit';
            done_button.innerText = 'завершено';
            i.appendChild(raid_node);
            i.appendChild(done_button);
        }
    }
});

function get_raids(number) {
    switch(true) {
        case number >= 1680:
            return ['гер егир', 'бехемос', 'гер камен'];
        case number >= 1660 && number < 1680:
            return ['норм егир', 'бехемос', 'гер камен'];
        case number >= 1640 && number < 1660:
            return ['бехемос', 'гер ехидна', 'гер камен'];
        case number >= 1630 && number < 1640:
            return ['гер ехидна', 'гер камен', 'гер дом'];
        case number >= 1620 && number < 1630:
            return ['норм ехидна', 'норм камен', 'гер дом'];
        case number >= 1610 && number < 1620:
            return ['норм камен', 'норм дом', 'гер дед'];
        case number >= 1600 && number < 1610:
            return ['норм дом', 'гер дед', 'гер кай/1-4 аврель'];
        case number >=1580 && number < 1600:
            return ['норм дед', 'гер аврель', 'гер кай'];
        case number >= 1540 && number < 1580:
            return ['норм кай', ' норм аврель', 'клоун']
        default:
            return ['чертоги','чертоги','и еще раз чертоги'];

    }
}

document.getElementById('char_list').addEventListener('click', async (event) => {

    if(event.target.tagName === 'BUTTON') {
        addGold(event.target);

        event.target.disabled = true;
    }
});

function addGold(button) {
    let goldForRaid = raidValue[button.previousSibling.innerText];
    let result = document.getElementById('total_gold').innerText;
    document.getElementById('total_gold').innerText = parseInt(result) + parseInt(goldForRaid);
    for(let i of arrayToSave) {
        if(button.parentNode.parentNode.id == i[0]){
            i[2]--;
        }
    }
    document.getElementById('raid_lasts').innerHTML = parseInt(document.getElementById('raid_lasts').innerHTML) - 1;
}

function getTimeUntilNextWednesday() {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const daysUntilWednesday = (3 - dayOfWeek + 7) % 7 || 7; // Среда - 3 день недели, 7 % 7 = 0, для текущей среды
    const nextWednesday = new Date(now);

    // Устанавливаем дату на ближайшую среду и обнуляем время до полуночи
    nextWednesday.setDate(now.getDate() + daysUntilWednesday);
    nextWednesday.setHours(8, 0, 0, 0);

    // Вычисляем оставшееся время в миллисекундах
    return nextWednesday - now;
}

function startWednesdayTimer() {
    const timeElement = document.getElementById("time_lasts");

    function updateTimer() {
        let timeLeft = getTimeUntilNextWednesday();

        if (timeLeft <= 0) {
            // Если достигли среды, перезапускаем таймер на следующую неделю
            timeLeft = getTimeUntilNextWednesday();
        }

        // Переводим миллисекунды в часы, минуты и секунды
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        // Обновляем отображение на странице
        timeElement.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с до ресета`;
    }

    // Запуск таймера обновления каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

