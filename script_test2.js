function funcao1() {
    esconder()

    document.getElementById('div1').classList.remove('hidden');
}

function funcao2() {
    esconder()

    document.getElementById('div2').classList.remove('hidden');
}

function esconder() {
    document.getElementById('div1').classList.add('hidden');
    document.getElementById('div2').classList.add('hidden');
}