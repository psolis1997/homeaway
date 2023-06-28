var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    allowTouchMove: false,
    allowSlideNext: true,
    allowSlidePrev: true,
});

$(function () {
    $("#searchForm").parsley().on('field:validated', function () {
            var ok = $('.parsley-error').length === 0;
            $('.alert-info').toggleClass('hidden', !ok);
            $('.alert-warning').toggleClass('hidden', ok);
            Event.preventDefault();
        })
        .on('form:submit', function () {
            Event.preventDefault();
            swiper.slideNext();
        });
});

var pickLocation = document.getElementById("pickLocation");
var inputDateSelection = document.getElementById("inputDateSelection");
var guestNumber = document.getElementById("guestNumber");
var message = document.getElementById("message");
var results = document.getElementById("listingProfile");
var daysSelected;
var start;
var end;
var guestsSelected;

$(function () {

    $('input[name="daterange"]').daterangepicker({
        opens: 'center',
        locale: {
            format: "DD/MM/YYYY"
        },
        minDate: moment(),
        maxYear: parseInt(moment().format('YYYY'), 10)
    }, function (start, end, label) {});
    $('input[name="daterange"]').on('apply.daterangepicker', function (ev, picker) {
        fullDate = $(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));

        start = picker.startDate.format('MM/DD/YYYY');
        end = picker.endDate.format('MM/DD/YYYY');
        daysSelected = datediff(parseDate(start), parseDate(end));
        console.log(start);
        console.log(end);
        console.log(daysSelected);

        function parseDate(str) {
            var mdy = str.split('/');
            return new Date(mdy[2], mdy[0] - 1, mdy[1]);
        }

        function datediff(first, second) {
            return Math.round((second - first) / (1000 * 60 * 60 * 24));
        }

        if (daysSelected < 1) {
            message.innerHTML = `
        <span class ="incorrect">Please select at least 1 day.</span>
        `;
        } else if (daysSelected > 16) {
            message.innerHTML = `
        <span class ="incorrect">No options available for stays longer than 15 days.</span>
        `;
        } else {
            daysValid = true;
            message.innerHTML = `
        <span class="correct"><strong>Days selected: ${daysSelected}</strong></span>
        `;
        }
    });
});

var daysValid;
var searchBtn = document.getElementById("searchBtn");

searchBtn.onclick = function () {
    if (daysValid == true) {
        swiper.slideNext();
        generateSearchResults();
    } else {
        alert("Error, please fill all sections.");
    }
};

var homeBtn = document.getElementsByClassName("homeLogo");
homeBtn.onclick = function () {
    swiper.slidePrev();
};

var locations = [{
        id: 0,
        name: "Sunshine Motel",
        maps: "Mt Vic, Wellington",
        city: "Wellington",
        property: "Motel",
        price: 90,
        image_url: "img/motel1.jpg",
        bed: 2,
        image2_url: "img/2.jpg",
        icon1: "bed",
        icon2: "wifi",
        icon3: "shower",
        user: "user",
        minNights: 3,
        maxNights: 10,
        minGuests: 2,
        maxGuests: 4,
    },
    {
        id: 1,
        name: "Duck Pond House",
        maps: "Grey Lynn, Auckland",
        city: "Auckland",
        property: "House",
        price: 240,
        image_url: "img/3.jpg",
        bed: 3,
        image2_url: "img/4.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "fire-burner",
        icon5: "shower",
        user: "user",
        minNights: 2,
        maxNights: 15,
        minGuests: 1,
        maxGuests: 4,
    },
    {
        id: 2,
        name: "U Boutique",
        maps: "Te Aro, Wellington",
        city: "Wellington",
        property: "Hostel",
        price: 30,
        image_url: "img/5.jpg",
        bed: 1,
        image2_url: "img/6.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "shower",
        user: "user",
        minNights: 1,
        maxNights: 10,
        minGuests: 1,
        maxGuests: 1,
    },
    {
        id: 3,
        name: "The ArtHouse",
        maps: "Ponsonby, Auckland",
        city: "Auckland",
        property: "Hotel",
        price: 157,
        image_url: "img/7.jpg",
        bed: 1,
        image2_url: "img/8.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "shower",
        user: "user",
        minNights: 1,
        maxNights: 5,
        minGuests: 1,
        maxGuests: 2,
    }, {
        id: 4,
        name: "Telfer Hotel",
        maps: "Thorndon, Wellington",
        city: "Wellington",
        property: "Hotel",
        price: 157,
        image_url: "img/9.jpg",
        bed: 2,
        image2_url: "img/10.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "shower",
        user: "user",
        minNights: 1,
        maxNights: 5,
        minGuests: 1,
        maxGuests: 2,
    },
    {
        id: 5,
        name: "Greenwich Motel",
        maps: "Parnell, Auckland",
        city: "Auckland",
        property: "Motel",
        price: 90,
        image_url: "img/11.jpg",
        bed: 1,
        image2_url: "img/12.jpg",
        icon1: "bed",
        icon2: "wifi",
        icon3: "shower",
        user: "user",
        minNights: 3,
        maxNights: 10,
        minGuests: 2,
        maxGuests: 4,
    },
    {
        id: 6,
        name: "Tiny House",
        maps: "Brooklyn, Wellington",
        city: "Wellington",
        property: "House",
        price: 240,
        image_url: "img/13.jpg",
        bed: 3,
        image2_url: "img/14.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "fire-burner",
        icon5: "shower",
        user: "user",
        minNights: 2,
        maxNights: 15,
        minGuests: 1,
        maxGuests: 4,
    },
    {
        id: 7,
        name: "Yellowbird",
        maps: "New Market, Auckland",
        city: "Auckland",
        property: "Hostel",
        price: 30,
        image_url: "img/15.jpg",
        bed: 1,
        image2_url: "img/16.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "shower",
        user: "user",
        minNights: 1,
        maxNights: 10,
        minGuests: 1,
        maxGuests: 1,
    },
    {
        id: 8,
        name: "Hummingbird House",
        maps: "Khandallah, Wellington",
        city: "Wellington",
        property: "House",
        price: 240,
        image_url: "img/17.jpg",
        bed: 3,
        image2_url: "img/18.jpg",
        icon1: "bed",
        icon2: "tv",
        icon3: "wifi",
        icon4: "fire-burner",
        icon5: "shower",
        user: "user",
        minNights: 2,
        maxNights: 15,
        minGuests: 1,
        maxGuests: 4,
    },
];

