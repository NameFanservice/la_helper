const parser = new DOMParser();
const html_response = parser.parseFromString(data, "text/html");
//console.log(html_response.querySelector('.level-info2__expedition span:last-child').innerText);
//console.log(html_response.querySelector('#expand-character-list > strong:nth-child(2)').innerText);
document.getElementById('server1').innerText =
    html_response.querySelector('#expand-character-list > strong:nth-child(2)').innerText;
document.getElementById('server2').innerText =
    html_response.querySelector('#expand-character-list > strong:nth-child(4)').innerText;

let server1_chars_count =
    html_response.getElementsByTagName('ul')[0].getElementsByTagName('li').length;
let server2_chars_count =
    html_response.getElementsByTagName('ul')[1].getElementsByTagName('li').length;

let server1_chars_items =
    html_response.getElementsByTagName('ul')[0].getElementsByTagName('li');
let server2_chars_items =
    html_response.getElementsByTagName('ul')[1].getElementsByTagName('li');

for(let element of server1_chars_items){
    let name = element.firstElementChild.firstElementChild.innerText;
    let node = document.createElement('p');
    let node_content = document.createTextNode(name);
    node.appendChild(node_content);
    let server_div = document.getElementById('server1_chars');
    server_div.appendChild(node);
}

for(let element of server2_chars_items) {
    let name = element.firstElementChild.firstElementChild.innerText;
    let node = document.createElement('p');
    let node_content = document.createTextNode(name);
    node.appendChild(node_content);
    let server_div = document.getElementById('server2_chars');
    server_div.appendChild(node);
}