const endpoint = "https://api.data.gov.sg/v1/environment/psi"

async function getPSI() {

    await fetch(endpoint)
    .then((resp) => {
        if(resp.ok) {
            return resp.json();
        }
        else {
            console.error('PSI readings from API is currently unavailable')
            return
        }
    })
    .then(data => {
        var tableReference = document.getElementById('tb-psi').getElementsByTagName('tbody')[0];
        var timestamp = document.getElementById('timestamp')
        
        let date = new Date(data.items[0].update_timestamp)
        let hour = date.getHours();
        let minutes = date.getMinutes();
        console.log(hour)
        console.log(minutes)

        let time = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        })
        var month = date.toLocaleString("default", {month: "long"})
        timestamp.innerHTML = 'Last updated : ' + `${date.getDate()} ` + `${month} ` + `${date.getFullYear()}`
        + ` ${time}`
        var readings = data.items[0].readings
        for (const key in readings) {
            const row = document.createElement('tr')            
            row.insertCell(0).innerHTML = key
            row.insertCell(1).innerHTML = readings[key].national
            row.insertCell(2).innerHTML = readings[key].central
            row.insertCell(3).innerHTML = readings[key].west
            row.insertCell(4).innerHTML = readings[key].east
            row.insertCell(5).innerHTML = readings[key].north
            row.insertCell(6).innerHTML = readings[key].south
            tableReference.appendChild(row)
        }
    })
}