function generateSearchResults() {
    var locationSelected = pickLocation.value;
    guestsSelected = guestNumber.value;
    console.log(locationSelected);
    console.log(guestsSelected);
    console.log(daysSelected);
    if (locationSelected === "Auckland") {
        for (var i = 0; i < locations.length; i++) {

            if (locations[i].city == ("Auckland") && daysSelected >= locations[i].minNights && daysSelected <= locations[i].maxNights && guestsSelected >= locations[i].minGuests && guestsSelected <= locations[i].maxGuests) {
                generateLocation(i);
                console.log("Auckland");
            }

        }
    } else if (locationSelected === "Wellington") {
        for (var k = 0; k < locations.length; k++) {

            if (locations[k].city == ("Wellington") && daysSelected >= locations[k].minNights && daysSelected <= locations[k].maxNights && guestsSelected >= locations[k].minGuests && guestsSelected <= locations[k].maxGuests) {
                generateLocation(k);
                console.log("Wellington");
            }
        }
    }
}

function generateLocation(i) {
    results.innerHTML +=
        `
    <div class="card mb-3">
    <div class="row">
        <div class="col-md-4">
            <img src="${locations[i].image_url}" alt="Motel">
        </div>
        <div class="col-md-6">
            <div class="card-body">
                <a href="#" class="view" id="${i}" data-bs-toggle="modal"
                    data-bs-target="#viewModal">${locations[i].name}</a>
                <h6 class="card-text">${locations[i].maps}</h6>
                <h6 class="card-text">${locations[i].property}</h6>
                <h6 class="card-text">${locations[i].minGuests} - ${locations[i].maxGuests}
                    <i class="fa-solid fa-${locations[i].user}"></i> | 2 <i
                        class="fa-solid fa-${locations[i].icon1}"></i></h6>
                <h6 class="card-text">$${locations[i].price}/night</h6>
            </div>
        </div>
        <div class="col-md-2">
            <div class="card-body-right">
                <h6 class="card-text">$${locations[i].price * daysSelected}</h6>
            </div>
        </div>
    </div>
</div>
    `;
    populateModals();
}

function populateModals() {
    var viewModal = document.querySelectorAll(".view");
    Array.from(viewModal).forEach(function (btn) {
        btn.addEventListener("click", function () {
            var listingModal = document.getElementById("modalResult");
            listingModal.innerHTML = `
                <div class="modal-header">
                    <h5>${locations[this.id].name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row" id="modalVisuals">
                        <div class="col-md-6 p-0">
                            <img src="${locations[this.id].image_url}" class="img-fluid" alt="Motel">
                        </div>
                        <div class="col-md-6 p-0">
                            <img src="${locations[this.id].image2_url}" class="img-fluid" alt="Motel">
                        </div>
                    </div>
                    <h6>${locations[this.id].maps}</h6>
                    <h6>${locations[this.id].property}</h6>
                    <p>Amenities: <br>
                    ${locations[this.id].bed} <i class="fa-solid fa-${locations[this.id].icon1}"></i> | <i class="fa-solid fa-${locations[this.id].icon2}"></i> | <i
                            class="fa-solid fa-${locations[this.id].icon3}"></i> | <i class="fa-solid fa-${locations[this.id].icon4}"></i> | <i class="fa-solid fa-${locations[this.id].icon5}"></i> 
                    </p>
                    <div>
                        <p>Meal Options:</p>
                        <input type="checkbox" id="breakfastCheck">
                        <label for="breakfastCheck">Breakfast: Food + Beverage ($25pp)</label>
                        <input type="checkbox" id="lunchCheck">
                        <label for="lunchCheck">Lunch: Food + Beverage ($25pp)</label>
                    </div>
                </div>
                <div class="row" id="modalFooter">
                    <div class="col-md-5 dates">
                        <h6>${start} - ${end}</h6>
                    </div>
                    <div class="col-md-2 guests">
                        <h6>${guestsSelected} <i class="fa-solid fa-${locations[this.id].user}"></i></h6>
                    </div>
                    <div class="col-md-2 total">
                        <h6>$${locations[this.id].price * daysSelected}</h6>
                    </div>
                    <div class="col-md-3 book-btn">
                        <button type="button" class="btn btn-primary">Book</button>
                    </div>
                </div>
            `;
        });
    });
}