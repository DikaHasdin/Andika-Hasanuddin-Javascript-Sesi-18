const dataMenu = [
    {
        id: 1,
        namaMenu: "Bakso",
        namaImage: "bakso",
        harga: 17000,
    },
    {
        id: 2,
        namaMenu: "Mie Ayam",
        namaImage: "mieAyam",
        harga: 15000,
    },
    {
        id: 3,
        namaMenu: "Es Jeruk",
        namaImage: "esJeruk",
        harga: 10000,
    }
]

let dataPenjualan = [
    {
        id: 1,
        dataMenu_id: 1,
        jumlah: 0
    },
    {
        id: 2,
        dataMenu_id: 2,
        jumlah: 0
    },
    {
        id: 3,
        dataMenu_id: 3,
        jumlah: 0
    }
]

let dataPembelian = []

// console.log(dataPembelian.length, 'dddddd')

const daftarMenu = document.getElementById('daftarMenu')
let dataElement = '';

dataMenu.forEach(menu => {
    dataElement = 
        `<div class="menu">
            <div class="menu-image"><img style="width: 185px; height: 141px; margin-left: -20x; border-radius: 5px 5px 0px 0px" src="image/`+menu.namaImage+`.jfif"></div>
            <div class="menu-name">
                <div style="height: 50%; text-align: center;">`+menu.namaMenu+`</div>
                <div style="text-align: center;">Rp`+(menu.harga).toLocaleString("de-DE")+`</div>
            </div>
            <div class="menu-qty">
                <div style="width: 30%; text-align: center; padding: 5px;"><button onclick="buttonKurang(`+menu.id+`)" style="width: 45px; height: 36px; font-size: 25px;">-</button></div>
                <div id="jumlahBeli`+menu.id+`" style="width: 40%; font-size: 15px; text-align: center; padding-top: 15px; display: none">0</div>
                <div class="cardJumlahBeli" id="jumlahBeliDua`+menu.id+`" style="width: 40%; font-size: 15px; text-align: center; padding-top: 15px;">0</div>
                <div style="width: 30%; text-align: center; padding: 5px;"><button onclick="buttonTambah(`+menu.id+`)" style="width: 45px; height: 36px; font-size: 20px;">+</button></div>
            </div>
        </div>`
    daftarMenu.insertAdjacentHTML("beforeend", dataElement);
})

function jumlahBeliMenu(idMenu, totalPembelian){
    for(var i = 0; i < dataPenjualan.length; i += 1) {
        if(dataPenjualan[i].dataMenu_id == idMenu) {
            dataPenjualan.forEach(pembelian => {
                if(pembelian.dataMenu_id == idMenu){ 
                    dataPenjualan.splice(i,1, {id: pembelian.id, dataMenu_id: pembelian.dataMenu_id,  jumlah: totalPembelian});
                }
            })
        }
    }
}

function indexData(idMenu){
    for(var i = 0; i < dataPembelian.length; i += 1) {
        if(dataPembelian[i].id == idMenu) {
            // console.log(i, 'nomorindex')
            return i
        }
    }
}

function penjualan(idMenu, totalPembelian){
    if(dataPembelian.length < 1) {
        dataPembelian.push({id: idMenu,  jumlah: totalPembelian})
    }else{
        for(var i = 0; i < dataPembelian.length; i += 1) {
            if(dataPembelian[i].id == idMenu) {
                dataPembelian.splice(i,1, {id: idMenu,  jumlah: totalPembelian});
            }
            else{
                let dataIndex = indexData(idMenu)
                if(dataIndex >= 0){
                    // console.log(dataIndex, 'dataIndex111')
                }else{
                    // console.log(dataIndex, 'dataIndex222')
                    dataPembelian.push({id: idMenu,  jumlah: totalPembelian})
                }
            }
        }
    }
    console.log(dataPembelian, 'dataPembelian')
}

function totPembelian(){
    let pembelianTotal = 0
    dataMenu.forEach(penjualan => {
        dataPembelian.forEach(pembelian => {
            if(penjualan.id ==  pembelian.id){
                pembelianTotal = pembelianTotal + (pembelian.jumlah * penjualan.harga)
                // console.log(pembelianTotal, 'pembelianTotal')
                // return pembelianTotal
            }
        })
    })
    return pembelianTotal
}

function totPenjualan(){
    let penjualanTotal = 0
    dataMenu.forEach(data => {
        dataPenjualan.forEach(penjualan => {
            if(data.id ==  penjualan.dataMenu_id){
                penjualanTotal = penjualanTotal + (penjualan.jumlah * data.harga)
            }
        })
    })
    return penjualanTotal
}

const daftarPembelian = document.getElementById('tbodyPembelian')
let dataElementPembelian = '';

