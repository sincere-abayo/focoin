
    const menubar = document.querySelector(".menubar");
    const lists = document.querySelector(".coinUl");

    menubar.addEventListener("click", () => {
        lists.classList.toggle("responsive");
    })


    // donata chart
    google.charts.load("current", {
        packages: ["corechart"]
    });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Language', 'Speakers (in millions)'],
            ['community', 5.85],
            ['reserve', 0.66],
            ['team', 2.316],
            ['distributors', 3.0791]
        ]);

        var options = {
            legend: 'none',
            pieSliceText: 'label',
            pieHole: 0.4,
            backgroundColor: "#0d1b3d",
            pieStartAngle: 100,
            chartArea: {
                left: 10,
                top: 10,
                right: 10,
                bottom: 10,
            },
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
    }
    





