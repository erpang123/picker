if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/picker/service/js/sw.js').then((registration) => {
        console.log(registration)
    }).catch(err => {
        console.log(err)
    })
}
