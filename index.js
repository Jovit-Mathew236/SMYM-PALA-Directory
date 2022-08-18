$(document).ready(function () {
    init2();

    function init2() {
        var url = "https://jovit-mathew236.github.io/API/numbers.json";//API covid vaccine availablity state names
        $.get(url, function (data) {

            // Arrange states
            console.log(data.dataForane);
            const selectForane = document.querySelector("select#forane");
            for (eachForane in data.dataForane) {
                // console.log(data.dataForane);
                const singleForane = data.dataForane[eachForane];
                makeNewOptionBoxForanes(singleForane);

                selectForane.addEventListener("change", function (e) {
                    if (e.target.value == singleForane.forane) {
                        callForaneId(singleForane.code);
                        $("#units").empty(); // Refreshing units p for depentent select option easy method:)
                        $("#names").empty(); // Refreshing names p for depentent select option easy method:)
                        $("#numbers").empty(); // Refreshing numbers p for depentent select option easy method:)
                        // const reloadDistrict = ` <option>Select District</option>`; // appling new option
                        // $("#units").html(reloadDistrict);
                    }
                });
            }
            // appending foranes
            function makeNewOptionBoxForanes(data) {
                const foraneName = data.forane;
                if (typeof foraneName != "undefined") {
                    const optionBoxState = document.createElement("option");
                    optionBoxState.innerHTML = foraneName;
                    selectForane.appendChild(optionBoxState);
                }
            }

            // fetch units 
            function callForaneId(foraneCode) {
                console.log(foraneCode);
                var url = `https://jovit-mathew236.github.io/API/` + `${foraneCode}` + '.json';
                $.get(url, function (data) {
                    // console.log(data);
                    manupulateData(data);
                });
            }

            const allUnits = document.querySelector("td#units");
            const allNames = document.querySelector("td#names");
            const allNumbers = document.querySelector("td#numbers");

            function manupulateData(data) {
                for (eachUnits in data) {
                    console.log(data[eachUnits]);
                    for (eachUnit in data[eachUnits]) {
                        // console.log(data[eachUnits][eachUnit].unit);
                        const singleUnit = data[eachUnits][eachUnit];
                        makeNewOptionBoxUnits(singleUnit);
                    }
                }
            }
            // Fetching unit details
            function makeNewOptionBoxUnits(data) {
                // console.log(data);
                const unitName = data.unit;
                const unitPresident = data.president;
                const unitPresidentNumber = data.number;
                if (typeof unitName != "undefined") {
                    const pUnit = document.createElement("p");
                    const pName = document.createElement("p");
                    const pNumber = document.createElement("p");
                    pUnit.innerHTML = unitName;
                    pName.innerHTML = unitPresident;
                    pNumber.innerHTML = unitPresidentNumber;
                    allUnits.appendChild(pUnit);
                    allNames.appendChild(pName);
                    allNumbers.appendChild(pNumber);
                    // const unitDetails = `
                    // <p>${unitName}</p>
                    // `
                    // $("div#units").html(unitDetails);
                    return;
                }
            }
        });
    }
});