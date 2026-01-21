const q = [
    {q:"HTML principal?",o:["main","body","section","article"],a:0},
    {q:"CSS grille?",o:["flex","grid","block","inline"],a:1},
    {q:"JS constant?",o:["var","let","const","constant"],a:2},
    {q:"HTML dernière?",o:["HTML4","XHTML","HTML5","HTML6"],a:2},
    {q:"CSS ombre?",o:["text-shadow","box-shadow","shadow","element-shadow"],a:1},
    {q:"Bootstrap bouton?",o:["btn-default","btn-primary","btn-main","btn-blue"],a:1},
    {q:"Balise nav?",o:["div","nav","menu","header"],a:1},
    {q:"CSS parent?",o:["px","em","rem","vh"],a:1},
    {q:"JS tableau?",o:[".push()",".pop()",".shift()",".unshift()"],a:0},
    {q:"CSS survol?",o:[":active",":hover",":focus",":visited"],a:1},
    {q:"CSS anim?",o:["transition","animation","transform","keyframes"],a:1},
    {q:"JS par classe?",o:["getElementById","querySelector","getElementsByClassName","querySelectorAll"],a:2}
];

document.addEventListener('DOMContentLoaded', () => {
    showQ();
    document.getElementById('quiz-form').onsubmit = e => { e.preventDefault(); check(); };
    document.getElementById('retry-btn').onclick = reset;
    document.querySelector('button[type="reset"]').onclick = reset;
});

function showQ() {
    let h = '';
    q.forEach((i, n) => {
        h += `<div class="card mb-3"><div class="card-header">Q${n+1}: ${i.q}</div><div class="card-body">`;
        i.o.forEach((o, j) => {
            h += `<div class="form-check mb-2"><input type="radio" name="q${n}" value="${j}" id="q${n}o${j}"><label for="q${n}o${j}">${o}</label></div>`;
        });
        h += '</div></div>';
    });
    document.getElementById('questions-container').innerHTML = h;
}

function check() {
    let s = 0, r = '';
    
    q.forEach((i, n) => {
        const sel = document.querySelector(`input[name="q${n}"]:checked`);
        const u = sel ? parseInt(sel.value) : null;
        const c = u === i.a;
        if (c) s++;
        
        r += `<div class="mb-3 ${c?'border-success':'border-danger'} border p-3">
            <h6>Q${n+1}: ${i.q}</h6>
            <div class="${c?'text-success':'text-danger'}">${c?'✓':'✗'} Vous: ${u!==null?i.o[u]:'Non'}</div>
            <div class="text-success">✓ Correct: ${i.o[i.a]}</div>
        </div>`;
    });
    
    const p = (s/q.length*100).toFixed(1);
    document.getElementById('score-display').innerHTML = `
        <div class="alert ${p>=60?'alert-success':'alert-warning'}">
            <h4>Score: ${s}/${q.length} (${p}%)</h4>
            <p>${p>=80?'Excellent':p>=60?'Bien':p>=40?'Moyen':'À revoir'}</p>
        </div>
    `;
    
    document.getElementById('answers-list').innerHTML = r;
    document.getElementById('results-section').style.display = 'block';
    document.getElementById('quiz-form').style.display = 'none';
}

function reset() {
    document.getElementById('quiz-form').reset();
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('quiz-form').style.display = 'block';
}