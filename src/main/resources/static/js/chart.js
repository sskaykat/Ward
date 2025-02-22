
/**
 * Initializes labels and datasets
 */
function chartInitialization()
{
    const processorRectangle = document.getElementById("processor-rectangle");
    const ramRectangle = document.getElementById("ram-rectangle");
    const storageRectangle = document.getElementById("storage-rectangle");

    const ctx = document.getElementById("chart-body").getContext("2d");

    processorTriangle = document.getElementById("processor-triangle");
    ramTriangle = document.getElementById("ram-triangle");
    storageTriangle = document.getElementById("storage-triangle");

    const dataLight =
    {
        data:
        {
            labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            datasets:
            [
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(89, 101, 249, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(230, 232, 254, 1)",
                    backgroundColor: "rgba(230, 232, 254, 0.3)",
                    fill:true,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(255, 89, 89, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(249, 226, 226, 1)",
                    backgroundColor: "rgba(249, 226, 226, 0.3)",
                    fill:true,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(8, 193, 141, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(212, 242, 225, 1)",
                    backgroundColor: "rgba(212, 242, 225, 0.3)",
                    fill:true,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
    }
    const dataDark =
    {
        data:
        {
            labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            datasets:
                [
                    {
                        borderWidth: 1.5,
                        borderColor: "rgba(89, 101, 249, 1)",
                        pointRadius: 2,
                        pointHoverRadius: 3,
                        pointBackgroundColor: "rgba(255, 255, 255, 1)",
                        pointHoverBackgroundColor: "rgba(230, 232, 254, 1)",
                        backgroundColor: "rgba(230, 232, 254, 0.3)",
                        fill:true,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        borderWidth: 1.5,
                        borderColor: "rgba(255, 89, 89, 1)",
                        pointRadius: 2,
                        pointHoverRadius: 3,
                        pointBackgroundColor: "rgba(255, 255, 255, 1)",
                        pointHoverBackgroundColor: "rgba(249, 226, 226, 1)",
                        backgroundColor: "rgba(249, 226, 226, 0.3)",
                        fill:true,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                    {
                        borderWidth: 1.5,
                        borderColor: "rgba(8, 193, 141, 1)",
                        pointRadius: 2,
                        pointHoverRadius: 3,
                        pointBackgroundColor: "rgba(255, 255, 255, 1)",
                        pointHoverBackgroundColor: "rgba(212, 242, 225, 1)",
                        backgroundColor: "rgba(212, 242, 225, 0.3)",
                        fill:true,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
        }
    }
    const options =
    {
        type: "line",
        options:
        {
            border: { display: false },
            maintainAspectRatio: false,
            plugins:
            {
                legend:
                {
                    display: false
                }
            },
            elements:
            {
                line:
                {
                    tension: 0
                }
            },
            scales:
            {
                y:
                {
                    beginAtZero: true,
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks:
                    {
                        display: false
                    },
                    grid:
                    {
                        drawTicks: false
                    }
                },
                x:
                {
                    ticks:
                    {
                        display: false
                    },
                    grid:
                    {
                        drawTicks: false
                    }
                }
            },
            animation:
            {
                duration: 150
            }
        }
    };

    chart = new Chart(ctx, Object.assign((html.getAttribute("theme") === "light") ? dataLight : dataDark, options));

    processorRectangle.addEventListener("click", (event) => {hideDataset(event.target || event.srcElement)});
    ramRectangle.addEventListener("click", (event) => {hideDataset(event.target || event.srcElement)});
    storageRectangle.addEventListener("click", (event) => {hideDataset(event.target || event.srcElement)});
}

/**
 * Updates datasets shifting previous values
 *
 * @param {*} datasets datasets to update
 * @param {*} usageData new data
 */
function chartTick(usageData)
{
    const datasets = chart.data.datasets;

    for (let i = 0; i < datasets.length; i++)
    {
        const dataset = datasets[i].data;
        const usageDataArray = Object.values(usageData);

        for (let k = 0; k < dataset.length - 1; k++)
        {
            dataset[k] = dataset[k + 1];
        }
        dataset[dataset.length - 1] = usageDataArray[i];
    }

    chart.update();
}

/**
 * Hides chosen dataset from chart
 *
 * @param {*} element dataset to hide
 */
function hideDataset(element)
{
    switch (String(element.id))
    {
        case "processor-rectangle":
        {
            processorTriangle.style.animation = (chart.getDatasetMeta(0).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(0).hidden = (chart.getDatasetMeta(0).hidden) ? false : true;
            break;
        }
        case "ram-rectangle":
        {
            ramTriangle.style.animation = (chart.getDatasetMeta(1).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(1).hidden = (chart.getDatasetMeta(1).hidden) ? false : true;
            break;
        }
        case "storage-rectangle":
        {
            storageTriangle.style.animation = (chart.getDatasetMeta(2).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(2).hidden = (chart.getDatasetMeta(2).hidden) ? false : true;
            break;
        }
    }

    chart.update();
}