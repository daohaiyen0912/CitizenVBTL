let button = document.getElementById('buttonlg')

button.addEventListener('click', submit);

function submit() {
    console.log("Yeah");
    let body = document.querySelector('body');
}

function setBarVer(body) {
    const menuVer = document.createElement('div');
    menuVer.id = 'menuVer';
    const listNav = document.createElement('nav');
    const pa = document.createElement('p');
    pa.innerHTML = "Hello world";
    menuVer.appendChild(pa);
    body.appendChild(menuVer);
}