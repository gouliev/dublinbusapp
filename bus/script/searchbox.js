const routeList = document.querySelector('.routeList');
const buttonGo = document.querySelector('button');
let stopStation = new Array();
stopStation = [
    {ssName: "RDS", esName: "UCD", srTime: 20},
    {ssName: "Smurfit", esName: "OCstreet", srTime: 20}
]

buttonGo.addEventListener('click', e => {
    e.preventDefault();
    if(routeList.classList.contains('d-none')){
        routeList.classList.remove('d-none');
    }

    routeList.innerHTML = `            
    <ul class="list-group choice1 mx-auto text-light mx-3 my-3 ">
        <p>First Choice</p>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>start stop name: ${stopStation[0].ssName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>end stop name: ${stopStation[0].esName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>scheduled runing time: ${stopStation[0].srTime} mins</span>
        </li>
    </ul>
    <ul class="list-group choice1 mx-auto text-light mx-3 my-3">
        <p >Second Choice</p>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>start stop name: ${stopStation[1].ssName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>end stop name: ${stopStation[1].esName}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center text-light">
            <span>scheduled runing time: ${stopStation[1].srTime} mins</span>
        </li>
    </ul>
`

});