function buttonTambah(idMenu) { 
    document.getElementById('tbodyPembelian').innerHTML="" 

    let jumlahBeliDua = document.getElementById('jumlahBeliDua'+idMenu).textContent;
    let totalPembelianDua = Number(jumlahBeliDua) + 1
    document.getElementById('jumlahBeliDua'+idMenu).innerText = Number(jumlahBeliDua) + 1

    let jumlahBeli = document.getElementById('jumlahBeli'+idMenu).textContent;
    document.getElementById('jumlahBeli'+idMenu).innerText = Number(jumlahBeli) + 1
    let totalPembelian = Number(jumlahBeli) + 1

    jumlahBeliMenu(idMenu, totalPembelian)
    penjualan(idMenu, totalPembelianDua)
    
    const tabelPembelian = async function() {
        try {
            let no = 1;
            dataMenu.forEach(menu => {
                dataPembelian.forEach(pembelian => {
                    if(menu.id == pembelian.id){
                        dataElementPembelian = 
                            `<tr>
                                <td>`+ no++ +`</td>
                                <td>`+menu.namaMenu+`</td>
                                <td>`+pembelian.jumlah+`</td>
                                <td>`+(menu.harga).toLocaleString("de-DE")+`</td>
                                <td>`+(menu.harga*pembelian.jumlah).toLocaleString("de-DE")+`</td>
                            </tr>`
                        daftarPembelian.insertAdjacentHTML("beforeend", dataElementPembelian);
                    }
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

    document.getElementById('subtotal').value = totPembelian().toLocaleString("de-DE")
    tabelPembelian()
}

function buttonKurang(idMenu) { 
    let jumlahBeli = document.getElementById('jumlahBeli'+idMenu).textContent;
    let jumlahBeliDua = document.getElementById('jumlahBeliDua'+idMenu).textContent;
    if(jumlahBeliDua < 1){
        alert("Quantity Menu Yang Anda Pilih Kurang Dari 1")
    }else{
        document.getElementById('tbodyPembelian').innerHTML="" 

        let totalPembelianDua = Number(jumlahBeliDua) - 1
    document.getElementById('jumlahBeliDua'+idMenu).innerText = Number(jumlahBeliDua) - 1

        document.getElementById('jumlahBeli'+idMenu).innerText = jumlahBeli-1
        let totalPembelian = jumlahBeli-1

        jumlahBeliMenu(idMenu, totalPembelian)
        penjualan(idMenu, totalPembelianDua)

        const tabelPembelian = async function() {
            try {
                let no = 1;
                dataMenu.forEach(menu => {
                    dataPembelian.forEach(pembelian => {
                        if(menu.id == pembelian.id){
                            dataElementPembelian = 
                                `<tr>
                                    <td>`+ no++ +`</td>
                                    <td>`+menu.namaMenu+`</td>
                                    <td>`+pembelian.jumlah+`</td>
                                    <td>`+(menu.harga).toLocaleString("de-DE")+`</td>
                                    <td>`+(menu.harga*pembelian.jumlah).toLocaleString("de-DE")+`</td>
                                </tr>`
                            daftarPembelian.insertAdjacentHTML("beforeend", dataElementPembelian);
                        }
                    })
                })
            } catch (error) {
                console.error(error)
            }
        } 

        document.getElementById('subtotal').value = totPembelian().toLocaleString("de-DE")
        tabelPembelian()
    }
}

function bayar(valueBayar){
    var subtotal = (document.getElementById('subtotal').value).replace('.','')
    document.getElementById('kembalian').value = (valueBayar - subtotal).toLocaleString("de-DE")
}

function submit(){
    dataPembelian = []
    const cardJumlahBeli = document.getElementsByClassName('cardJumlahBeli').length
    for(var i = 0; i < cardJumlahBeli; i += 1) {
        document.getElementsByClassName('cardJumlahBeli')[i].innerHTML = 0
    }
    console.log(dataPenjualan, 'dataPenjualan')
    document.getElementById('tbodyPembelian').innerHTML = ''
    document.getElementById('subtotal').value = ''
    document.getElementById('bayar').value = ''
    document.getElementById('kembalian').value = ''
    let daftarPenjualan = document.getElementById('tbodyPenjualan')
    daftarPenjualan.innerHTML = ''
    let dataElementPenjualan = ''
    let no = 1;
    dataMenu.forEach(menu => {
        dataPenjualan.forEach(penjulaan => {
            if(menu.id == penjulaan.id){
                dataElementPenjualan = 
                    `<tr>
                        <td>`+ no++ +`</td>
                        <td>`+menu.namaMenu+`</td>
                        <td>`+penjulaan.jumlah+`</td>
                        <td>`+(menu.harga).toLocaleString("de-DE")+`</td>
                        <td>`+(menu.harga*penjulaan.jumlah).toLocaleString("de-DE")+`</td>
                    </tr>`
                daftarPenjualan.insertAdjacentHTML("beforeend", dataElementPenjualan);
            }
        })
    })
    document.getElementById('totPendapatan').innerHTML = totPenjualan().toLocaleString("de-DE")

    Highcharts.chart('container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'GRAFIK PIE PENJUALAN'
        },
        tooltip: {
            valueSuffix: ''
        },
        // subtitle: {
        //     text:
        //     'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
        // },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '0.75em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [
            {
                name: 'Jumlah',
                colorByPoint: true,
                data: [
                    {
                        name: dataMenu[0].namaMenu,
                        y: dataPenjualan[0].jumlah
                    },
                    {
                        name: dataMenu[1].namaMenu,
                        y: dataPenjualan[1].jumlah
                    },
                    {
                        name: dataMenu[2].namaMenu,
                        y: dataPenjualan[2].jumlah
                    }
                ]
            }
        ]
    });
    
}